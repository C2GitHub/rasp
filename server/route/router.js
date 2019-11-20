var express = require('express')
var rpio = require('rpio')

var router = express.Router()

// pin state
var p16state = 0
var p16sos = 0
rpio.open(15, rpio.INPUT, rpio.PULL_DOWN);
function pollCallback(ckpin) {
    var state = rpio.read(ckpin)
    p16sos = 1
    console.log(`${ckpin} state is ${state}`)
}

rpio.poll(15, pollCallback)


// define the home page route
router.get('/', function (req, res) {
    res.send('Birds home page')
})
// define the about route
router.get('/runblink', function (req, res) {
    // 查询参数
    var res = req.query.res
    if (res && res === 'reset') {
        p16state = 0
        p16sos = 0
    }
    // 定义pin口状态
    rpio.open(16, rpio.OUTPUT, rpio.HIGH)
    if (!p16state) {
        p16state = 1
        while (1) {
            /* On for 1 second */
            rpio.write(16, rpio.HIGH);
            rpio.sleep(1);

            /* Off for half a second (500ms) */
            rpio.write(16, rpio.LOW);
            rpio.msleep(1000);
        }
        res.json({
            err: 0,
            state: 1,
            msg: 'running'
        })
    } else {
        p16state = 0
        rpio.close(16, rpio.PIN_RESET)
        res.json({
            err: 0,
            state: 0,
            msg: 'stop'
        })
    }
})


var rpio = require('rpio')

module.exports = router