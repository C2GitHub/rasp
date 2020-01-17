<template>
  <div id="home">
    <!-- 当前条码显示 -->
    <div class="title">
      <p>当前扫描条码 :</p>
    </div>
    <el-container class="dataArea">
      <div class="showData">
        <el-form ref="form" label-width="80px">
          <el-form-item label="左侧条码">
            <el-input v-model="newItem.left" :readonly="true"></el-input>
          </el-form-item>
          <el-form-item label="右侧条码">
            <el-input v-model="newItem.right" :readonly="true"></el-input>
          </el-form-item>
          <el-form-item label="扫描时间">
            <el-input v-model="newItem.time" :readonly="true"></el-input>
          </el-form-item>
          <el-form-item label="数据状态">
            <el-button
              :type="newItem.state === 1 ? 'success' : 'danger'"
              :icon="newItem.state === 1 ? 'el-icon-check' : 'el-icon-close'"
            >{{ newItem.state === 1 ? '正确' : '异常' }}</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-container>
  </div>
</template>

<script>
import Api from "../plugins/api.js";
import BScroll from "better-scroll";
import { mapMutations } from "vuex";
import moment from "moment";

export default {
  name: "L1home",
  data() {
    return {
      newItem: {
        left: "",
        right: "",
        state: "",
        time: ""
      }
    };
  },
  methods: {
    dateFormat: function(row, column) {
      var date = row.time;
      if (date == undefined) {
        return "";
      }
      return moment(date).format("YYYY-MM-DD HH:mm:ss");
    }
  },
  created() {
    // 页面数据初始化完成、设置轮询获取最新数据
    setInterval(() => {
      Api.getCurrentOne().then(res => {
        if (!res.data) return;
        if (
          res.data.left !== this.newItem.left ||
          res.data.right !== this.newItem.right
        ) {
          Object.assign(this.newItem, res.data)
          this.newItem.time = moment(res.data.time).format(
            "YYYY-MM-DD  HH:mm:ss"
          )
          this.$notify({
            title: res.data.state === 1 ? "成功" : "异常",
            message: res.data.left,
            type: res.data.state === 1 ? "success" : "error",
            position: "bottom-right"
          });
        }
      });
    }, 3000); // 轮询间隔，正常工作500ms以下
  },
  mounted() {
  }
};
</script>

<style lang="less" scoped>
#home {
  width: 100%;
  .input-wraper {
    width: 100%;
    // height: 0px;
    overflow: hidden;
  }
  .input {
    width: 100%;
    margin: 0 auto;
  }
  .inputNow {
    z-index: 999;
  }
  .dataArea {
    padding: 20px;
    padding-left: 0;
    border: 1px solid #ebebeb;
    border-radius: 4px;
  }
  .title {
    width: 100%;
  }
  .showData {
    width: 100%;
  }
  .state {
    display: inline-block;
    width: 20%;
    .btn {
      width: 40px;
      height: 40px;
      margin: 20px auto;
      .el-button {
        padding: 18px;
      }
    }
  }
}
</style>
