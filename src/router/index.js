/*
 * @Descripttion: 
 * @version: 
 * @Author: big bug
 * @Date: 2020-06-01 15:45:04
 * @LastEditTime: 2020-07-28 10:01:32
 */
const { sliderMenus } = require('./slidermenus');
const userRoutes = require('../pages/User/router');
const errorRoutes = require('../pages/Error/router');

exports.routesConfig= [
  {
    path: '/',
    icon: 'home',
    key: '/',
    component: '../layouts/index',
    routes: [
      ...sliderMenus,
      ...userRoutes,
      ...errorRoutes,
    ],
  }
]