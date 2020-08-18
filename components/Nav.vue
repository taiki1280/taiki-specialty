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
    padding 0 1vw
    font-size 3vmin
    flex-grow 1
    height 10vh
    flex()
    @media screen and (orientation portrait)
      height 5vh
.nuxt-link-exact-active
  flex-grow 1.5
  font-size 6vmin
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