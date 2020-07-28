/*
 * @Descripttion: 
 * @version: 
 * @Author: big bug
 * @Date: 2020-06-01 15:03:52
 * @LastEditTime: 2020-07-28 10:04:20
 */ 
const logo = require('@/assets/logo.png');

// 系统应用配置
export const appConfig = {
  logo,
  homePath: '/',
  title: '数据调整系统',
  copyRight: '人 民 科 技 版 权 所 有 ，未 经 书 面 授 权 禁 止 使 用 Copyright © 2020 peopletech All rights reserved. 京ICP备17055318号-1 增值电信业务经营许可证B2-20192468',
}

// 图片懒加载背景图
export const placeholderImg = logo;

// 网站主题风格配置
export const themeConfig = {
  navTheme: 'light',
  // 拂晓蓝
  primaryColor: 'daybreak',
  fixedHeader: true,
  fixSiderbar: false,
  colorWeak: false,
}

