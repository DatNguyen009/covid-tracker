

<script>
import { Bar } from "vue-chartjs";

export default {
  extends: Bar,
  async mounted() {
    let url = "https://covid19.mathdro.id/api/daily";
    await this.$store.dispatch('fetchDataDaily',{
      url: url,
    });
    this.renderChart(
      {
        labels: this.$store.getters.getDataDaily.map(item => item.date),
        datasets: [
          {
            label: "Tỉ lệ nhiễm bệnh",
            data: this.$store.getters.getDataDaily.map(item => item.confirmed.total),
            backgroundColor: "#f87979",
           
          },
          {
            label: "Tỉ lệ tử vong",
            data: this.$store.getters.getDataDaily.map(item => item.deaths.total),
            backgroundColor: "green",
          
          },
        ],
      },
      {
        responsive: true,
        maintainAspectRatio: false,
        // title: {
        //   display: true,
        //   text: "My Data",
        // },
      }
    );
  },
};
</script>

<style>
</style>