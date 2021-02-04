<template>
  <div>
    <h1>-----【文章】-----</h1>

    <button @click="toDetail">点击跳转详情</button>
  </div>
</template>
<script>
// 引入公共库中的组件

import Api from "../../api";
export default {
  name: "QAvatar",
  props: {},
  data() {
    return {};
  },
  mounted() {},
  methods: {
    toDetail() {
      this.$router.push("/article/detail");
    },
  },
};
</script>
