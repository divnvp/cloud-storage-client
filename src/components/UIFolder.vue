<template>
  <UIPage>
    <v-col>
      <v-row>
        <v-file-input
          v-model="newFile"
          :rules="rules"
          show-size
          counter
          outlined
          label="Загрузить файл"
        />

        <v-menu
          v-model="isMenuShow"
          :close-on-content-click="false"
          transition="scale-transition"
          offset-y
          min-width="auto"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="endDate"
              label="Когда удалить файл?"
              readonly
              outlined
              clearable
              :disabled="!newFile"
              v-bind="attrs"
              v-on="on"
              class="mx-8 shrink"
            />
          </template>

          <v-date-picker
            v-model="endDate"
            :active-picker.sync="activePicker"
            :min="(new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000))
            .toISOString().substring(0, 10)"
          />
        </v-menu>

        <v-btn fab :disabled="!newFile" @click="createFile" class="ml-4">
          <v-icon>mdi-send</v-icon>
        </v-btn>
      </v-row>

      <UIAlert
        :show="isAlert"
        message="Недопустимый файл"
        type="error"
      />

      <v-row v-if="isFilesExist">
        <v-select
          v-model="fileType"
          :items="allTypes"
          outlined
          clearable
          label="Тип файла"
          class="mx-8"
        />
      </v-row>

      <v-row
        v-for="f in filteredFolder.length ? filteredFolder : folder.files"
        :key="f.id"
      >
        <UIFolderName
          :file="f"
          @download="downloadFile"
          @delete="deleteFile"
          @update="updateFileName"
        />
      </v-row>
    </v-col>
  </UIPage>
</template>

<script>
// Components
import UIPage from "./UIPage";
import UIFolderName from "./UIFolderName";
import UIAlert from "./UIAlert";

export default {
  name: "UIFolder",
  components: { UIAlert, UIFolderName, UIPage },
  props: {
    folder: { type: Object || null }
  },

  data:() => ({
    isAlert: false,
    isMenuShow: false,

    newFile: null,
    activePicker: null,
    endDate: null,

    fileType: "",
    fileName: "",

    rules: [
      value => !value || value.size < 20000000 ||
        'Максимальный размер одного файла 20Мб!'
    ],
    filteredFolder: []
  }),

  watch: {
    fileType: {
      handler(newValue) {
        if (newValue) {
          this.filteredFolder = this.folder.files.filter(f => f.name.split(".")[1] === newValue);
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

  computed: {
    isFilesExist() {
      return this.folder.files && this.folder.files.length;
    },

    allTypes() {
      if (this.folder.files && this.folder.files.length) {
        const typesSet = new Set();
        const types = this.folder.files.map(file => file.name.split(".")[1]);
        types.forEach(t => typesSet.add(t));

        return Array.from(typesSet);
      }
      return [];
    }
  },

  methods: {
    createFile() {
      this.isAlert = false;

      if(this.newFile.name.includes(".php")) {
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
