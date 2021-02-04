import Vue from "Vue";

// 挂载登陆信息 logininfo:登陆信息
export default function(logininfo:object) {
    Vue.prototype.logininfo = logininfo;
};