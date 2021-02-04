import { GenRequest } from "core/util";
import Vue from "vue";
console.log("xxxx", Vue.prototype.$loginInfo);
const r = new GenRequest({
  header: {
    token: this.$loginInfo,
  },
});

export default r;
