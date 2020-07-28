/*
 * @Descripttion: 
 * @version: 
 * @Author: big bug
 * @Date: 2020-06-09 14:55:46
 * @LastEditTime: 2020-07-28 17:13:37
 */ 
import request from '@http';

export async function queryArts(params){
  return request(`/user/login`, {
    method: 'post',
    data: params
  })
}