/*
 * @Descripttion: 
 * @version: 
 * @Author: big bug
 * @Date: 2019-12-17 15:40:32
 * @LastEditTime: 2020-07-28 16:01:40
 */
const Mock = require('mockjs');
const qs = require('qs');

export default {
  /**
    * @name: 登录接口
    * @test: test font
    * @msg: 
    * @param {type} 
    * @return: 
    */
  [`POST /user/login`](req, res){
    const data = qs.parse(req.body);
    setTimeout(() => {
      if (data.username == 'admin' && data.password == 'admin') {
        let result = {
          code: 0,
          data: {
            token: "admin",
            user: {
              name: "admin",
              count: 12,
              avatar: "https://mirror-gold-cdn.xitu.io/16b20352d200ee99993?imageView2/1/w/100/h/100/q/85/format/webp/interlace/1"
            },
            msg: '登陆成功'
          }
        }
      }else{
        let result = {
          code: 1,
          data: {
            msg: '用户名或密码错误'
          }
        }
      }
      res.status(200).json({
        code: 0,
        data: {
          token: "admin",
          user: {
            name: "admin",
            count: 12,
            avatar: "https://mirror-gold-cdn.xitu.io/16b20352d200ee99993?imageView2/1/w/100/h/100/q/85/format/webp/interlace/1"
          },
          msg: '登陆成功'
        }
      })
    }, 500);
  },

  /**
    * @name: 注销登录接口
    * @test: test font
    * @msg: 
    * @param {type} 
    * @return: 
    */
  [`GET /user/logout`](req, res){
      const data = qs.parse(req.body);
      setTimeout(() => {
        res.status(200).json({
          code: 0,
          message: "注销成功",
        })
      }, 500);
  },
}