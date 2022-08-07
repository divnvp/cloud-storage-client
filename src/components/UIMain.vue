<template>
  <UIPage>

  </UIPage>
</template>

<script>
  import UIPage from "./UIPage";
  export default {
    name: 'UIMain',
    components: {UIPage},
    props: {
      users: { type: Array, required: true }
    },

    data: () => ({

    }),
  }
</script>
