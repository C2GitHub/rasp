(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-333b0e4c"],{"2c60":function(t,i,s){},"759d":function(t,i,s){"use strict";var e=s("2c60"),o=s.n(e);o.a},7776:function(t,i,s){"use strict";s.r(i);var e=function(){var t=this,i=t.$createElement,s=t._self._c||i;return s("div",{attrs:{id:"operate"}},[s("el-container",{staticClass:"switch"},[s("div",{staticClass:"source"},[s("p",[t._v("功能选择")]),s("div",{staticClass:"el-form-item"},[s("label",{staticClass:"el-form-item__label",staticStyle:{width:"80px"}},[t._v("自动模式")]),s("div",{staticClass:"el-form-item__content",staticStyle:{"margin-left":"80px"}},[s("el-switch",{attrs:{"active-text":"启用","active-color":"#13ce66","inactive-color":"#ff4949"},model:{value:t.isAuto,callback:function(i){t.isAuto=i},expression:"isAuto"}},[t._v(" > ")])],1)]),s("div",{staticClass:"el-form-item"},[s("label",{staticClass:"el-form-item__label",staticStyle:{width:"80px"}},[t._v("直通模式")]),s("div",{staticClass:"el-form-item__content",staticStyle:{"margin-left":"80px"}},[s("el-switch",{attrs:{"active-text":"关闭","active-color":"#13ce66","inactive-color":"#ff4949"},model:{value:t.isPass,callback:function(i){t.isPass=i},expression:"isPass"}},[t._v(" > ")])],1)])])]),s("el-container",[s("div",{staticClass:"source"},[s("p",[t._v("远程控制")]),s("div",{staticClass:"el-form-item"},[s("el-button",{attrs:{type:"primary"},on:{click:t.confirm}},[t._v("异常确认 / 放行")])],1),s("div",{staticClass:"el-form-item"})])])],1)},o=[],a=s("aa2a"),c={data:function(){return{isAuto:!0,isPass:!1,isAutoTimer:null,isPassTimer:null}},watch:{isAuto:function(t){var i=this;this.isAutoTimer||a["a"].setAuto(t?1:0).then((function(t){i.isAutoTimer=setTimeout((function(){1==t?(i.isAuto=!0,i.$notify.success({title:"正确",message:"自动运行中",position:"bottom-right"})):(i.isAuto=!1,i.$notify({title:"警告",message:"当前处于手动状态",type:"error",position:"bottom-right"})),clearTimeout(i.isAutoTimer),i.isAutoTimer=null}),200)}))},isPass:function(t){var i=this;this.isPassTimer||a["a"].setPass(t?1:0).then((function(t){console.log(t),i.isPassTimer=setTimeout((function(){1==t?(i.isPass=!0,i.$notify({title:"禁止",message:"直通模式打开",type:"error",position:"bottom-right"})):(i.isPass=!1,i.$notify({title:"成功",message:"直通模式关闭",position:"bottom-right",type:"success"})),clearTimeout(i.isPassTimer),i.isPassTimer=null}),200)}))}},methods:{confirm:function(){var t=this;a["a"].confirmPass().then((function(i){i?t.$notify({title:"成功",message:"放行成功",type:"success",position:"bottom-right"}):t.$notify.error({title:"错误",message:"上传数据失败！",position:"bottom-right"})}))}}},n=c,l=(s("759d"),s("2877")),r=Object(l["a"])(n,e,o,!1,null,"2a184a00",null);i["default"]=r.exports}}]);
//# sourceMappingURL=chunk-333b0e4c.74de0ed4.js.map