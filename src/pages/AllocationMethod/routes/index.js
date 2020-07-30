/*
 * @Descripttion: 
 * @version: 
 * @Author: big bug
 * @Date: 2020-06-29 14:44:51
 * @LastEditTime: 2020-07-30 10:10:02
 */ 
import React, {useState, useEffect, useRef} from 'react';
import { connect } from 'dva';
import router from 'umi/router';
import {message, InputNumber, Button, Tag, Input, Icon } from 'antd';
import { BaseForm } from '@components/BasicForm';
import { BaseTable } from '@components/BasicTable';
import TagsForm from './tagsForm';
import { judgeTimeDiffer } from '@utils/utils';

import styles from './index.module.less';

function AllocationMethod(props) {
  
  const {Methods: {loading, ...rest}, dispatch} = props;
  
  const [submitLoading, setSubmitLoading] = useState(false);

  // 加载触发函数
  useEffect(()=>{
    dispatch({
      type:'Methods/init',
      payload:{}
    })
  },[dispatch]);


  // 搜索表单配置项
  const searchFormProps = {
    className: styles['form-contaner'],
    layout: 'inline',
    isReset: false,
    okText: '查询数据',
    dataSource: [
      { label: '新闻ID', name: 'contentId'},
      { label: '新闻标题', name: 'title'},
    ],
    onSearch: (formValues) =>{
      console.log('formValues', formValues);
      dispatch({
        type: 'Methods/getPvdataList',
        payload: formValues
      })
    }
  }

   // 列表配置
  const tableProps = {
    // 类型
    selectionType: null, //checkbox or radio or null||false
    // 表头
    columns: [
      {
        title: '新闻ID',
        dataIndex: 'contentId',
        width: '200px',
      },
      {
        title: '发布时间',
        align: 'center',
        width: '150px',
        dataIndex: 'pubTime',
      },
      {
        title: '新闻标题',
        align: 'center',
        dataIndex: 'title',
      },
      {
        title: '新闻级别',
        align: 'center',
        width: '210px',
        sorter: (a, b) => a.level - b.level,
        dataIndex: 'level',
        render(level){
          switch(level){
            case 0:
              return (<Tag color="#f50">重要</Tag>);
            case 1:
              return (<Tag color="#2db7f5">打标</Tag>);
            case 2:
              return (<Tag color="#87d068">一般</Tag>)
          }
        }
      },
      {
        title: '访问量',
        align: 'center',
        width: '250px',
        dataIndex: 'finalPv',
        render(r){
          return (<InputNumber style={{'width': '100%'}} min={0} value={r}/>)
        }
      },
      {
        title: '操作',
        width: '100px',
        align: 'center',
        render(r) {
          return (<Button type="link" size="small"onClick={()=>{console.log(r)}}>修改</Button>);
        }
      },
    ],
    onPageChg: (page) => {
      // console.log(page)
      dispatch({
        type:'Methods/getPvdataList',
        payload:{
          pageNo: page.current,
          pageSize: page.pageSize
        }
      })
    },
    ...rest,
  }

  // 确认提交
  const commitPvdata = () =>{
    if(true){
      
    }

    setSubmitLoading(true);
    dispatch({
      type: 'Methods/commitPvdata',
      payload: {},
      callback: ()=>{
        message.success('提交成功');
        setSubmitLoading(false);
      }
    })
  }

  // 下载excel文件
  const downloadExcel = () => {
    dispatch({
      type: 'Methods/downloadExcel',
      payload: {},
      callback: (res) =>{
        window.open("https://codeload.github.com/douban/douban-client/legacy.zip/master");
      }
    })
  }

  
  return (
    <div className={styles.container}>
      <TagsForm></TagsForm>
      
      <div className={styles['search-form-box']}>
        <BaseForm {...searchFormProps}></BaseForm>
        <div className={styles.btn_group}>
          <Button type="primary" loading={submitLoading} onClick={()=>commitPvdata()}>确认提交</Button>
          <Button type="link" onClick={()=>downloadExcel()}>导出Excel</Button>
        </div>
      </div>
      
      <BaseTable {...tableProps}></BaseTable>
    </div>
  )
}

function mapStateToProps({Methods}){
  return {Methods}
}

export default connect(mapStateToProps)(AllocationMethod)