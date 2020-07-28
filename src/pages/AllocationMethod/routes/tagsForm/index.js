/*
 * @Descripttion: 
 * @version: 
 * @Author: big bug
 * @Date: 2020-06-29 14:44:51
 * @LastEditTime: 2020-07-28 14:52:45
 */ 
 
import React, {useRef} from 'react';
import { connect } from 'dva';
import router from 'umi/router';
import { InputNumber, Button, Tag, Input, Icon } from 'antd';
import { BaseForm } from '@components/BasicForm';

import styles from './index.module.less';

function TagsForm(props) {
  
  const {MTags: {table}} = props;

  const tagsFormProps = {
    className: styles['tags-form'],
    layout: 'inline',
    isReset: false,
    okText: '确定',
    okTextType: 'link',
    dataSource: [
      {
        label: '关键词',
        name:'tags',
        itemRender: getFieldDecorator => (
          <div className={styles.tags_input}>
            <div className={styles.input_box}>
              {
                getFieldDecorator('tags', {
                  // rules: [{ required: true, message: `请输入关键词` }],
                })(<Input  style={{width: '260px'}}  placeholder={'请输入关键词'}></Input>)
              }
            </div>
          </div>
        )
      },
    ],
    onSearch: (formValues)=>{
      console.log('formValues', formValues)
    }
  }

  
  return (
    <div className={styles['tags-form-box']}>
      <div className={styles.tags_box}>
        <BaseForm {...tagsFormProps}></BaseForm>
        <div className={styles.tags_list}>
          <Tag closable onClose={() => {console.log(111)}}>哈哈哈</Tag>
          <Tag closable onClose={() => {console.log(111)}}>哈哈哈</Tag>
          <Tag closable onClose={() => {console.log(111)}}>哈哈哈</Tag>
          <Tag closable onClose={() => {console.log(111)}}>哈哈哈</Tag>
          <Tag closable onClose={() => {console.log(111)}}>哈哈哈</Tag>
          <Tag closable onClose={() => {console.log(111)}}>哈哈哈</Tag>
          <Tag closable onClose={() => {console.log(111)}}>哈哈哈</Tag>
          <Tag closable onClose={() => {console.log(111)}}>哈哈哈</Tag>
          <Tag closable onClose={() => {console.log(111)}}>哈哈哈</Tag>
          <Tag closable onClose={() => {console.log(111)}}>哈哈哈</Tag>
          <Tag closable onClose={() => {console.log(111)}}>哈哈哈</Tag>
          <Tag closable onClose={() => {console.log(111)}}>哈哈哈</Tag>
          <Tag closable onClose={() => {console.log(111)}}>哈哈哈</Tag>
          <Tag closable onClose={() => {console.log(111)}}>哈哈哈</Tag>
          <Tag closable onClose={() => {console.log(111)}}>哈哈哈</Tag>
        </div>
      </div>
      <Button type="primary" onClick={()=>{console.log('111')}}>提交关键词</Button>
    </div>
  )
}

function mapStateToProps({MTags}){
  return {MTags}
}

export default connect(mapStateToProps)(TagsForm)