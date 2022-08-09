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

      <v-row
        v-for="f in folder.files"
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

    fileName: "",

    rules: [
      value => !value || value.size < 20000000 ||
        'Максимальный размер одного файла 20Мб!'
    ]
  }),

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
