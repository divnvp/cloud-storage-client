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

    <UIAuth />
  </v-app>
</template>

<script>
import UIMain from './components/UIMain';
import UILogout from "./components/UILogout.vue";
import UIAuth from "./components/UIAuth";

export default {
  name: 'App',

  components: {
    UIAuth,
    UILogout,
    UIMain,
  },
};
</script>
