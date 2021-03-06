/*
 * @Descripttion: 
 * @version: 
 * @Author: big bug
 * @Date: 2020-06-30 09:35:29
 * @LastEditTime: 2020-07-29 09:50:28
 */ 
import React, { useState, useImperativeHandle, forwardRef } from 'react';
import classNames from 'classnames';
import { Table } from 'antd';
import styles from './index.module.less';

function BaseTable(props, ref) {
  // 存储选中元素
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  // 向父组件暴露的方法
  useImperativeHandle(ref, () => {
    return {
      selectedRowKeys,
      cancelSelected: ()=>{
        console.log('cancel')
        setSelectedRowKeys([])
      }
    }
  })

  
  const {className, columns, dataSource, selectionType, pagination, onPageChg, ...rest} = props;

  // table 单选、多选配置
  const rowSelection = {
    type: 'checkbox',
    onChange: (selectedRowKeys, selectedRows) => {
      setSelectedRowKeys(selectedRows);
    },
    onSelectAll: (selected, selectedRows) => {
      setSelectedRowKeys(selectedRows);
    }
  }
  let rowLelection = Boolean;
  if (selectionType === false || selectionType === null) {
    rowLelection = false;
  } else if (selectionType === "checkbox") {
    rowSelection.type = "checkbox";
  } else {
    rowSelection.type = "radio";
  }

  //table 合并数组单元格
  const createNewArr = (data) =>{
    if(!data || data.length == 0) return [];
    
    return data.reduce((result, item) => {
    //首先将name字段作为新数组result取出
      if (result.indexOf(item.name) < 0) {
        result.push(item.name)
      }
      return result
    }, []).reduce((result, name) => {
    //将name相同的数据作为新数组取出，并在其内部添加新字段**rowSpan**
      const children = data.filter(item => item.name === name);
      result = result.concat(
        children.map((item, index) => ({
          ...item,
          rowSpan: index === 0 ? children.length : 0,//将第一行数据添加rowSpan字段
        }))
      )
      return result;
    }, [])
  }

  // table配置
  const tableProps = {
    columns,
    // dataSource,
    dataSource: createNewArr(dataSource),
    pagination,
    rowKey: (record, index) => index,
    rowSelection: rowLelection ? rowSelection : null,
    onChange: onPageChg,
    ...rest
  }

  return (
    <div className={classNames(styles.container, className)}>
      <Table {...tableProps}/>
    </div>
  )
}

BaseTable = forwardRef(BaseTable);
 
export default BaseTable;
 