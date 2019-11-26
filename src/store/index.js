import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    allData: [{
      left: '1003000500023L221911210044',
      right: '1003000500023L221911210044',
      state: 1,
      time: Date.now()
    }]
  },
  mutations: {
    pushAllData(state, data) {
      state.allData.push(data)
    }
  },
  actions: {
  },
  modules: {
  }
})
