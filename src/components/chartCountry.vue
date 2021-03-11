
<script>
import { Bar } from "vue-chartjs";

export default {
  extends: Bar,
  props: ["data"],
  mounted() {
    this.renderLineChart();
  },
  computed: {
    chartData: function () {
      return this.data;
    },
  },
  methods: {
    renderLineChart: function () {
      this.renderChart(
        {
          labels: ["Nhiễm bệnh", "Hồi phục", "Tử vong"],
          datasets: [
            {
              label: `${this.$store.state.valuePickerCountry}`,
              backgroundColor: "#f87979",
              data: this.chartData,
            },
          ],
        },
        {
          responsive: true,
          maintainAspectRatio: false,
          title: {
            display: true,
            text: `Biểu đồ Covid-19 của ${this.$store.state.valuePickerCountry}`,
          },
        }
      );
    },
  },

  watch: {
    data: function () {
      // this._chart.destroy();
      //this.renderChart(this.data, this.options);
      this.renderLineChart();
    },
  },
};
</script>

<style>
</style>