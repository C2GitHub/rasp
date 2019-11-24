<template>
  <div id="pcTab">
    <el-menu :default-openeds="['1','2', '3']" :router="true">
      <el-submenu index="1">
        <template slot="title"><i class="el-icon-menu"></i>消毒柜1线</template>
        <el-menu-item-group>
          <template slot="title">运行状态</template>
          <el-menu-item index="/pline1/home">
          当前状态
            </el-menu-item>
          <el-menu-item index="/pline1/operate">
                          远程操作
          </el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group title="数据记录">
          <el-menu-item index="/pline1/current">
              实时数据
          </el-menu-item>
          <el-menu-item index="/pline1/history">
            异常历史
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      

            <el-submenu index="2">
        <template slot="title"><i class="el-icon-menu"></i>消毒柜2线</template>
        <el-menu-item-group>
          <template slot="title">运行状态</template>
          <el-menu-item index="/pline1/home">
              当前状态
            </el-menu-item>
          <el-menu-item index="/pline1/operate">
              远程操作
          </el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group title="数据记录">
          <el-menu-item index="/pline1/current">
              实时数据
          </el-menu-item>
          <el-menu-item index="/pline1/history">
            异常历史
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title"><i class="el-icon-setting"></i>SETTING</template>
        <el-menu-item-group>
          <template slot="title">信息</template>
          <el-menu-item index="/pline1/blink">
            通讯
          </el-menu-item>
          <el-menu-item index="/pline1/blink">
            接口
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
  export default {
    methods: {
    }
  }
</script>

<style lang="less" scoped>
#pcTab{
  padding-bottom: 20px;
}
.el-menu{
  padding-left: 14px;
  font-size: 18px;
  .el-menu-item{
    padding-left:60px !important;
    color: #303133
  }
}
</style>