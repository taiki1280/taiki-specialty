<template lang="pug">
div
  #main
    div(style="transform: rotateZ(180deg);") {{ status }} {{ turnDisp }}
    Board(
      game="OXGame",
      :selectOne="selectOne",
      :addColor="addColor",
      :addLast="addLast",
      :banmen="banmen"
    )
    div {{ status }} {{ turnDisp }}
</template>

<script>
export default {
  layout: "board_game",
  data() {
    return {
      banmen: [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""],
      ],
      turn: true,
      status: "",
      p1: "taiki",
      p2: "hoge",
      pos: { row: -1, col: -1 },
      finished: false,
    };
  },
  computed: {
    turnDisp() {
      return `現在は${this.checkPlayer()}さんのターンです。`;
    },
  },
  methods: {
    selectOne(row, col, value) {
      if (!this.finished)
        if (value == "") {
          this.turn ? (value = "◯") : (value = "✕");
          this.banmen[row].splice(col, 1, value);
          this.pos.row = row;
          this.pos.col = col;
          if (this.checkEnd(row, col)) {
            this.status = `${this.checkPlayer()}さんの勝利です。`;
            this.finished = true;
          } else this.turn = !this.turn;
        } else this.status = "既に置かれています。";
    },
    checkPlayer() {
      if (this.turn) return this.p1;
      return this.p2;
    },
    checkEnd(row, col) {
      // 横と縦の確認
      if (
        (this.banmen[row][0] == this.banmen[row][1] &&
          this.banmen[row][0] == this.banmen[row][2]) ||
        (this.banmen[0][col] == this.banmen[1][col] &&
          this.banmen[0][col] == this.banmen[2][col])
      )
        return true;
      // 斜めの判定
      if (this.banmen[1][1] != "")
        if (
          (this.banmen[0][0] == this.banmen[1][1] &&
            this.banmen[0][0] == this.banmen[2][2]) ||
          (this.banmen[0][2] == this.banmen[1][1] &&
            this.banmen[0][2] == this.banmen[2][0])
        )
          return true;
    },
    addColor() {},
    addLast(row, col) {
      if (this.pos.row == row && this.pos.col == col) return "last";
      return "";
    },
  },
};
</script>

<style lang="stylus" scoped>
#main
  height 100vh
  flex(space-evenly)
  flex-direction column
>>> #board
  .last
    background lightgreen
  li
    li_size(3)
</style>