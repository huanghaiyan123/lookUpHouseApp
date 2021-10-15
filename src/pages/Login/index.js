
import React, { PureComponent } from 'react';
import {Flex,WhiteSpace,WingBlank,Toast} from 'antd-mobile'
import {Link} from 'react-router-dom'
import NavHeader from '../../components/NavBar'
import { login } from '../../utils/api'
// 导入withFormik
import {  Form, Field, ErrorMessage, withFormik } from 'formik'

import * as Yup from 'yup'

import styles from  './index.module.css'

// import PropTypes from 'prop-types';

const REG_UNAME = /^[a-zA-Z_\d]{5,8}$/
const REG_PWD = /^[a-zA-Z_\d]{5,12}$/
class Login extends PureComponent {

    render() {
        return (
            <div className={styles.root}>
                {/* 顶部导航 */}
                <NavHeader className={styles.navHeader}>账号登录</NavHeader>
                <WhiteSpace size="xl" />

                {/* 登录表单 */}
                <WingBlank>
                    <Form>
                        {/* 账号 */}
                        <div className={styles.formItem}>
                            <Field
                                className={styles.input}
                                name="username"
                                placeholder="请输入账号"
                            />
                        </div>
                        <ErrorMessage
                            className={styles.error}
                            name="username"
                            component="div"
                        />
                        {/* 密码 */}
                        <div className={styles.formItem}>
                            <Field
                                className={styles.input}
                                name="password"
                                type="password"
                                placeholder="请输入密码"
                            />
                        </div>
                        <ErrorMessage
                            className={styles.error}
                            name="password"
                            component="div"
                        />
                        <div className={styles.formSubmit}>
                            <button className={styles.submit} type="submit">
                                登 录
                  </button>
                        </div>
                    </Form>
                    <Flex className={styles.backHome}>
                        <Flex.Item>
                            <Link to="/register">还没有账号，去注册~</Link>
                        </Flex.Item>
                    </Flex>
                </WingBlank>
            </div>
        );
    }
}

Login = withFormik({
      // 提供状态：
  mapPropsToValues: () => ({ username: '', password: '' }),
   // 添加表单校验规则
   validationSchema: Yup.object().shape({
    username: Yup.string()
      .required('账号为必填项')
      .matches(REG_UNAME, '长度为5到8位，只能出现数字、字母、下划线'),
    password: Yup.string()
      .required('密码为必填项')
      .matches(REG_PWD, '长度为5到12位，只能出现数字、字母、下划线')
  }),

  // 表单的提交事件
  handleSubmit: async (values, { props }) => {
    // 获取账号和密码
    const { username, password } = values
    console.log('表单提交了', username, password)
    // 发送请求
    const res = await login({username, password })

    const { status, body, description } = res.data

    if (status === 200) {
      // 登录成功
      localStorage.setItem('hkzf_token', body.token)

      /* 
        1 登录成功后，判断是否需要跳转到用户想要访问的页面（判断 props.location.state 是否有值）。
        2 如果不需要（没有值），则直接调用 history.go(-1) 返回上一页。
        3 如果需要，就跳转到 from.pathname 指定的页面（推荐使用 replace 方法模式，而不是 push）。
      */
      if (!props.location.state) {
        console.log(props)
        // 此时，表示是直接进入到了该页面，直接调用 go(-1) 即可
        props.history.go(-1)
      } else {
        // push：[home, login, map]
        // replace: [home, map]
        props.history.replace(props.location.state.from.pathname)
      }
      // 注意：无法在该方法中，通过 this 来获取到路由信息
      // 所以，需要通过 第二个对象参数中获取到 props 来使用 props
      // props.history.go(-1)
    } else {
      // 登录失败
      Toast.info(description, 2, null, false)
    }
  }

})(Login)

// Home.propTypes = {

// };

export default Login;