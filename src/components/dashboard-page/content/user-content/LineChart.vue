<template>
  <canvas ref="canvas" class="canv-chart"></canvas>
</template>

<script>
import { Line } from "vue-chartjs";

export default {
  props: {
    dataChart: {
      type: Array,
      required: true,
    },
    bgColor: {
      type: String,
      required: true,
    },
    borderColor: {
      type: String,
      required: true,
    },
  },
  extends: Line,
  methods: {
    generateChart() {
      this.renderChart(
        {
          labels: [
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
          ],
          datasets: [
            {
              fill: true,
              data: this.dataChart,
              backgroundColor: this.bgColor,
              borderColor: this.borderColor,
              borderWidth: 2,
            },
          ],
        },
        {
          legend: false,
          // responsive: true,
          maintainAspectRatio: false,
          responsiveAnimationDuration: 0,
        }
      );
    },
  },
  mounted: function () {
    this.generateChart();
  },
};
</script>

<style>
.canv-chart {
  height: 150px !important;
  width: 100% !important;
}
</style>