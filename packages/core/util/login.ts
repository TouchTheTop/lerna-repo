import Vue from "vue";

// 挂载登陆信息 logininfo:登陆信息
export default function(logininfo:object) {
    Vue.prototype.logininfo = logininfo;
    console.log(Vue);
};