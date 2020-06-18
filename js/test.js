// 訪問回数
new Vue({
  el: '#welcome',
  data: {
    visited_cnt: 0
  },
  created: function () {
    // ローカルストレージに保存する
    // データが存在しなかった時
    //   if (!localStorage.visited_cnt)
    //     localStorage.visited_cnt = 0
    //   // localStorageはString型でしか保存できないため受け取り後キャストしてインクリメント
    //   localStorage.visited_cnt = parseFloat(localStorage.visited_cnt) + 1
    //   this.visited_cnt = `${localStorage.visited_cnt}回目の`;
    // }

    // Cookieに保存する
    this.visited_cnt = this.$cookies.get("visited_cnt")
    if (this.visited_cnt == undefined)
      this.$cookies.set("visited_cnt", 0)
    this.visited_cnt++;
    this.$cookies.set("visited_cnt", this.visited_cnt)
  }
})

  // タブの切り替え
// let nav = new Vue({
//   el: "#nav",
//   data: {
//     test: "aasdffw"
//   }
// })