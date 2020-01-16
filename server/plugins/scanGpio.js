var fs = require('fs')
var path = require('path')
var rpio = require('rpio')

// 离线测试启用
rpio.init({ mock: 'raspi-3' })
// rpio.on('warn', function() {})

// 定义输入pin(公共端0V,上升沿触发)
var IN_ACTIVE_PIN = 11 // 检测信号
rpio.open(IN_ACTIVE_PIN, rpio.INPUT, rpio.PULL_DOWN)
var IN_CONFIRM_PIN = 13 // 异常确认
rpio.open(IN_CONFIRM_PIN, rpio.INPUT, rpio.PULL_DOWN)
var IN_ISPASS_PIN = 15 // 直通信号
rpio.open(IN_ISPASS_PIN, rpio.INPUT, rpio.PULL_DOWN)

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