import request from "./index";
const api = {
  pageAccount: "/jwt/admin/page", // 分页查询账号
};

// 分页查询账号
export function pageAccount(parameter) {
  return request.get(api.pageAccount, parameter);
}
