import { GenRequest } from "qytbase-core";
import Vue from "vue";
console.log("xxx1x", Vue.prototype);
const r = new GenRequest({
  header: {
    token: this.$loginInfo,
  },
});

export default r;
