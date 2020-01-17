<template>
  <div id="app">
    <el-container>
      <el-header><i class="el-icon-upload"></i>扫码信息监控系统</el-header>
      <el-container class="main">
        <el-aside width="20%" class="hidden-xs-only aside" ref="aside">
          <pc-tab></pc-tab>
        </el-aside>
        <el-container ref="main">
          <el-main>
            <keep-alive>
              <router-view v-if="$route.meta.keepAlive"></router-view>
            </keep-alive>
            <router-view v-if="!$route.meta.keepAlive"></router-view>
          </el-main>
        </el-container>
      </el-container>
      <el-container class="footer hidden-sm-and-up">
        <el-footer height="60px">
          <m-tab></m-tab>
        </el-footer>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import pcTab from '@/components/pcTab.vue'
import mTab from '@/components/mTab.vue'
import BScroll from 'better-scroll'
export default {
  name: 'app',
  components: {
    pcTab,
    mTab
  },
  mounted() {
    this.$nextTick(() => {
      setTimeout(() => {
        this._initBS()
      }, 0)
    })
  },
  methods: {
    _initBS() {
      this.aBScroll = new BScroll(this.$refs.aside.$el, {
        // aside
        click: true,
        bounce: true,
        scrollbar: false,
        preventDefault: false,
        tap: true,
        mouseWheel: true
      })
      this.mBScroll = new BScroll(this.$refs.main.$el, {
        // main
        click: true,
        bounce: true,
        scrollbar: false,
        preventDefault: false,
        tap: true,
        mouseWheel: true
      })
    }
  },
  beforeRouteLeave(to, from, next) {
    this.loading = true
    console.log(to, from)
    if (to.path.startsWith('/')) {
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

<style lang="less">
html,
body {
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
  overflow: hidden;
}
#app {
  font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB',
    'Microsoft YaHei', '微软雅黑', Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
#app .el-header {
  width: 100%;
  height: 50px !important;
  line-height: 50px;
  font-size: 20px;
  color: #fff;
  font-weight: normal;
  background-color: #409eff;
  overflow: hidden;
  i {
    font-size: 40px;
    line-height: 50px;
    margin-right: 10px;
    vertical-align: top;
  }
}
.main {
  position: absolute;
  width: 100%;
  top: 0;
  left: 0;
  margin-top: 58px;
}
.footer {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 50px;
  border: 1px solid #ebeef5;
  border-radius: 4px 4px 0 0;
  box-shadow: 0 -2px 12px 0 rgba(0, 0, 0, 0.1);
}
.aside {
  overflow: hidden;
  box-shadow: 2px 0 12px 0 rgba(0, 0, 0, 0.1);
  z-index: 1;
}
.el-main {
  height: 100%;
  padding: 0.2rem;
}
.el-footer {
  padding: 0;
}
.source {
  width: 100%;
  padding: 0.2rem;
  border: 1px solid #ebebeb;
  border-radius: 4px;
  margin-bottom: 10px;
}
// 适配移动端
@media screen and (max-width: 768px) {
  #app .el-header {
    text-align: center;
    font-size: 18px;
    i {
      font-size: 30px;
      margin-right: 6px;
    }
  }
  .main {
    bottom: 50px;
    padding-bottom: 0 !important;
  }
}
// 适配pc端
@media screen and (min-width: 768px) {
  .main {
    bottom: 0;
  }
}
</style>
