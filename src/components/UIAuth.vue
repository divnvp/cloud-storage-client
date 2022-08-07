<template>
  <v-dialog v-model="show" persistent width="460px">
    <v-card :loading="loading">
      <v-card-title>
        Авторизация
      </v-card-title>

      <v-card-text>
        <v-form @submit.prevent="auth" v-model="valid">
          <v-text-field
            v-model="user.username"
            color="primary"
            :rules="formRules"
            label="Имя пользователя"
          />

          <v-text-field
            v-model="user.password"
            type="password"
            color="primary"
            :rules="formRules"
            label="Пароль"
          />

          <v-alert v-if="error && !loading" dense text type="error">
            Неверное имя пользователя или пароль!
          </v-alert>

          <v-row fluid>
            <v-btn text color="primary" type="submit" :disabled="!valid">
              Войти в хранилище
            </v-btn>

            <v-spacer />

            <v-btn
              text
              color="primary"
              type="submit"
              :disabled="!valid"
              @click="showRegistration"
            >
              Регистрация
            </v-btn>
          </v-row>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script defer>
export default {
  name: "UIAuth",

  props: {
    show: { type: Boolean, required: true }
  },

  data: () => ({
    loading: false,
    valid: false,
    error: false,

    user: {
      username: "",
      password: ""
    },

    formRules: [v => !!v || "Это обязательное пое"],
  }),

  async mounted() {
    // await logout(); TODO
  },

  methods: {
    async auth() {
      this.loading = true;
      this.error = false;
      if (!(this.user.username && this.user.password)) return;

      try {
        // TODO
        if (this.user.username == "admin" && this.user.password == "admin") {
          this.$emit("close");
        }
      } catch (e) {
        this.error = true;
      } finally {
        this.loading = false;
      }
    },

    showRegistration() {
      this.$emit("close");
      this.$emit("registration");
    }
  }
}
</script>
