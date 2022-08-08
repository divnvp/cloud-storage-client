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
        </v-list-item-content>
      </v-list-item>

      <v-divider />

      <UIFolderDialog @create="createFolder" />

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
              {{ folder.size || 0 }} B
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
import UIFolderDialog from "./UIFolderDialog";

export default {
  name: "UINavigation",
  components: { UIFolderDialog },
  props: {
    user: { type: Object || null, required: true },
  },

  data:() => ({
    selectedFolder: null,
  }),

  computed: {
    fullName() {
      return `${this.user.firstName} ${this.user.lastName}`
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
    createFolder(name) {
      this.user.folders.push({
        name,
        id: this.user.folders[this.user.folders.length - 1].id + 1
      });

      this.$emit("create", this.user);
    }
  }
}
</script>
