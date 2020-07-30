/*
 * @Descripttion: 
 * @version: 
 * @Author: big bug
 * @Date: 2020-06-09 14:55:46
 * @LastEditTime: 2020-07-30 10:50:58
 */ 
import request from '@http';

// 获取关键词列表
export async function getKeywords(params){
  return request(`/keywords/get`, {
    method: 'POST',
    body: params
  })
}

// 设置关键词
export async function updateKeywords(params){
  return request(`/keywords/update`, {
    method: 'POST',
    body: params
  })
}

// 查询PV数据列表
export async function getPvdataList(params){
  return request(`/pvdata/getdata`, {
    method: 'POST',
    body: params
  })
}

// 修改PV数据
export async function updatePvdata(params){
  return request(`/pvdata/update`, {
    method: 'POST',
    body: params
  })
}

// 数据提交
export async function commitPvdata(params){
  return request(`/pvdata/commit`, {
    method: 'POST',
    body: params
  })
}