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
      if (this.BMI < 18.5)
        this.ObesityJP = "痩せすぎ";
      else if (this.BMI < 25)
        this.ObesityJP = "普通体重";
      else if (this.BMI < 30)
        this.ObesityJP = "肥満度１";
      else if (this.BMI < 35)
        this.ObesityJP = "肥満度２";
      else if (this.BMI < 40)
        this.ObesityJP = "肥満度３";
      else
        this.ObesityJP = "肥満度４";
      return this.ObesityJP;
    },
    JudgeObesityWHO() {
      if (this.BMI < 16)
        this.ObesityWHO = "痩せすぎ";
      else if (this.BMI < 17)
        this.ObesityWHO = "痩せ";
      else if (this.BMI < 17.5)
        this.ObesityWHO = "痩せぎみ";
      else if (this.BMI < 25)
        this.ObesityWHO = "普通体重";
      else if (this.BMI < 30)
        this.ObesityWHO = "前肥満";
      else if (this.BMI < 35)
        this.ObesityWHO = "前肥度１";
      else if (this.BMI < 40)
        this.ObesityWHO = "前肥度２";
      else
        this.ObesityWHO = "肥満度３";
      return this.ObesityWHO;
    },
  },
};