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

// 延时清空扫描状态时间
var delayDataClearTime = 4000

// 当前班次所有数据
var allData = []
Util.getData(path.join(__dirname, './data.text')).then( data => {
  try {
    let dataObj = JSON.parse(data)
    allData = dataObj
    // console.log(allData)
  } catch (error) {
    throw error
  }
})
// 所有错误数据
var errData = []
Util.getData(path.join(__dirname, './err.text')).then( data => {
  try {
    data = data.trim() === '' ? '[]' : data
    let dataObj = JSON.parse(data)
    errData = dataObj
  } catch (error) {
    throw error
  }
})

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
var tempData = {
  time: '',
  left: '',
  right: '',
  state: ''
}


// 状态清空定时器delayTimer
var delayTimer = null

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
        // 保存错误数据
        errData.push(tempData)
        Util.saveData(path.join(__dirname, './err.text'), JSON.stringify(errData)).then(
          isSucess => {
            if (isSucess) {
              console.log('写入异常数据成功')
            }
          }
        )
      }
      // 保存新数据
      newItem = { ...tempData }
      allData.push({ ...tempData })

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
    // 数据验证不通过，输出pin值重新新扫描
    console.log(req.body.data)
  }

  // 请求响应
  res.json({
    err: 0,
    success: 1
  })

  // 延时数据清空
  if (!!delayTimer) return

  delayTimer = setTimeout(() => {
    // 清空数据
    tempData.left = ''
    tempData.right = ''
    tempData.time = ''
    tempData.state = ''
    console.log('上一次扫描状态已清空！')
    clearTimeout(delayTimer)
    delayTimer = null
  }, delayDataClearTime) // 规定时间内必须完成左右两侧数据扫描
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
  res.json({
    err: 0,
    data: allData
  })
}),

// 获取错误历史
router.get('/api/getErrData', (req, res) => {
  fs.readFile(path.join(__dirname, './err.text'), 'utf8', (err, data) => {
    if(err) {
      res.send(err)
    }else{
      data = data === "" ? '[]': data
      res.json({data:JSON.parse(data)})
    }
  })
})

// 设置状态延迟时间
router.post('/api/setDelayTime', (req, res) => {
  let time = req.body.time
  time = Number(time)
  if (time <= 2){
    time =2
  }else if(time >= 6) {
    time = 6
  }
  delayDataClearTime = time*1000
  console.log("设置延时时间成功：" + delayDataClearTime)

  res.json({
    err: 0,
    success: 1
  })
})

// 获取延迟时间
router.get('/api/getDelayTime', ( req, res) => {
  res.json({
    err: 0,
    time: parseInt(delayDataClearTime/100)/10
  })
})

// 清空所有生产数据
router.get('/api/emptyAllData', (req, res) => {
  allData = []
  Util.saveData('./route/data.text', JSON.stringify(allData)).then(
    isSucess => {
      if (isSucess) {
        console.log('清空数据成功')
      }
    }
  )

  res.json({
    err:0,
    isSucess: 1
  })
})

// 清空异常数据
router.get('/api/emptyErrData', (req, res) => {
  errData = []
  Util.saveData('./route/err.text', JSON.stringify(errData)).then(
    isSucess => {
      if (isSucess) {
        console.log('清空异常数据成功')
      }
    }
  )
  res.json({
    err:0,
    isSucess: 1
  })
})

module.exports = router
