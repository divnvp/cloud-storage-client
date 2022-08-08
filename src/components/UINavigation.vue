<template>
  <v-navigation-drawer app permanent>
    <v-list
      v-if="user"
      dense
      nav
    >
      <v-list-item two-line>
        <v-list-item-content>
          <v-list-item-title>
            {{ fullName }}
          </v-list-item-title>

          <v-list-item-subtitle>
            {{ fullSize || 0 }} B
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider />

      <UIFolderDialog @create="createFolder" :isAlert="isAlert" />

      <v-list-item-group
        v-model="selectedFolder"
        active-class="deep-purple--text text--accent-4"
      >
        <v-list-item
          v-for="folder in user.folders"
          :key="folder.id"
          :value="folder"
          link
          two-line
        >
          <v-list-item-icon>
            <v-icon>mdi-folder</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>
              {{ folder.name }}
            </v-list-item-title>

            <v-list-item-subtitle>
              {{ getFolderSize(folder) || 0 }} B
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>

    <span v-else>
      Пользователь не найден
    </span>
  </v-navigation-drawer>
</template>

<script>
// Components
import UIFolderDialog from "./UIFolderDialog";

import { createFolder } from "../../mocks/folders.mock";

export default {
  name: "UINavigation",
  components: { UIFolderDialog },
  props: {
    user: { type: Object || null },
  },

  data:() => ({
    selectedFolder: null,

    isAlert: false
  }),

  computed: {
    fullName() {
      return `${this.user.firstName} ${this.user.lastName}`
    },

    fullSize() {
      if (this.user.folders.length) {
        const currentFiles = this.user.folders.map(fld => fld.files)[0];
        if (currentFiles) {
          return currentFiles.map(a => a.size).reduce((a, b) => a + b, 0);
        }
      }
     return 0;
    }
  },

  watch: {
    "selectedFolder": {
      handler(newValue) {
        if (newValue) {
          this.$emit("select", newValue);
        }
      }
    }
  },

  methods: {
    async createFolder(name) {
      this.isAlert = false;

      if (!!this.user.folders.length && this.user.folders.find(f => f.name === name)) {
        this.isAlert = true;
        return;
      }

      const folder = {
        name,
        id: this.user.folders.length ?
          this.user.folders[this.user.folders.length - 1].id + 1 :
          1
      }

      this.user.folders.push(folder);
      this.$emit("create", this.user);

      try {
        await createFolder(folder);
      } catch (e) {
        //
      }
    },

    getFolderSize(folder) {
      if (folder.files) {
        const sizes = folder.files.map(file => file.size);
        return sizes.reduce((a, b) => a + b, 0);
      }
    }
  }
}
</script>
