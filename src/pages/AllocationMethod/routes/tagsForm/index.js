/*
 * @Descripttion: 
 * @version: 
 * @Author: big bug
 * @Date: 2020-06-29 14:44:51
 * @LastEditTime: 2020-07-30 15:45:48
 */ 
 
import React, {useState, useEffect, useRef} from 'react';
import { connect } from 'dva';
import router from 'umi/router';
import { message, Modal, Button, Tag, Input, Icon } from 'antd';
import { BaseForm } from '@components/BasicForm';
import { curentTime, judgeTimeDiffer } from '@utils/utils';
import { validateTextLength } from '@utils/validate.js';
import _ from 'lodash';

import styles from './index.module.less';

const { confirm } = Modal;

let keywordsArr = []

function TagsForm(props) {
  const {Methods: {keywords,lastUpdateTime}, dispatch} = props;

  const tagsRef = useRef(null);
  const [submitLoading, setSubmitLoading] = useState(false);

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
                  rules: [
                    { required: true, message: `请输入关键词` },
                    { validator: validateTextLength}
                  ],
                })(<Input  style={{width: '260px'}} allowClear placeholder={'请输入关键词'}></Input>)
              }
            </div>
          </div>
        )
      },
    ],
    onSearch: (formValues)=>{
      // 清空输入框
      tagsRef.current.setFieldsValue({'tags': ''});
      
      let tags = formValues.tags;
      
      // 判断关键词数量
      if(keywords.length>15){
        return message.error('关键词数量已达到15个，无法继续添加！');
      }
      
      // 判断是否存在该关键词
      let isExist = keywords.find((v)=>{
        return v == tags;
      })
      if(isExist){
        return message.error('该关键词已被创建');
      };
      
      dispatch({
        type: 'Methods/save',
        payload:{
          keywords: [...keywords, tags]
        }
      })
    }
  }

  // 删除关键词
  const handleTagClose = removedTag =>{
    let tags = _.cloneDeep(keywords);
    _.pull(tags, removedTag);
    dispatch({
      type: 'Methods/save',
      payload:{keywords: tags}
    })
  }

  // 提交关键词
  const handleSubmitTags = (content) =>{
    if(judgeTimeDiffer(curentTime(),lastUpdateTime) < 24){
      message.warning('24小时内已经提交过，不能再次提交');
      return;
    }

    confirm({
      title: '温馨提示',
      content: '提交关键词后本日将无法修改，是否确定',
      okText: '确定',
      centered: true,
      cancelText: '取消',
      onOk() {
        // console.log('OK');
        if(keywords.length == 0){
          return message.error('请添加关键词后在提交');
        }

        setSubmitLoading(true);

        dispatch({
          type: 'Methods/updateKeywords',
          payload: keywords,
          callback: (res) => {
            message.success('提交关键词成功');
            setSubmitLoading(false);
          }
        })
      }
    });
  }

  
  return (
    <div className={styles['tags-form-box']}>
      <div className={styles.tags_box}>
        <BaseForm {...tagsFormProps} wrappedComponentRef={tagsRef}></BaseForm>
        <div className={styles.tags_list}>
          {
            keywords.map((item, index)=>{
              // console.log(item)
              return <Tag key={index+item} closable onClose={() => handleTagClose(item)}>{item}</Tag>
            })
          }
        </div>
      </div>
      <Button type="primary" loading={submitLoading} onClick={()=>handleSubmitTags()}>提交关键词</Button>
    </div>
  )
}

function mapStateToProps({Methods}){
  return {Methods}
}

export default connect(mapStateToProps)(TagsForm)