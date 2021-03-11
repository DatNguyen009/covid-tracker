<template>
  <div id="app">
    <div id="nav">
      <nav class="navbar navbar-light bg-light">
        <router-link to="/">Home</router-link> |
        <router-link to="/rank">Rank</router-link>
        <el-select v-model="value" placeholder="Select" @change="test()">
          <el-option v-for="(item,index) in this.$store.state.dataCountry.countries" :key="index" :label="item.name" :value="item.name"> </el-option>
        </el-select>
      </nav>
    </div>
    <router-view />
  </div>
</template>
<script>

import elementUI from "element-ui";
import Vue from "vue";
Vue.use(elementUI);
export default {
 
  data() {
    return {
      value: '',
      url: 'https://covid19.mathdro.id/api/countries',
    }
  },
  async created() {
    await this.$store.dispatch('fetchCountry',{
      url: this.url,
    });  
  
  },
  methods: {
    async test(){
      await this.$store.dispatch('saveValuePickerCountry',{
        valuePickerCountry: this.value,
      }) 
    }
  },
};
</script>
<style lang="scss">
@import "../node_modules/bootstrap/dist/css/bootstrap.css";
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
