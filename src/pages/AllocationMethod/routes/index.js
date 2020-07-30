/*
 * @Descripttion: 
 * @version: 
 * @Author: big bug
 * @Date: 2020-06-29 14:44:51
 * @LastEditTime: 2020-07-30 14:30:20
 */ 
import React, {useState, useEffect, useRef} from 'react';
import { connect } from 'dva';
import {message, InputNumber, Button, Tag, Input, Icon } from 'antd';
import { BaseForm } from '@components/BasicForm';
import { BaseTable } from '@components/BasicTable';
import TagsForm from './tagsForm';
import { getParams, judgeTimeDiffer } from '@utils/utils';
import { BASEURL } from '@/config';

import _ from 'lodash';

import styles from './index.module.less';

function AllocationMethod(props) {
  
  const {Methods: {loading, query, dataSource, ...rest}, dispatch} = props;
  const formRef = useRef(null);
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
      // console.log('formValues', formValues);
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
        render(r){
          return (<InputNumber style={{'width': '100%'}} min={0} defaultValue={r.finalPv} onChange={value=>onChangePv(value, r.id)}/>)
        }
      },
      {
        title: '操作',
        width: '100px',
        align: 'center',
        render(r) {
          // console.log(r)
          return (<Button type="link" size="small"onClick={()=>updatePv(r)}>修改</Button>);
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
    dataSource,
    ...rest,
  }

  // 更新store中的某条id的pv
  const onChangePv = (value, id) => {
    let tableList = _.cloneDeep(dataSource);
    const index = tableList.findIndex(item => id == item.id);
    const item = tableList[index];
    tableList.splice(index, 1, {
      ...item,
      ...{finalPv: value}
    });
    dispatch({
      type: 'Methods/save',
      payload:{dataSource: tableList}
    })
  }

  // 修改pv
  const updatePv = (r) =>{
    // console.log(r)
    dispatch({
      type: 'Methods/updatePv',
      payload:{
        id: r.id,
        pv: r.finalPv
      },
      callback: (res)=>{
        message.success('更新pv成功');
      }
    })
  }

  // 确认提交
  const commitPvdata = () =>{
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
    // 相关参数
    let formData = {
      contentId: query.contentId,
      title: query.title
    };
    // 执行下载
    let key = 'exportExcel';
    message.loading({ content: '正在导出Excel表格，请稍等...', key});
    message.success({ content: 'Excel导出成功，正在下载...', key, duration: 2 })
    window.open(`${BASEURL}/pvdata/exportExcel${getParams(formData)}`);
  }

  
  return (
    <div className={styles.container}>
      <TagsForm></TagsForm>
      
      <div className={styles['search-form-box']}>
        <BaseForm {...searchFormProps} wrappedComponentRef={ formRef }></BaseForm>
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