import React from 'react';
import { Flex } from 'antd-mobile';
import styles from './index.module.css'


const titleList = [
    { title: '区域', type: 'area' },
    { title: '方式', type: 'mode' },
    { title: '租金', type: 'price' },
    { title: '筛选', type: 'more' }
]


const FilterTitle =({titleSelectedStatus,onClick})=>{
        return (
            <Flex align="center" className={styles.root} >
                {
                    titleList.map(item => {
                        // item.type => 'area'
                        const  isSelected = titleSelectedStatus[item.type]
                        return (
                            <Flex.Item key={item.title} onClick={() => {onClick(item.type) }}>
                                <span className={[styles.dropdown,  isSelected ? styles.selected : ''].join(' ')}>
                                    {item.title}
                                </span>
                                <i className="iconfont icon-arrow" > </i>
                            </Flex.Item>
                        )
                    })    
                  
                }
            </Flex>)
    }

// Home.propTypes = {

// };

export default FilterTitle;