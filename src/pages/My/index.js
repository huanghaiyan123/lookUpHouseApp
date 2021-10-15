
import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom'
import { Grid, Button, Modal, Toast } from 'antd-mobile'
import { BASE_URL } from '../../utils/url'
import { isAuth, removeToken } from '../../utils/auth';
import { userInfo, logout } from '../../utils/api'

// import PropTypes from 'prop-types';
import styles from './index.module.css'



// 菜单数据
const menus = [
    { id: 1, name: '我的收藏', iconfont: 'icon-coll', to: '/favorate' },
    { id: 2, name: '我的出租', iconfont: 'icon-ind', to: '/rent' },
    { id: 3, name: '看房记录', iconfont: 'icon-record' },
    {
        id: 4,
        name: '成为房主',
        iconfont: 'icon-identity'
    },
    { id: 5, name: '个人资料', iconfont: 'icon-myinfo' },
    { id: 6, name: '联系我们', iconfont: 'icon-cust' }
]

// 默认头像
const DEFAULT_AVATAR = BASE_URL + '/img/profile/avatar.png'

const alert = Modal.alert
class My extends PureComponent {
    state = {
        isLogin: isAuth(),
        nickname: '',
        avatar: ''
    }
    fetchUserInfo = async () => {
        if (!this.state.isLogin) {
            return
        }
        const { data } = await userInfo()
        if (data.status === 200) {
            const { avatar, nickname } = data.body
            this.setState({
                nickname: nickname,
                avatar: BASE_URL + avatar
            })
        } else {
            Toast.info(data.description, 1, null, false)
        }
    }
    componentDidMount() {
        this.fetchUserInfo()
    }
    logout = () => {
        //移除token,islogin设置为false,清空state的值
        alert('提示', '确定退出登录?', [
            { text: '取消' },
            {
                text: '确定', onPress: async () => {
                    const { data } = await logout()
                    if (data.status === 200) {
                        removeToken()
                        this.setState({
                            isLogin: false,
                            nickname: '',
                            avatar: ''
                        })
                    }else{
                        Toast.info(data.description,1,null,false)
                    }
                   
                }
            }
        ])
    }
    render() {
        const { history } = this.props
        const { isLogin, nickname, avatar } = this.state
        console.log(this.state.isLogin)
        return (
            <div className={styles.root}>
                {/* 个人信息 */}
                <div className={styles.title}>
                    <img
                        className={styles.bg}
                        src={BASE_URL + '/img/profile/bg.png'}
                        alt="背景图"
                    />
                    <div className={styles.info}>
                        <div className={styles.myIcon}>
                            <img
                                className={styles.avatar}
                                src={avatar || DEFAULT_AVATAR}
                                alt="icon"
                            />
                        </div>
                        <div className={styles.user}>
                            <div className={styles.name}>{nickname || '游客'}</div>
                            {/* 登录后展示： */}
                            {isLogin ? (
                                <>
                                    <div className={styles.auth}>
                                        <span onClick={this.logout}>退出</span>
                                    </div>
                                    <div className={styles.edit}>
                                        编辑个人资料
                                            <span className={styles.arrow}>
                                            <i className="iconfont icon-arrow" />
                                        </span>
                                    </div>
                                </>
                            ) : (
                                    <div className={styles.edit}>
                                        <Button
                                            type="primary"
                                            size="small"
                                            inline
                                            onClick={() => history.push('/login')}
                                        >
                                            去登录
                                        </Button>
                                    </div>
                                )}

                            {/* 未登录展示： */}
                        </div>
                    </div>
                </div>

                {/* 九宫格菜单 */}
                <Grid
                    data={menus}
                    columnNum={3}
                    hasLine={false}
                    renderItem={item =>
                        item.to ? (
                            <Link to={item.to}>
                                <div className={styles.menuItem}>
                                    <i className={`iconfont ${item.iconfont}`} />
                                    <span>{item.name}</span>
                                </div>
                            </Link>
                        ) : (
                                <div className={styles.menuItem}>
                                    <i className={`iconfont ${item.iconfont}`} />
                                    <span>{item.name}</span>
                                </div>
                            )
                    }
                />

                {/* 加入我们 */}
                <div className={styles.ad}>
                    <img src={BASE_URL + '/img/profile/join.png'} alt="" />
                </div>
            </div>
        );
    }
}

// Home.propTypes = {

// };

export default My;