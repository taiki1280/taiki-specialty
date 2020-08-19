<template lang="pug">
#board
  ul(v-for="(values, row) in banmen", :key="row")
    li(
      v-for="(value, col) in values",
      :key="col",
      @click="selectOne(row, col, value)",
      :class="addLast(row, col)"
    )
      div(:class="addColor(row, col, value)") {{ set(value) }}
</template>
<script>
export default {
  props: {
    banmen: Array,
    game: String,
    addColor: Function,
    selectOne: Function,
    addLast: Function,
  },
  methods: {
    set(value) {
      switch (this.game) {
        case "Othello":
          return "";
        case "Shogi":
          if (value.length == 1) return "";
          else return value[3];
        default:
          return value;
      }
    },
  },
};
</script>

<style lang="stylus">
#board
  *
    box-sizing border-box
  ul, li
    flex()
    padding 0
    list-style none
  ul
    // 中身のみにボーダーを設定
    li
      border-top solid 0.5px
      border-left solid 0.5px
      &:last-of-type
        border-right solid 0.5px
    &:last-of-type
      border-bottom solid 0.5px
</style>