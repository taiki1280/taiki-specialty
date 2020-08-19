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
    table.update_content
      tbody
        tr(v-for="(value, i) in json")
          //- 最初の日付と値がひとつ前と同じでないとき実行
          th(scope="col", v-if="i == 0 || value.日付 != json[i - 1].日付") {{ value.日付 }}
          td {{ value.更新項目 }}
          td {{ value.更新内容 }}
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
.update_content
  border-collapse collapse
  width 100%
  tr
    border-right solid 1px
    border-left solid 1px
    display flex
    flex-wrap wrap
    &:last-child
      border-bottom solid 1px
  th, td
    padding 1vh
    flex()
  th
    default(0.6, #000)
    border-top solid #000 1px
    border-bottom solid #000 1px
    font-size 6vmin
    width 100%
  td
    font-size 4vmin
    &:first-of-type
      default(0.6, #000)
      width 25%
    &:last-of-type
      default(0.6)
      width 75%
      justify-content left
</style>

<script>
export default {
  data() {
    return {
      json: require("~/assets/update_content.json").reverse(),
    };
  },
};
</script>