<template lang="pug">
.page
  .container
    Logo
    .links
      .green 
        div 製作者に纏わる
        div リンク
      a.button.grey(
        href="https://github.com/taiki1280",
        target="_blank",
        rel="noopener noreferrer"
      ) GitHub
      a.button.cyan(
        href="https://twitter.com/taiki_global",
        target="_blank",
        rel="noopener noreferrer"
      ) Twitter
  .container
    div json一つ目　{{ json[0] }}
    ul(
      v-for="(value, key) in json",
    )
      //- v-if="key > 0 && json[key - 1].日付 != value.日付"
      li {{ value.日付 }}
      li {{ value.更新項目 }}
      li {{ value.更新内容 }}
</template>

<style lang="stylus" scoped>
.container
  min-height 40vmax
  margin 1vh 0
  width 100%
  flex(space-evenly)
  flex-direction column
.links
  wh(90%, 10vmax)
  flex(space-evenly)
  background rgba(#fff, 0.8)
  border-radius 5vmin
  .button
    text-decoration none
    flex()
    wh(8vmax)
    border-radius 50%
    font-size 3vmin
  button(color)
    border 1px solid color
    color color
    padding 1vw
    &:hover
      background-color color
      color #fff
  .green
    button(green)
    div
      flex()
  .grey
    button(grey)
  .cyan
    button(cyan)
</style>

<script>
export default {
  data() {
    return {
      json: require("~/assets/update_content.json"),
    };
  },
};
</script>