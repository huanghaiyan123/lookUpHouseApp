import React, { PureComponent } from 'react';
// import PropTypes from 'prop-types';
import { Toast } from 'antd-mobile';

// 导入 List 组件
import { List, AutoSizer } from 'react-virtualized'

import { areaHotCity, areaCity } from '../../utils/api'

// 导入utils中获取定位城市的方法
import { getAreaInfo } from '../../utils'

import './index.scss'

import NavBarCom from '../../components/NavBar'

// 封装处理字母索引的方法
const formatCityIndex = letter => {
    switch (letter) {
        case '#':
            return '当前定位'
        case 'hot':
            return '热门城市'
        default:
            return letter.toUpperCase()
    }
}

// 索引（A、B等）的高度
const TITLE_HEIGHT = 36
// 每个城市名称的高度
const NAME_HEIGHT = 50

// 有房源的城市
const HOUSE_CITY = ['北京', '上海', '广州', '深圳']

// 数据格式化的方法
// list: [{}, {}]
const formatCityData = list => {
    const cityList = {}
    // const cityIndex = []
  
    // 1 遍历list数组
    list.forEach(item => {
      // 2 获取每一个城市的首字母
      const first = item.short.substr(0, 1)
      // 3 判断 cityList 中是否有该分类
      if (cityList[first]) {
        // 4 如果有，直接往该分类中push数据
        // cityList[first] => [{}, {}]
        cityList[first].push(item)
      } else {
        // 5 如果没有，就先创建一个数组，然后，把当前城市信息添加到数组中
        cityList[first] = [item]
      }
    })
  
    // 获取索引数据
    const cityIndex = Object.keys(cityList).sort()
  
    return {
      cityList,
      cityIndex
    }
  }

class CityList extends PureComponent {
    constructor(props) {
        super(props)

        this.state = {
            cityList: {},
            cityIndex: [],
            // 指定右侧字母索引列表高亮的索引号
            activeIndex: 0,
        }

        // 创建ref对象
        this.cityListComponent = React.createRef()
    }
    async getAreaCity() {
        const { data } = await areaCity()
        const { cityList, cityIndex } = formatCityData(data.body)

        const res = await areaHotCity()
        cityList['hot'] = res.data.body
        cityIndex.unshift('hot')
        
        const resCur = await getAreaInfo()
        cityList['#'] = [resCur]
        cityIndex.unshift('#')


        this.setState({
            cityList: cityList,
            cityIndex:  cityIndex
        })
    }
    componentDidMount() {
        this.getAreaCity()
        console.log(this.state.cityList)
    }

    changeCity({ label, value }) {
        if (HOUSE_CITY.indexOf(label) > -1) {
            // 有
            localStorage.setItem('hkzf_city', JSON.stringify({ label, value }))
            this.props.history.go(-1)
        } else {
            Toast.info('该城市暂无房源数据', 1, null, false)
        }
    }

    // List组件渲染每一行的方法：
    rowRenderer = ({
        key, // Unique key within array of rows
        index, // 索引号
        isScrolling, // 当前项是否正在滚动中
        isVisible, // 当前项在 List 中是可见的
        style // 注意：重点属性，一定要给每一个行数据添加该样式！作用：指定每一行的位置
    }) => {
        // 获取每一行的字母索引
        const { cityIndex, cityList } = this.state

        const letter = cityIndex[index]

        // 获取指定字母索引下的城市列表数据
        // console.log(cityList[letter])

        return (
            <div key={key} style={style} className="city">
                <div className="title">{formatCityIndex(letter)}</div>
                {cityList[letter].map(item => (
                    <div
                        className="name"
                        key={item.value}
                        onClick={() => this.changeCity(item)}
                    >
                        {item.label}
                    </div>
                ))}
            </div>
        )
    }

    // 创建动态计算每一行高度的方法
    getRowHeight = ({ index }) => {
        // 索引标题高度 + 城市数量 * 城市名称的高度
        // TITLE_HEIGHT + cityList[cityIndex[index]].length * NAME_HEIGHT
        const { cityList, cityIndex } = this.state
        return TITLE_HEIGHT + cityList[cityIndex[index]].length * NAME_HEIGHT
    }

    // 封装渲染右侧索引列表的方法
    renderCityIndex() {
        // 获取到 cityIndex，并遍历其，实现渲染
        const { cityIndex, activeIndex } = this.state
        return cityIndex.map((item, index) => (
            <li
                className="city-index-item"
                key={item}
                onClick={() => {
                    // console.log('当前索引号：', index)onRowsRendered
                    this.cityListComponent.current.scrollToRow(index)
                }}
            >
                <span className={activeIndex === index ? 'index-active' : ''}>
                    {item === 'hot' ? '热' : item.toUpperCase()}
                </span>
            </li>
        ))
    }



    render() {
        return (
            <div className="citylist">
                < NavBarCom>城市选择</ NavBarCom>
                {/* 城市列表 */}
                <AutoSizer>
                    {({ width, height }) => (
                        <List
                            ref={this.cityListComponent}
                            width={width}
                            height={height}
                            rowCount={this.state.cityIndex.length}
                            rowHeight={this.getRowHeight}
                            rowRenderer={this.rowRenderer}
                            onRowsRendered={this.onRowsRendered}
                            scrollToAlignment="start"
                        />
                    )}
                </AutoSizer>

                {/* 右侧索引列表 */}
                <ul className="city-index">{this.renderCityIndex()}</ul>
            </div>
        );
    }
}

// CityList.propTypes = {

// };

export default CityList;