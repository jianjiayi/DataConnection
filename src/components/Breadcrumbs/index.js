/*
 * @Descripttion: 
 * @version: 
 * @Author: big bug
 * @Date: 2020-06-29 17:08:38
 * @LastEditTime: 2020-07-28 11:32:31
 */ 
import Link from 'umi/link';
import { Button, Icon } from 'antd';
import withBreadcrumbs from 'react-router-breadcrumbs-hoc';
import classNames from 'classnames';
import styles from './index.module.less';

// 更多配置请移步 https://github.com/icd2k3/react-router-breadcrumbs-hoc

function getRoutes(data){
  let routeArr = [];
  data.length>0 && data.forEach((item) => {
    if (item.routes) {
      routeArr = routeArr.concat(getRoutes(item.routes));
    }
    routeArr.push({
      icon: item.icon || '',
      path: item.path,
      breadcrumb: item.title
    });
  });
  return routeArr;
}

const Breadcrumbs = (props) => {
  const {routes, children} = props
  const data = getRoutes(routes);
  // 自定义
  const DefaultBreadcrumb = withBreadcrumbs(data)(({ breadcrumbs }) => (
    <div className={styles.top_bar}>
      <div className={classNames(styles.breadcrumbs)}>
        {breadcrumbs.map((breadcrumb, index) => (
          <span className={styles.item} key={breadcrumb.match.url}>
            { index !== breadcrumbs.length-1 ?
              <Link
                to={{
                  pathname: breadcrumb.match.url,
                  state: breadcrumb.match.params ? breadcrumb.match.params : {},
                  query: breadcrumb.location.query ? breadcrumb.location.query : {},
                }}
              >
                <Icon type={breadcrumb.icon} className={styles.icon}/>
                {breadcrumb.breadcrumb}
              </Link>:
              <div>
                <Icon type={breadcrumb.icon} className={styles.icon}/>
                { breadcrumb.breadcrumb }
              </div>
            }
            {index < breadcrumbs.length - 1 && <i className={styles.line}> >> </i>}
          </span>
        ))}
      </div>
      {children}
    </div>
  ));
  return <DefaultBreadcrumb />;
}


export default Breadcrumbs;