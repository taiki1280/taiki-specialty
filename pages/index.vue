<template>
  <div class="container">
    <h1 class="title">たいきのほ～むぺ～じ</h1>
    <Logo />
    <div class="links">
      <a
        href="https://github.com/taiki1280"
        target="_blank"
        rel="noopener noreferrer"
        class="button grey"
      >GitHub</a>
      <a
        href="https://twitter.com/taiki_global"
        target="_blank"
        rel="noopener noreferrer"
        class="button cyan"
      >Twitter</a>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({});
</script>

<style lang="sass">
.container
  min-height: 100vh
  display: flex
  flex-direction: column
  justify-content: space-evenly
  align-items: center

.title
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif
  display: block
  font-weight: 300
  font-size: (100vmin / 10) * 0.9
  color: #35495e
  letter-spacing: 1px

.links
  width: 90%
  height: (100vmax / 10)
  display: flex
  justify-content: space-around
  align-items: center
  background: rgba(#fff ,.8)
  border-radius: 5vmin
  .button
    text-decoration: none
    display: flex
    justify-content: center
    align-items: center
    height: (100vmax / 10) * 0.8
    width: (100vmax / 10) * 0.8
    border-radius: 50%
    &:hover
      color: #fff
  @mixin button($color)
    border: 1px solid $color
    color: $color
    &:hover
      background-color: $color
  .green
    +button(green)
  .grey
    +button(grey)
  .cyan
    +button(cyan)
</style>
