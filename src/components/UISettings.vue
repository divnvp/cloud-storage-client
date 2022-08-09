<template>
  <v-dialog v-model="show" max-width="480px">
    <template #activator="{on, attr}">
      <v-btn
        v-bind="attr" v-on="on"
        text
        block
        class="my-2"
        style="font-size: 12px"
      >
        Настройки
      </v-btn>
    </template>

    <v-card>
      <v-card-title>
        Настройки
      </v-card-title>

      <v-card-text>
        <UIDisplaying v-model="displaying" />
      </v-card-text>

      <v-card-actions>
        <v-btn text color="error" @click="show = false">
          Отменить
        </v-btn>

        <v-spacer />

        <v-btn text color="primary" @click="saveSetting()">
          Сохранить
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
// Components
import UIDisplaying from "./UIDisplaying";

export default {
  name: "UISettings",

  components: { UIDisplaying },

  data:() => ({
    show: false,

    displaying: "table"
  }),

  methods: {
    saveSetting() {
      this.$emit("save", this.displaying);
      this.show = false;
    }
  }
}
</script>
