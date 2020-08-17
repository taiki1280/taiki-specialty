<template lang="pug">
div
  Header
  Nav
  main
    Title
    transition(name="page")
      Nuxt
</template>

<style lang="stylus">
main
  width 90%
  min-height 80vh
  display flex
  flex-direction column
  margin auto
  // background #ffffff
// ページ遷移アニメーション
.page-enter
  opacity 0
.page-enter-active
  transition opacity 1s

</style>