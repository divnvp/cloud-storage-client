<template>
  <v-text-field
    v-model="fileName"
    outlined
    prepend-icon="mdi-file"
    append-icon="mdi-download"
    append-outer-icon="mdi-delete"
    @click:append-outer="deleteFile"
    @click:append="downloadFile(this)"
  />
</template>

<script>
export default {
  name: "UIFolderName",
  props: {
    file: { type: Object, required: true }
  },

  computed: {
    fileName: {
      get() {
        return this.file.name.split('.')[0];
      },
      set(value) {
        this.$emit("update", {
          id: this.fileId,
          name: value
        });
      }
    }
  },

  methods: {
    downloadFile(input) {
      // this.$emit("download", this.fileId);
      console.log(input);
    },

    deleteFile() {
      this.$emit("delete", Event);
    }
  }
}
</script>
