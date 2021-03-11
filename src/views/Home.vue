<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld/>
    <Chart v-if="this.$store.state.dataCountryDetail.length == 0" />
    <ChartCountry :data="this.$store.state.dataCountryDetail" v-if="this.$store.state.dataCountryDetail.length != 0"/>
    <Footer/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import Chart from '@/components/chart.vue'
import ChartCountry from '@/components/chartCountry.vue'
import Footer from '@/components/footer.vue'
import elementUI from 'element-ui'
import Vue from 'vue'


Vue.use(elementUI)

export default {
  name: 'Home',
 
  components: {
    HelloWorld,
    Chart,
    ChartCountry,
    Footer
  }
}
</script>
