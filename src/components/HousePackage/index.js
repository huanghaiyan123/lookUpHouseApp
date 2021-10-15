
import React, { Component } from 'react';

// import propTypes from 'prop-types';

// import './index.css'
import styles from './index.module.css'



// 所有房屋配置项
const HOUSE_PACKAGE = [
  {
    id: 1,
    name: '衣柜',
    icon: 'icon-wardrobe'
  },
  {
    id: 2,
    name: '洗衣机',
    icon: 'icon-wash'
  },
  {
    id: 3,
    name: '空调',
    icon: 'icon-air'
  },
  {
    id: 4,
    name: '天然气',
    icon: 'icon-gas'
  },
  {
    id: 5,
    name: '冰箱',
    icon: 'icon-ref'
  },
  {
    id: 6,
    name: '暖气',
    icon: 'icon-Heat'
  },
  {
    id: 7,
    name: '电视',
    icon: 'icon-vid'
  },
  {
    id: 8,
    name: '热水器',
    icon: 'icon-heater'
  },
  {
    id: 9,
    name: '宽带',
    icon: 'icon-broadband'
  },
  {
    id: 10,
    name: '沙发',
    icon: 'icon-sofa'
  }
]


/* 
  该组件的两种功能：
  1 根据传入的 list 展示房屋配置列表（房源详情页面）
    <HousePackage list={['衣柜', '洗衣机']} />
  2 从所有配置列表中选择房屋配置（发布房源页面）
    <HousePackage select onSelect={selectedItems => {...}} />
*/

class HousePackage extends Component {
  state = {
    selectValue: []

  }
  onTagClick = (name) => {
    const { selectValue } = this.state
    const newSelectValue = [...selectValue]
    const index = newSelectValue.indexOf(name)
    if (index < 0) {
      //不存在
      newSelectValue.push(name)
    } else {
      newSelectValue.splice(index, 1)
    }
    this.props.onSelect(newSelectValue)
    this.setState({
      selectValue: newSelectValue
    })
  }
  renderItems = () => {
    const { list, select } = this.props
    console.log(list, select)
    let data = []
    if (select) {
      data = HOUSE_PACKAGE
    } else {
      data = HOUSE_PACKAGE.filter(item => list.includes(item.name))
    }
    return data.map(item => {
      const isSelected = this.state.selectValue.indexOf(item.value)
      return (
        <li
          key={item.id}
          className={[styles.item, isSelected ? styles.active : ''].join(' ')}
          onClick={select && (() => this.onTagClick(item.name))}
        >
          <p>
            <i className={`iconfont ${item.icon} ${styles.icon}`} />
          </p>
          {item.name}
        </li>
      )
    }
    )

  }
  render() {
    // console.log(src, price,tags,title,desc,onClick)
    return <ul className={styles.root}>{this.renderItems()}</ul>
  }

}


HousePackage.propTypes = {
  onSelect: () => {}
};

export default HousePackage;


