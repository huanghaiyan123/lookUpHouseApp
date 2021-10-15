
import React, { PureComponent } from 'react';
import SearchHeader from '../../components/SearchHeader'

import Filter from './Filter'
import { getHouseList } from '../../utils/api'
import HouseItem from '../../components/HouseItem'
import { Toast,Flex } from 'antd-mobile';
import Sticky from '../../components/Sticky'
import NoHouse from '../../components/NoHouse'

// import { ListView } from 'antd-mobile';

import { BASE_URL } from '../../utils/url'
import {
    List,
    AutoSizer,
    WindowScroller,
    InfiniteLoader
} from 'react-virtualized'
import request from '../../utils/request'
import styles from './index.module.css'




// import PropTypes from 'prop-types';


const city = JSON.parse(localStorage.getItem('hkzf_city'))
class House extends PureComponent {
    state = {
        houseList: [],
        count: 0,
        // 数据是否加载中
        isLoading: false,
        city
    }
    // 初始化实例属性
    filters = {}
    //列表数据过滤
    onFilter = (filters) => {
        //返回顶部
        window.scrollTo(0, 0)
        console.log(filters, 'filters')
        this.filters = filters
        this.fetchHouseList()

    }
    async fetchHouseList() {
        this.setState({
            isLoading: true
        })
        const params = {
            cityId: this.state.city.value,
            ...this.filters,
            start: 1,
            end: 20
        }
        Toast.loading('加载中...', 0, null, false)
        const { data } = await getHouseList(params)
        Toast.hide()

        this.setState({
            houseList: data.body.list,
            count: data.body.count,
            // 数据加载完成的状态
            isLoading: false
        })
        // 提示房源数量
        // 解决了没有房源数据时，也弹窗提示的bug
        if (this.state.count !== 0) {
            Toast.info(`共找到 ${this.state.count} 套房源`, 2, null, false)
        }
    }
    componentDidMount() {
        this.fetchHouseList()
    }

    renderHouse = ({ key, index, style }) => {
        // console.log(key, index, style,this.state.houseList)
        const house = this.state.houseList[index]
        // 判断 house 是否存在
        // 如果不存在，就渲染 loading 元素占位
        if (!house) {
            return (
                <div key={key} style={style}>
                    <p className={styles.loading} />
                </div>
            )
        }
        return (this.state.houseList.map((item,index) => (
            <HouseItem
                key ={index +`${item.houseCode}`}
                onClick={() => this.props.history.push(`/detail/${item.houseCode}`)}
                // 注意：该组件中应该接收 style，然后给组件元素设置样式！！！
                style={style}
                src={BASE_URL + item.houseImg}
                title={item.title}
                desc={item.desc}
                tags={item.tags}
                price={item.price}
            />
        ))

        )
    }
    // // 判断列表中的每一行是否加载完成
    isRowLoaded = ({ index }) => {
        return !!this.state.houseList[index]
    }
    // 用来获取更多房屋列表数据
    // 注意：该方法的返回值是一个 Promise 对象，并且，这个对象应该在数据加载完成时，来调用 resolve 让Promise对象的状态变为已完成。
    loadMoreRows = ({ startIndex, stopIndex }) => {
        console.log(startIndex, stopIndex)
        return new Promise(resolve => {
            request.get('/houses', {
                params: {
                    cityId: this.state.city.value,
                    ...this.filters,
                    start: startIndex,
                    end: stopIndex
                }
            }).then(res => {
                // console.log('loadMoreRows：', res)
                this.setState({
                    houseList: [...this.state.houseList, ...res.data.body.list]
                })
                // 数据加载完成时，调用 resolve 即可
                resolve()
            })
        })
    }
    //渲染列表数据,并且下拉加在更多数据
    renderList() {
        //没有房源数据的话给与提示
        const { count, isLoading } = this.state
        if (count === 0 && !isLoading) {
            return <NoHouse>暂无数据,请重新选择查询条件</NoHouse>
        }

        //有数据分页处理
        return (
            <InfiniteLoader
                isRowLoaded={this.isRowLoaded}
                loadMoreRows={this.loadMoreRows}
                rowCount={count}
            >
                {({ onRowsRendered, registerChild }) => (
                    <WindowScroller>
                        {({ height, isScrolling, scrollTop }) => (
                            <AutoSizer>
                                {({ width }) => (
                                    <List
                                        onRowsRendered={onRowsRendered}
                                        ref={registerChild}
                                        autoHeight // 设置高度为 WindowScroller 最终渲染的列表高度
                                        width={width} // 视口的宽度
                                        height={height} // 视口的高度
                                        rowCount={count} // List列表项的行数
                                        rowHeight={120} // 每一行的高度
                                        rowRenderer={this.renderHouse} // 渲染列表项中的每一行
                                        isScrolling={isScrolling}
                                        scrollTop={scrollTop}
                                    />
                                )}
                            </AutoSizer>
                        )}
                    </WindowScroller>
                )}
            </InfiniteLoader>
        )

    }
    render() {
        return (
            <div className={styles.root}>
            {/* 顶部搜索导航 */}
            <Flex className={styles.header}>
              <i
                className="iconfont icon-back"
                onClick={() => this.props.history.go(-1)}
              />
              <SearchHeader cityName={this.state.city.label} className={styles.searchHeader} />
            </Flex>
    
            {/* 条件筛选栏 */}
            <Sticky height={40}>
              <Filter onFilter={this.onFilter} />
            </Sticky>
    
            {/* 房屋列表 */}
            <div className={styles.houseItems}>{this.renderList()}</div>
          </div>
        );
    }
}

// Home.propTypes = {

// };

export default House;