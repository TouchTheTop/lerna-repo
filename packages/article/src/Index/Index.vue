<template>
  <div>
    <slot name="header">这里是待插入的插槽</slot>
    <h1>-----【文章展示区域】-----</h1>
    <loading></loading>
    <button @click="toDetail">点击跳转详情</button>
  </div>
</template>
<script>
// 引入公共库中的组件
import { Loading } from "qytbase-core";
import { pageAccount } from "../../api/account";
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
    pageAccount();
  },
  methods: {
    toDetail() {
      this.$router.push("/article/detail");
    },
  },
};
</script>
