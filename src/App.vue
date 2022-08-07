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
      <UIMain />
    </v-main>

    <UIAuth :show="isAuth" @close="closeAuth" @registration="isRegistration = true" />
    <UIRegistration :show="isRegistration" @close="closeRegistration" />
  </v-app>
</template>

<script>
import UIMain from './components/UIMain';
import UILogout from "./components/UILogout.vue";
import UIAuth from "./components/UIAuth";
import UIRegistration from "./components/UIRegistration";

export default {
  name: 'App',

  components: {
    UIRegistration,
    UIAuth,
    UILogout,
    UIMain,
  },

  data: () => ({
    isRegistration: false,
    isAuth: true
  }),

  methods: {
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
