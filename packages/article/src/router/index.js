import Index from "../Index/Index.vue";
import Detail from "../components/Detail.vue";

const routes = [
  {
    path: "/article",
    name: "Article",
    component: Index,
  },
  {
    path: "/article/detail",
    name: "ArticleDetail",
    component: Detail,
  },
];

export default routes;
