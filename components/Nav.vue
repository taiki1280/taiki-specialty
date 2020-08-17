<template lang="pug">
nav
  nuxt-link(v-for="(item, key) in json", :key="key", :to="item.link") {{ item.title }}
</template>

<style lang="stylus" scoped>

nav
  height 10vh
  flex()
  a
    default(0.9)
    border-bottom solid 1px
    transition ease 0.7s
    height 10vh
    flex-grow 1
    flex()
.nuxt-link-exact-active
  font-size 6vmin
  default(0.9, #000)
  flex-grow 1.5
</style>

<script>
export default {
  data() {
    return {
      json: require("~/assets/nav_menu.json"),
    };
  },
};
</script>