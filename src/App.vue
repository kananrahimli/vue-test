<template>
  <div id="app">
    <nav class="navbar navbar-expand-sm bg-light">
      <!-- Links -->
      <ul class="navbar-nav">
        <li class="nav-item">
          <router-link class="nav-link" to="/">Dashboard</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/home">Home</router-link>
        </li>
      </ul>
    </nav>

    <div class="container mt-5">
      <div class="row">
        <div class="col-md-6">
          <div class="input-group">
            <input
              type="text"
              class="form-control"
              placeholder="Search product"
              v-model="productName"
            />
            <input
              type="number"
              class="form-control"
              placeholder="Eneter5 product amount"
              v-model="orderAmount"
            />
            <input
              type="date"
              name="date"
              id="date"
              placeholder="Select date"
              class="form-control"
              v-model="orderDate"
            />

            <div class="input-group-append">
              <button class="btn btn-primary" @click="filter">Filter</button>
            </div>
          </div>

          <table class="table table-bordered mt-3">
            <thead>
              <tr>
                <th scope="col">Product name</th>
                <th scope="col">Order date</th>
                <th scope="col">Order amount</th>
                <th scope="col">Total Price</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="order in filteredOrder.length > 0
                  ? filteredOrder
                  : orders"
                :key="order._id"
              >
                <th scope="row">
                  {{ order.product[0].name }}
                </th>
                <td>{{ order.date }}</td>
                <td>{{ order.amount }}</td>
                <td>{{ order.product[0].price }}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="col-md-6">

          <div  class="text-left">
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
      </div>
    </div>
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
  data() {
    return {
      productName: null,
      orderAmount: null,
      orderDate: null,
      filteredOrder: [],

      
      chartDataUpdated:null,
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false
      }
    };
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
    }
  },
  components: {
    LineChartGenerator,
  },
  computed: {
    orders() {
      return this.$store.state.orders;
    },
    
    chartDates(){
      let dates=[]


      if(this.filteredOrder.length>0){
        this.filteredOrder.forEach(order=>{
          
          dates.push(order.date)
         
        })
      }else{
        this.orders.forEach(order=>{
          
          dates.push(order.date)

         
        })
      }
       dates=new Set(dates)
     
      return [...dates] ;
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
    getOrders() {
      return this.$store.dispatch("getOrders");
    },
    filter() {
      this.filteredOrder = this.orders.filter((order) => {
        return (
          order.date == this.orderDate ||
          order.amount == this.orderAmount ||
          order.product[0].name
            .toLowerCase()
            .includes(this.productName.toLowerCase())
        );
      });
      // console.log(this.filteredOrder);
    },

  },
  created() {
    this.getOrders().then(()=>{
      // this.chartData.labels=this.chartDates
      console.log(this.chartData.labels);
    })
  },
};
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
