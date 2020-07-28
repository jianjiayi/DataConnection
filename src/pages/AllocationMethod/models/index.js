/*
 * @Descripttion: 
 * @version: 
 * @Author: big bug
 * @Date: 2020-06-09 14:58:26
 * @LastEditTime: 2020-07-28 17:13:23
 */ 
import * as api from '../service/index.js';

export default {
  namespace: 'Methods',
  
  state: {
    loading: true,
    // 文章列表
    dataSource: [
      {
        name: 'John Brown',
        age: 32,
        address: 'New York No. 1 Lake Park',
      },
      {
        name: 'Jim Green',
        age: 42,
        address: 'London No. 1 Lake Park',
      },
      {
        name: 'Joe Black',
        age: 32,
        address: 'Sidney No. 1 Lake Park',
      },
      {
        name: 'Disabled User',
        age: 99,
        address: 'Sidney No. 1 Lake Park',
      },
    ],
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
    // 获取文章列表
    *queryArts({ payload }, { call, put, select}){
      const {pagination} = yield select(({Methods}) => Methods);
      const query = {
          pageNumber: 1,
          pageSize: pagination.pageSize,
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
                pagination: {
                  ...pagination,
                  total: data.pager.recordCount,
                  current: data.pager.pageNumber,
                  pageSize: data.pager.pageSize
                }
            }
        });
      }
    },
    // 确认提交
    *okSubmit({ payload }, { call, put}){

    },
    // 导出Excel
    *downloadExcel({ payload }, { call, put}){

    }
  },

  reducers: {
    save(state, action){
      return {...state, ...action.payload}
    }
  }
}