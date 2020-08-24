<template lang="pug">
nav
  nuxt-link(v-for="(item, key) in json", :key="key", :to="item.link") {{ item.title }}
</template>

<style lang="stylus" scoped>
nav
  flex()
  flex-wrap wrap
  a
    default(0.9)
    border-bottom solid 1px
    transition ease 0.7s
    padding 0 0.5vw
    flex-grow 1
    height 10vh
    min-width 7%
    flex()
    font-size 100%
    @media screen and (orientation portrait)
      height 5vh
      min-width 30%
.nuxt-link-exact-active
  font-size 150%
  flex-grow 2
  default(0.9, #000)
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