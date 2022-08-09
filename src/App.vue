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
        @download="downloadFile"
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
import UILogout from "./components/UILogout.vue";
import UIAuth from "./components/UIAuth";
import UIRegistration from "./components/UIRegistration";
import UINavigation from "./components/UINavigation";
import UIFolder from "./components/UIFolder";

import { fetchUsers } from "../mocks/users.mock";
import { createFile } from "../mocks/files.mock";

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
    selectedFolder: null,
    time: new Date(),
    file: null,

    interval: -1
  }),

  computed: {
    isUsersExist() {
      return JSON.parse(localStorage.getItem("users"));
    }
  },

  watch: {
    time: {
      handler() {
        if (this.currentUser && this.currentUser.folders && this.currentUser.folders.length) {
          this.currentUser.folders.forEach(folder => {
            if (folder.files && folder.files.length) {
              folder.files.forEach(file => {
                if (file.endDate) {
                  if (new Date(this.time).getTime() > new Date(file.endDate).getTime()) {
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

      this.updateLocalStorage(this.users[index]);
    },

    async createFile(newFile) {
      if (!this.selectedFolder.files) {
        this.selectedFolder.files = [];
      }

      this.file = {
        id: this.selectedFolder.files.length ?
            this.selectedFolder.files[this.selectedFolder.files.length - 1].id + 1 :
            1,
        endDate: newFile.endDate,
        name: newFile.name,
        size: newFile.size,
        type: newFile.type
      }

      try {
        await createFile(this.file);

        this.selectedFolder.files.push(this.file);
        const index = this.users.findIndex(u => u.userId === this.currentUser.userId);
        this.users[index] = this.currentUser;

        this.updateLocalStorage();
      } catch (e) {
        //
      }
    },

    downloadFile(fileId) {
      console.log(fileId);
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
      localStorage.setItem("users", JSON.stringify(this.users));
      localStorage.setItem("currentUser", JSON.stringify(currentUser || this.currentUser));
    },

    logout() {
      localStorage.removeItem("currentUser");
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
        localStorage.setItem("currentUser", JSON.stringify(currentUser));
        this.currentUser = currentUser;
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
