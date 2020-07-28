/*
 * @Descripttion: 
 * @version: 
 * @Author: big bug
 * @Date: 2020-06-29 14:44:51
 * @LastEditTime: 2020-07-28 17:09:01
 */ 
import React, {useState, useEffect, useRef} from 'react';
import { connect } from 'dva';
import router from 'umi/router';
import { InputNumber, Button, Tag, Input, Icon } from 'antd';
import { BaseForm } from '@components/BasicForm';
import { BaseTable } from '@components/BasicTable';
import TagsForm from './tagsForm';

import styles from './index.module.less';

function AllocationMethod(props) {
  
  const {Methods: {loading, ...rest}, dispatch} = props;

  // 加载触发函数
  useEffect(()=>{
    dispatch({
      type:'Methods/queryArts',
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
      { label: '新闻ID', name: 'id'},
      { label: '新闻标题', name: 'title'},
    ],
    onSearch: (formValues)=>{
      console.log('formValues', formValues)
    }
  }

  // 队列详情页
  const goDetails = (params)=>{
    router.push(
      {
        pathname:'/setting/details/',
        query:{
          ...params,
        }
      }
    );
  }

   // 列表配置
  const tableProps = {
    // 类型
    selectionType: null, //checkbox or radio or null||false
    // 表头
    columns: [
      {
        title: '新闻ID',
        dataIndex: 'age',
        width: '210px',
        render: text => <a>{text}</a>,
      },
      {
        title: '发布时间',
        align: 'center',
        width: '210px',
        dataIndex: 'id',
        render: text => <a>{text}</a>,
      },
      {
        title: '新闻标题',
        align: 'center',
        dataIndex: 'address1',
      },
      {
        title: '新闻级别',
        align: 'center',
        width: '210px',
        sorter: (a, b) => a.name.length - b.name.length,
        dataIndex: 'name',
      },
      {
        title: '访问量',
        align: 'center',
        width: '250px',
        dataIndex: 'address2',
        render(){
          return (<InputNumber min={0}/>)
        }
      },
      {
        title: '操作',
        width: '100px',
        align: 'center',
        render(r) {
          return (<Button type="link" size="small"onClick={()=>goDetails({id: '2222',action: 'update'})}>修改</Button>);
        }
      },
    ],
    ...rest,
  }

  
  return (
    <div className={styles.container}>
      <TagsForm></TagsForm>
      
      <div className={styles['search-form-box']}>
        <BaseForm {...searchFormProps}></BaseForm>
        <div className={styles.btn_group}>
          <Button type="primary" onClick={()=>goDetails({action: 'create'})}>确认提交</Button>
          <Button type="link" onClick={()=>goDetails({action: 'create'})}>导出Excel</Button>
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