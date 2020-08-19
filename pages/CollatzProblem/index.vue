<template>
  <div id="main">
    <button @click="show = !show">コラッツ予想とは</button>
    <ol v-if="show">
      <li>
        <p>コラッツの問題（コラッツのもんだい、Collatz problem）は、数論の未解決問題のひとつである。</p>
        <p>1937年にローター・コラッツが問題を提示した。</p>
        <p>問題の結論の予想を指してコラッツの予想と言う。</p>
      </li>
      <li>
        <p style="color:red">「任意の正の整数 n をとり、</p>
        <ul style="color:red">
          <li>n が偶数の場合、n を 2 で割る</li>
          <li>n が奇数の場合、n に 3 をかけて 1 を足す</li>
        </ul>
        <p>という操作を繰り返すと、どうなるか」というものである。</p>
        <p>「どんな初期値から始めても、有限回の操作のうちに必ず 1 に到達する</p>
        <p>（そして 1→4→2→1 というループに入る）」という主張が、コラッツの予想である。</p>
      </li>
      <p>
        <a
          rel="noopener noreferrer"
          href="https://ja.wikipedia.org/wiki/%E3%82%B3%E3%83%A9%E3%83%83%E3%83%84%E3%81%AE%E5%95%8F%E9%A1%8C"
          target="_blank"
        >wikipedia参照</a>
      </p>
      <p>上記の2の定義に従ったプログラムです。</p>
    </ol>
    <ul>
      <li>正の整数を入力してください</li>
      <li>
        <input type="number" min="0" v-model.number="num" />
      </li>
      <li v-if="num > 1">
        <p>「{{num}}」が1に到達するまでの計算回数は</p>
        <p>「{{ find_CollatzProblem_num.length }}回」です。</p>
        <div v-for="(value,key) in find_CollatzProblem_num" :key="key">
          <p>{{zeroPadding(key + 1,(find_CollatzProblem_num.length - 1).toFixed().length)}}回目：{{value}}</p>
        </div>
      </li>
      <li v-else-if="num == 1">
        <p>1の時は計算回数はありません。</p>
      </li>
      <li v-else>
        <p>2以上の整数を入力してください</p>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      num: 1,
      show: false,
    };
  },
  computed: {
    find_CollatzProblem_num() {
      let num = this.num;
      let num_list = [];
      while (num > 1) {
        num % 2 == 0 ? (num /= 2) : (num = 3 * num + 1);
        num_list.push(num);
      }
      return num_list;
    },
  },
  methods: {
    zeroPadding(num, len) {
      return (Array(len).join("0") + num).slice(-len);
    },
  },
};
</script>