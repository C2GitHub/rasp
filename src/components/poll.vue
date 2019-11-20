<template>
  <div id="poll">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>树莓派控制系统</span>
        <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
      </div>
      <div v-for="o in 4" :key="o" class="text item">{{'poll测试页面 ' + o }}</div>
    </el-card>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
</style>