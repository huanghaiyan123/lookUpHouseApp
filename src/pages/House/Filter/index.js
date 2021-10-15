
import React, { PureComponent } from 'react';
// 导入 Spring 组件
import { Spring } from 'react-spring'

import FilterTitle from '../FilterTitle'
// import styles from './index.module.css'
import FilterPicker from '../FilterPicker';
import FilterMore from '../FilterMore';
import { housesCondition } from '../../../utils/api'

import styles from './index.module.css'

// FilterPicker 和 FilterMore 组件的选中值
const selectedValues = {
    area: ['area', 'null'],
    mode: ['null'],
    price: ['null'],
    more: []
}

// 标题高亮状态
// true 表示高亮； false 表示不高亮
const titleSelectedStatus = {
    area: false,
    mode: false,
    price: false,
    more: false
}

class Filter extends PureComponent {
    state = {
        data: [],
        cols: 3,
        filtersData: {
            // FilterMore
            roomType: [],
            oriented: [],
            floor: [],
            characteristic: [],
            // FilterPicker
            area: {},
            subway: {},
            rentType: [],
            price: []
        },
        //弹框显示和隐藏
        isShowPicker: false,
        isShowMore: false,
        defaultValue: [],
        type: '',
        titleSelectedStatus,
        // 筛选条件的选中值
        selectedValues

    }
    // 封装获取所有筛选条件的方法
    async getFiltersData() {
        // 获取当前定位城市id
        const { value } = JSON.parse(localStorage.getItem('hkzf_city'))
        const res = await housesCondition(value)
        this.setState({
            filtersData: res.data.body
        })
    }
    componentDidMount() {
        this.getFiltersData()
    }

    onTitleClick = (type) => {
        console.log(type)
        let list = []
        let cols = 3
        let isShowPicker = false
        let isShowMore = false
        const { area, subway, rentType, price } = this.state.filtersData
        switch (type) {
            case 'area':
                // 获取到区域数据
                list = [area, subway]
                cols = 3
                isShowPicker = true
                isShowMore = false
                break
            case 'mode':
                list = rentType
                cols = 1
                isShowPicker = true
                isShowMore = false
                break
            case 'price':
                list = price
                cols = 1
                isShowPicker = true
                isShowMore = false
                break
            case 'more':
                list = []
                cols = 3
                isShowMore = true
                isShowPicker = false
                break
            default:
                break
        }
        this.setState({
            data: list,
            cols: cols,
            isShowPicker: isShowPicker,
            isShowMore: isShowMore,
            defaultValue: selectedValues[type],
            type: type
        })

    }
    cancel = (type, isShow) => {
        console.log(type, 111)
        //高亮标题
        const { titleSelectedStatus, selectedValues } = this.state
        // 创建新的标题选中状态对象
        const newTitleSelectedStatus = { ...titleSelectedStatus }
        // 菜单高亮逻辑处理
        const selectedVal = selectedValues[type]
        if (type === 'area' && selectedVal[1] !== 'null') {
            // 高亮
            newTitleSelectedStatus[type] = true
        } else if (type === 'mode' && selectedVal[0] !== 'null') {
            // 高亮
            newTitleSelectedStatus[type] = true
        } else if (type === 'price' && selectedVal[0] !== 'null') {
            // 高亮
            newTitleSelectedStatus[type] = true
        } else if (type === 'more' && selectedVal.length !== 0) {
            // 更多选择项 FilterMore 组件
            newTitleSelectedStatus[type] = true
        } else {
            newTitleSelectedStatus[type] = false
        }
        if (type === 'area' || type === 'price' || type === 'mode') {
            this.setState({
                titleSelectedStatus: newTitleSelectedStatus,
                isShowPicker: isShow,
                type: ''
            })
        } else {
            this.setState({
                titleSelectedStatus: newTitleSelectedStatus,
                isShowMore: isShow,
                type: ''
            })
        }


    }
    confirm = (type, value, isShow) => {
        console.log(type, value, 111)
        const newTitleSelectedStatus = { ...this.state.titleSelectedStatus }
        // 菜单高亮逻辑处理
        const selectedVal = value
        if (type === 'area' && selectedVal[1] !== 'null') {
            // 高亮
            newTitleSelectedStatus[type] = true
        } else if (type === 'mode' && selectedVal[0] !== 'null') {
            // 高亮
            newTitleSelectedStatus[type] = true
        } else if (type === 'price' && selectedVal[0] !== 'null') {
            // 高亮
            newTitleSelectedStatus[type] = true
        } else if (type === 'more' && selectedVal.length !== 0) {
            // 更多选择项 FilterMore 组件
            newTitleSelectedStatus[type] = true
        } else {
            newTitleSelectedStatus[type] = false
        }
        const newSelectedValues = {
            ...this.state.selectedValues,
            // 只更新当前 type 对应的选中值
            [type]: value
        }
        console.log(newTitleSelectedStatus)


        if (type === 'area' || type === 'price' || type === 'mode') {
            this.setState({
                titleSelectedStatus: newTitleSelectedStatus,
                isShowPicker: isShow,
                selectedValues: newSelectedValues,
                type: ''
            })
        } else {
            this.setState({
                titleSelectedStatus: newTitleSelectedStatus,
                isShowMore: isShow,
                selectedValues: newSelectedValues,
                type: ''
            })
        }

        const { area, mode, price, more } = newSelectedValues
        let filters = {}
        const areaKey = area[0]
        let areaValue = 'null'
        if (area.length === 2) {
            areaValue = area[1]
        }
        if (area.length === 3) {
            areaValue = area[2]
        }
        filters[areaKey] = areaValue

        // 方式和租金
        filters.mode = mode[0]
        filters.price = price[0]
        // 更多筛选条件 more
        filters.more = more.join(',')
        // 调用父组件中的方法，来将筛选数据传递给父组件
        this.props.onFilter(filters)

    }
    renderMask() {
        const { type } = this.state
        console.log(type)

        // 遮罩层是否隐藏
        const isHide = type === 'more' || type === ''
       console.log(isHide) 
        return (
            <Spring from={{ opacity: 0 }} to={{ opacity: isHide ? 0 : 1 }}>
                {props => {
                    console.log(props.opacity.animation.from,props.opacity.animation.to)
                    // 说明遮罩层已经完成动画效果，隐藏了
                    if ( isHide && props.opacity.animation.from === 0 ) {
                        return null
                    }

                    return (
                        <div
                            style={props}
                            className={styles.mask}
                            onClick={() => this.cancel(type,false)}
                        />
                    )
                }}

            </Spring>
        )
    }
    render() {
        const { roomType, oriented, floor, characteristic } = this.state.filtersData
        return (
            <div className={styles.root}>
                {this.renderMask()}
                <div className={styles.content}>
                    <FilterTitle titleSelectedStatus={this.state.titleSelectedStatus}
                        onClick={this.onTitleClick}></FilterTitle>
                    <FilterPicker data={this.state.data} cols={this.state.cols} isShowPicker={this.state.isShowPicker} type={this.state.type} defaultValue={this.state.defaultValue} onCancel={this.cancel} onConfirm={this.confirm}> </FilterPicker>
                    <FilterMore roomType={roomType} oriented={oriented} floor={floor} characteristic={characteristic} type={this.state.type} isShowMore={this.state.isShowMore} defaultValue={this.state.defaultValue} onCancel={this.cancel} onConfirm={this.confirm}></FilterMore>
                </div>

            </div>
        );
    }
}

// Home.propTypes = {

// };

export default Filter;