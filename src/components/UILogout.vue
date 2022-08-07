<template>
  <v-dialog v-model="show" persistent max-width="480px">
    <template #activator="{on, attr}">
      <v-btn text v-bind="attr" v-on="on">
        Выйти
      </v-btn>
    </template>

    <v-card :loading="loading">
      <v-card-title>
        Выйти из хранилища?
      </v-card-title>

      <v-card-actions>
        <v-spacer />

        <v-btn color="primary" text @click="show = false">
          Остаться
        </v-btn>
        <v-btn color="error" text @click="logout">
          Да, выйти
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { logout } from "../../mocks/auth.mock";

export default {
  name: "UILogout",

  data:() => ({
    show: false,
    loading: false
  }),

  methods: {
    async logout() {
      try {
        await logout();
        this.show = false;
        this.$emit("logout");
      } catch (e) {
        //
      }
    }
  }
}
</script>
