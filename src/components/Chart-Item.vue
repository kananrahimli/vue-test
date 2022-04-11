<template>
  <div>
    <div class="text-left">
      <h1>Statistika (son 1 ay)</h1>
      <h5>Ən çox satılan məhsul:Lg tv</h5>
      <h5>Ən çox sifariş olunan gün : 2022.04.02</h5>
    </div>

    <LineChartGenerator
      :chart-options="chartOptions"
      :chart-data="chartData"
      :chart-id="chartId"
      :dataset-id-key="datasetIdKey"
      :plugins="plugins"
      :css-classes="cssClasses"
      :styles="styles"
      :width="width"
      :height="height"
    />
  </div>
</template>

<script>
import { Line as LineChartGenerator } from "vue-chartjs/legacy";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  LinearScale,
  CategoryScale,
  PointElement,
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  LinearScale,
  CategoryScale,
  PointElement
);
export default {
  data(){
    return{
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false
      }
    }
  },
   props: {
    chartId: {
      type: String,
      default: 'line-chart'
    },
    datasetIdKey: {
      type: String,
      default: 'label'
    },
    width: {
      type: Number,
      default: 400
    },
    height: {
      type: Number,
      default: 400
    },
    cssClasses: {
      default: '',
      type: String
    },
    styles: {
      type: Object,
      default: () => {}
    },
    plugins: {
      type: Array,
      default: () => []
    },
    chartDates:{
      type:Array
    },
    allOrders:{
      type:Array
    },
    filteredOrders:{
      type:Array
    }
  },
  components:{
        LineChartGenerator,
  },

   computed: {
    orders() {
      return this.allOrders;
    },
    chartData(){
      return  {
        labels: this.chartDates,
        datasets: [
          {
            label: 'Satış sayı',
            backgroundColor: '#f87979',
            data: [10,18,2,6,14]
          }
        ]
      }
    }
    
  },
  methods: {
   
    filter() {
      this.filteredOrder = this.orders.filter((order) => {
        return (
          order.date == this.orderDate ||
          order.amount == this.orderAmount ||
          order.product[0].name
            .toLowerCase()
            .includes(this.productName?.toLowerCase())
        );
      });
      
    },

  },
 
  
};
</script>

<style scoped>
</style>