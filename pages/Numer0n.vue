<template lang="pug">
div
  #status
    p status
    //- p(v-for="(item, key) in status_list", :key="key")
    Number(:clicked="clicked")
    p p1_ans: {{ p1_ans }}
    p p2_ans: {{ p2_ans }}
    p p1_guess_num: {{ p1_guess_num }}
    p p2_guess_num: {{ p2_guess_num }}
    p p1_guess_num: {{ p1_guess_list }}
    p p2_guess_num: {{ p2_guess_list }}
    //- p(v-if="p1_ans.length == 0") p1_ans: {{ p1_ans }}
    //- p(v-if="p2_ans.length == 0") p2_ans: {{ p2_ans }}
  #main
    div(v-for="(item, key) in p1_guess_list", :key="key") {{ item }}
    Number(:clicked="clicked")
    div(v-for="(item, key) in p2_guess_list", :key="key") {{ item }}
</template>

<style lang="stylus" scoped>
#main
  height 100vh
  flex(space-evenly)
  flex-direction column
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
    };
  },
  methods: {
    clicked(num) {
      // 参照渡しだと変わってしまうのでslice関数で値渡し
      if (this.p1_ans.length == 0) this.p1_ans = num.slice(0, num.length);
      else if (this.p2_ans.length == 0) this.p2_ans = num.slice(0, num.length);
      else {
        let str_num = num.join(" ");
        if (this.turn) {
          this.p1_guess_num.push(num.slice(0, num.length));
          this.p1_guess_list = { "0 1 2": "a" };
        } else {
          this.p2_guess_num.push(num.slice(0, num.length));
          this.p2_guess_list[num.join(" ")] = "a";
        }
        this.turn = !this.turn;
      }
    },
  },
};
</script>
