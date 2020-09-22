<template lang="pug">
#Shogi
  #status
    ul
      li: label(v-for="(mode_list, key) in mode_lists", :key="key")
        input(type="radio", v-model="mode", :value="mode_list[0]")
        | {{ mode_list[1] }}
      li p1_持ち駒：{{ p1_holdings }}
      li p2_持ち駒：{{ p2_holdings }}
      li モード：{{ mode }}
      li 今のポジション 縦：{{ pos.now.col }} 横：{{ pos.now.row }}
      li コマの選択：{{ pos.now.selected }}
      li 選択されている駒データ：{{ pos.now.piece }}
      li 現状：{{ status }}
      li 現在は{{ now_turn }}さんのターンです。
      li 次のポジション 縦：{{ pos.last.col }} 横：{{ pos.last.row }} コマの選択：{{ pos.last.selected }}
      li 動かせる場所の一覧：{{ can_move_list }}
  #main
    div
      .holding
        ul: li 持ち駒
        ul
          li(v-if="Object.keys(p2_holdings).length == 0")
            div ありません
          li(v-for="(value, key) in p2_holdings", :key="key")
            div(
              :class="addClass(-1, -1, `p2_${key}`)",
              @click="selectOne(-1, -1, `p2_${key}`)"
            ) {{ key }}
            div x {{ value }}
      .turn_piece(
        :class="{ invisible: p2_invisible }",
        style="transform: rotateZ(180deg)"
      )
        p クリックで成 or 不成を選択してください。
        div
          button(@click="switch_toggle(turn_piece, '1')") {{ turn_piece ? '成' : '不成' }}
          button(@click="decide_select('1')") 決定
    Board(
      game="Shogi",
      :selectOne="selectOne",
      :addColor="addClass",
      :addLast="addLast",
      :banmen="banmen"
    )
    div
      .turn_piece(:class="{ invisible: p1_invisible }")
        p クリックで成 or 不成を選択してください。
        div
          button(@click="switch_toggle(turn_piece, '2')") {{ turn_piece ? '成' : '不成' }}
          button(@click="decide_select('2')") 決定
      .holding
        ul: li 持ち駒
        ul
          li(v-if="Object.keys(p1_holdings).length == 0")
            div ありません
          li(v-for="(value, key) in p1_holdings", :key="key")
            div(
              :class="addClass(-1, -1, `p1_${key}`)",
              @click="selectOne(-1, -1, `p1_${key}`)"
            ) {{ key }}
            div x {{ value }}
</template>

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
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
      ],
      pos: {
        now: {
          piece: "",
          col: -1,
          row: -1,
          selected: false,
        },
        last: {
          col: -1,
          row: -1,
        },
      },
      status: "駒が選択されていません",
      now_turn: "1",
      next_turn: "2",
      can_move_list: [],
      show_turn_piece: false,
      turn_piece: false,
      holding_list: {
        p1: { 歩: 0, 香: 0, 桂: 0, 銀: 0, 金: 0, 角: 0, 飛: 0 },
        p2: { 歩: 0, 香: 0, 桂: 0, 銀: 0, 金: 0, 角: 0, 飛: 0 },
      },
      test: "",
    };
  },
  created() {
    this.banmen[8].splice(0, 1, "p1_香車");
    this.banmen[8].splice(1, 1, "p1_桂馬");
    this.banmen[8].splice(2, 1, "p1_銀");
    this.banmen[8].splice(3, 1, "p1_金");
    this.banmen[8].splice(4, 1, "p1_王");
    this.banmen[8].splice(5, 1, "p1_金");
    this.banmen[8].splice(6, 1, "p1_銀");
    this.banmen[8].splice(7, 1, "p1_桂馬");
    this.banmen[8].splice(8, 1, "p1_香車");
    this.banmen[7].splice(1, 1, "p1_角");
    this.banmen[7].splice(7, 1, "p1_飛車");
    for (let i = 0; i <= 8; i++) this.banmen[6].splice(i, 1, "p1_歩");
    this.banmen[0].splice(0, 1, "p2_香車");
    this.banmen[0].splice(1, 1, "p2_桂馬");
    this.banmen[0].splice(2, 1, "p2_銀");
    this.banmen[0].splice(3, 1, "p2_金");
    this.banmen[0].splice(4, 1, "p2_玉");
    this.banmen[0].splice(5, 1, "p2_金");
    this.banmen[0].splice(6, 1, "p2_銀");
    this.banmen[0].splice(7, 1, "p2_桂馬");
    this.banmen[0].splice(8, 1, "p2_香車");
    this.banmen[1].splice(7, 1, "p2_角");
    this.banmen[1].splice(1, 1, "p2_飛車");
    for (let i = 0; i <= 8; i++) this.banmen[2].splice(i, 1, "p2_歩");
  },
  computed: {
    p1_holdings() {
      let obj = {};
      for (const key in this.holding_list.p1)
        if (this.holding_list.p1[key] != 0)
          obj[key] = this.holding_list.p1[key];
      return obj;
    },
    p2_holdings() {
      let obj = {};
      for (const key in this.holding_list.p2)
        if (this.holding_list.p2[key] != 0)
          obj[key] = this.holding_list.p2[key];
      return obj;
    },
    p1_invisible() {
      if (this.next_turn == "1") return true;
      else return !this.show_turn_piece;
    },
    p2_invisible() {
      if (this.next_turn == "2") return true;
      else return !this.show_turn_piece;
    },
  },
  methods: {
    selectOne(row, col, value) {
      // 動かす駒
      // 未選択時
      if (!this.pos.now.selected)
        if (value[1] == this.now_turn) {
          this.can_move_list = this.checkPiece(row, col, value);
          this.status = value[3] + "が選択されました。";
          this.pos.now.piece = value;
          this.pos.now.row = row;
          this.pos.now.col = col;
          if (this.can_move_list.length > 0) this.pos.now.selected = true;
          else
            this.status = "動ける場所のない駒です。他の駒を選択してください。";
        } else this.status = "自分の駒を選択するか、持ち駒を選択してください。";
      // 選択済みの時
      else {
        // 同じ駒を選んだときは元に戻す
        if (this.pos.now.row == row && this.pos.now.col == col)
          this.pos.now.selected = false;
        else if (this.pos.now.row == -1 && this.pos.now.col == -1) {
          for (let i = 0; i < this.can_move_list.length; i += 2)
            if (
              this.can_move_list[i] == row &&
              this.can_move_list[i + 1] == col
            ) {
              this.holding_list[`p${this.now_turn}`][this.pos.now.piece[3]]--;
              this.banmen[row].splice(col, 1, this.pos.now.piece);
              this.status = "持ち駒が置かれました。";
              this.pos.now.selected = false;
              this.pos.last.row = row;
              this.pos.last.col = col;
              this.changeTurn();
            }
        } else {
          for (let i = 0; i < this.can_move_list.length; i += 2) {
            if (
              this.can_move_list[i] == row &&
              this.can_move_list[i + 1] == col
            ) {
              // 置く場所に相手の駒があった時
              if (this.banmen[row][col] != 0)
                this.getPiece(this.banmen[row][col][3]);
              this.banmen[row].splice(col, 1, this.pos.now.piece);
              this.banmen[this.pos.now.row].splice(this.pos.now.col, 1, 0);
              this.status = "駒が置かれました。";
              this.pos.now.selected = false;
              this.pos.last.row = row;
              this.pos.last.col = col;
              if (
                (this.now_turn == "1" && row <= 2) ||
                (this.now_turn == "1" && this.pos.now.row <= 2) ||
                (this.now_turn == "2" && row >= 6) ||
                (this.now_turn == "2" && this.pos.now.row >= 6)
              ) {
                if (
                  (row <= 1 || row >= 7) &&
                  ["香", "桂"].includes(this.pos.now.piece[3])
                ) {
                  this.turnPiece(this.pos.now.piece[3]);
                  this.banmen[row].splice(col, 1, this.pos.now.piece);
                  this.show_turn_piece = false;
                  this.now_turn == "1"
                    ? (this.now_turn = "2")
                    : (this.now_turn = "1");
                } else {
                  switch (this.pos.now.piece[3]) {
                    case "歩":
                    case "角":
                    case "飛":
                      this.turnPiece(this.pos.now.piece[3]);
                      this.banmen[row].splice(col, 1, this.pos.now.piece);
                      this.changeTurn();
                      break;
                    case "香":
                    case "桂":
                    case "銀":
                      this.show_turn_piece = true;
                      this.now_turn = "0";
                      break;
                    default:
                      this.changeTurn();
                  }
                }
              } else this.changeTurn();
            }
          }
        }
      }
    },
    changeTurn() {
      if (this.now_turn == "1") {
        this.now_turn = "2";
        this.next_turn = "1";
      } else {
        this.now_turn = "1";
        this.next_turn = "2";
      }
    },
    decide_select(value) {
      if (this.next_turn == value && this.show_turn_piece) {
        this.show_turn_piece = false;
        // 不成 or 成選択時に一時的にnow_turnは0になるためnext_turnでnow_turnを決める
        if (this.next_turn == "1") {
          this.now_turn = "1";
          this.next_turn = "2";
        } else {
          this.now_turn = "2";
          this.next_turn = "1";
        }
      }
    },
    switch_toggle(value, value_turn) {
      if (this.next_turn == value_turn && this.show_turn_piece) {
        this.turn_piece = !value;
        let row = this.pos.last.row;
        let col = this.pos.last.col;
        switch (this.pos.now.piece[3]) {
          case "香":
            this.pos.now.piece = this.pos.now.piece.replace("香", "杏");
            break;
          case "杏":
            this.pos.now.piece = this.pos.now.piece.replace("杏", "香");
            break;
          case "桂":
            this.pos.now.piece = this.pos.now.piece.replace("桂", "圭");
            break;
          case "圭":
            this.pos.now.piece = this.pos.now.piece.replace("圭", "桂");
            break;
          case "銀":
            this.pos.now.piece = this.pos.now.piece.replace("銀", "全");
            break;
          case "全":
            this.pos.now.piece = this.pos.now.piece.replace("全", "銀");
            break;
        }
        this.banmen[row].splice(col, 1, this.pos.now.piece);
      }
    },
    getPiece(v) {
      switch (v) {
        case "と":
          this.holding_list[`p${this.now_turn}`]["歩"]++;
          break;
        case "杏":
          this.holding_list[`p${this.now_turn}`]["香"]++;
          break;
        case "圭":
          this.holding_list[`p${this.now_turn}`]["桂"]++;
          break;
        case "全":
          this.holding_list[`p${this.now_turn}`]["銀"]++;
          break;
        case "馬":
          this.holding_list[`p${this.now_turn}`]["角"]++;
          break;
        case "竜":
          this.holding_list[`p${this.now_turn}`]["飛"]++;
          break;
        default:
          this.holding_list[`p${this.now_turn}`][v]++;
          break;
      }
    },
    turnPiece() {
      switch (this.pos.now.piece[3]) {
        case "角":
          this.pos.now.piece = this.pos.now.piece.replace("角", "馬");
          break;
        case "飛":
          this.pos.now.piece = this.pos.now.piece.replace("飛", "竜");
          break;
        case "歩":
          this.pos.now.piece = this.pos.now.piece.replace("歩", "と");
          break;
        case "香":
          this.pos.now.piece = this.pos.now.piece.replace("香", "杏");
          break;
        case "桂":
          this.pos.now.piece = this.pos.now.piece.replace("桂", "圭");
          break;
        case "銀":
          this.pos.now.piece = this.pos.now.piece.replace("銀", "全");
          break;
      }
    },
    checkPiece(row, col, value) {
      let list = [];
      if (row == -1 && col == -1) {
        // 二歩の制御
        if (value[3] == "歩") {
          for (let j = 0; j < 9; j++) {
            let i;
            for (i = 0; i < 9; i++) {
              if (
                this.banmen[i][j][1] == this.now_turn &&
                this.banmen[i][j][3] == "歩"
              )
                break;
            }
            if (i == 9)
              for (let k = 0; k < 9; k++)
                if (this.banmen[k][j] == 0) list.push(k, j);
          }
        } else if (value[3] == "桂") {
          if (value[1] == "1") {
            for (let i = 2; i < 9; i++)
              for (let j = 0; j < 9; j++)
                if (this.banmen[i][j] == 0) list.push(i, j);
          } else {
            for (let i = 0; i < 7; i++)
              for (let j = 0; j < 9; j++)
                if (this.banmen[i][j] == 0) list.push(i, j);
          }
        } else {
          for (let i = 0; i < 9; i++)
            for (let j = 0; j < 9; j++)
              if (this.banmen[i][j] == 0) list.push(i, j);
        }
      } else {
        // 自分の駒が選択されたとき
        let tmp = this.checkEnd(row, col, value);
        // 自分が含まれている場合は削除
        for (let i = 0; i < tmp.length; i += 2)
          if (this.banmen[tmp[i]][tmp[i + 1]][1] != this.now_turn)
            list.push(tmp[i], tmp[i + 1]);
      }
      return list;
    },
    checkEnd(row, col, value) {
      let list = [];
      switch (value[3]) {
        case "歩":
          this.now_turn == "1"
            ? (list = list.concat([row - 1, col]))
            : (list = list.concat([row + 1, col]));
          break;
        case "角":
        case "馬":
          // 左上全て
          for (let i = 1; row - i >= 0 && col - i >= 0; i++) {
            list = list.concat([row - i, col - i]);
            if (this.banmen[row - i][col - i] != 0) break;
          }
          // 左下全て
          for (let i = 1; row + i < 9 && col - i >= 0; i++) {
            list = list.concat([row + i, col - i]);
            if (this.banmen[row + i][col - i] != 0) break;
          }
          // 右上全て
          for (let i = 1; row - i >= 0 && col + i < 9; i++) {
            list = list.concat([row - i, col + i]);
            if (this.banmen[row - i][col + i] != 0) break;
          }
          // 右下全て
          for (let i = 1; row + i < 9 && col + i < 9; i++) {
            list = list.concat([row + i, col + i]);
            if (this.banmen[row + i][col + i] != 0) break;
          }
          // 馬ならば移動可能範囲を拡張
          if (value[3] == "馬") {
            // 上
            if (row - 1 >= 0) list = list.concat([row - 1, col]);
            // 下
            if (row + 1 < 9) list = list.concat([row + 1, col]);
            // 左
            if (col - 1 >= 0) list = list.concat([row, col - 1]);
            // 右
            if (col + 1 < 9) list = list.concat([row, col + 1]);
            break;
          }
          break;
        case "飛":
        case "竜":
          // 上全て
          for (let i = 1; row - i >= 0; i++) {
            list = list.concat([row - i, col]);
            if (this.banmen[row - i][col] != 0) break;
          }
          // 下全て
          for (let i = 1; row + i < 9; i++) {
            list = list.concat([row + i, col]);
            if (this.banmen[row + i][col] != 0) break;
          }
          // 左全て
          for (let i = 1; col - i >= 0; i++) {
            list = list.concat([row, col - i]);
            if (this.banmen[row][col - i] != 0) break;
          }
          // 右全て
          for (let i = 1; col + i < 9; i++) {
            list = list.concat([row, col + i]);
            if (this.banmen[row][col + i] != 0) break;
          }
          // 竜なら移動可能範囲を拡張
          if (value[3] == "竜") {
            // 左上
            if (row - 1 >= 0 && col - 1 >= 0)
              list = list.concat([row - 1, col - 1]);
            // 左下
            if (row + 1 < 9 && col - 1 >= 0)
              list = list.concat([row + 1, col - 1]);
            // 右上
            if (row - 1 >= 0 && col + 1 < 9)
              list = list.concat([row - 1, col + 1]);
            // 右下
            if (row + 1 < 9 && col + 1 < 9)
              list = list.concat([row + 1, col + 1]);
            break;
          }
          break;
        case "香":
          if (this.now_turn == "1") {
            // 上全て
            for (let i = 1; row - i >= 0; i++) {
              list = list.concat([row - i, col]);
              if (this.banmen[row - i][col] != 0) break;
            }
          } else {
            //反対から見たとき
            // 下全て
            for (let i = 1; row + i < 9; i++) {
              list = list.concat([row + i, col]);
              if (this.banmen[row + i][col] != 0) break;
            }
          }
          break;
        case "桂":
          if (this.now_turn == "1") {
            // 左上2
            if (row - 2 >= 0 && col - 1 >= 0)
              list = list.concat([row - 2, col - 1]);
            // 右上2
            if (row - 2 >= 0 && col + 1 < 9)
              list = list.concat([row - 2, col + 1]);
          } else {
            // 反対から見たとき
            // 左下2
            if (row + 2 < 9 && col - 1 >= 0)
              list = list.concat([row + 2, col - 1]);
            // 右下2
            if (row + 2 < 9 && col + 1 < 9)
              list = list.concat([row + 2, col + 1]);
          }
          break;
        case "銀":
          if (this.now_turn == "1") {
            // 左上
            if (row - 1 >= 0 && col - 1 >= 0)
              list = list.concat([row - 1, col - 1]);
            // 上
            if (row - 1 >= 0) list = list.concat([row - 1, col]);
            // 右上
            if (row - 1 >= 0 && col + 1 < 9)
              list = list.concat([row - 1, col + 1]);
            // 左下
            if (row + 1 < 9 && col - 1 >= 0)
              list = list.concat([row + 1, col - 1]);
            // 右下
            if (row + 1 < 9 && col + 1 < 9)
              list = list.concat([row + 1, col + 1]);
          } else {
            // 左下
            if (row + 1 < 9 && col - 1 >= 0)
              list = list.concat([row + 1, col - 1]);
            // 下
            if (row + 1 < 9) list = list.concat([row + 1, col]);
            // 右下
            if (row + 1 < 9 && col + 1 < 9)
              list = list.concat([row + 1, col + 1]);
            // 左上
            if (row - 1 >= 0 && col - 1 >= 0)
              list = list.concat([row - 1, col - 1]);
            // 右上
            if (row - 1 >= 0 && col + 1 < 9)
              list = list.concat([row - 1, col + 1]);
          }
          break;
        case "金":
        case "と":
        case "杏":
        case "圭":
        case "全":
          if (this.now_turn == "1") {
            // 左上
            if (row - 1 >= 0 && col - 1 >= 0)
              list = list.concat([row - 1, col - 1]);
            // 上
            if (row - 1 >= 0) list = list.concat([row - 1, col]);
            // 右上
            if (row - 1 >= 0 && col + 1 < 9)
              list = list.concat([row - 1, col + 1]);
            // 左
            if (col - 1 >= 0) list = list.concat([row, col - 1]);
            // 右
            if (col + 1 < 9) list = list.concat([row, col + 1]);
            // 下
            if (row + 1 < 9) list = list.concat([row + 1, col]);
          } else {
            // 右下
            if (row + 1 < 9 && col + 1 < 9)
              list = list.concat([row + 1, col + 1]);
            // 下
            if (row + 1 < 9) list = list.concat([row + 1, col]);
            // 左下
            if (row + 1 < 9 && col - 1 >= 0)
              list = list.concat([row + 1, col - 1]);
            // 左
            if (col - 1 >= 0) list = list.concat([row, col - 1]);
            // 右
            if (col + 1 < 9) list = list.concat([row, col + 1]);
            // 上
            if (row - 1 >= 0) list = list.concat([row - 1, col]);
          }
          break;
        case "王":
        case "玉":
          // 左上
          if (row - 1 >= 0 && col - 1 >= 0)
            list = list.concat([row - 1, col - 1]);
          // 上
          if (row - 1 >= 0) list = list.concat([row - 1, col]);
          // 右上
          if (row - 1 >= 0 && col + 1 < 9)
            list = list.concat([row - 1, col + 1]);
          // 右
          if (col + 1 < 9) list = list.concat([row, col + 1]);
          // 右下
          if (row + 1 < 9 && col + 1 < 9)
            list = list.concat([row + 1, col + 1]);
          // 下
          if (row + 1 < 9) list = list.concat([row + 1, col]);
          // 左下
          if (row + 1 < 9 && col - 1 >= 0)
            list = list.concat([row + 1, col - 1]);
          // 左
          if (col - 1 >= 0) list = list.concat([row, col - 1]);
          break;
      }
      return list;
    },
    addClass(row, col, value) {
      let className = "駒";
      // 動かす駒
      // 未選択時
      if (!this.pos.now.selected && value[3] != 0) {
        if (this.checkPiece(row, col, value).length > 0)
          if (this.now_turn == "1" && value[1] == "1")
            className += " can_select_p1";
          else if (this.now_turn == "2" && value[1] == "2")
            className += " can_select_p2";
      }
      // 選択済みの時
      // 選択された駒の移動可能先の特定
      else
        for (let i = 0; i < this.can_move_list.length; i += 2)
          if (this.can_move_list[i] == row && this.can_move_list[i + 1] == col)
            if (this.now_turn == "1") className += " can_select_p1";
            else if (this.now_turn == "2") className += " can_select_p2";
      if (value[1] == "1") className += " p1";
      else if (value[1] == "2") className += " p2";
      // 成の判定
      if (["馬", "竜", "と", "杏", "圭", "全"].includes(value[3]))
        className += " 成";
      // 最後に選択されたマス（移動先のマス）
      if (this.pos.last.row == row && this.pos.last.col == col)
        className += " last";
      return className;
    },
    addLast(row, col, value) {},
  },
};
</script>

<style lang="stylus" scoped>
#main
  height 100vh
  flex(space-evenly)
  flex-direction column
  @media screen and (orientation landscape)
    flex-direction row
    >>> #board
      border ridge 5vmin #f9c270
  > div
    &:first-of-type, &:last-of-type
      display flex
      flex-direction column
      justify-content space-evenly
      height 20vh
      width 90%
      @media screen and (orientation portrait)
        width 100%
      .holding
        flex()
        flex-direction column
        ul, li
          flex()
          padding 0
          list-style none
          width 100%
        ul
          li
            border solid 1px
        .駒
          li_size((9 / 0.8))
          + div
            li_size((9 / 0.8))
            flex()
        &:first-of-type
          transform rotateZ(180deg)
        .p2
          transform none
      .invisible
        opacity 0
      .turn_piece
        flex('space-evenly')
        flex-direction column
        width 100%
        height 10vh
        div
          width 100%
          display flex
          justify-content space-evenly
          height 5vh
          button
            width 20%
  >>> ul
    li
      background #f9c270
      li_size(9)
    .駒
      flex()
      width 80%
      height 80%
      border-radius 2vmin
    .p1, .p2
      border 1px solid
    .p2
      transform rotateZ(180deg)
    .can_select_p1
      background rgba(lighten(red, 45), 0.8)
      cursor pointer
    .can_select_p2
      background rgba(lighten(blue, 45), 0.8)
      cursor pointer
    .last
      background lightgreen
    .成
      color red
</style>