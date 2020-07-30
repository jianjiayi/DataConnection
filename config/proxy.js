/*
 * @Descripttion: 
 * @version: 
 * @Author: big bug
 * @Date: 2020-06-23 11:06:11
 * @LastEditTime: 2020-07-29 14:42:19
 */ 
export default {
  "/api": {
    target: "http://172.30.8.224:9999",
    changeOrigin: true, // 设置是否跨域请求资源
    pathRewrite: { "^/api" : "" } //表示是否重写请求地址，比如这里的配置，就是把 /api 替换成空字符
  }
};