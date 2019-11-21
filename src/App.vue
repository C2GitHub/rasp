<template>
  <div id="app">
    <el-container>
      <el-header>设备状态远程监控</el-header>
      <el-container>
        <el-aside width="20%">Aside</el-aside>
        <el-container>
          <el-main>
            <router-view></router-view>
          </el-main>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'app',
  components: {}
}
</script>

<style lang="less">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
#app .el-header {
  height: 50px !important;
  line-height: 50px;
  font-size: 20px;
  color: #fff;
  font-weight: normal;
  background-color: rgb(84, 92, 100);
  border-bottom: 2px solid #E4E7ED;
}
.el-main{
  padding: .2rem
}
</style>
