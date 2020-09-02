<template lang="pug">
div
  #status
    p status
    //- p(v-for="(item, key) in status_list", :key="key")
    Number(:clicked="clicked")
    //- p p1_ans: {{ p1_ans }}
    //- p p2_ans: {{ p2_ans }}
    //- p p1_guess_num: {{ p1_guess_num }}
    //- p p2_guess_num: {{ p2_guess_num }}
    //- p p1_guess_list: {{ p1_guess_list }}
    //- p p2_guess_list: {{ p2_guess_list }}
    //- p test: {{ test }}
    //- p(v-if="p1_ans.length == 0") p1_ans: {{ p1_ans }}
    p(v-if="p2_ans.length == 0") １人目の入力をしてください。
    //- p(v-if="p2_ans.length == 0") p2_ans: {{ p2_ans }}
    //- p(v-else-if="p2_ans.length == 0") ２人目の入力をしてください。
    p(v-else) ２人目の入力をしてください。
  #main
    .guess_list.rotate
      p p2の予想リスト
      .result
        div(v-for="(item, key) in p2_guess_list", :key="key") {{ Object.keys(item).join(' ') }} : {{ Object.values(item)[0] }}
    Number(:clicked="clicked")
    .guess_list
      p p1の予想リスト
      .result
        div(v-for="(item, key) in p1_guess_list", :key="key") {{ Object.keys(item).join(' ') }} : {{ Object.values(item)[0] }}
</template>

<style lang="stylus" scoped>
#main
  height 100vh
  flex(space-evenly)
  flex-direction column
  .guess_list
    wh(100%, 30vh)
    // default(0.6, #fff)
    display flex
    flex-direction column
    justify-content flex-start
    align-items flex-start
    .result
      width 100%
      default(0.6)
      display flex
      flex-wrap wrap
      >div
        padding 1vw
        text-align center
</style>

<script>
export default {
  data() {
    return {
      p1_ans: [],
      p2_ans: [],
      p1_guess_num: [],
      p2_guess_num: [],
      p1_guess_list: [],
      p2_guess_list: [],
      turn: true,
      test: "ready",
    };
  },
  methods: {
    clicked(num) {
      // 参照渡しだと変わってしまうのでslice関数で値渡し
      if (this.p2_ans.length == 0) this.p2_ans = num.slice(0, num.length);
      else if (this.p1_ans.length == 0) this.p1_ans = num.slice(0, num.length);
      else if (this.judge(num.slice(0, num.length))) {
        let dict;
        dict = this.identify(num);
        if (this.turn) {
          this.p1_guess_num.push(num.slice(0, num.length));
          this.p1_guess_list.push(dict);
        } else {
          this.p2_guess_num.push(num.slice(0, num.length));
          this.p2_guess_list.push(dict);
        }
        this.turn = !this.turn;
      }
      // 入力終了時に値をリセット
      for (let i = 0; i < num.length; i++) num.splice(i, 1, i);
    },
    judge(num) {
      let list;
      if (this.turn) {
        list = this.p1_guess_num;
      } else {
        list = this.p2_guess_num;
      }
      for (const key in list) {
        const element = list[key];
        if (element == num) {
          this.test = num;
          break;
        } else {
          // this.test = "true";
          this.test = element;
        }
      }
      return true;
    },
    identify(num) {
      let eat = 0;
      let bite = 0;
      let ans;
      this.turn ? (ans = this.p1_ans) : (ans = this.p2_ans);
      for (let i = 0; i < num.length; i++) if (num[i] == ans[i]) eat++;
      for (let i = 0; i < num.length; i++)
        if (ans.indexOf(num[i]) != -1) bite++;
      bite -= eat;
      let str_num = num.join(" ");
      let result = `${eat}E${bite}B`;
      return { [str_num]: result };
    },
  },
};
</script>
