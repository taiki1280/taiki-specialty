<template>
  <div id="HasamiShogi">
    <div id="status">
      <p>
        <label v-for="(mode_list,key) in mode_lists" :key="key">
          <input type="radio" v-model="mode" :value="mode_list[0]" />
          {{mode_list[1]}}
        </label>
      </p>
      <p>モード：{{mode}}</p>
      <p>今のポジション 縦：{{now_pos.col}} 横：{{now_pos.row}} コマの選択：{{now_pos.selected}}</p>
      <p>現在の状態{{now_state}}</p>
      <p>現在は{{now_turn}}さんのターンです。</p>
      <p>次のポジション 縦：{{next_pos.col}} 横：{{next_pos.row}} コマの選択：{{next_pos.selected}}</p>
      <p>動かせる場所の一覧</p>
      <p>上{{can_move_pos_list.up}}</p>
      <p>左{{can_move_pos_list.left}}</p>
      <p>下{{can_move_pos_list.down}}</p>
      <p>右{{can_move_pos_list.right}}</p>
      <p>削除判定の場所</p>
      <p>上{{delete_pos_list.up}}</p>
      <p>左{{delete_pos_list.left}}</p>
      <p>下{{delete_pos_list.down}}</p>
      <p>右{{delete_pos_list.right}}</p>
    </div>
    <div id="main">
      <table>
        <caption></caption>
        <tr v-for="(value,col) in banmen" :key="col">
          <td
            v-for="(v,row) in value"
            :key="row"
            @click="select_now_one(col,row)"
            :class="add_id_for_color(v,col,row)"
          >
            <div :class="add_style(v)">{{set(v)}}</div>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      mode_lists: [
        ["CPU", "CPUと対戦"],
        ["local", "ローカル対人"],
      ],
      mode: "local",
      banmen: [
        [2, 2, 2, 2, 2, 2, 2, 2, 2],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
      ],
      now_pos: {
        col: -1,
        row: -1,
        selected: false,
      },
      next_pos: {
        col: -1,
        row: -1,
      },
      can_move_pos_list: {
        up: [],
        left: [],
        down: [],
        right: [],
      },
      delete_pos_list: {
        up: [],
        left: [],
        down: [],
        right: [],
      },
      now_state: "駒が選択されていません",
      now_turn: 1,
    };
  },
  methods: {
    add_id_for_color(v, col, row) {
      let result = "";
      // 一回目の入力か否か
      if (
        (this.now_pos.selected == false && v == this.now_turn) ||
        (this.now_pos.selected == true && this.judge_can_move(col, row))
      )
        result = "can_select";
      else if (
        this.now_pos.col == col &&
        this.now_pos.row == row &&
        v == this.now_turn
      )
        result = "now_select";
      if (col === this.next_pos.col && row === this.next_pos.row)
        result += " last";
      return result;
    },
    add_style(v) {
      let result = "";
      switch (v) {
        case 1:
          result = "color_blue";
          break;
        case 2:
          result = "color_red";
          if (this.mode === "local") result += " rotate";
          break;
      }
      return result;
    },
    set(num) {
      switch (num) {
        case 0:
          return "";
        case 1:
          return "歩";
        case 2:
          return "と";
      }
    },
    // 動かしたい駒の選択
    select_now_one(col, row) {
      // 駒を選択しているか確認
      if (!this.now_pos.selected) {
        this.now_pos.col = col;
        this.now_pos.row = row;
        if (this.banmen[col][row] == 0) {
          this.now_state = "そこに駒は存在しない。正しい駒を選択して下さい。";
        } else if (this.banmen[col][row] == this.now_turn) {
          this.now_pos.selected = true;
          this.make_can_move_list(col, row);
          this.now_state =
            "入力ありがとうございました。続いて移動先をクリックしてください。";
        } else {
          this.now_state =
            this.now_turn + "番のターンです。正しい駒を選択して下さい。";
        }
      } else {
        // 駒を選択済みの場合
        // 同じ駒が選択された場合は元に戻す
        if (this.now_pos.col === col && this.now_pos.row === row) {
          this.now_pos.selected = false;
          this.now_pos.col = -1;
          this.now_pos.row = -1;
          this.can_move_pos_list = { up: [], left: [], down: [], right: [] };
        } else {
          for (const i in this.can_move_pos_list)
            for (const j in this.can_move_pos_list[i])
              if (Object.keys(this.can_move_pos_list[i]).length > 0)
                if (
                  this.can_move_pos_list[i][j][0] === col &&
                  this.can_move_pos_list[i][j][1] === row
                ) {
                  this.next_pos.col = col;
                  this.next_pos.row = row;
                  this.move_one();
                }
        }
      }
    },
    // 動かせる場所の検索
    make_can_move_list(col, row) {
      // 上に動ける場所があるかどうかの確認
      for (let i = col - 1; i >= 0; i--)
        if (this.banmen[i][row] == 0) {
          this.can_move_pos_list.up.push([i, row]);
        } else {
          break;
        }
      // 左に動ける場所があるかどうかの確認
      for (let i = row - 1; i >= 0; i--)
        if (this.banmen[col][i] == 0) {
          this.can_move_pos_list.left.push([col, i]);
        } else {
          break;
        }
      // 下に動ける場所があるかどうかの確認
      for (let i = col + 1; i < 9; i++)
        if (this.banmen[i][row] == 0) {
          this.can_move_pos_list.down.push([i, row]);
        } else {
          break;
        }
      // 右に動ける場所があるかどうかの確認
      for (let i = row + 1; i < 9; i++)
        if (this.banmen[col][i] == 0) {
          this.can_move_pos_list.right.push([col, i]);
        } else {
          break;
        }
    },
    // 指定された場所が動けるかの判定
    judge_can_move(col, row) {
      for (const i in this.can_move_pos_list)
        for (const j in this.can_move_pos_list[i])
          if (
            this.can_move_pos_list[i][j][0] === col &&
            this.can_move_pos_list[i][j][1] === row
          ) {
            return true;
          }
      return false;
    },
    move_one() {
      // 移動前の指定場所と移動先の指定場所の値を入れ替える
      this.banmen[this.now_pos.col][this.now_pos.row] = 0;
      this.banmen[this.next_pos.col][this.next_pos.row] = this.now_turn;
      this.make_dead_list();
      this.delete_pos();
      // 次のターンへ
      this.now_pos.selected = false;
      this.now_turn === 1 ? (this.now_turn = 2) : (this.now_turn = 1);
      // 挟まれた駒がある場合は挟まれている駒を削除
      // 中身を初期化;
      this.can_move_pos_list = { up: [], left: [], down: [], right: [] };
      this.now_pos.col = -1;
      this.now_pos.row = -1;
      this.now_state = this.now_turn + "の番です。";
      if (this.now_turn === 2 && this.mode === "CPU") {
        this.rondom_cpu();
        this.now_turn = 1;
      }
    },
    // 挟まれた駒があるかを確認
    make_dead_list() {
      let col = this.next_pos.col;
      let row = this.next_pos.row;
      let you = this.now_turn;
      you === 1 ? you++ : you--;
      // 挟まれているかもしれないリスト
      let may_dead_list = [];
      if (col - 1 >= 0 && this.banmen[col - 1][row] === you) {
        if (col - 2 >= 0) {
          // 上に相手の駒があるかどうかの判定
          for (i = col - 2; i >= 0; i--)
            // 挟まれていない(駒なしに挟まれている)
            // 一番上の時まで相手の駒の時
            if (
              this.banmen[i][row] === 0 ||
              (this.banmen[i][row] === you && i === 0)
            ) {
              may_dead_list = [];
              break;
            } else if (this.banmen[i][row] === you) {
              may_dead_list.push([i + 1, row]);
            } else if (this.banmen[i][row] === this.now_turn) {
              may_dead_list.push([i + 1, row]);
              break;
            }
        }
        // 一番上の駒が角と挟まれている場合
        if (col == 1) {
          i = row;
          // 一番左の要素に焦点を合わせる
          while (this.banmen[0][i] != 0) {
            if (this.banmen[0][i] == this.now_turn) {
              i++;
              break;
            }
            if (i > 0) {
              i--;
            } else {
              break;
            }
          }
          if (i == 0 || this.banmen[0][i] == you) {
            while (
              this.banmen[0][i] == you &&
              this.banmen[1][i] == this.now_turn
            ) {
              may_dead_list.push([0, i]);
              i++;
            }
            if (i != 9 && this.banmen[0][i] != this.now_turn)
              may_dead_list = [];
          }
        }
        for (i = 0; i < may_dead_list.length; i++)
          this.delete_pos_list.left.push(may_dead_list[i]);
        may_dead_list = [];
        // 左端もしくは右端で角で挟まれている時
        // 一個上から確認（上と右上(row == 0)または左上(row == 9 - 1)の値を順番に確認）
        let i = col - 1;
        if (row == 0 || row == 9 - 1) {
          let next_to_row = row == 0 ? 1 : 7;
          while (
            i >= 0 &&
            this.banmen[i][row] == you &&
            this.banmen[i][next_to_row] == this.now_turn
          ) {
            may_dead_list.push([i, row]);
            if (i > 0) {
              i--;
            } else {
              break;
            }
          }
          if (
            this.banmen[i][row] != you ||
            this.banmen[i][next_to_row] != this.now_turn
          )
            may_dead_list = [];
        }
        for (i = 0; i < may_dead_list.length; i++)
          this.delete_pos_list.up.push(may_dead_list[i]);
        may_dead_list = [];
      }
      // 左に相手の駒があるかどうかの確認
      if (row - 1 >= 0 && this.banmen[col][row - 1] === you) {
        if (row - 2 >= 0)
          for (i = row - 2; i >= 0; i--)
            if (
              this.banmen[col][i] === 0 ||
              (this.banmen[col][i] === you && i === 0)
            ) {
              may_dead_list = [];
              break;
            } else if (this.banmen[col][i] === you) {
              may_dead_list.push([col, i + 1]);
            } else if (this.banmen[col][i] === this.now_turn) {
              may_dead_list.push([col, i + 1]);
              break;
            }
        // 一番左の駒が角と挟まれている場合
        if (row == 1) {
          i = col;
          // 一番上の要素に焦点を合わせる
          while (this.banmen[i][0] != 0) {
            if (this.banmen[i][0] == this.now_turn) {
              i++;
              break;
            }
            if (i > 0) {
              i--;
            } else {
              break;
            }
          }
          if (i == 0 || this.banmen[i][0] == you) {
            while (
              i <= 9 - 1 &&
              this.banmen[i][0] == you &&
              this.banmen[i][1] == this.now_turn
            ) {
              may_dead_list.push([i, 0]);
              if (i < 9 - 1) {
                i++;
              } else {
                break;
              }
            }
            if (i != 9 - 1 && this.banmen[i][0] != this.now_turn)
              may_dead_list = [];
          }
        }
        for (i = 0; i < may_dead_list.length; i++)
          this.delete_pos_list.left.push(may_dead_list[i]);
        may_dead_list = [];
        // 上端もしくは下端で角で挟まれている時
        // 一個左から確認（左と左下(col == 0)または左上(col == 9 - 1)の値を順番に確認）
        let i = row - 1;
        if (col == 0 || col == 9 - 1) {
          let next_to_col = col == 0 ? 1 : 7;
          while (
            i >= 0 &&
            this.banmen[col][i] == you &&
            this.banmen[next_to_col][i] == this.now_turn
          ) {
            may_dead_list.push([col, i]);
            if (i > 0) {
              i--;
            } else {
              break;
            }
          }
          if (
            this.banmen[col][i] != you ||
            this.banmen[next_to_col][i] != this.now_turn
          )
            may_dead_list = [];
        }

        for (i = 0; i < may_dead_list.length; i++)
          this.delete_pos_list.left.push(may_dead_list[i]);
        may_dead_list = [];
      }
      // 下に相手の駒があるかどうかの確認
      if (col + 1 < 9 && this.banmen[col + 1][row] === you) {
        if (col + 2 < 9)
          for (i = col + 2; i < 9; i++)
            if (
              this.banmen[i][row] === 0 ||
              (this.banmen[i][row] === you && i === 9 - 1)
            ) {
              may_dead_list = [];
              break;
            } else if (this.banmen[i][row] === you) {
              may_dead_list.push([i - 1, row]);
            } else if (this.banmen[i][row] === this.now_turn) {
              may_dead_list.push([i - 1, row]);
              break;
            }

        if (col == 7) {
          i = row;
          // 一番左の要素に焦点を合わせる
          while (this.banmen[8][i] != 0) {
            if (this.banmen[8][i] == this.now_turn) {
              i++;
              break;
            }
            if (i > 0) {
              i--;
            } else {
              break;
            }
          }
          if (i == 0 || this.banmen[8][i] == you) {
            while (
              this.banmen[8][i] == you &&
              this.banmen[7][i] == this.now_turn
            ) {
              may_dead_list.push([8, i]);
              i++;
            }
            if (i != 9 && this.banmen[8][i] != this.now_turn)
              may_dead_list = [];
          }
        }
        for (i = 0; i < may_dead_list.length; i++)
          this.delete_pos_list.left.push(may_dead_list[i]);
        may_dead_list = [];
        // 上端もしくは下端で角で挟まれている時
        // 一個上から確認（上と右上(row == 0)または左上(row == 9 - 1)の値を順番に確認）
        let i = col + 1;
        if (row == 0 || row == 9 - 1) {
          let next_to_row = row == 0 ? 1 : 7;
          while (
            i <= 9 - 1 &&
            this.banmen[i][row] == you &&
            this.banmen[i][next_to_row] == this.now_turn
          ) {
            may_dead_list.push([i, row]);
            if (i < 9 - 1) {
              i++;
            } else {
              break;
            }
          }
          if (
            this.banmen[i][row] != you ||
            this.banmen[i][next_to_row] != this.now_turn
          )
            may_dead_list = [];
        }
        for (i = 0; i < may_dead_list.length; i++) {
          this.delete_pos_list.down.push(may_dead_list[i]);
        }
        may_dead_list = [];
      }
      // 右に相手の駒があるかどうかの確認
      if (row + 1 < 9 && this.banmen[col][row + 1] === you) {
        if (row + 2 < 9)
          for (i = row + 2; i < 9; i++)
            if (
              this.banmen[col][i] === 0 ||
              (this.banmen[col][i] === you && i === 9 - 1)
            ) {
              may_dead_list = [];
              break;
            } else if (this.banmen[col][i] === you) {
              may_dead_list.push([col, i - 1]);
            } else if (this.banmen[col][i] === this.now_turn) {
              may_dead_list.push([col, i - 1]);
              break;
            }
        if (row == 7) {
          i = col;
          // 一番上の要素に焦点を合わせる
          while (this.banmen[i][8] != 0) {
            if (this.banmen[i][8] == this.now_turn) {
              i++;
              break;
            }
            if (i > 0) {
              i--;
            } else {
              break;
            }
          }
          if (i == 0 || this.banmen[i][8] == you) {
            while (
              this.banmen[i][8] == you &&
              this.banmen[i][7] == this.now_turn
            ) {
              may_dead_list.push([i, 8]);
              if (i < 9 - 1) {
                i++;
              } else {
                break;
              }
            }
            if (i != 8 && this.banmen[i][8] != this.now_turn)
              may_dead_list = [];
          }
        }
        for (i = 0; i < may_dead_list.length; i++)
          this.delete_pos_list.left.push(may_dead_list[i]);
        may_dead_list = [];
        // 上端もしくは下端で角で挟まれている時
        // 一個上から確認（右と右下(col == 0)または右上(col == 9 - 1)の値を順番に確認）
        let i = row + 1;
        if (col == 0 || col == 9 - 1) {
          let next_to_col = col == 0 ? 1 : 7;
          while (
            i <= 9 - 1 &&
            this.banmen[col][i] == you &&
            this.banmen[next_to_col][i] == this.now_turn
          ) {
            may_dead_list.push([col, i]);
            if (i < 9 - 1) {
              i++;
            } else {
              break;
            }
          }
          if (
            this.banmen[col][i] != you ||
            this.banmen[next_to_col][i] != this.now_turn
          )
            may_dead_list = [];
        }

        for (i = 0; i < may_dead_list.length; i++) {
          this.delete_pos_list.right.push(may_dead_list[i]);
        }
      }
    },
    delete_pos() {
      for (const key in this.delete_pos_list) {
        if (this.delete_pos_list[key].length > 0) {
          for (const i in this.delete_pos_list[key]) {
            let col = this.delete_pos_list[key][i][0];
            let row = this.delete_pos_list[key][i][1];
            this.banmen[col][row] = 0;
          }
        }
      }
      this.delete_pos_list = { up: [], left: [], down: [], right: [] };
    },
    rondom_cpu() {
      let col = Math.floor(Math.random() * 9);
      let row = Math.floor(Math.random() * 9);
      while (!this.now_pos.selected && !this.judge_can_move(col, row)) {
        col = Math.floor(Math.random() * 9);
        row = Math.floor(Math.random() * 9);
        this.select_now_one(col, row);
      }
      this.make_can_move_list(col, row);
      let all_can_move_pos_list = [];
      for (const key in this.can_move_pos_list) {
        const elements = this.can_move_pos_list[key];
        if (elements.length > 0) {
          for (const i in elements) {
            const element = elements[i];
            all_can_move_pos_list.push(element);
          }
        }
      }
      let num = Math.floor(
        Math.random() * (all_can_move_pos_list.length - 1) + 1
      );
      if (num % 2 === 0) {
        this.next_pos.col = all_can_move_pos_list[num + 1][0];
        this.next_pos.row = all_can_move_pos_list[num][1];
      } else {
        this.next_pos.col = all_can_move_pos_list[num][0];
        this.next_pos.row = all_can_move_pos_list[num - 1][1];
      }
      this.move_one();
      this.now_pos.selected = false;
    },
  },
};
</script>

<style lang="stylus" scoped>
html, body
  overflow hidden
#HasamiShogi
  display flex
  flex-direction column
table
  background #F9C270
  border-collapse collapse
  border solid
  width 80vmin
  height 80vmin
  @media screen and (orientation portrait)
    width 100vmin
    height 100vmin
  td
    border solid 0.5px
    width (80vmin / 9)
    height (80vmin / 9)
    @media screen and (orientation portrait)
      width (100vmin / 9)
      height (100vmin / 9)
    div
      flex()
#status
  flex()
  flex-direction column
#main
  height 100vh
  flex(space-evenly)
.can_select
  background yellow
  cursor pointer
.now_select
  background gray
  cursor pointer
.color_red
  color red
.rotate
  transform rotateZ(180deg)
.color_blue
  color blue
.last
  background chartreuse
</style>