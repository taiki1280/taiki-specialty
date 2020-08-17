<template lang="pug">
h1 {{ title }}
</template>

<style lang="stylus" scoped>
h1
  flex()
  color #000
  background rgba(#fff 0.2)
  margin 1vh 0
  height 8vh
  border-top solid 2px
  border-bottom solid 2px
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

