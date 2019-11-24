<template>
  <div id="home">
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
        <div class="input inputNow">
          <el-input
            v-model="inputNow.left"
            placeholder="条码扫描"
            autofocus="true"
            ref="input"
            @blur="onBlur"
          ></el-input>
        </div>
      </div>
    </el-container>

    <el-container>
      <div class="table">
        <el-table :data="data10" border style="width: 100%">
          <el-table-column prop="date" label="时间" sortable>
            <template slot-scope="scope">{{
              scope.row.date | dateFormat
            }}</template>
          </el-table-column>
          <el-table-column prop="left" label="左侧条码" sortable>
          </el-table-column>
          <el-table-column prop="right" label="右侧条码" sortable>
          </el-table-column>
          <el-table-column prop="state" label="状态">
            <template slot-scope="scope">
              <el-button
                :type="scope.row.state === 1 ? 'success' : 'danger'"
                :icon="
                  scope.row.state === 1 ? 'el-icon-check' : 'el-icon-close'
                "
                circle
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
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
      state: 0,
      input: '',
      inputNow: '',
      timer: null,
      times: 0,
      data10: []
    }
  },
  methods: {
    toast(msg) {
      const h = this.$createElement

      this.$notify({
        title: msg,
        message: h('i', { style: 'color: teal' })
      })
    },
    onBlur: e => {
      e.target.focus()
    },
    onChange: e => {
      console.log(e)
    }
  },
  watch: {
    input(val, oldVal) {
      if(this.timer) {
        return;
      }
      this.timer = setTimeout(() => {
        // 判断数据是否正确输入
        if (this.input.length === 26) {
          console.log('扫码正常:' + this.input)
          // 数据正确输入，发送给服务器
          Util.sentNewDate(this.input).then(flag => {
            if (!flag) {
              // 数据传输失败
              this.$notify({
                titile: "上传数据",
                message: '上传数据失败！',
                position: 'bottom-right'
              })
            }
          })
        } else if(this.input.length > 0) { //清空时误触发
          // 数据长度不符合要求
          console.log('扫码异常:' +  this.input)
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
          this.times = 0
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
            this.data10.unshift(res.data)
          }
          if (this.data10.length > 10) {
            this.data10.pop()
          }
        })
      }, 3000) // 轮询间隔，正成工作500以下
    }, 1000)
  },
  beforeRouteLeave (to, from, next) {
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
   position: relative;
    width: 100%;
  }
  .input {
   position: absolute;
   left: 0;
   top: 0;
    width: 100%;
    margin: 0 auto;
  }
  .table {
    width: 100%;
    margin-top: 60px;
  }
  .inputNow {
    z-index: 999;
  }
}
</style>
