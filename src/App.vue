<template>
  <v-app>
    <v-app-bar app dense>
      <v-toolbar-title>
        Облачное хранилище
      </v-toolbar-title>

      <v-spacer />

      <UILogout />
    </v-app-bar>

    <v-main>
      <UINavigation />
      <UIMain :users="users" />
    </v-main>

    <UIAuth
      :show="isAuth"
      :users="users"
      @close="closeAuth"
      @registration="isRegistration = true"
    />
    <UIRegistration
      :show="isRegistration"
      @record="recordNewUser"
      @close="closeRegistration"
    />
  </v-app>
</template>

<script>
// Components
import UIMain from './components/UIMain';
import UILogout from "./components/UILogout.vue";
import UIAuth from "./components/UIAuth";
import UIRegistration from "./components/UIRegistration";
import UINavigation from "./components/UINavigation";

import { fetchUsers } from "../mocks/users.mock";

export default {
  name: 'App',

  components: {
    UINavigation,
    UIRegistration,
    UIAuth,
    UILogout,
    UIMain,
  },

  data: () => ({
    isRegistration: false,
    isAuth: true,

    users: []
  }),

  mounted() {
    this.getUsers();
  },

  methods: {
    async getUsers() {
      try {
        this.users = await fetchUsers();
      } catch (e) {
        //
      }
    },

    recordNewUser(newUser) {
      this.users.push(newUser);
    },

    closeRegistration() {
      this.isRegistration = false;
      this.isAuth = true;
    },

    closeAuth() {
      this.isAuth = false;
    }
  }
};
</script>
