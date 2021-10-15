
import React, { PureComponent } from 'react';
import { Flex, WhiteSpace, WingBlank, Toast } from 'antd-mobile'
import { Link } from 'react-router-dom'
import NavHeader from '../../components/NavBar'
import { register } from '../../utils/api'
// 导入withFormik
import { Form, Formik,ErrorMessage } from 'formik'

import * as Yup from 'yup'

import styles from './index.module.css'

// import PropTypes from 'prop-types';

const REG_UNAME = /^[a-zA-Z_\d]{5,8}$/
const REG_PWD = /^[a-zA-Z_\d]{5,12}$/
class Register extends PureComponent {
    render() {
        return (
            <div className={styles.root}>
                {/* 顶部导航 */}
                <NavHeader className={styles.navHeader}>账号注册</NavHeader>
                <WhiteSpace size="xl" />

                {/* 登录表单 */}
                <WingBlank>
                    <Formik
                        initialValues={{
                            username: "",
                            password: "",
                            psd: ''
                        }}
                        validationSchema={Yup.object().shape({
                            username: Yup.string()
                                .required('账号为必填项')
                                .matches(REG_UNAME, '长度为5到8位，只能出现数字、字母、下划线'),
                            password: Yup.string()
                                .required('密码为必填项')
                                .matches(REG_PWD, '长度为5到12位，只能出现数字、字母、下划线'),
                            psd: Yup.string()
                                .required('密码为必填项')
                                .matches(REG_PWD, '长度为5到12位，只能出现数字、字母、下划线')

                        })}
                        onSubmit={async (values, props) => {
                            console.log(props)
                            if (values.password !== values.psd) {
                                Toast.info('两次密码不一致请重新输入', 1, null, false)
                                
                            }else{
                                
                                const { username, password } = values
                                const body = { username, password }
                                const res = await register(body)
                                const { status, description } = res.data
                                if (status === 200) {
                                    if (!this.props.location.state) {
                                        // 此时，表示是直接进入到了该页面，直接调用 go(-1) 即可
                                        this.props.history.go(-1)
                                    } else {
                                        // push：[home, login, map]
                                        // replace: [home, map]
                                        this.props.history.replace(props.location.state.from.pathname)
                                    }
                                } else {
                                    // 登录失败
                                    Toast.info(description, 2, null, false)
                                }
                            }
                           
                        }}
                        render={(props) =>
                            (<Form onSubmit={props.handleSubmit}>
                                {/* 账号 */}
                                <div className={styles.formItem}>
                                    <label className={styles.label} >账号</label>
                                    <input name="username" className={styles.input} value={props.values.username} placeholder="请输入账号" onChange={props.handleChange} onBlur={props.handleBlur}></input>

                                    <ErrorMessage name="username" />
                                </div>
                                {/* 密码 */}
                                <div className={styles.formItem}>
                                    <label className={styles.label}>密码</label>
                                    <input type="password" name="password" className={styles.input} value={props.values.password} placeholder="请输入密码" onChange={props.handleChange} onBlur={props.handleBlur}></input>

                                    <ErrorMessage name="password" />
                                </div>
                                {/* 重复密码 */}
                                <div className={styles.formItem}>
                                    <label className={styles.label}>重复输入密码</label>
                                    <input type="password" name="psd" className={styles.input} value={props.values.psd} placeholder="请输入密码" onChange={props.handleChange} onBlur={props.handleBlur}></input>

                                    <ErrorMessage name="password" />
                                </div>
                                <div className={styles.formSubmit}>
                                    <button className={styles.submit} type="submit">
                                        注册
                                    </button>
                                </div>
                                <Flex className={styles.backHome} justify="between">
                                    <Flex.Item>
                                        <Link to="/home">点我回首页</Link>
                                    </Flex.Item>
                                    <Flex.Item>
                                        <Link to="/register">已有账号,去登录~</Link>
                                    </Flex.Item>
                                </Flex>
                            </Form>)
                        }
                    />
                </WingBlank>

            </div>
        );
    }
}


export default Register;