var path = require('path')
var scanGpio = require('./scanGpio')
var Util = require('./util')

/**
 * @description 扫描数据
 */
var SCAN_DATA = {
  newItem: {
    left: '00000000000000000000000000',
    right: '00000000000000000000000000',
    state: 0,
    time: Date.now()
  },
  allData: [],
  errData: []
}

  /**
   *  @description 开机数据初始化
   */
  ; (async function () {
    var allDataP = Util.getData(path.join(__dirname, './data.text'))
    var errDataP = Util.getData(path.join(__dirname, './err.text'))

    Promise.all([allDataP, errDataP]).then(res => {
      try {
        let allData = JSON.parse(res[0])
        let errData = JSON.parse(res[1])
        SCAN_DATA.allData = allData
        SCAN_DATA.errData = errData
      } catch (error) {
        throw error
      }
      scanGpio.runReset() // 待机状态
    })
  })()

/**
 * @description 设置新数据
 * @param object
 * @returns boolean
 */
const setNewScanItem = dataObj => {
  if (dataObj instanceof Object) {
    SCAN_DATA.newItem.left = dataObj.left
    SCAN_DATA.newItem.right = dataObj.right
    SCAN_DATA.newItem.state = dataObj.left === dataObj ? 1 : 0,
    SCAN_DATA.newItem.time = Date.now()
    if (!SCAN_DATA.newItem.state) {
      SCAN_DATA.allData.push(SCAN_DATA.newItem)
      SCAN_DATA.errData.push(SCAN_DATA.newItem)
      let sp = Util.saveData('./data.text', JSON.stringify(SCAN_DATA.allData))
      let ep = Util.saveData('.err.text', JSON.stringify(SCAN_DATA.allData))
      Promise.all([sp, ep]).then(res => {
        const flag = res.every(item => item)
        if (flag) {
          return true
        } else {
          return false
        }
      })
    } else {
      SCAN_DATA.allData.push(SCAN_DATA.newItem)
      Util.saveData('./data.text', JSON.stringify(SCAN_DATA.allData)).then(res => {
        if (res) {
          return true
        } else {
          return false
        }
      })
    }
  }
}

// 导出数据模块
module.exports = {
  SCAN_DATA,
  setNewScanItem
}