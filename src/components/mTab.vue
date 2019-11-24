<template>
  <div id="mTab">
    <el-menu :default-active="defaultActive" class="el-menu" mode="horizontal" @select="handleSelect">
        <el-menu-item index="1">
          <router-link to="/pline1/home">
            消毒柜1线
          </router-link>
        </el-menu-item>
        <el-menu-item index="2">
          <router-link to="/pline1/home">
            消毒柜2线
          </router-link>
        </el-menu-item>
        <el-menu-item index="3">
          <router-link to="/pline1/saoma">
            接口信息
          </router-link>
        </el-menu-item>
      </el-menu>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        defaultActive: "1"
      }
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      }
    },
  }
</script>

<style lang="less" scoped>
#mTab{
  width: 100%;
  height: 100%;
}
.el-menu--horizontal > .el-menu-item {
  color: #303133;
}
.el-menu {
  display: flex;
  width: 100%;
  height: 50px;
  line-height: 50px;
  font-weight: 500;
  font-size: 0.14rem;
  color: #303133;
  align-items: flex-start;
  align-content: flex-start;
}
.footer .el-menu .el-menu-item {
  flex: 1;
  height: 100%;
  line-height: 100%;
  padding: 0;
  line-height: 60px;
  font-size: 14px;
  justify-content: space-between;
  text-align: center;
  &.is-active{
    border-bottom: 4px solid #409EFF;
  }
}
.footer .el-menu .el-menu-item a {
  display: block;
  width: 100%;
  height: 100%;
  line-height: 60px;
  font-size: 14px;
  font-weight: 500;
  padding: 0;
  text-decoration: none;
}

.el-card{
  width: 100%;
}
.el-card__header{
  padding: 10px;
}
</style>