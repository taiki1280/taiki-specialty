<template lang="pug">
#Speed
  #main
    .serve.p2.rotate(:class="{ invisible: turn || !judge_can_serve }")
      button(@click="serve_p2()") バトルゾーンに出す。
    div
      ul.rotate
        li.p2(
          v-for="(value, key) in p2_hand",
          :key="key",
          @click="select_one(value)"
        )
          div {{ value }}
      ul
        li
          div
            p.p1 残り
            p.p1 {{ p1_mountain.length }}枚
        li(:class="add_class(field.p1)")
          div
            p.rotate {{ field.p1 }}
            p {{ field.p1 }}
        li(:class="add_class(field.p2)")
          div
            p.rotate {{ field.p2 }}
            p {{ field.p2 }}
        li
          .rotate
            p.p2 残り
            p.p2 {{ p2_mountain.length }}枚
      ul
        li.p1(
          v-for="(value, key) in p1_hand",
          :key="key",
          @click="select_one(value)"
        )
          div {{ value }}
    .serve.p1(:class="{ invisible: !turn || !judge_can_serve }")
      button(@click="serve_p1()") バトルゾーンに出す。
  #status
    ul
      li {{ status }}
      li p1山札{{ mountain.p1.slice(4) }}
      li p2山札{{ mountain.p2.slice(4) }}
      li p1手札{{ p1_hand }}
      li p2手札{{ p2_hand }}
      li p1バトルゾーン{{ field.p1 }}
      li p2バトルゾーン{{ field.p2 }}
</template>


<style lang="stylus" scoped>
#main
  height 100vh
  flex(space-evenly)
  flex-direction column
  div, p, button
    user-select none
  @media screen and (orientation portrait)
    height 100vh
    margin auto
  ul
    padding 0
    list-style none
    display flex
    li
      width 10vw
      height 10vw
      margin 0.5vw
      display flex
      justify-content center
      align-items center
      background #fff
      border #000 solid 0.5px
      border-radius 2vw
      div
        font-size 5vw
      p
        font-size 3vw
      @media screen and (orientation portrait)
        width 20vw
        height 20vh
        margin 1vh
        div
          font-size 7vw
        p
          font-size 8vw
  .p1
    color #000
  .p2
    color #f00
  .serve
    justify-content center
    margin auto
    button
      wh(90vw, 12vh)
      @media screen and (orientation portrait)
        font-size 6vw
  .invisible
    opacity 0
#status
  display none
</style>

<script>
// shuffleメソッド
function shuffle([...array]) {
  for (let i = array.length - 1; i >= 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
// 重複確認するメソッド
function getIsDuplicate(arr1, arr2) {
  return (
    [...arr1, ...arr2].filter(
      (item) => arr1.includes(item) && arr2.includes(item)
    ).length > 0
  );
}
export default {
  data() {
    return {
      mode_lists: [],
      mode: "",
      status: "",
      mountain: { p1: [], p2: [] },
      field: { p1: "♠♣", p2: "♥♦" },
      turn: true,
    };
  },
  created() {
    this.mode_lists = [
      ["CPU", "CPUと対戦"],
      ["local", "ローカル対人"],
    ];
    this.mode = "local";
    this.status = "ゲームを開始してください";
    for (let i = 1; i <= 13; i++) {
      this.mountain.p1.push("♠" + i);
      this.mountain.p1.push("♣" + i);
      this.mountain.p2.push("♥" + i);
      this.mountain.p2.push("♦" + i);
    }
    this.mountain.p1 = shuffle(this.mountain.p1);
    this.mountain.p2 = shuffle(this.mountain.p2);
  },
  computed: {
    p1_hand() {
      let hand_list = [];
      for (let i = 1; i <= 4; i++)
        if (this.mountain.p1[i - 1] != null)
          hand_list.push(this.mountain.p1[i - 1]);
      return hand_list;
    },
    p2_hand() {
      let hand_list = [];
      for (let i = 1; i <= 4; i++)
        if (this.mountain.p2[i - 1] != null)
          hand_list.push(this.mountain.p2[i - 1]);
      return hand_list;
    },
    p1_mountain() {
      return this.mountain.p1.slice(3, -1);
    },
    p2_mountain() {
      return this.mountain.p2.slice(3, -1);
    },
    judge_can_serve() {
      let num1 = parseInt(this.field.p1.replace(/[^0-9]/g, ""));
      let num2 = parseInt(this.field.p2.replace(/[^0-9]/g, ""));
      let num_list = [num1 - 1, num1 + 1, num2 - 1, num2 + 1];
      if (num_list.includes(14)) num_list[num_list.indexOf(14)] = 1;
      if (num_list.includes(0)) num_list[num_list.indexOf(0)] = 13;
      let str_hand_list = this.p1_hand.concat(this.p2_hand);
      let hand_list = [];
      for (let num in str_hand_list)
        hand_list.push(parseInt(str_hand_list[num].replace(/[^0-9]/g, "")));
      return !getIsDuplicate(num_list, hand_list);
    },
  },
  methods: {
    serve() {
      if (this.mountain.p1.length > 4)
        this.field.p1 = this.mountain.p1.splice(4, 1)[0];
      else this.field.p1 = this.mountain.p1.splice(Math.random(4), 1)[0];
      if (this.mountain.p2.length > 4)
        this.field.p2 = this.mountain.p2.splice(4, 1)[0];
      else this.field.p2 = this.mountain.p2.splice(Math.random(4), 1)[0];
      this.turn = !this.turn;
    },
    serve_p1() {
      if (this.turn && this.judge_can_serve) this.serve();
    },
    serve_p2() {
      if (!this.turn && this.judge_can_serve) this.serve();
    },
    select_one(value) {
      // 文字列の数値以外を置換(数値のみ取り出す)
      let num = parseInt(value.replace(/[^0-9]/g, ""));
      let field_p1_num = parseInt(this.field.p1.replace(/[^0-9]/g, ""));
      let field_p2_num = parseInt(this.field.p2.replace(/[^0-9]/g, ""));
      let can_serve = [];
      can_serve.push(num - 1, num + 1);
      if (can_serve.includes(14)) can_serve[can_serve.indexOf(14)] = 1;
      if (can_serve.includes(0)) can_serve[can_serve.indexOf(0)] = 13;
      // どっちにも出せる場合はランダムで選択
      if (can_serve.includes(field_p1_num) && can_serve.includes(field_p2_num))
        Math.random(2) == 0 ? (this.field.p1 = value) : (this.field.p2 = value);
      // 片方にしか出せない場合は片方を選択
      else if (can_serve.includes(field_p1_num)) this.field.p1 = value;
      else if (can_serve.includes(field_p2_num)) this.field.p2 = value;
      if (
        can_serve.includes(field_p1_num) ||
        can_serve.includes(field_p2_num)
      ) {
        if (this.mountain.p1.includes(value)) {
          if (this.mountain.p1.length > 4) {
            this.mountain.p1.splice(
              this.mountain.p1.indexOf(value),
              1,
              this.mountain.p1[4]
            );
            this.mountain.p1.splice(4, 1);
          } else this.mountain.p1.splice(this.mountain.p1.indexOf(value), 1);
        } else {
          if (this.mountain.p2.length > 4) {
            this.mountain.p2.splice(
              this.mountain.p2.indexOf(value),
              1,
              this.mountain.p2[4]
            );
            this.mountain.p2.splice(4, 1);
          } else this.mountain.p2.splice(this.mountain.p2.indexOf(value), 1);
        }
      }
    },
    add_class(value) {
      if (["♥", "♦"].includes(value[0])) return "p2";
      else return "p1";
    },
  },
};
</script>