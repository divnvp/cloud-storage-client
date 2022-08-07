<template>
  <UIPage>
    {{folder || "net"}}
  </UIPage>
</template>

<script>
import UIPage from "./UIPage";
export default {
  name: "UIFolder",
  components: { UIPage },
  props: {
    folder: { type: Object || null }
  },
}
</script>
