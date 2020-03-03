<template>
  <div id="mTab">
    <el-menu :default-active="defaultActive" class="el-menu" mode="horizontal" active-text-color="#409EFF" @select="handleSelect">
        <el-menu-item index="1">
          <router-link to="/pline1/page1">
          <div class="icon"><i class="el-icon-s-home"></i></div>
            <div class="text">首页</div>
          </router-link>
        </el-menu-item>
        <el-menu-item index="2">
          <router-link to="/pline1/page2">
          <div class="icon"><i class="el-icon-setting"></i></div>
            <div class="text">操作</div>
          </router-link>
        </el-menu-item>
        <el-menu-item index="3">
          <router-link to="/pline1/page3">
          <div class="icon"><i class="el-icon-s-order"></i></div>
            <div class="text">记录</div>
          </router-link>
        </el-menu-item>
        <el-menu-item index="4">
          <router-link to="/pline1/page4">
           <div class="icon"><i class="el-icon-s-release"></i></div>
            <div class="text">异常</div>
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
       // console.log(key, keyPath);
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
  height: 60px;
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
#mTab{
  .icon{
    height: 20px;
    line-height: 20px;
    margin: 5px 0;
    i{
      margin: 0;
    }
  }
  .text{
    height: 14px;
    line-height: 14px;
  }
}
</style>