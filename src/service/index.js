/*
 * @Descripttion: 
 * @version: 
 * @Author: big bug
 * @Date: 2020-06-09 14:55:46
 * @LastEditTime: 2020-07-28 16:07:07
 */ 
import request from '@http';

export async function login(params ={}){
  return request(`/user/login`, {
    method: 'post',
    data: params
  })
}

export async function logout(params ={}){
  return request(`/user/logout`, {
    method: 'post',
    data: params
  })
}