<template>
  <div id="blink">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>树莓派控制系统</span>
        <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
      </div>
      <div :style="{width:'100%'}">
        <el-button type="danger" @click="runBlink">运行</el-button>
        <el-button type="primary" @click="stopBlink">停止</el-button>
        <el-button type="success" @click="resetBlink">复位</el-button>
      </div>
      <div class="runState">
        <h2>运行状态: {{state ? '运转中':'停止中'}}</h2>
        <el-button :type="state ? 'primary' : 'danger'" circle></el-button>
      </div>
      <div class="test">
        <h3>测试输出口pin16(高电平输出)</h3>
        <h3>外部急停pin15(下降沿触发)</h3>
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
    toast(msg) {
      const h = this.$createElement;

      this.$notify({
        title: msg,
        message: h("i", { style: "color: teal" })
      });
    },
    runBlink() {
      this.$axios.get("/api/runblink").then(res => {
        console.log(res);
        if (res.data.err === 0) {
          console.log(res.data);
          this.state = res.data.state;
          this.toast(res.data.msg);
        }
      });
    },
    resetBlink() {
      this.$axios.get("/api/resetblink").then(res => {
        console.log(res);
        if (res.data.err === 0) {
          console.log(res.data);
          this.state = res.data.state;
          this.toast(res.data.msg);
        }
      });
    },
    stopBlink() {
      this.$axios.get("/api/stopblink").then(res => {
        console.log(res);
        if (res.data.err === 0) {
          console.log(res.data);
          this.state = res.data.state;
          this.toast(res.data.msg);
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
  width: 100%;
  .runState {
    margin-top: 20px;
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