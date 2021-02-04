<template>
  <div>
    <h1>-----【文章】-----</h1>
    <loading></loading>
    <button @click="toDetail">点击跳转详情</button>
  </div>
</template>
<script>
// 引入公共库中的组件
import { Loading } from "core";
import Api from "../../api";
export default {
  name: "QAvatar",
  props: {},
  components: {
    Loading,
  },
  data() {
    return {};
  },
  mounted() {
    Api.post();
  },
  methods: {
    toDetail() {
      this.$router.push("/article/detail");
    },
  },
};
</script>
