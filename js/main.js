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
    if (this.visited_cnt === undefined)
      this.$cookies.set("visited_cnt", 0)
    this.visited_cnt++;
    this.$cookies.set("visited_cnt", this.visited_cnt)
  }
})

// タブの切り替え
let nav = new Vue({
  el: "#nav",
  data: {
    now_tab: "ホーム",
    // menus: ["ホーム", "学校", "趣味", "意見", "Twitter",]
    menus: ["ホーム", "Twitter"]
  },
  mounted: function () {
    this.now_tab = this.$cookies.get("now_tab")
    if (this.now_tab === undefined)
      this.$cookies.set("now_tab", "ホーム")
  },
  methods: {
    switch_tab: function (menu) {
      this.$cookies.set("now_tab", menu)
      this.now_tab = menu
      main.now_tab = menu
    },
  }
})

let main = new Vue({
  el: "#main",
  data: {
    now_tab: "ホーム",
    values: ""
  },
  created() {
    axios.get("json/update_content.json").then(response => (this.values = response.data.reverse()))
  }
})

// jQueryでスワイプの制御（Vueの変数を変える）
jQuery(function () {
  // スワイプされた時
  const $body = $('body')
  $body.on('touchstart', onTouchStart); //指が触れたか検知
  $body.on('touchmove', onTouchMove); //指が動いたか検知
  $body.on('touchend', onTouchEnd); //指が離れたか検知
  var direction, position;

  //横方向の座標を取得
  function getPosition(event) {
    return event.originalEvent.touches[0].pageX;
  }

  //スワイプ開始時の横方向の座標を格納
  function onTouchStart(event) {
    position = getPosition(event);
    direction = ''; //一度リセットする
  }

  //スワイプの方向（left／right）を取得
  function onTouchMove(event) {
    // 70px以上移動しなければスワイプと判断しない
    if (position - getPosition(event) > 70) {
      direction = 'left'; //左と検知
    } else if (position - getPosition(event) < -70) {
      direction = 'right'; //右と検知
    }
  }

  function onTouchEnd(event) {
    const min = 0
    const max = nav.menus.length - 1
    // タブのインデックスを取得
    let now_index = nav.menus.indexOf(nav.now_tab)
    if (direction == "left")
      now_index--
    else if (direction == "right")
      now_index++
    if (now_index < min)
      now_index = max
    else if (now_index > max)
      now_index = min
    nav.switch_tab(nav.menus[now_index])
  }
})
// nav.switch_tab(nav.menu.indexOf(nav.now_tab))
