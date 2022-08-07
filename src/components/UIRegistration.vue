<template>
  <v-dialog v-model="show" @keydown.esc="close" width="550px">
    <v-card :loading="loading">
      <v-card-title>
        Регистрация
        <v-spacer />

        <v-btn text style="font-size: 18px" color="primary" @click="close">
          x
        </v-btn>
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
//Components
import UIAlert from "./UIAlert";

import { record } from "../../mocks/registration.mock";

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
      lastName: ""
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

      try {
        await record(this.user);
        this.$emit("record", this.user);

        this.close();
      } catch (e) {
        //
      }
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
