import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    orders:[]
  },
 
  mutations: {
    setOrders(state,payload){
      
      state.orders=payload
    }
  },
  actions: {
    getOrders(context){
       return axios.get('https://assignment-6fdaf-default-rtdb.firebaseio.com/orders.json').then(res=>{

       let currentOrders=res.data.map(order=>{
         return {...order,date:order.date.substr(0, 10)}
       })
      
        context.commit('setOrders',currentOrders)
       })

      
    }
  },
  getters: {
    
  },
  modules: {
  }
})
