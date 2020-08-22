<template lang="pug">
#main
  button(@click="show = !show") カプレカ数とは
  ol(v-if="show")
    li 2乗して前の部分と後ろの部分に分けて和を取ったとき、元の値に等しくなるもの。
    li(style="color:red") 桁を並べ替えて最大にしたものから最小にしたものとの差を取ったとき、元の値に等しくなるもの。
    p
      a(
        href="https://ja.wikipedia.org/wiki/%E3%82%AB%E3%83%97%E3%83%AC%E3%82%AB%E6%95%B0"
      ) wikipedia参照
    p 上記の2の定義に従ったプログラムです。
    p 7以上の整数は僕のPCでは動作しませんでした。
    p 2020/07/12
    p 桁が増えるほど計算に時間はかかりますが、無限ループしてしまうバグ修正しました。
    p 9桁まで動作を確認しました。
  ul
    li 桁数を入力してください
    li
      input(type="number", min="1", v-model.number="digit_num")
      | {{ find_Kaprekar_num }}
  div(v-if="digit_num > 0")
    p 「{{ digit_num }}桁」のカプレカ数は以下の「{{ Kaprekar_num_list.length }}個」です。
    ul
      li(v-for="(value, key) in Kaprekar_num_list", :key="key") {{ value }}
  div(v-else) 「{{ digit_num }}桁」のカプレカ数はありません
</template>

<script>
export default {
  data() {
    return {
      digit_num: 3,
      Kaprekar_num_list: [],
      show: false,
    };
  },
  computed: {
    find_Kaprekar_num() {
      let max_num = 1;
      this.Kaprekar_num_list = [];
      for (let i = 1; i <= this.digit_num; i++) max_num *= 10;
      for (let i = max_num / 10 + 1; i < max_num; i++)
        if (i % 9 == 0) {
          // 数字をひとつづつ配列に格納
          let num_str_list = String(i).split("");
          num_str_list.sort(function (a, b) {
            if (a > b) return -1;
            if (a < b) return 1;
            return 0;
          });
          let max = parseInt(num_str_list.join(""));
          num_str_list.sort(function (a, b) {
            if (a < b) return -1;
            if (a > b) return 1;
            return 0;
          });
          let min = parseInt(num_str_list.join(""));
          if (max - min == i) this.Kaprekar_num_list.push(i);
        }
    },
  },
};
</script>