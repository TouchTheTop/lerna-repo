import Vue from "vue";
import VueRouter from "vue-router";

import { Article } from "qytbase-article";

Vue.use(VueRouter);

const routes = [
  {
    path: "/article/detail",
    name: "ArticleDetail",
    component: Article.Detail,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
