<template>
  <UIPage>
    <v-col>
      <v-row>
        <v-file-input
          v-model="newFile"
          show-size
          counter
          outlined
          label="Загрузить файл"
          append-outer-icon="mdi-send"
          @click:append-outer="createFile"
        />
      </v-row>

      <v-row
        v-for="f in folder.files"
        :key="f.id"
      >
        <UIFolderName
          :file-id="f.id"
          :file-text="f.name.split('.')[0]"
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
export default {
  name: "UIFolder",
  components: { UIFolderName, UIPage },
  props: {
    folder: { type: Object || null }
  },

  data:() => ({
    newFile: null,

    fileName: ""
  }),

  methods: {
    createFile() {
      this.$emit("create", this.newFile);
      this.newFile = null;
    },

    updateFileName(file) {
      this.$emit("update", file);
    },

    deleteFile(fileId) {
      this.$emit("delete", fileId);
    }
  }
}
</script>
