<template>
  <v-app>
    <v-app-bar app dense>
      <v-toolbar-title>
        Облачное хранилище
      </v-toolbar-title>

      <v-spacer />

      <UILogout @logout="logout" />
    </v-app-bar>

    <UINavigation
      :user="currentUser"
      @create="createFolder"
      @select="selectFolder"
    />

    <v-main>
      <UIFolder
        v-if="selectedFolder"
        :folder="selectedFolder"
        @create="createFile"
      />
    </v-main>

    <UIAuth
      :show="isAuth"
      :users="users"
      @close="closeAuth"
      @registration="isRegistration = true"
    />
    <UIRegistration
      :show="isRegistration"
      :users="users"
      @record="recordNewUser"
      @close="closeRegistration"
    />
  </v-app>
</template>

<script>
// Components
import UILogout from "./components/UILogout.vue";
import UIAuth from "./components/UIAuth";
import UIRegistration from "./components/UIRegistration";
import UINavigation from "./components/UINavigation";
import UIFolder from "./components/UIFolder";

import { fetchUsers } from "../mocks/users.mock";

export default {
  name: 'App',

  components: {
    UIFolder,
    UINavigation,
    UIRegistration,
    UIAuth,
    UILogout,
  },

  data: () => ({
    isRegistration: false,
    isAuth: !JSON.parse(localStorage.getItem("currentUser")),

    users: [],
    currentUser: JSON.parse(localStorage.getItem("currentUser")) || null,
    selectedFolder: null
  }),

  computed: {
    isUsersExist() {
      return JSON.parse(localStorage.getItem("users"));
    }
  },

  created() {
    this.getUsers();
  },

  methods: {
    async getUsers() {
      try {
        if (this.isUsersExist) {
          this.users = JSON.parse(localStorage.getItem("users"));
        } else {
          this.users = await fetchUsers();
          localStorage.setItem("users", JSON.stringify(this.users));
        }
      } catch (e) {
        //
      }
    },

    recordNewUser(newUser) {
      newUser.userId = this.users[this.users.length - 1].userId + 1;
      this.users.push(newUser);

      localStorage.setItem("users", JSON.stringify(this.users));
      localStorage.removeItem("currentUser");
    },

    createFolder(user) {
      const index = this.users.findIndex(u => u.userId === user.userId);
      this.users[index] = user;

      localStorage.setItem("users", JSON.stringify(this.users));
      localStorage.setItem("currentUser", JSON.stringify(this.users[index]));
    },

    createFile(newFile) {
      this.selectedFolder.files.push({
        id: this.selectedFolder.files[this.selectedFolder.files.length - 1].id + 1,
        name: newFile.name,
        size: newFile.size,
        endDate: null
      });
      const index = this.users.findIndex(u => u.userId === this.currentUser.userId);
      this.users[index] = this.currentUser;

      localStorage.setItem("users", JSON.stringify(this.users));
      localStorage.setItem("currentUser", JSON.stringify(this.currentUser));
    },

    selectFolder(folder) {
      this.selectedFolder = folder;
    },

    logout() {
      localStorage.removeItem("currentUser");
      this.currentUser = null;

      this.isAuth = true;
    },

    closeRegistration() {
      this.isRegistration = false;
      this.isAuth = true;
    },

    closeAuth(currentUser) {
      if (currentUser) {
        localStorage.setItem("currentUser", JSON.stringify(currentUser));
        this.currentUser = currentUser;
      }
      this.isAuth = false;
    }
  }
};
</script>
