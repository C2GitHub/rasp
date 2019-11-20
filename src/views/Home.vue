<template>
  <div class="home">
    <el-container style="height: 500px; border: 1px solid #eee">
      <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
        <el-menu :default-openeds="['1', '3']">
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-message"></i>测试
            </template>
            <el-menu-item-group>
              <template slot="title">位控制</template>
              <router-link to="/home/blink"><el-menu-item index="1-1">blink</el-menu-item></router-link>
              <router-link to="/home/poll"><el-menu-item index="1-2">poll</el-menu-item></router-link>
            </el-menu-item-group>
            <el-menu-item-group title="模拟量控制">
              <el-menu-item index="1-3">测试1</el-menu-item>
            </el-menu-item-group>
            <el-submenu index="1-4">
              <template slot="title">PWM</template>
              <el-menu-item index="1-4-1">测试1</el-menu-item>
            </el-submenu>
          </el-submenu>
        </el-menu>
      </el-aside>

      <el-container>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import Vue from 'vue'
import {Button, Card, Cont, ContaContainer, Table} from 'element-ui'
Vue.use(Button)
Vue.use(Card)
export default {
  name: "home",
  data () {
    return {}
  },
  components: {

  }
};
</script>

<style lang="less">
.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}
</style>