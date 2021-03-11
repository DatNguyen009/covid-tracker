<template>
  <div class="container " >
    <h3>Ranking by confirmed</h3>
    <div class="row " v-for="(item, index) in data" v-bind:key="index">
        <div class="col-sm-4 index">
            {{index}}
        </div>
        <div class="col-sm-4 nameCountry " >
            {{ item.nameCountry }}
        </div>
        <div class="col-sm-4 confirmed">
            {{ item.confirmed }}
        </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["data"],
};
</script>

<style>
</style>