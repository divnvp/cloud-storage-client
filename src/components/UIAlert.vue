<template>
  <v-alert v-if="show" :type="type">
    {{ message }}
  </v-alert>
</template>

<script>
export default {
  name: "UIAlert",

  props: {
    show: { type: Boolean, required: true },
    message: { type: String, required: true },
    type: { type: String, required: true }
  }
}
</script>
