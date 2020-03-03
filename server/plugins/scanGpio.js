var fs = require('fs')
var path = require('path')
var rpio = require('rpio')
var ScanPort = require('./scanSerialport.js')
var ScanData = require('./scanData.js')

// 离线测试启用
rpio.init({ mock: 'raspi-3' })

// 定义输入pin(公共端0V,上升沿触发)
var IN_ACTIVE_PIN = 11 // 检测信号
// rpio.open(IN_ACTIVE_PIN, rpio.INPUT, rpio.PULL_DOWN)
rpio.mode(IN_ACTIVE_PIN, rpio.INPUT)
rpio.pud(IN_ACTIVE_PIN, rpio.PULL_DOWN) // 启动下拉电阻

var IN_CONFIRM_PIN = 13 // 异常确认
// rpio.open(IN_CONFIRM_PIN, rpio.INPUT, rpio.PULL_DOWN)
rpio.mode(IN_CONFIRM_PIN, rpio.INPUT)
rpio.pud(IN_CONFIRM_PIN, rpio.PULL_DOWN) // 启动下拉电阻

var IN_ISPASS_PIN = 15 // 直通信号
// rpio.open(IN_ISPASS_PIN, rpio.INPUT, rpio.PULL_DOWN)
rpio.mode(IN_ISPASS_PIN, rpio.INPUT)
rpio.pud(IN_ISPASS_PIN, rpio.PULL_DOWN) // 启动下拉电阻

// 定义输出pin(公共端0V,动作时高电压)
var OUT_GOPASS_PIN = 12 // 放行信号
rpio.open(OUT_GOPASS_PIN, rpio.OUTPUT, rpio.LOW)
var OUT_ALERT_PIN = 22 // 报警信号
rpio.open(OUT_ALERT_PIN, rpio.OUTPUT, rpio.LOW)
var OUT_RED_PIN = 36 // 红灯、报警指示
rpio.open(OUT_RED_PIN, rpio.OUTPUT, rpio.LOW)
var OUT_YELLOW_PIN = 38 // 黄灯、待机指示
rpio.open(OUT_YELLOW_PIN, rpio.OUTPUT, rpio.LOW)
var OUT_GREEN_PIN = 40 // 绿灯、检测通过
rpio.open(OUT_GREEN_PIN, rpio.OUTPUT, rpio.LOW)

// 报警
var runAlert = function () {
    rpio.write(OUT_ALERT_PIN, rpio.HIGH)
    rpio.write(OUT_GREEN_PIN, rpio.LOW)
    rpio.write(OUT_YELLOW_PIN, rpio.LOW)
    rpio.write(OUT_RED_PIN, rpio.HIGH)
}

// 检测通过放行
var runGoPass = function () {
    rpio.write(OUT_GOPASS_PIN, rpio.HIGH)
    setTimeout(() => {
        rpio.write(OUTPUT, rpio.LOW)
        clearTimeout(successTimer)
    }, 5000) // 放行5s
    rpio.write(OUT_GREEN_PIN, rpio.HIGH)
    rpio.write(OUT_YELLOW_PIN, rpio.LOW)
    rpio.write(OUT_RED_PIN, rpio.LOW)
}

// 状态复位
var runReset = () => {
    rpio.write(OUT_ALERT_PIN, rpio.LOW)
    rpio.write(OUT_GOPASS_PIN, rpio.LOW)
    rpio.write(OUT_GREEN_PIN, rpio.LOW)
    rpio.write(OUT_YELLOW_PIN, rpio.HIGH)
    rpio.write(OUT_RED_PIN, rpio.LOW)
}

// 接收检测信号，触发扫描, 上升沿触发
let activeTimer = null
const reg = /\d{13}L\d{12}/
let active_CB = async () => {
    if (activeTimer !== null) return
    let times = 0
    activeTimer = setTimeout(() => {
        clearTimeout(activeTimer)
        activeTimer = null
    }, 1000) // *ms重复检测信号不做处理

    // 串口数据
    let portData = {
        left: '',
        right: ''
    }
    let portRes = await ScanPort.getPortData() // 获取串口数据
    if (portRes.length <= 2) {
        runAlert()
        console.log('条码枪连接失败！')
        return
    }

    if (portRes[0].success && reg.test(portRes[0].data) && portRes[1].success && reg.test(portRes[1].data)) { // 数据正常
        portData.left = portRes[0].data
        portData.right = portRes[1].data
        ScanData.setNewScanItem(portData)
        runGoPass() // 放行
        return
    } else if (!portRes[0].success && !portRes[1].success) { // 双端口数据异常
        while (times < 10) {
            portRes = await ScanPort.getPortData() // 获取串口数据
            portData.left = portRes[0].data
            portData.right = portRes[1].data
            ScanData.setNewScanItem(portData)
            if (portRes[0].success && portRes[1].success) {
                runGoPass() // 放行
                break
            }
            times++
        }
        if (times >= 10) {
            runAlert() // 检测次数上限报警
            return
        }
    } else if ((!portRes[0].success || !reg.test(portRes[0].data)) && (portRes[1].success && reg.test(portRes[1].data))) { //端口1数据异常
        portData.right = portRes[1].data
        while (times < 10) {
            let port1Res = await ScanPort.getPortScanData(ScanPort.ports[0])
            portData.left = port1Res.data
            ScanData.setNewScanItem(portData)
            if (port1Res.success && reg.test(port1Res.data)) {
                runGoPass() // 放行
                break
            }
            times++
        }
        if (times >= 10) {
            runAlert() // 检测次数上限报警
            return
        }
    } else if ((portRes[0].success && reg.test(portRes[0].data)) && (!portRes[1].success || !reg.test(portRes[1].data))) { //端口2数据异常
        portData.left = portRes[0].data
        while (times < 10) {
            let port2Res = await ScanPort.getPortScanData(ScanPort.ports[1])
            portData.right = port2Res.data
            ScanData.setNewScanItem(portData)
            if (port2Res.success && reg.test(port2Res.data)) {
                runGoPass() // 放行
                break
            }
            times++
        }
        if (times >= 10) {
            runAlert() // 检测次数上限报警
            return
        }
    }

}
// 轮询检测信号
rpio.poll(IN_ACTIVE_PIN, active_CB, rpio.POLL_HIGH)

// 导出gpio模块
module.exports = {
    IN_ACTIVE_PIN,
    IN_CONFIRM_PIN,
    IN_ISPASS_PIN,

    OUT_GOPASS_PIN,
    OUT_ALERT_PIN,
    OUT_RED_PIN,
    OUT_YELLOW_PIN,
    OUT_GREEN_PIN,

    runAlert,
    runGoPass,
    runReset
}