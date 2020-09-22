<template lang="pug">
#Othello
  #status
    ul
      li: label(v-for="(mode_list, key) in mode_lists", :key="key")
        input(type="radio", v-model="mode", :value="mode_list[0]")
        | {{ mode_list[1] }}
      li モード：{{ mode }}
      li 現状：{{ status }}
      li(v-if="result != ''") 結果：{{ result }}
      li 現在のターン：{{ now_turn }}
      li 次のターン：{{ next_turn }}
      li クリックされたポジション：{{ clicked_pos }}
      li 最後に置かれた：{{ last_pos }}
      li 裏返す場所：{{ can_turn_pos_list }}
      li 置ける場所：{{ can_put_list }}
      li 数のカウント：{{ cnt }}
      li: div ターン
      li 
        div(v-if="now_turn == 1", style="background:black;color:white") 黒のターン
        div(v-else) 白のターン
  #main
    //- button(@click="pass()") パスする
    Board(
      game="Othello",
      :selectOne="selectOne",
      :addColor="addColor",
      :addLast="addLast",
      :banmen="banmen"
    )
    //- button(@click="pass()") パスする
</template>

<style lang="stylus" scoped>
#main
  height 100vh
  flex(space-evenly)
  flex-direction column
  button
    height 10vh
    &:first-of-type
      transform rotateZ(-180deg)
    @media screen and (orientation landscape)
      width 20%
    @media screen and (orientation portrait)
      width 100%
  @media screen and (orientation landscape)
    flex-direction row
    #board
      border ridge 5vmin darkgreen
  >>> ul
    li
      li_size(8)
      background darkgreen
    .last
      background lightgreen
    .p1
      background black
    .p2
      background white
    .駒
      border-radius 50%
      width 80%
      height 80%
    .can_put_p1
      background rgba(black, 0.4)
      cursor pointer
    .can_put_p2
      background rgba(white, 0.4)
      cursor pointer
</style>

<script>
export default {
  layout: "board_game",
  data() {
    return {
      mode_lists: [
        ["CPU", "CPUと対戦"],
        ["local", "ローカル対人"],
      ],
      mode: "local",
      banmen: [
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
      ],
      now_turn: "",
      next_turn: "",
      can_turn_pos_list: [],
      status: "",
      clicked_pos: {
        row: -1,
        col: -1,
      },
      last_pos: {
        row: -1,
        col: -1,
      },
      can_put_list: [],
      cnt: {
        p0: 0,
        p1: 0,
        p2: 0,
      },
      result: "",
    };
  },
  created() {
    this.banmen[3].splice(3, 1, 2);
    this.banmen[3].splice(4, 1, 1);
    this.banmen[4].splice(4, 1, 2);
    this.banmen[4].splice(3, 1, 1);
    this.now_turn = 1;
    this.next_turn = 2;
  },
  methods: {
    pass() {
      this.status = "置かれました";
      this.now_turn == 1 ? this.now_turn++ : this.now_turn--;
      this.next_turn == 1 ? this.next_turn++ : this.next_turn--;
      this.at_least_can_piece_one();
      if (this.can_put_list.length == 0) {
        this.now_turn == 1 ? this.now_turn++ : this.now_turn--;
        this.next_turn == 1 ? this.next_turn++ : this.next_turn--;
        this.status = "おける場所がなかったのでパスされました。";
        // ２人ともパスになった時（ゲーム終了）
        this.at_least_can_piece_one();
        if (this.can_put_list.length == 0) {
          if (this.cnt.p1 == this.cnt.p2) this.result = "引き分け";
          else if (this.cnt.p1 > this.cnt.p2) this.result = "黒の勝ち";
          else this.result = "白の勝ち";
          this.status =
            "ゲームを終了しました。" +
            "黒：" +
            this.cnt.p1 +
            " 白：" +
            this.cnt.p2;
        }
      }
      if (this.now_turn == 2 && this.mode === "CPU") {
        let num = Math.floor(Math.random() * this.can_put_list.length);
        this.selectOne(this.can_put_list[num][0], this.can_put_list[num][1], 0);
      }
    },
    at_least_can_piece_one() {
      let p0 = 0,
        p1 = 0,
        p2 = 0;
      this.can_put_list = [];
      for (let i = 0; i < this.banmen.length; i++)
        for (let j = 0; j < this.banmen[i].length; j++) {
          if (this.banmen[i][j] === 0) {
            p0++;
            if (this.Check(i, j).length > 0) this.can_put_list.push([i, j]);
          } else if (this.banmen[i][j] === 1) p1++;
          else if (this.banmen[i][j] === 2) p2++;
        }
      this.cnt.p0 = p0;
      this.cnt.p1 = p1;
      this.cnt.p2 = p2;
    },
    addLast(row, col) {
      if (this.last_pos.row == row && this.last_pos.col == col) return "last";
      return "";
    },
    addColor(row, col, value) {
      let className = "駒";
      switch (value) {
        case 0:
          className += " p0";
          // 置くことが可能かどうかの判定
          if (this.Check(row, col).length > 0) {
            this.now_turn == 1
              ? (className += " can_put_p1")
              : (className += " can_put_p2");
          }
          break;
        case 1:
          className += " p1";
          break;
        case 2:
          className += " p2";
          break;
      }
      return className;
    },
    selectOne(row, col, value) {
      this.clicked_pos.row = row;
      this.clicked_pos.col = col;
      if (value == 0) {
        this.can_turn_pos_list = this.Check(row, col);
        if (this.can_turn_pos_list.length > 0) this.PutOne(row, col);
        else this.status = "置けませんでした。";
      } else this.status = "そこにはすでに駒があります。";
    },
    PutOne(row, col) {
      // this.banmen[row][col] = this.now_turn;
      this.banmen[row].splice(col, 1, this.now_turn);
      this.last_pos.row = row;
      this.last_pos.col = col;
      for (let i = 0; i < this.can_turn_pos_list.length; i++)
        this.banmen[this.can_turn_pos_list[i][0]].splice(
          this.can_turn_pos_list[i][1],
          1,
          this.now_turn
        );
      // ターン交代
      this.pass();
    },
    Check(row, col) {
      let can_turn_pos_list = [];
      if (row - 2 >= 0)
        can_turn_pos_list = can_turn_pos_list.concat(
          this.CheckUp(row - 1, col)
        );
      if (row - 2 >= 0 && col + 2 < 8)
        can_turn_pos_list = can_turn_pos_list.concat(
          this.CheckUpRight(row - 1, col + 1)
        );
      if (col + 2 < 8)
        can_turn_pos_list = can_turn_pos_list.concat(
          this.CheckRight(row, col + 1)
        );
      if (row + 2 < 8 && col + 2 < 8)
        can_turn_pos_list = can_turn_pos_list.concat(
          this.CheckRightDown(row + 1, col + 1)
        );
      if (row + 2 < 8)
        can_turn_pos_list = can_turn_pos_list.concat(
          this.CheckDown(row + 1, col)
        );
      if (row + 2 < 8 && col - 2 >= 0)
        can_turn_pos_list = can_turn_pos_list.concat(
          this.CheckDownLeft(row + 1, col - 1)
        );
      if (col - 2 >= 0)
        can_turn_pos_list = can_turn_pos_list.concat(
          this.CheckLeft(row, col - 1)
        );
      if (row - 2 >= 0 && col - 2 >= 0)
        can_turn_pos_list = can_turn_pos_list.concat(
          this.CheckLeftUp(row - 1, col - 1)
        );
      return can_turn_pos_list;
    },
    CheckUp(row, col) {
      let can_turn_pos_list = [];
      if (this.banmen[row][col] == this.next_turn)
        for (var i = row - 1, j = col; i >= 0; i--)
          if (this.banmen[i][j] == this.now_turn) {
            for (var k = i + 1, l = j; k <= row; k++)
              can_turn_pos_list.push([k, l]);
            break;
          } else if (this.banmen[i][j] == 0) break;
      return can_turn_pos_list;
    },
    CheckUpRight(row, col) {
      let can_turn_pos_list = [];
      if (this.banmen[row][col] == this.next_turn)
        for (let i = row - 1, j = col + 1; i >= 0 && j < 8; i--, j++)
          if (this.banmen[i][j] == this.now_turn) {
            for (let k = i + 1, l = j - 1; k <= row; k++, l--)
              can_turn_pos_list.push([k, l]);
            break;
          } else if (this.banmen[i][j] == 0) break;
      return can_turn_pos_list;
    },
    CheckRight(row, col) {
      let can_turn_pos_list = [];
      if (this.banmen[row][col] == this.next_turn)
        for (var i = row, j = col + 1; j < 8; j++)
          if (this.banmen[i][j] == this.now_turn) {
            for (var l = j - 1; l >= col; l--) can_turn_pos_list.push([row, l]);
            break;
          } else if (this.banmen[i][j] == 0) break;
      return can_turn_pos_list;
    },
    CheckRightDown(row, col) {
      let can_turn_pos_list = [];
      if (this.banmen[row][col] == this.next_turn)
        for (let i = row + 1, j = col + 1; i < 8; i++, j++)
          if (this.banmen[i][j] == this.now_turn) {
            for (let k = i - 1, l = j - 1; k >= row; k--, l--)
              can_turn_pos_list.push([k, l]);
            break;
          } else if (this.banmen[i][j] == 0) break;
      return can_turn_pos_list;
    },
    CheckDown(row, col) {
      let can_turn_pos_list = [];
      if (this.banmen[row][col] == this.next_turn)
        for (var i = row + 1, j = col; i < 8; i++)
          if (this.banmen[i][j] == this.now_turn) {
            for (var k = i - 1, l = j; k >= row; k--)
              can_turn_pos_list.push([k, l]);
            break;
          } else if (this.banmen[i][j] == 0) break;
      return can_turn_pos_list;
    },
    CheckDownLeft(row, col) {
      let can_turn_pos_list = [];
      if (this.banmen[row][col] == this.next_turn)
        for (var i = row + 1, j = col - 1; i < 8; i++, j--)
          if (this.banmen[i][j] == this.now_turn) {
            for (var k = i - 1, l = j + 1; k >= row; k--, l++)
              can_turn_pos_list.push([k, l]);
            break;
          } else if (this.banmen[i][j] == 0) break;
      return can_turn_pos_list;
    },
    CheckLeft(row, col) {
      let can_turn_pos_list = [];
      if (this.banmen[row][col] == this.next_turn)
        for (var i = row, j = col - 1; j >= 0; j--)
          if (this.banmen[i][j] == this.now_turn) {
            for (var l = j + 1; l <= col; l++) can_turn_pos_list.push([row, l]);
            break;
          } else if (this.banmen[i][j] == 0) break;
      return can_turn_pos_list;
    },
    CheckLeftUp(row, col) {
      let can_turn_pos_list = [];
      if (this.banmen[row][col] == this.next_turn)
        for (var i = row - 1, j = col - 1; i >= 0; i--, j--)
          if (this.banmen[i][j] == this.now_turn) {
            for (var k = i + 1, l = j + 1; k <= row; k++, l++)
              can_turn_pos_list.push([k, l]);
            break;
          } else if (this.banmen[i][j] == 0) break;
      return can_turn_pos_list;
    },
  },
};
</script>