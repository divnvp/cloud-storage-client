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
        @update="updateFileName"
        @delete="deleteFile"
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
import UILogout from "./components/auth/UILogout.vue";
import UIAuth from "./components/auth/UIAuth";
import UIRegistration from "./components/UIRegistration";
import UINavigation from "./components/UINavigation";
import UIFolder from "./components/folders/UIFolder";

import { fetchUsers } from "../mocks/users.mock";
import { createFile } from "../mocks/files.mock";
import { compareTwoDates } from "./factories/dates.factory";
import { getItem, removeItem, setItem } from "./factories/storage.factory";
import { makeRequest } from "./factories/web.factory";
import { createFolder } from "../mocks/folders.mock";
import { record } from "../mocks/registration.mock";

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
    isAuth: !getItem("currentUser"),

    users: [],
    currentUser: getItem("currentUser") || null,
    selectedFolder: null,
    time: new Date(),
    file: null,

    interval: -1
  }),

  computed: {
    isUsersExist() {
      return getItem("users");
    },

    hasCurrentUserFolders() {
      return this.currentUser && this.currentUser.folders && this.currentUser.folders.length;
    }
  },

  watch: {
    time: {
      handler() {
        if (this.hasCurrentUserFolders) {
          this.currentUser.folders.forEach(folder => {
            if (folder.files && folder.files.length) {
              folder.files.forEach(file => {
                if (file.endDate) {
                  if (compareTwoDates(this.time, file.endDate)) {
                    const index = folder.files.findIndex(f => f.id === file.id);
                    folder.files.splice(index, 1);

                    this.updateLocalStorage();
                  }
                }
              });
            }
          });
        }
      }
    }
  },

  created() {
    this.getUsers();
  },

  mounted() {
    this.changeTime();
  },

  methods: {
    async getUsers() {
      if (this.isUsersExist) {
        this.users = getItem("users");
      } else {
        this.users = await makeRequest(fetchUsers());
        setItem("users", this.users);
      }
    },

    recordNewUser(newUser) {
      newUser.userId = this.users[this.users.length - 1].userId + 1;
      this.users.push(newUser);

      setItem("users", this.users);
      removeItem("currentUser");

      makeRequest(record(newUser));
    },

    async createFolder(user) {
      const index = this.users.findIndex(u => u.userId === user.userId);
      this.users[index] = user;

      this.updateLocalStorage(this.users[index]);

      await makeRequest(createFolder(user.folder));
    },

    async createFile(newFile) {
      const { name, size, type, endDate } = newFile;

      if (!this.selectedFolder.files) {
        this.selectedFolder.files = [];
      }

      this.file = {
        id: this.selectedFolder.files.length ?
          this.selectedFolder.files[this.selectedFolder.files.length - 1].id + 1 :
          1,
        name,
        size,
        type,
        endDate
      }

      this.selectedFolder.files.push(this.file);
      const index = this.users.findIndex(u => u.userId === this.currentUser.userId);
      this.users[index] = this.currentUser;

      this.updateLocalStorage();

      await makeRequest(createFile(this.file));
    },

    updateFileName({ name, id }) {
      const file = this.selectedFolder.files.find(f => f.id === id);
      const fileType = file.name.split(".")[1];

      file.name = `${name}.${fileType}`;

      this.updateLocalStorage();
    },

    deleteFile(fileId) {
      const index = this.selectedFolder.files.findIndex(f => f.id === fileId);
      this.selectedFolder.files.splice(index, 1);

      this.updateLocalStorage();
    },

    selectFolder(folder) {
      this.selectedFolder = folder;
    },

    updateLocalStorage(currentUser) {
      setItem("users", this.users);
      setItem("currentUser", currentUser || this.currentUser);
    },

    logout() {
      removeItem("currentUser");
      this.currentUser = null;

      this.isAuth = true;
      this.selectedFolder = null;
    },

    closeRegistration() {
      this.isRegistration = false;
      this.isAuth = true;
    },

    closeAuth(currentUser) {
      if (currentUser) {
        setItem("currentUser", currentUser);
        this.currentUser = currentUser;
        location.reload();
      }
      this.isAuth = false;
    },

    changeTime() {
      this.interval = setInterval(
        () => (this.time = new Date()),
        1000
      );
    }
  }
};
</script>
