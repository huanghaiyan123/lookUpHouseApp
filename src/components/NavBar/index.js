import React from 'react';
import { NavBar, Icon } from 'antd-mobile';
import { withRouter } from 'react-router-dom';
import propTypes from 'prop-types';
// import './index.scss'

import styles from './index.module.css'



const NavBarCom = ({history,children,onLeftClick,className,rightContent}) => {
    const handClick = ()=>{history.go(-1)}
    return (
    <NavBar
        className={[styles.navBar, className || ''].join(' ')}
        mode="light"
        icon={<Icon type="left" />}
        onLeftClick={onLeftClick || handClick  }
        rightContent={rightContent}
    >{children}</NavBar>)
}


NavBarCom.propTypes = {
    children : propTypes.string.isRequired
};
export default withRouter(NavBarCom)