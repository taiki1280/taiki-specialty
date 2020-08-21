import Vue from 'vue'
import VueScrollTo from 'vue-scrollto'

Vue.use(VueScrollTo, {
  // 全体のアニメーションの長さ？
  duration: 700,
  // [フェードイン,フェードアウト,？,アニメーションの種類？]
  easing: [0.5, 0.5, 0.1, 1],
  // elementとの距離？
  offset: -70
})