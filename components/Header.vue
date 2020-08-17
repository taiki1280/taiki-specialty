<template lang="pug">
header
  nuxt-link(to="/") 
    div: img(src="/img/球体.png", alt="表示できませんでした。")
    h1 たいきのほ～むぺ～じ
    div: img(src="/img/球体.png", alt="表示できませんでした。")
</template>

<style lang="stylus" scoped>
a
  flex()
  color #fff
  background rgba(#000, 0.9)
  height 10vh
  border-bottom: solid 1px
  div
    flex()
    width 7vmin
    height @width
    margin 1vmin
    img
      width 100%
      height @width
  h1
    font-size 8vmin
    font-weight normal
    transition ease 0.7s
</style>