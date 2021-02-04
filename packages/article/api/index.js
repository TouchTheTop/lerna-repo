import { GenRequest } from "core/util";
import Vue from "vue";
console.log("xxx1x", Vue.prototype.$loginInfo);
const r = new GenRequest({
  header: {
    token: this.$loginInfo,
  },
});

export default r;
