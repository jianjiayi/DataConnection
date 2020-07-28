/*
 * @Descripttion: 
 * @version: 
 * @Author: big bug
 * @Date: 2020-06-09 14:58:26
 * @LastEditTime: 2020-07-28 17:44:36
 */ 
import * as api from '../service/index.js';

export default {
  namespace: 'MTags',
  
  state: {
    dataSource: []
  },

  effects: {
    // 获取文章列表
    *queryTags({ payload }, { call, put, select}){
      const query = {
          ...payload,
      };
      const {code, data} = yield call(api.queryArts, query);
      // console.log(data)
      if(code === 0) {
        yield put({
          type: 'save',
          payload: {
            loading: false,
            dataSource: data.list || [],
          }
        });
      }
    },
  },

  reducers: {
    save(state, action){
      return {...state, ...action.payload}
    }
  }
}