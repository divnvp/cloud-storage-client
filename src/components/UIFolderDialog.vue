<template>
  <v-dialog v-model="show" max-width="480px">
    <template #activator="{on, attr}">
      <v-btn
        text
        style="font-size: 12px"
        v-bind="attr" v-on="on"
        class="my-2"
      >
        + Создать папку
      </v-btn>
    </template>

    <v-card :loading="loading">
      <v-card-title>
        Создать папку
      </v-card-title>

      <v-card-text>
        <v-text-field
          v-model="folderName"
          color="primary"
          label="Имя папки"
        />
      </v-card-text>

      <v-card-actions>
        <v-btn
          text
          color="error"
          @click="show = false"
        >
          Отмена
        </v-btn>

        <v-spacer />

        <v-btn
          text
          color="primary"
          :disabled="!folderName"
          @click="createFolder"
          @keydown.enter="createFolder"
        >
          Создать
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "UIFolderDialog",

  data:() => ({
    show: false,
    loading: false,

    folderName: ""
  }),

  methods: {
    createFolder() {
      this.$emit("create", this.folderName);
    }
  }
}
</script>
