/*
 * @Descripttion: 
 * @version: 
 * @Author: big bug
 * @Date: 2020-06-09 14:58:26
 * @LastEditTime: 2020-07-30 15:18:39
 */ 
import * as api from '../service/index.js';

export default {
  namespace: 'Methods',
  
  state: {
    // loading状态
    loading: true,
    // 查询条件
    query: {},
    // 关键词
    keywords: [],
    // 时间限制
    lastUpdateTime: '',
    // 文章列表
    dataSource: [],
    // 分页信息
    pagination: {
      showSizeChanger: true,
      showQuickJumper: true,
      showTotal: total => `共 ${total} 条`,
      pageSize: 10,
      current: 1,
      total: null
    },
  },

  effects: {
    // 初始化
    *init({payload}, {call, put}){
      yield put({type: 'getKeywords'});
      yield put({type: 'getPvdataList'})
    },
    // 获取关键词列表
    *getKeywords({payload}, {call, put, select}){
      const data = yield call(api.getKeywords, payload);
      if(data.code == 0){
        yield put({
          type: 'save',
          payload: {
            loading: false,
            keywords: data.keywords,
            lastUpdateTime: data.updateTime
          }
        });
      }
    },
    // 设置关键词
    *updateKeywords({payload, callback}, {call, put, select}){
      const data = yield call(api.updateKeywords, payload);
      if(data.code == 0){
        callback(data)
      }
    },
    // 获取文章列表
    *getPvdataList({ payload }, { call, put, select}){
      const {query, pagination} = yield select(({Methods}) => Methods);

      const params = {
        ...query,
        pageNo: 1,
        pageSize: pagination.pageSize,
        ...payload,
      };

      const data = yield call(api.getPvdataList, params);
      // console.log(data)
      if(data.code === 0) {
        yield put({
            type: 'save',
            payload: {
              loading: false,
              query: params,
              dataSource: data.data || [],
              pagination: {
                ...pagination,
                total: data.totalCount,
                current: data.pageNo,
                pageSize: data.pageSize
              }
            }
        });
      }
    },
    // 更新pv
    *updatePv({ payload, callback }, { call, put}){
      const data = yield call(api.updatePvdata, payload);
      if(data.code == 0){
        callback(data)
      }
    },
    // 确认提交
    *commitPvdata({ payload, callback }, { call, put}){
      const data = yield call(api.commitPvdata, payload);
      if(data.code == 0){
        // 更新当前列表
        yield put({
          type: 'getPvdataList',
          payload: {}
        });

        
        callback(data);
      }
    },
  },

  reducers: {
    save(state, action){
      return {...state, ...action.payload}
    }
  }
}