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
          append-outer-icon="mdi-send"
          @click:append-outer="createFile"
        />
      </v-row>

      <UIAlert
        :show="isAlert"
        message="Недопустимый файл"
        type="error"
      />

<!--      <v-select-->
<!--        v-model="userModel.categoryId"-->
<!--        :label="label"-->
<!--        :items="getManagement(group) || categoryList"-->
<!--        :rules="categoryRules"-->
<!--        item-text="name"-->
<!--        item-value="id"-->
<!--        required-->
<!--      />-->
      <v-row>
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

    newFile: null,

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
    }
  },

  computed: {
    allTypes() {
      const typesSet = new Set();
      const types = this.folder.files.map(file => file.name.split(".")[1]);
      types.forEach(t => typesSet.add(t));

      return Array.from(typesSet);
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

    downloadFile(/*fileId*/) {
      // this.$emit("download", fileId);
    },

    deleteFile(fileId) {
      this.$emit("delete", fileId);
    }
  }
}
</script>
