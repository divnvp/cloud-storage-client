<template>
  <v-dialog v-model="show" @keydown.esc="close" width="550px">
    <v-card :loading="loading">
      <v-card-title>
        Регистрация

        <v-spacer />

        <v-btn text style="font-size: 18px" @click="close">
          x
        </v-btn>
      </v-card-title>

      <v-card-text>
        <v-form @submit.prevent="record" v-model="valid">
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

          <v-text-field
            v-model="user.firstName"
            type="text"
            color="primary"
            :rules="formRules"
            label="Имя"
          />

          <v-text-field
            v-model="user.lastName"
            type="text"
            color="primary"
            :rules="formRules"
            label="Фамилия"
          />

          <v-alert v-if="error && !loading" dense text type="error">
            Неверное имя пользователя или пароль!
          </v-alert>

          <v-row fluid>
            <v-btn
              text
              color="primary"
              type="submit"
              :disabled="!valid"
              block
              large
            >
              Регистрация
            </v-btn>
          </v-row>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "UIRegistration",

  props: {
    show: { type: Boolean, required: true }
  },

  data:() => ({
    loading: false,
    valid: false,
    error: false,

    user: {
      username: "",
      password: "",
      firstName: "",
      lastName: ""
    },

    formRules: [v => !!v || "Это обязательное пое"],
  }),

  computed: {
    isUserFieldsExist() {
      return this.user.username && this.user.password &&
        this.user.firstName && this.user.lastName;
    }
  },

  methods: {
    record() {
      this.loading = true;
      this.error = false;
      if (!(this.isUserFieldsExist)) return;

      try {
        //
      } catch (e) {
        //
      }
    },

    close() {
      this.$emit("close");
    }
  }
}
</script>
