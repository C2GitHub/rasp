var express = require('express')
var router = express.Router()
var scanGpio = require('../plugins/scanGpio')
var scanSerialport = require('../plugins/scanSerialport')
var scanData = require('../plugins/scanData')

// 公共配置
var SCAN_CONFIG = {
  isPass: false,
  isAuto: true,
  delayDataClearTime: 4000,
  delayTimer: null
}

// 服务器路由，首页渲染
router.get('/', function (req, res) {
  var HOMEPAGE = fs.readFileSync(path.join(__dirname, '../public/index.html'), 'utf8')
  res.send(HOMEPAGE)
})

// 轮询最新数据
router.get('/api/getCurrentOne', function (req, res) {
  res.json({
    err: 0,
    data: scanData.newItem
  })
})

// 获取当前班次扫描数据信息
router.get('/api/scanData', (req, res) => {
  res.json({
    err: 0,
    data: scanData.allData
  })
})

// 获取错误历史
router.get('/api/getErrData', (req, res) => {
  fs.readFile(path.join(__dirname, './err.text'), 'utf8', (err, data) => {
    if (err) {
      res.send(err)
    } else {
      data = data === '' ? '[]' : data
      res.json({ data: JSON.parse(data) })
    }
  })
})

// 功能启用或请用isRuning
router.post('/api/setAuto', (req, res) => {
  if (req.body.state == 1) {
    isAuto = true
    res.json({
      err: 0,
      state: 1
    })
  } else if (req.body.state == 0) {
    isAuto = false
    res.json({
      err: 0,
      state: 0
    })
  }
})

// 功能启用或停用直通模式isPass
router.post('/api/setPass', (req, res) => {
  if (req.body.state == 1) {
    isPass = true
    res.json({
      err: 0,
      state: 1
    })
  } else if (req.body.state == 0) {
    isPass = false
    res.json({
      err: 0,
      state: 0
    })
  }
})

// 设置状态延迟时间
router.post('/api/setDelayTime', (req, res) => {
  let time = req.body.time
  time = Number(time)
  if (time <= 2) {
    time = 2
  } else if (time >= 6) {
    time = 6
  }
  delayDataClearTime = time * 1000
  console.log('设置延时时间成功：' + delayDataClearTime)

  res.json({
    err: 0,
    success: 1
  })
})

// 获取延迟时间
router.get('/api/getDelayTime', (req, res) => {
  res.json({
    err: 0,
    time: parseInt(delayDataClearTime / 100) / 10
  })
})

// 清空所有生产数据
router.get('/api/emptyAllData', (req, res) => {
  allData = []
  Util.saveData('./route/data.text', JSON.stringify(allData)).then(isSucess => {
    if (isSucess) {
      console.log('清空数据成功')
    }
  })

  res.json({
    err: 0,
    isSucess: 1
  })
})

// 清空异常数据
router.get('/api/emptyErrData', (req, res) => {
  errData = []
  Util.saveData('./route/err.text', JSON.stringify(errData)).then(isSucess => {
    if (isSucess) {
      console.log('清空异常数据成功')
    }
  })
  res.json({
    err: 0,
    isSucess: 1
  })
})

module.exports = router
