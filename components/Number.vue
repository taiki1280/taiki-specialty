<template lang="pug">
#contents
  .numbers
    div(v-for="i in num.length")
      h1 {{ num[i - 1] }}
      button(@click="calc('+', i - 1)") +
      button(@click="calc('-', i - 1)") -
  .decide
    button(@click="clicked(num)") 決定
</template>

<style lang="stylus" scoped>
#contents
  display flex
  flex-wrap wrap
.numbers
  flex(space-evenly)
  flex-grow 1
  div
    h1
      flex(center)
    button
      wh(3vmax)
.decide
  flex(center)
  flex-grow 1
  button
    wh(80%)
</style>

<script>
/** 配列内で値が重複してないか調べる **/
function existsSameValue(a) {
  var s = new Set(a);
  return s.size != a.length;
}
export default {
  props: {
    clicked: Function,
  },
  data() {
    return {
      num: [0, 1, 2],
    };
  },
  methods: {
    calc(op, i) {
      if (op == "+") {
        if (this.num[i] == 9) this.num[i] = -1;
        this.num.splice(i, 1, this.num[i] + 1);
      } else if (op == "-") {
        if (this.num[i] == 0) this.num[i] = 10;
        this.num.splice(i, 1, this.num[i] - 1);
      }
      if (existsSameValue(this.num))
        // 重複がある場合は再帰
        this.calc(op, i);
    },
  },
};
</script>