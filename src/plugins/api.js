import axios from 'axios'

/**
 * 开发环境：process.env.VUE_APP_BASEURL = 'api'
 * 生产环境：process.env.VUE_APP_BASEURL = ''
 */
let BaseUrl = process.env.VUE_APP_BASEURL

export default {
  /**
   * 获取首页最新一条数据
   */
  getCurrentOne() {
    return axios.get(BaseUrl + '/getCurrentOne').then(res => {
      if (res.data.err === 0) {
        return res.data
      }
    })
  },

/**
 * 获取当前班次扫描数据
 */
 getScanData() {
  return axios.get(BaseUrl + '/scanData').then(res => {
    if(res.status === 200) {
      return res.data
    }
  })
},

/**
* 获取当前班次扫描数据
*/
getErrData() {
 return axios.get(BaseUrl + '/getErrData').then(res => {
   if(res.status === 200) {
     return res.data
   }
 })
},

  /**
   * 确认放行
   */
  confirmPass() {
     return axios.get(BaseUrl + '/confirmPass').then(res => {
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
    return axios.post(BaseUrl + '/setAuto', {state: state}).then(res => {
      if (res.status === 200) {
        return res.data.state
      }
    })
  },


    /**
   * 启用和关闭直通isPass
   */
  setPass(state) {
    return axios.post(BaseUrl + '/setPass', {state: state}).then(res => {
      if (res.status === 200) {
        return res.data.state
      }
    })
  },

/**
 * 获取扫码状态延时时间
 */
getDelayTime() {
  return axios.get(BaseUrl + '/getDelayTime').then(res => {
    if (res.status === 200) {
      return res.data
    }
  })
},

/**
 *  设置延迟时间
 *  */

setDelayTime(num) {
  return axios.post(BaseUrl + '/setDelayTime', {time: num}).then(res => {
    if(res.status === 200) {
      return true
    } else{
      return false
    }
  })
},

/**
 * 清空所有数据
 */
emptyAllData() {
  return axios.get(BaseUrl + '/emptyAllData').then(res => {
    if (res.status === 200) {
      return res.data
    }
  })
},

/**
 * 清空异常数据
 */
emptyErrData() {
  return axios.get(BaseUrl + '/emptyErrData').then(res => {
    if (res.status === 200) {
      return res.data
    }
  })
}

}
