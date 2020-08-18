<template lang="pug">
div
  h2 俺のタイムライン
  a.twitter-timeline(
    data-lang="ja",
    width="100%",
    data-theme="dark",
    href="https://twitter.com/taiki_global?ref_src=twsrc%5Etfw"
  ) Tweets by taiki_global
  script(src="https://platform.twitter.com/widgets.js", charset="utf-8")
</template>

<style lang="stylus" scoped>
div > div
  background red
</style>