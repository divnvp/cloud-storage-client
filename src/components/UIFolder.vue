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
        <v-text-field
          :value="f.name.split('.')[0]"
          outlined
          prepend-icon="mdi-file"
          append-icon="mdi-delete"
          append-outer-icon="mdi-content-save"
          @click:append="deleteFile(f.id)"
          @click:append-outer="saveFile"
        />
      </v-row>
    </v-col>
  </UIPage>
</template>

<script>
import UIPage from "./UIPage";
export default {
  name: "UIFolder",
  components: { UIPage },
  props: {
    folder: { type: Object || null }
  },

  data:() => ({
    newFile: null
  }),

  methods: {
    saveFile() {
      //
    },

    createFile() {
      this.$emit("create", this.newFile);
      this.newFile = null;
    },

    deleteFile(fileId) {
      this.$emit("delete", fileId);
    }
  }
}
</script>
