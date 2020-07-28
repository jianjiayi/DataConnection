<!--
 * @Descripttion: 
 * @version: 
 * @Author: big bug
 * @Date: 2020-06-01 14:54:22
 * @LastEditTime: 2020-07-28 15:11:39
--> 
## 安装依赖
+ 在项目根目录先执行：yarn

## 本地开发环境
+ 本地开发：npm run start
+ 浏览地址：[http://localhost:8000/](http://localhost:8000/)

## 支持生产多环境打包
+ 配置环境文件 src->config->index.js文件

## 多环境打包命令
+ 测试一套环境：npm run build test
+ 测试二套环境：npm run build test2
+ 正式生产环境：npm run build prod

## 版本锁定
```
"umi": "^2.7.7",
```

## 基于umi-plugin-antd-theme插件，支持自由切换主题


# umi-base-product
基于umi2.0搭建的react架构，支持dva&amp;antd，支持路由校验和配置，支持多环境打包
