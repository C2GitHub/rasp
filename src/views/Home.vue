<template>
  <div id="home">
    <el-container>
      <el-container>
        <router-view></router-view>
      </el-container>
      <router-link to="/home/blink">
        <el-button type="primary">Blink</el-button>
      </router-link>
      <router-link to="/home/poll">
        <el-button type="primary">Poll</el-button>
      </router-link>
      <router-link to="/home/pwm">
        <el-button type="primary">PWM</el-button>
      </router-link>
    </el-container>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import Vue from "vue";
import { Button, Card, Cont, ContaContainer, Table } from "element-ui";
Vue.use(Button);
Vue.use(Card);
export default {
  name: "home",
  data() {
    return {};
  },
  components: {}
};
</script>

<style lang="less">
#home {
  .el-container {
    a {
      margin-right: 10px;
    }
  }
}
.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}
</style>