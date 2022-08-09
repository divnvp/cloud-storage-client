<template>
  <v-text-field
    v-model="fileName"
    outlined
    prepend-icon="mdi-file"
    append-icon="mdi-download"
    append-outer-icon="mdi-delete"
    @click:append-outer="deleteFile"
    @click:append="downloadFile"
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
          id: this.file.id,
          name: value
        });
      }
    }
  },

  methods: {
    downloadFile() {
      this.$emit("download", this.file);
    },

    deleteFile() {
      this.$emit("delete", this.file.id);
    }
  }
}
</script>
