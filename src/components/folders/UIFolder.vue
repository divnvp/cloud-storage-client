<template>
  <UIPage>
    <v-col>
      <v-row>
        <v-file-input
          v-model="newFile"
          :rules="rules"
          label="Загрузить файл"
          show-size
          counter
          outlined
        />

        <v-menu
          v-model="isMenuShow"
          :close-on-content-click="false"
          transition="scale-transition"
          min-width="auto"
          offset-y
        >
          <template #activator="{ on, attrs }">
            <v-text-field
              v-model="endDate"
              v-bind="attrs"
              v-on="on"
              label="Когда удалить файл?"
              :disabled="!newFile"
              readonly
              outlined
              clearable
              class="mx-8 shrink"
            />
          </template>

          <v-date-picker
            v-model="endDate"
            :min="minDate"
          />
        </v-menu>

        <v-btn :disabled="!newFile" @click="createFile" fab class="ml-4">
          <v-icon>mdi-send</v-icon>
        </v-btn>
      </v-row>

      <UIAlert
        :show="isAlert"
        message="Недопустимый файл"
        type="error"
      />

      <v-row v-if="isFilesExist" class="mx-5">
        <h4 class="mr-4">Фильтр: </h4>
        <v-select
          v-model="fileType"
          :items="allTypes"
          label="Тип файла"
          outlined
          clearable
        />
      </v-row>

      <v-card v-if="userSettings.displaying === 'table' && isFilesExist" outlined>
        <v-card-text class="pt-10">
          <v-row
            v-for="f in filteredFolder.length ? filteredFolder : folder.files"
            :key="f.id"
          >
            <UIFolderName
              :file="f"
              @download="downloadFile"
              @update="updateFileName"
              @delete="deleteFile"
            />
          </v-row>
        </v-card-text>
      </v-card>

      <v-card v-if="userSettings.displaying === 'grid' && isFilesExist" outlined>
        <v-card-text class="pt-10">
          <v-row dense>
            <v-col
              v-for="f in filteredFolder.length ? filteredFolder : folder.files"
              :key="f.id"
              cols="4"
            >
              <v-card outlined>
                <v-card-text>
                  <UIFolderName
                    :file="f"
                    @download="downloadFile"
                    @update="updateFileName"
                    @delete="deleteFile"
                  />
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-col>
  </UIPage>
</template>

<script>
// Components
import UIPage from "../UIPage";
import UIFolderName from "./UIFolderName";
import UIAlert from "../UIAlert";

import { getFileExtension } from "../../factories/files.factory";

export default {
  name: "UIFolder",

  components: { UIAlert, UIFolderName, UIPage },

  props: {
    userSettings: { type: Object, required: true },
    folder: Object || null
  },

  data:() => ({
    isAlert: false,
    isMenuShow: false,

    fileType: "",
    fileName: "",

    newFile: null,
    endDate: null,

    rules: [
      value => !value || value.size < 20000000 ||
        'Максимальный размер одного файла 20Мб!'
    ],
    filteredFolder: []
  }),

  computed: {
    isFilesExist() {
      return this.folder.files && this.folder.files.length;
    },

    allTypes() {
      if (this.folder.files && this.folder.files.length) {
        const typesSet = new Set();
        const types = this.folder.files.map(file => getFileExtension(file.name));
        types.forEach(t => typesSet.add(t));

        return Array.from(typesSet);
      }
      return [];
    },

    minDate() {
      return (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000))
        .toISOString().substring(0, 10);
    }
  },

  watch: {
    fileType: {
      handler(newValue) {
        if (newValue) {
          this.filteredFolder = this.folder.files.filter(
            f => getFileExtension(f.name) === newValue
          );
        } else {
          this.filteredFolder = [];
        }
      }
    },

    endDate: {
      handler(newValue) {
        this.newFile.endDate = newValue;
      }
    }
  },

  methods: {
    createFile() {
      this.isAlert = false;

      if(getFileExtension(this.newFile.name).includes("php")) {
        this.isAlert = true;
        return;
      }

      this.$emit("create", this.newFile);
      this.newFile = null;
    },

    updateFileName(file) {
      this.$emit("update", file);
    },

    downloadFile(file) {
      const text = "Тысяча извинений за то, что способ скачать файл с его собственным содержимым " +
          "так и не нашёлся... Чтобы увидеть эту надпись, откройте скаченный файл через блокнот.";
      let a = document.createElement('a');
      a.setAttribute("href", `data:${file.type};charset=utf-8,` + text);
      a.setAttribute("download", file.name);
      a.click();
    },

    deleteFile(fileId) {
      this.$emit("delete", fileId);
    }
  }
}
</script>
