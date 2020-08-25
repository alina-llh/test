import request from "@utils/request";

const BASE_URL = "/admin/acl/index";

// 获取菜单权限数据
export function getMenu () {
  return request({
    url: `${BASE_URL}/menu`,
    method: "GET",
  });
}

export function getInfo () {
  return request({
    url: `${BASE_URL}/info`,
    method: "GET",
  });
}

// 登录
export function reqLogin (username, password) {
  return request({
    url: `${BASE_URL}/login`,
    method: "post",
    data: {
      username,
      password,
    },
  });
}

// 登出
export function reqLogout () {
  return request({
    url: `${BASE_URL}/logout`,
    method: "post",
  });
}

// 验证码
// http://localhost:5000/oauth/sign_in/digits
export function reqLogCode (mobile) {
  return request({
    url: `/oauth/sign_in/digits`,
    method: "post",
    data: {
      mobile: mobile.phone
    },
  });
}