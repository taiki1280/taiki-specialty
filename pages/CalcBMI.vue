<template lang="pug">
#main
  div
    table.input(border="1")
      tr
        th(scope="row") 身長を入力してください(cm)
        td
          input(type="number", min="0", step="0.1", v-model="Weight")
          | cm
      tr
        th(scope="row") 体重を入力してください(kg)
        td
          input(type="number", min="0", step="0.1", v-model="Height")
          | kg
  div(v-if="Height * Weight > 0")
    div
      p 入力ありがとうございました。
      p 以下結果です。
      p BMI値と適性体重は小数点第二位を四捨五入済み。
    div
      table(border="1")
        caption
        tr(v-for="(value, i) in th_col", :key="i")
          th(scope="row") {{ value }}
          td(v-if="i === 0") 約{{ Math.round(CalcBMI * 10) / 10 }}
          td(v-if="i === 1") {{ JudgeObesityJP }}
          td(v-if="i === 2") {{ JudgeObesityWHO }}
          td(v-if="i === 3") 約{{ Math.round(CalcSuitableWeight * 10) / 10 }}kg
          td(v-if="i === 4") 約{{ Math.round(CalcDistanceSuitableWeight * 10) / 10 }}kg
</template>

<script>
export default {
  data() {
    return {
      Height: 170.7,
      Weight: 45.1,
      BMI: "",
      SuitableWeight: "",
      ObesityJP: "",
      ObesityWHO: "",
      DistanceSuitableWeight: "",
      th_col: [
        "BMI値",
        "肥満度(日本)",
        "肥満度(WHO)",
        "適性体重",
        "適性体重との差",
      ],
    };
  },
  computed: {
    CalcBMI() {
      this.BMI = this.Weight / ((this.Height / 100) * (this.Height / 100));
      return this.BMI;
    },
    CalcSuitableWeight() {
      this.SuitableWeight = (this.Height / 100) * (this.Height / 100) * 22;
      return this.SuitableWeight;
    },
    CalcDistanceSuitableWeight() {
      this.DistanceSuitableWeight = this.Weight - this.SuitableWeight;
      return this.DistanceSuitableWeight;
    },
    JudgeObesityJP() {
      if (this.BMI < 18.5) this.ObesityJP = "痩せすぎ";
      else if (this.BMI < 25) this.ObesityJP = "普通体重";
      else if (this.BMI < 30) this.ObesityJP = "肥満度１";
      else if (this.BMI < 35) this.ObesityJP = "肥満度２";
      else if (this.BMI < 40) this.ObesityJP = "肥満度３";
      else this.ObesityJP = "肥満度４";
      return this.ObesityJP;
    },
    JudgeObesityWHO() {
      if (this.BMI < 16) this.ObesityWHO = "痩せすぎ";
      else if (this.BMI < 17) this.ObesityWHO = "痩せ";
      else if (this.BMI < 17.5) this.ObesityWHO = "痩せぎみ";
      else if (this.BMI < 25) this.ObesityWHO = "普通体重";
      else if (this.BMI < 30) this.ObesityWHO = "前肥満";
      else if (this.BMI < 35) this.ObesityWHO = "前肥度１";
      else if (this.BMI < 40) this.ObesityWHO = "前肥度２";
      else this.ObesityWHO = "肥満度３";
      return this.ObesityWHO;
    },
  },
};
</script>

<style lang="stylus" scoped>
>>>main
  margin auto
#main
  flex(space-evenly)
  flex-direction column
  width 100%
#main>div
  width 70%
  @media screen and (orientation portrait)
    width 100%
  table
    width 100%
input
  width 40%
th, td, input
  text-align center
</style>