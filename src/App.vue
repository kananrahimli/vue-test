<template>
  <div>
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
          <ChartItem
            :chartDates="chartDates"
            :allOrders="orders"
            :filteredOrders="filteredOrder"
          ></ChartItem>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ChartItem from "./components/Chart-Item.vue";

export default {
  data() {
    return {
      productName: null,
      orderAmount: null,
      orderDate: null,
      filteredOrder: [],
    };
  },

  components: {
    ChartItem,
  },
  computed: {
    orders() {
      return this.$store.state.orders;
    },

    chartDates() {
      let dates = [];
      let orders = [];
      let groupArrays = null;
      let mostFrequent = null;
      let arr = null;

      if (this.filteredOrder.length > 0) {
        const groups = this.filteredOrder.reduce((groups, order) => {
          const date = order.date;
          if (!groups[date]) {
            groups[date] = [];
          }
          groups[date].push(order);
          return groups;
        }, {});

        // Edit: to add it in the array format instead
        groupArrays = Object.keys(groups).map((date) => {
          return {
            date,
            orders: groups[date],
          };
        });

        groupArrays.forEach((group) => {
          dates.push(group.date);
          let amounts = group.orders.reduce((total, current) => {
            return total + current.amount;
          }, 0);

          orders.push(amounts);
        });

        arr = this.filteredOrder;

        mostFrequent = arr.sort((a, b) => a.amount - b.amount)[arr.length - 1];

      } else {
        const groups = this.orders.reduce((groups, order) => {
          const date = order.date;
          if (!groups[date]) {
            groups[date] = [];
          }
          groups[date].push(order);
          return groups;
        }, {});

        // Edit: to add it in the array format instead
        groupArrays = Object.keys(groups).map((date) => {
          return {
            date,
            orders: groups[date],
          };
        });
        console.log(groupArrays);

        groupArrays.forEach((group) => {
          dates.push(group.date);
          let amounts = group.orders.reduce((total, current) => {
            return total + current.amount;
          }, 0);

          orders.push(amounts);
        });

        arr = this.orders;

        mostFrequent = arr.sort((a, b) => a.amount - b.amount)[arr.length - 1];
      }
      let findTheMost = groupArrays.sort(
        (a, b) => b.orders.length - a.orders.length
      )[0];

      return {
        dates: [...dates],
        orders: [...orders],
        findTheMost,
        mostFrequent,
      };
    },
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
            .includes(this.productName?.toLowerCase())
        );
      });
    },
  },
  created() {
    this.getOrders().then(() => {
      console.log(this.orders);
    });
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
