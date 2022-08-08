<template>
  <v-text-field
    v-model="fileName"
    :value="fileText"
    outlined
    prepend-icon="mdi-file"
    append-outer-icon="mdi-delete"
    @click:append-outer="deleteFile(fileId)"
  />
</template>

<script>
export default {
  name: "UIFolderName",
  props: {
    fileText: { type: String, required: true },
    fileId: { type: Number, required: true }
  },

  computed: {
    fileName: {
      get() {
        return this.fileText;
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
    deleteFile(fileId) {
      this.$emit("delete", fileId);
    }
  }
}
</script>
