<template>
  <div id="home">
    <el-container>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
   <el-menu default-active="1" class="el-menu" mode="horizontal">
        <el-menu-item index="1">
          <router-link to="/home/blink">
            Blink
          </router-link>
        </el-menu-item>
        <el-menu-item index="2">
          <router-link to="/home/blink">
            Poll
          </router-link>
        </el-menu-item>
        <el-menu-item index="3">
          <router-link to="/home/blink">
            PWM
          </router-link>
        </el-menu-item>
        <el-menu-item index="4">
          <router-link to="/home/saoma">
            扫码枪
          </router-link>
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
  name: 'home',
  data() {
    return {}
  },
  components: {}
}
</script>

<style lang="less">
#home {}
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
  padding: 0 0.2rem;
  font-size: 14px;
  text-decoration: none;
}
.el-card{
  width: 100%;
}
.el-card__header{
  padding: 10px;
  border-bottom: none;
}
</style>
