<template>
  <div class="hello">
    <div class="container">
      <h1 class="text-center" style="color: green;">Covid-19</h1>
      <div class="row">
        <el-card class="box-card">
          <div class="text item">
            <b>Số ca nhiễm bệnh</b>
            <div class="iCountUp">
              <ICountUp
                :delay="delay"
                :endVal="endVal"
                :options="options"
             
              />
            </div>
            <p class="date">{{ String(date).substr(0, 24) }}</p>
            <p>Tổng số ca nhiễm bệnh Covid-19</p>
          </div>
        </el-card>
        <el-card class="box-card">
          <div class="text item">
            <b>Số ca hồi phục</b>
            <div class="iCountUp">
              <ICountUp
                :delay="delay"
                :endVal="endVal1"
                :options="options"
              
              />
            </div>
            <p class="date">{{ String(date).substr(0, 24) }}</p>
            <p>Tổng số ca hồi phục Covid-19</p>
          </div>
        </el-card>
        <el-card class="box-card">
          <div class="text item">
            <b>Số ca tử vong</b>
            <div class="iCountUp">
              <ICountUp
                :delay="delay"
                :endVal="endVal2"
                :options="options"
              
              />
            </div>
            <p class="date">{{ String(date).substr(0, 24) }}</p>
            <p>Tổng số ca tử vong Covid-19</p>
          </div>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script>
import ICountUp from "vue-countup-v2";
export default {
  name: "HelloWorld",
  data() {
    return {
      date: "",
      delay: 3000,
      endVal: 0,
      endVal1: 0,
      endVal2: 0,
    
     
      options: {
        useEasing: true,
        useGrouping: true,
        separator: ",",
        decimal: ".",
        prefix: "",
        suffix: "",
      },
    };
  },
  filters: {
    sliceStr(a) {
      let b = a.substr(0, 5);
      return b;
    },
  },
  async created() {
    let date = new Date();
    this.date = date;
    let url = "https://covid19.mathdro.id/api/";
    await this.$store.dispatch('fetchData',{
      url: url,
    });
    this.endVal =  this.$store.state.dt.confirmed.value;
    this.endVal1 =  this.$store.state.dt.recovered.value;
    this.endVal2 =  this.$store.state.dt.deaths.value;
  },
 
  components: {
    ICountUp,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "../../node_modules/bootstrap/dist/css/bootstrap.css";
@import url("//unpkg.com/element-ui@2.14.1/lib/theme-chalk/index.css");

.hello{
  margin-bottom: 5rem;

}

.box-card {
  width: 380px;
  .text {
    font-size: 14px;
    text-align: left;
    b{
      font-size: 18px;
    }
  }

  .item {
    padding: 18px 0;
  }
}
.iCountUp,.date{
  color: green;
  font-size: 15px;
  font-weight: bold;
}
</style>
