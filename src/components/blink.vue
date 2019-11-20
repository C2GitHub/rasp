<template>
  <div id="blink">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>树莓派控制系统</span>
        <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
      </div>
      <el-button type="primary" @click="runBlink">点击运行</el-button>
      <el-button type="success" @click="resetBlink">复位</el-button>
      <div class="runState">
        运行状态
        <el-button :type="state ? 'primary' : 'danger'" circle></el-button>
      </div>
      <div class="test">
        <h2>测试输出口pin16(高电平输出)</h2>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      state: 0
    };
  },
  methods: {
    runBlink() {
      this.$axios.get("/api/runblink").then(res => {
        console.log(res);
        if (res.data.err === 0) {
          console.log(res.data);
          this.state = res.data.state;
        }
      });
    },
    resetBlink() {
      this.$axios.get("/api/runblink", { res: 'reset'}).then(res => {
        console.log(res);
        if (res.data.err === 0) {
          console.log(res.data);
          this.state = res.data.state;
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
#blink {
  overflow: hidden;
  text-align: left;
  .runState {
    float: right;
    line-height: 26px;
    button {
      margin-left: 20px;
      margin-bottom: 5px;
    }
  }
  .test {
    margin-top: 20px;
    text-align: left;
  }
}
</style>