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
          autofocus
          color="primary"
          label="Имя папки"
          @keydown.enter="createFolder"
        />

        <UIAlert :show="isAlert" message="Папка уже существует" type="error"/>
      </v-card-text>

      <v-card-actions>
        <v-btn
          text
          color="error"
          @click="close"
        >
          Отмена
        </v-btn>

        <v-spacer />

        <v-btn
          text
          color="primary"
          :disabled="!folderName"
          @click="createFolder"
        >
          Создать
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import UIAlert from "../UIAlert";
export default {
  name: "UIFolderDialog",
  components: { UIAlert },
  props: {
    isAlert: { type: Boolean, required: true }
  },

  data:() => ({
    show: false,
    loading: false,

    folderName: ""
  }),

  methods: {
    createFolder() {
      this.$emit("create", this.folderName);
      this.folderName = "";
      this.close();
    },

    close() {
      this.show = false;
    }
  }
}
</script>
