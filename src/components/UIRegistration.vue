<template>
  <v-dialog v-model="show" @keydown.esc="close" width="550px">
    <v-card :loading="loading">
      <v-card-title>
        Регистрация
      </v-card-title>

      <UIAlert
        :show="alert.show"
        :message="alert.message"
        :type="alert.type"
      />

      <v-card-text>
        <v-form @submit.prevent="record" v-model="valid">
          <v-text-field
            v-model="user.username"
            color="primary"
            :rules="formRules"
            label="Логин"
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
              color="error"
              @click="close"
            >
              Отмена
            </v-btn>

            <v-spacer />

            <v-btn
              text
              color="primary"
              type="submit"
              :disabled="!valid"
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
//Components
import UIAlert from "./UIAlert";

export default {
  name: "UIRegistration",
  components: { UIAlert },
  props: {
    show: { type: Boolean, required: true },
    users: { type: Array, required: true }
  },

  data:() => ({
    loading: false,
    valid: false,
    error: false,

    user: {
      username: "",
      password: "",
      firstName: "",
      lastName: "",
      folders: [],
      settings: {
        displaying: "table"
      }
    },
    alert: {
      show: false,
      message: "",
      type: ""
    },

    formRules: [v => !!v || "Это обязательное пое"],
  }),

  computed: {
    isUserFieldsExist() {
      return this.user.username && this.user.password &&
        this.user.firstName && this.user.lastName;
    },

    isUserExists() {
      return this.users.find(u =>
        u.username === this.user.username
      );
    }
  },

  methods: {
    async record() {
      this.loading = true;
      this.error = false;

      if (!(this.isUserFieldsExist)) return;

      if(this.isUserExists) {
        this.showAlert({
          message: "Пользователь с таким логином уже существует",
          type: "error"
        });
        return;
      }

      this.$emit("record", this.user);
      this.close();
    },

    showAlert(params) {
      this.alert.show = true;
      this.alert.message = params.message;
      this.alert.type = params.type;
    },

    close() {
      this.$emit("close");
    }
  }
}
</script>
