import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    allData: [],
    errData:[],
    pollIntervalTime: 1000,
    inputNow: {left: '', right: '', time: '', state: 0},
  },
  mutations: {
    pushAllData(state, data) {
      state.allData.push(data)
    },
    setAllData(state, dataObj) {
      state.allData = dataObj
    },
// 设置轮询时间
    setPollTime(state) {
      state.pollIntervalTime += 100
      if (state.pollIntervalTime <= 100) {
        state.pollIntervalTime = 100
      }else if(state.pollIntervalTime >= 3000) {
        state.pollIntervalTime = 3000
      }
    },
    emptyAllData(state) {
      state.allData = []
    },
    replaceInputNow(state, data){
      state.inputNow = data
    }
  },
  actions: {
  },
  modules: {
  }
})
