import Vue from "vue";
import VueRouter from "vue-router";
import Index from "./Index";
import { default as Article } from "./components";

import "../../../style/themes/index.less";
import router from "./router/index.js";
import { rejectRouter } from "../../../util/install";
// 注册内部路由
Index.rejectRouter = rejectRouter(router);

export { Article };
export default Index;

Vue.use(VueRouter);
