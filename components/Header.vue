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
  border-bottom solid 1px
  div
    flex()
    margin 1vmin
    img
      wh(7vmin)
  h1
    font-size 8vmin
</style>