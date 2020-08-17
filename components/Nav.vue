<template lang="pug">
nav
  nuxt-link(
    v-for="(item, key) in json",
    :key="key",
    :to="item.link",
    :class="{ selected: item.link == $route.path }"
  ) {{ item.title }}
</template>

<style lang="stylus" scoped>
default(color)
  color color
  background rgba(invert(color) 0.9)
nav
  height 10vh
  flex()
  a
    default(#fff)
    font-size 6vmin
    height 10vh
    transition ease 0.7s
    flex-grow 1
    border-bottom solid 1px
    flex()
.selected
  default(#000)
  flex-grow 3
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