/*
 * @Descripttion: 
 * @version: 
 * @Author: big bug
 * @Date: 2020-06-09 14:58:26
 * @LastEditTime: 2020-07-28 16:08:11
 */ 
import * as api from '../service/index.js';
import {setStorage, getStorage} from '@utils/localStorage';

export default {
  namespace: 'User',
  
  state: {},

  effects: {},

  reducers: {
    save(state, action){
      return {...state, ...action.payload}
    }
  }
}