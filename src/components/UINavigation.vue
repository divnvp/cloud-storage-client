<template>
  <v-navigation-drawer permanent>
    <v-list
      dense
      nav
    >
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>
            {{ fullName }}
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider />

      <UIFolderDialog @create="createFolder" />

      <v-list-item
        v-for="folder in user.folders"
        :key="folder.id"
        @click="$vuetify.goTo"
      >
        <v-list-item-icon>
          <v-icon>mdi-folder</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>
            {{ folder.name }}
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import UIFolderDialog from "./UIFolderDialog";

export default {
  name: "UINavigation",
  components: { UIFolderDialog },
  props: {
    user: { type: Object, required: true },
  },

  computed: {
    fullName() {
      return `${this.user.firstName} ${this.user.lastName}`
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
