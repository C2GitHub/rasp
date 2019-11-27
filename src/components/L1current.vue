<template>
  <div id="current">
    <el-container>
      <div class="table">
        <el-table :data="$store.state.allData" border style="width: 100%">
          <el-table-column prop="date" label="时间" sortable  :formatter="dateFormat">
            
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
import { mapMutations } from 'vuex'
import Util from '../plugins/util.js'
import moment from 'moment'

export default {
  name: 'HelloWorld',
  props: {},
  data() {
    return {
      scanData: []
    }
  },
  mounted() {
    
  },
  methods: {
    ...mapMutations(['pushAllData']),
    dateFormat: function(row, column) {
      var date = row.time
      if (date == undefined) {
        return ''
      }
      return moment(date).format('YYYY-MM-DD HH:mm:ss')
    }
  }
}
</script>

<style scoped lang="less" scoped>
#current {
  width: 100%;
}
.table {
  width: 100%;
}
</style>
