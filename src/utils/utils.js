/*
 * @Descripttion: 
 * @version: 
 * @Author: big bug
 * @Date: 2020-07-24 10:51:22
 * @LastEditTime: 2020-07-30 15:42:56
 */ 
 
// 数组去重
export const listRemoveRepeat = (x) =>{
  let result = [];
  for (let i = 0; i < x.length; i++) {
    let flag = true;
    let temp = x[i];
    for (let j = 0; j < result.length; j++) {
      // 普通数组 (temp === result[j])
      if (temp.id === result[j].id) {
        flag = false;
        break;
      }
    }
    if (flag) {
      result.push(temp);
    }
  }
  return result;
}

// 数组差集
export const listDifference = (x, y) =>{
  let clone = x.slice(0);
  for (let i = 0; i < y.length; i++) {
    let temp = y[i];
    for (let j = 0; j < clone.length; j++) {
      // 普通数组 (temp === clone[j])
      if (temp.id === clone[j].id) {
        clone.splice(j, 1);
      }
    }
  }
  return listRemoveRepeat(clone);
}

// 数组并集
export const listConcat = (x, y) =>{
  return listRemoveRepeat(x.concat(y));
}

// 数组交集
export const listIntersection = (x, y) =>{
  let result = [];
  for (let i = 0; i < y.length; i++) {
    let temp = y[i];
    for (let j = 0; j < x.length; j++) {
      // 普通数组 (temp === clone[j])
      if (temp.id === x[j].id) {
        result.push(temp);
        break;
      }
    }
  }
  return listRemoveRepeat(result);
}

// 判断时间间隔多少小时
export const judgeTimeDiffer = (startTime,endTime) =>{
  var startTime =new Date(startTime.replace("//-/g", "//"));
  var endTime = new Date(endTime.replace("//-/g", "//"));

  return parseInt((startTime.getTime() - endTime.getTime()) / 1000 / 60 / 60);
}

// 获取当前时间 2020-07-30 15:42:31
export const curentTime = () =>{ 
  var date = new Date();
  var year = date.getFullYear(),
      month = ("0" + (date.getMonth() + 1)).slice(-2),
      sdate = ("0" + date.getDate()).slice(-2),
      hour = ("0" + date.getHours()).slice(-2),
      minute = ("0" + date.getMinutes()).slice(-2),
      second = ("0" + date.getSeconds()).slice(-2);
  // 拼接
  var result = year + "-"+ month +"-"+ sdate +" "+ hour +":"+ minute +":" + second;
  // 返回
  return result;
}

// 获取参数
export const getParams = (obj) =>{
  let result = '';
  let item;
  for (item in obj) {
    if (obj[item] && String(obj[item])) {
      result += `&${item}=${obj[item]}`;
    }
  }
  if (result) {
    result = '?' + result.slice(1);
  }
  return result;
}