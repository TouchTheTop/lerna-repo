import axios from "axios";
import qs from "query-string";
import ExtendableError from "es6-error";

const { protocol } = window.location;
const { CancelToken } = axios;
const noop = () => {};
export class APIError extends ExtendableError {
  constructor(message = "") {
    super(message);
  }
}

/**
 * 拦截器
 * 作用：添加跳转登录
 *
 * 401100: token过期
 */

axios.interceptors.response.use(
  (response) => {
    if (response.config.isDown) {
      const blob = new Blob([response.data], {
        type: response.headers["content-type"],
      });
      return Promise.resolve({
        status: 200,
        data: {
          data: blob,
          success: true,
        },
      });
    }
    const res = response.data;
    if (res.code === 0) {
      res.success = true;
    }
    if (!res.success) {
      return Promise.reject("error");
    } else {
      return response;
    }
  },
  (error) => {
    if (+error.response.status === 401) {
      // TODO:清除相关缓存数据
      // TODO:重新登录
      return;
    }
    const errorData = error.response.data || {};
    if (errorData.code === 401100) {
      // TODO:重新登录
    }
    return Promise.reject(error);
  }
);
const VALID_IP_REGEXP = /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])/; // eslint-disable-line
const VALID_HOST_REGEXP = /^(([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9\-]*[a-zA-Z0-9])\.)*([A-Za-z0-9]|[A-Za-z0-9][A-Za-z0-9\-]*[A-Za-z0-9])/; // eslint-disable-line
export const getAPIPrefix = (str) => {
  let val = str || "/";
  if (typeof val === "string" && protocol !== "file:") {
    if (/^https?:/.test(val)) {
      // val = val.replace(/^(https?:)/, protocol);
    } else {
      if (VALID_IP_REGEXP.test(val) || VALID_HOST_REGEXP.test(val)) {
        val = `${protocol}//${val}`;
      } else {
        val = val.replace(/^([^/.])/, "/$1");
      }
    }
    val = val.replace(/([^/])$/, "$1/");
  }
  // console.info(val)
  return val;
};
export const getAPIUrl = (prefix, endpoint) => {
  const url = `${prefix}/${endpoint}`;
  const re = new RegExp(`/+(${endpoint.replace(/^\/+/, "")})`);
  return url.replace(re, "/$1");
};

function request(host, endpoint, apiConfig = {}, reqConfig = {}) {
  const prefix = getAPIPrefix(host);
  const config = {
    ...apiConfig,
    ...reqConfig,
  };
  const {
    showNotification = (resp) => resp,
    handleOption,
    handleResp = (resp) => resp,
    ...reqOpts
  } = config;
  const url = getAPIUrl(prefix, endpoint);
  let cancel = noop;
  let opts = {
    withCredentials: false,
    cancelToken: new CancelToken((c) => (cancel = c)),
    ...reqOpts,
  };
  if (handleOption) {
    opts = handleOption(opts) || opts;
  }
  const promise = axios(url, opts)
    .then(checkStatus)
    .then((resp) => resp.data)
    .then(checkResp)
    .then((resp) => handleResp(resp))
    .catch((err) => {
      if (axios.isCancel(err)) {
        console.warn(`请求取消：${endpoint}`); // eslint-disable-line
        return;
      }
      throw err;
    });
  promise.promise = promise;
  promise.cancel = cancel;
  return promise;

  function checkStatus(resp) {
    if (!resp) {
      throw new APIError(`请求错误`);
    }
    if (resp.status >= 200 && resp.status < 300) {
      return resp;
    }
    // 如无配置，则启用默认弹框
    if (showNotification) {
      // TODO：请求失败弹框
      showNotification();
    }
    throw new APIError(`[${resp.status}] 请求错误 ${resp.config.url}`);
  }

  function checkResp(data) {
    if (data.success) {
      return data;
    }
    if (showNotification) {
      // TODO：请求失败弹框
      showNotification();
    }
    throw new APIError(`[${data.code}] 请求失败 ${data.message}`);
  }
}

class GenRequest {
  constructor(option) {
    if (!option) {
      return;
    }
    const { base = "", ...configs } = option;
    this.option = configs;
    this.base = base;
  }
  get(endpoint, data = {}, config) {
    return request(this.base, endpoint, {
      ...this.option,
      ...config,
      method: "get",
      params: data,
    });
  }
  post(endpoint, data = {}, config) {
    return request(this.base, endpoint, {
      ...this.option,
      ...config,
      method: "post",
      data,
    });
  }
  postForm(endpoint, data = {}, config) {
    return request(this.base, endpoint, {
      ...this.option,
      ...config,
      method: "post",
      data: data instanceof FormData ? data : qs.stringify(data),
    });
  }
  postFile(endpoint, files, config) {
    const isFile = (f) => Object.prototype.toString.call(f) === "[object File]";
    const fd = new FormData();
    Object.keys(files).forEach((k) => {
      if (!isFile(files[k]))
        throw new Error("postFile 方法只接受值为 File 对象的键值对作为参数！");
      fd.append(k, files[k]);
    });
    return this.postForm(endpoint, fd, config);
  }
  install(App) {
    App.prototype.$loginInfo = this.option;
    const r = new GenRequest();
    r.__proto__ = this;
    window.$Api = r;
  }
}

export default GenRequest;
