import React from 'react';
import { Button, Flex } from 'antd-mobile';
import PropTypes from 'prop-types'
import styles from './index.module.css'

const FilterFooter = ({ style, cancel, confirm, cancelText = '取消', okText = '确定', className }) => {
    return (
        <Flex style={style} className={[styles.root, className || ''].join(' ')}>
            <Button className={[styles.btn, styles.cancel].join(' ')} inline onClick={cancel}>{cancelText}</Button>
            <Button className={[styles.btn, styles.ok].join(' ')} inline onClick={confirm}> {okText}</Button>
        </Flex>
    );

}


FilterFooter.propTypes = {
    style: PropTypes.string,
    cancel: PropTypes.func,
    confirm: PropTypes.func,
    cancelText: PropTypes.string,
    okText: PropTypes.string,
    className: PropTypes.string
};

export default FilterFooter;