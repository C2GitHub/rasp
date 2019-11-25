<template>
  <div id="current">
        <el-container>
      <div class="table">
        <el-table :data="data10" border style="width: 100%">
          <el-table-column prop="date" label="时间" sortable>
            <template slot-scope="scope">{{
              scope.row.date | dateFormat
            }}</template>
          </el-table-column>
          <el-table-column prop="left" label="左侧条码" sortable>
          </el-table-column>
          <el-table-column prop="right" label="右侧条码" sortable>
          </el-table-column>
          <el-table-column prop="state" label="状态">
            <template slot-scope="scope">
              <el-button
                :type="scope.row.state === 1 ? 'success' : 'danger'"
                :icon="
                  scope.row.state === 1 ? 'el-icon-check' : 'el-icon-close'
                "
                circle
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    
  }
}
</script>

<style scoped lang="less" scoped>
#current{
  width: 100%;
}
  .table {
    width: 100%;
  }
</style>
