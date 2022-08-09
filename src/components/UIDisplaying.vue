<template>
  <div class="text-center">
    <v-select
      v-model="displaying"
      :items="items"
      :item-value="i => i.value"
      :item-text="i => i.title"
      label="Отобразить как"
      outlined
    />
  </div>
</template>

<script>
export default {
  name: "UIDisplaying",

  props: {
    value: { type: String, required: true }
  },

  data: () => ({
    items: [
      { title: 'Табличный', value: "table" },
      { title: 'Сетка', value: "grid" }
    ],
  }),

  computed: {
    displaying: {
      get() {
        return this.value;
      },

      set(newValue) {
        this.$emit("input", newValue);
      }
    },
  }
}
</script>
