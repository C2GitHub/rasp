<template>
  <div id="home">
    <!-- 条码扫描入口 -->
    <el-container>
      <div class="input-wraper">
        <div class="input">
          <el-input
            v-model="input"
            placeholder="条码扫描"
            autofocus="true"
            ref="input"
            @blur="onBlur"
          ></el-input>
        </div>
      </div>
    </el-container>

    <!-- 当前条码显示 -->
    <div class="title"><p>当前扫描条码 :</p></div>
    <el-container class="dataArea">
      <div class="showData">
        <el-form ref="form" label-width="80px">
          <el-form-item label="左侧条码">
            <el-input v-model="inputNow.left"></el-input>
          </el-form-item>
          <el-form-item label="右侧条码">
            <el-input v-model="inputNow.right"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div class="state">
        <div class="btn">
          <el-button
            :type="inputNow.state === 1 ? 'success' : 'danger'"
            :icon="inputNow.state === 1 ? 'el-icon-check' : 'el-icon-close'"
            circle
          ></el-button>
        </div>
      </div>
    </el-container>

    {{ input }}
  </div>
</template>

<script>
import Util from '../plugins/util.js'
import BScroll from 'better-scroll'

export default {
  name: 'L1home',
  data() {
    return {
      input: '',
      inputNow: '',
      timer: null,
      times: 0
    }
  },
  methods: {
    onBlur: e => {
      e.target.focus()
    }
  },
  watch: {
    input(val, oldVal) {
      if (this.timer) {
        return
      }
      this.timer = setTimeout(() => {
        // 判断数据是否正确输入
        if (this.input.length === 26) {
          console.log('扫码正常:' + this.input)
          // 数据正确输入，发送给服务器
          Util.sentNewDate(this.input).then(flag => {
            if (!flag) {
              // 数据传输失败
              this.$notify.error({
                title: '错误',
                message: '上传数据失败！',
                position: 'bottom-right'
              })
            }
          })
        } else if (this.input.length > 0) {
          //清空时误触发
          // 数据长度不符合要求
          console.log('扫码异常:' + this.input)
          if (this.times < 3) {
            this.input = ''
            Util.scanAgain()
            this.times++
          } else {
            // 发送位置错误信息
            Util.sentPosErr()
            this.times = 0
            this.input = ''
          }
        }
        // 清除定时器
        clearTimeout(this.timer)
        this.timer = null
        // 数据清零
        this.input = ''
      }, 500)
    }
  },
  mounted() {
    // 设置轮询获取最新数据
    // 页面启动*s后还是执行轮询
    setTimeout(() => {
      setInterval(() => {
        Util.getCurrentOne().then(res => {
          if (res.data !== '') {
            this.inputNow = res.data
            this.$notify({
              title: '成功',
              message: res.data.left,
              type: 'success',
              position: 'bottom-right'
            })
          }
        })
      }, 3000) // 轮询间隔，正成工作500以下
    }, 1000)
  },
  beforeRouteLeave(to, from, next) {
    this.loading = true
    console.log(to, from)
    if (to.path.startsWith('/pline1')) {
      from.meta.keepAlive = true
      to.meta.keepAlive = true
    } else {
      from.meta.keepAlive = false
      // this.$destroy()
    }
    next()
  }
}
</script>

<style lang="less" scoped>
#home {
  width: 100%;
  .input-wraper {
    width: 100%;
    // height: 0px;
    overflow: hidden;
  }
  .input {
    width: 100%;
    margin: 0 auto;
  }
  .inputNow {
    z-index: 999;
  }
  .dataArea {
    margin: 20px 0;
    padding: 20px;
    border: 1px solid #ebebeb;
    border-radius: 4px;
  }
  .title {
    width: 100%;
  }
  .showData {
    display: inline-block;
    width: 80%;
  }
  .state {
    display: inline-block;
    width: 20%;
    .btn {
      width: 40px;
      height: 40px;
      margin: 20px auto;
      .el-button {
        padding: 18px;
      }
    }
  }
}
</style>
