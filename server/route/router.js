var express = require('express')
var fs = require('fs')
var path = require('path')
var Util = require('./Util.js')

var router = express.Router()
// rpio module
// var rpio = require('rpio')

// 定义输出pin
// rpio.open(15, rpio.INPUT, rpio.PULL_DOWN);

// 定义输入pin

// 当前最新条码
var newItem = {
  left: '1003000500023L221911210044',
  right: '1003000500023L221911210044',
  state: 1,
  time: Date.now()
}

// isAuto 停用 / 启用
var isAuto = true

// isPass直通  开启 / 关闭
var isPass = false

// 当前班次所有数据
var allData = []
Util.getData(path.join(__dirname, './data.text'))

// 默认渲染首页
// 服务器初始化，首页必须同步读取
router.get('/', function(req, res) {
  // res.send('Birds home page')
  var pageDate = fs.readFileSync(path.join(__dirname, '../index.html'), 'utf8')
  res.send(pageDate)
  // fs.readFile('./index.html', 'utf8', (err, data) => {
  //   if (err) {
  //     res.json(err)
  //   } else {
  //     res.send(data)
  //   }
  // })
})

// 轮询最新数据
router.get('/api/getCurrentOne', function(req, res) {
  res.json({
    err: 0,
    data: newItem
  })
  newItem = '' // 发送完清除最新数据
})

// 接收一个新扫描值
var getTwoDataDuration = null
var tempData = {
  time: '',
  left: '',
  right: '',
  state: ''
}

router.post('/api/sentNewDate', (req, res) => {
  // req.body.data 得到扫描数据
  if (req.body.data && req.body.data.length === 26) {
    if (tempData.left === '') {
      tempData.left = req.body.data
    } else {
      tempData.right = req.body.data
      tempData.time = Date.now()
      // 数据比对
      if (tempData.left === tempData.right) {
        tempData.state = 1
      } else {
        tempData.state = 0
        // ----------保存错误数据------------//
        Util.getData(paht.join(__dirname, './err.text')).then(data => {
          data = data === '' ? '[]' : data
          data = JSON.parse(data)
          Util.saveData(
            path
              .join(
                __dirname,
                './err.text',
                JSON.stringify(data.push(tempData))
              )
              .then(isSucess => {
                if (isSucess) {
                  console.log('写入异常数据成功')
                }
              })
          )
        })
      }
      // 保存新数据
      newItem = { ...tempData }
      allData.push({ ...tempData })

      console.log(newItem, allData)
      Util.saveData('./route/data.text', JSON.stringify(allData)).then(
        isSucess => {
          if (isSucess) {
            console.log('写入数据成功')
          }
        }
      )
      // 清除缓存状态
      tempData.left = ''
      tempData.right = ''
      tempData.time = ''
      tempData.state = ''
    }
  } else {
    // --------------***-------------//
    // 数据验证不通过，输出pin值从新扫描
    console.log(req.body.data)
  }

  timer = setTimeout(() => {
    clearTimeout(getTwoDataDuration)
    getTwoDataDuration = null
  }, 2000) // 2s内必须完成左右两侧数据扫描

  res.json({
    err: 0,
    success: 1
  })
})

router.get('/api/scanAgain', (req, res) => {
  if (tempData.left === '') {
    //------------************--------------//
    // 左扫码枪扫一次
  } else {
    // 有扫码枪扫一次
  }
  res.json({
    err: 0,
    state: 1
  })
})

router.get('/api/sentPosErr', (req, res) => {
  //----------------**********-------------//

  // pin报警
  res.json({
    err: 0,
    state: 1
  })
})

router.get('/api/confirmPass', (req, res) => {
  // 确认放行，输出pin，通知plc
  res.json({
    err: 0,
    success: 1
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

// 获取当前班次扫描数据信息
router.get('/api/scanData', (req, res) => {
  var dataStr = fs.readFileSync(path.join(__dirname, './data.text'), 'utf8')
  dataStr = dataStr.trim() === '' ? [] : dataStr
  try {
    let data = JSON.parse(dataStr)

    res.json({ data })
  } catch (error) {}
})

// 获取错误历史
router.get('/api/getErrData', (req, res) => {
  fs.readFile(path.join(__dirname, './err.text'), 'utf8', (err, data) => {
    if(err) {
      res.send(err)
    }else{
      data = data === "" ? '[{"time":1574778850297,"left":"1003000500023L221911210043","right":"1003000500023L221911210044","state":0}]': data
      res.json({data:JSON.parse(data)})
    }
  })
})

module.exports = router
