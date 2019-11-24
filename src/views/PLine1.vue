<template>
  <div id="main-warper">
    <el-container class="container">
      <el-card class="box-card">
        <div slot="header" class="hidden-sm-and-up">
          <el-menu
            default-active="1"
            class="el-menu"
            :router="true"
            mode="horizontal"
          >
            <el-menu-item class="is-active" style="" index="/pline1/home">
              当前状态
            </el-menu-item>
            <el-menu-item index="/pline1/operate">
              远程操作
            </el-menu-item>
            <el-menu-item index="/pline1/current">
              实时数据
            </el-menu-item>
            <el-menu-item index="/pline1/history">
              异常记录
            </el-menu-item>
          </el-menu>
        </div>
        <router-view></router-view>
      </el-card>
    </el-container>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import Vue from 'vue'
import { Button, Card, Cont, ContaContainer, Table } from 'element-ui'
Vue.use(Button)
Vue.use(Card)
export default {
  name: 'PLine1',
  data() {
    return {
      defaultActive: '1',
      routes: [
        { path: '/pline1/home', title: '当前状态' },
        { path: '/pline1/operate', title: '远程操作' },
        { path: '/pline1/current', title: '实时数据' },
        { path: '/pline1/history', title: '异常记录' }
      ]
    }
  },
  components: {},
  methods: {},
  mounted() {
    this.$nextTick(() => {
      document.querySelector('.el-menu-item').classList.add('is-active')
      document.querySelector('.el-menu-item').style = ""
    })
  }
}
</script>

<style lang="less">
#main-warper {
  width: 100%;
  .container {
    width: 100%;
    height: 100%;
  }
}
.el-header {
  background-color: #b3c0d1;
  color: #333;
  height: 0.7rem;
  line-height: 0.7rem;
  margin-bottom: 10px;
}
.el-menu--horizontal > .el-menu-item {
  color: #303133;
}
.el-menu {
  width: 100%;
  font-weight: 500;
  font-size: 0.14rem;
  color: #303133;
}
.el-menu .el-menu-item {
  height: 30px;
  line-height: 30px;
  padding: 0;
}
.el-menu .el-menu-item a {
  display: block;
  height: 30px;
  line-height: 30px;
  padding: 0 0.1rem;
  font-size: 14px;
  text-align: center;
  text-decoration: none;
}
.el-card {
  width: 100%;
  height: 100%;
}
#main-warper {
  .el-card__header {
    padding: 10px;
    border-bottom: none;
    color: #303133;
    box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.1);
    .el-menu {
      display: flex;
      border: none;
    }
    .el-menu-item {
      flex: 1;
      text-align: center;
      a {
        display: block;
        width: 100%;
        height: 100%;
        line-height: 50px;
        font-size: 14px;
        font-weight: 500;
        padding: 0;
        text-decoration: none;
      }
    }
  }
}
</style>
