import axios from 'axios'

export default {

  /**
   * 扫描错误，再扫码一次
   */
  scanAgain() {
    axios.get('/api/scanAgain').then(res => {
      if(res.errno === 0) {
        return res.data.isSucess
      }
    })
  },

  /**
   * 获取首页最新一条数据
   */
  getCurrentOne() {
    return axios.get('/api/getCurrentOne').then(res => {
      if(res.data.err === 0) {
        return res.data
      }
    })
  },

  /**
   * 发送最新扫描数据
   */
  sentNewDate(data) {
    return axios.post('/api/sentNewDate', {data}).then(res => {
      if(res.data.err === 0 && res.data.success === 1) {
        return true
      }else{
        return false
      }
    })
  },

  /**
   * 位置错误
   */
  sentPosErr() {
    axios.get('/api/sentPosErr').then(res => {
      
    })
  }
}