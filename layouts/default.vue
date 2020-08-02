<template>
  <div>
    <Nuxt />
  </div>
</template>

<style lang="sass">
html
  font-family: "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif
  font-size: 16px
  word-spacing: 1px
  -ms-text-size-adjust: 100%
  -webkit-text-size-adjust: 100%
  -moz-osx-font-smoothing: grayscale
  -webkit-font-smoothing: antialiased
  overflow: hidden

*,
*::before,
*::after
  box-sizing: border-box
  margin: 0

@mixin gradation($color_1:#fff,$color_2:#00bbff)
  background: linear-gradient(90deg,$color_2,$color_1,$color_2,)
body
  +gradation
</style>
