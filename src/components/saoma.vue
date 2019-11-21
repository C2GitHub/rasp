<template>
  <div id="blink">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>树莓派控制系统</span>
        <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
      </div>
      <div :style="{width:'100%'}">
        <el-button type="primary">测试</el-button>
        <div class="input">
          <el-input placeholder="请输入内容" v-model="input" clearable autofocus="true"></el-input>
        </div>
      </div>
      <div class="runState">
        <h2>运行状态: {{state ? '运转中':'停止中'}}</h2>
        <h1 v-for="(item, index) in oldInput" :key="index">数据{{index}}：{{item}}</h1>
        <el-button :type="state ? 'primary' : 'danger'" circle></el-button>
      </div>
      <div class="test">
        <h3>扫码枪控制页面</h3>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      state: 0,
      input: "",
      oldInput: []
    };
  },
  methods: {
    toast(msg) {
      const h = this.$createElement;

      this.$notify({
        title: msg,
        message: h("i", { style: "color: teal" })
      });
    }
  },
  watch: {
    input(val, oldVal) {
      if (val.length === 9) {
        console.log(val, oldVal);
        this.input = "";
        this.oldInput.push(val)
      }else {
 
      }
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