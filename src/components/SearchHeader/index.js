import React from 'react';
import { Flex } from 'antd-mobile';
import propTypes from 'prop-types';

import { withRouter } from 'react-router-dom'
import './index.scss'

const SearchHeader= (props)=> {
    console.log(props)
        return (
            <Flex className={['search-box', props.className || ''].join(' ')}>
                <Flex className="search" >
                    <div className="location" onClick={() => props.history.push('/citylist')}>
                        <span className="name">{props.cityName}</span>
                        <i className="iconfont icon-arrow" />
                    </div>
                    <div className="form" onClick={() => props.history.push('/search')}>
                        <i className="iconfont icon-seach" />
                        <span className="text">请输入小区或地址</span>
                    </div>
                </Flex>
                <i className="iconfont icon-map" onClick={() =>  props.history.push('/map') }></i>
            </Flex>
        );
}

SearchHeader.propTypes = {
    className:  propTypes.string,
    cityName : propTypes.string.isRequired
};

export default withRouter(SearchHeader);