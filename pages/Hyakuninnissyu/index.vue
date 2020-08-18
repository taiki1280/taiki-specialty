<template>
  <div id="Hyakuninnissyu">
    <div v-for="(value,i) in json_data" :key="i">
      <p>{{('000' + (i + 1)).slice(-3)}}</p>
      <p>
        上の句 :
        <span>{{value.kimariji}}</span>
        {{value.bodyKana.split(" ").slice(0,3).join(" ").replace(value.kimariji,"")}}
      </p>
      <p>
        <button v-if="show[i]" @click="toggle(i,show[i])">下の句を非表示する</button>
        <button v-else @click="toggle(i,show[i])">下の句を表示にする</button>
      </p>
      <div v-if="show[i]">
        <p>
          下の句：
          <span>{{value.bodyKana.split(" ").slice(-2).join(" ")}}</span>
        </p>
        <p>{{value.bodyKanji.split(" ").slice(0,3).join(" ")}}</p>
        <p>{{value.bodyKanji.split(" ").slice(-2).join(" ")}}</p>
        <p>作者 : {{value.nameKanji}}({{value.nameKana}})</p>
        <img :src="get_filename(i+1)" :alt="value.nameKanji" />
      </div>
      <br />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      json_data: require("../Hyakuninnissyu/Hyakunin.json"),
      show: [],
    };
  },
  created() {
    for (let i = 0; i < this.json_data.length; i++)
      this.show.splice(0, 0, false);
  },
  methods: {
    toggle(i, v) {
      this.show.splice(i, 1, !v);
    },
    get_filename(num) {
      return require("../Hyakuninnissyu/img/" +
        ("000" + num).slice(-3) +
        ".jpg");
    },
  },
};
</script>

<style lang="stylus" scoped>
#Hyakuninnissyu
  display flex
  flex-direction column
  p
    margin 0
    padding 0
    span
      color red
  > div
    display flex
    flex-direction column
    width 100%
    @media screen and (orientation portrait)
      align-items left
      img
        width 100%
    @media screen and (orientation landscape)
      width 50%
      display flex
      flex-wrap wrap
      flex 1
      margin auto
      // background: black
      > div
        flex-direction column
        display flex
        flex-wrap wrap
        justify-content center
        height 20vh
        width 100%
        img
          height 20vh
          margin auto
    > div
      p:nth-of-type(3)
        text-align right
</style>