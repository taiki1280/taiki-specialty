<template lang="pug">
div
  h1 pages/test
  h1 layout:"test"
  h2 全ページでnavmenuの隣接セレクタによるh1指定でflexbox適用されているためタイトルのh1のみは中央によっている
</template>

<script>
export default {
  layout: "test",
};
</script>

<style lang='stylus' scoped>
*
  background lightblue
</style>
