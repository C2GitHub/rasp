<template>
  <div id="operate">
    <el-container class="switch">
      <div class="source">
        <p>功能选择</p>
        <div class="el-form-item">
          <label class="el-form-item__label" style="width: 80px;"
            >自动模式</label
          >
          <div class="el-form-item__content" style="margin-left: 80px;">
            <el-switch
              v-model="isAuto"
              active-text="启用"
              active-color="#13ce66"
              inactive-color="#ff4949"
            >
              >
            </el-switch>
          </div>
        </div>

        <div class="el-form-item">
          <label class="el-form-item__label" style="width: 80px;"
            >直通模式</label
          >
          <div class="el-form-item__content" style="margin-left: 80px;">
            <el-switch
              v-model="isPass"
              active-text="关闭"
              active-color="#13ce66"
              inactive-color="#ff4949"
            >
              >
            </el-switch>
          </div>
        </div>
      </div>
    </el-container>

    <el-container>
      <div class="source">
        <p>远程控制</p>
        <div class="el-form-item">
          <el-button type="primary" @click="confirm">异常确认 / 放行</el-button>
        </div>

        <div class="el-form-item"></div>
      </div>
    </el-container>
  </div>
</template>

<script>
import Util from '../plugins/util.js'
export default {
  data() {
    return {
      isAuto: true,
      isPass: false,
      isAutoTimer: null,
      isPassTimer: null
    }
  },
  watch: {
    isAuto(val) {
      if (this.isAutoTimer) return

      Util.setAuto(val ? 1 : 0).then(state => {
        this.isAutoTimer = setTimeout(() => {
          if (state == 1) {
          this.isAuto = true
          this.$notify.success({
          title: '正确',
          message: '自动运行中',
          position: 'bottom-right'
        })
        }else {
          this.isAuto = false
          this.$notify({
          title: '警告',
          message: '当前处于手动状态',
          type: 'error',
          position: 'bottom-right'
        })
        }

        clearTimeout(this.isAutoTimer)
        this.isAutoTimer = null
        }, 200)
      })
    },
       isPass(val) {
      if (this.isPassTimer) return

      Util.setPass(val ? 1 : 0).then(state => {
        console.log(state)
        this.isPassTimer = setTimeout(() => {
          if (state == 1) {
          this.isPass = true
          this.$notify({
          title: '禁止',
          message: '直通模式打开',
          type: 'error',
          position: 'bottom-right'
        })
        }else {
          this.isPass = false
          this.$notify({
          title: '成功',
          message: '直通模式关闭',
          position: 'bottom-right',
          type: 'success'
        })
        }

        clearTimeout(this.isPassTimer)
        this.isPassTimer = null
        }, 200)
      })
    }
  },
  methods: {
    confirm() {
      Util.confirmPass().then(state => {
      if (state) {
        this.$notify({
          title: '成功',
          message: '放行成功',
          type: 'success',
          position: 'bottom-right'
        })
      } else {
        this.$notify.error({
          title: '错误',
          message: '上传数据失败！',
          position: 'bottom-right'
        })
      }
      })
    }
  }
}
</script>

<style lang="less" scoped>
#operate {
  width: 100%;
  .runState {
    margin-top: 20px;
    line-height: 26px;
    button {
      margin-left: 20px;
      margin-bottom: 5px;
    }
  }
  .test {
    margin-top: 20px;
    text-align: left;
  }
}
</style>
