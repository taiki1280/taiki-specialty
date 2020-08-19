<template lang="pug">
h1 {{ title }}
</template>

<style lang="stylus" scoped>
h1
  flex()
  default(0.2, #000)
  margin 1vh 0
  height 8vh
  border solid
  border-width 2px 0
  div
    animation 1s appear
    @keyframes appear
      0%
        opacity 0
</style>


<script>
export default {
  computed: {
    title() {
      let json = require("~/assets/nav_menu.json");
      return json.filter((list) => list.link == this.$route.path)[0].title;
    },
  },
};
</script>

