import axios from 'axios'

export default {
  /**
   * 扫描错误，再扫码一次
   */
  scanAgain() {
    axios.get('/api/scanAgain').then(res => {
      if (res.errno === 0) {
        return res.data.isSucess
      }
    })
  },

  /**
   * 获取首页最新一条数据
   */
  getCurrentOne() {
    return axios.get('/api/getCurrentOne').then(res => {
      if (res.data.err === 0) {
        return res.data
      }
    })
  },

  /**
   * 发送最新扫描数据
   */
  sentNewDate(data) {
    return axios.post('/api/sentNewDate', { data }).then(res => {
      if (res.data.err === 0 && res.data.success === 1) {
        return true
      } else {
        return false
      }
    })
  },

  /**
   * 位置错误
   */
  sentPosErr() {
    axios.get('/api/sentPosErr').then(res => {})
  },

  /**
   * 确认放行
   */

  confirmPass() {
     return axios.get('/api/confirmPass').then(res => {
      if (res.status === 200 && res.data.success === 1) {
        return true
      } else {
        return false
      }
    })
  },

  /**
   * 启用和关闭检测功能isAuto
   */
  setAuto(state) {
    return axios.post('/api/setAuto', {state: state}).then(res => {
      if (res.status === 200) {
        return res.data.state
      }
    })
  },


    /**
   * 启用和关闭直通isPass
   */
  setPass(state) {
    return axios.post('/api/setPass', {state: state}).then(res => {
      if (res.status === 200) {
        return res.data.state
      }
    })
  },

/**
 * 获取当前班次扫描数据
 */

 getScanData() {
   return axios.get('/api/scanData').then(res => {
     if(res.status === 200) {
       return res.data
     }
   })
 },

/**
 * 获取当前班次扫描数据
 */

getErrData() {
  return axios.get('/api/getErrData').then(res => {
    if(res.status === 200) {
      return res.data
    }
  })
}


}
