
import React, { PureComponent } from 'react';


import NavBarCom from '../../components/NavBar'
import HouseItem from '../../components/HouseItem'
import { areaMap, areaHouses } from '../../utils/api'
import { BASE_URL } from '../../utils/url'

import { Link } from 'react-router-dom';

import { Toast } from 'antd-mobile';

// import './index.css'
import styles from './index.module.css'
// import PropTypes from 'prop-types';

const BMapGL = window.BMapGL

const pointStyle = {
    cursor: 'pointer',
    border: '0px solid rgb(255, 0, 0)',
    padding: '0px',
    whiteSpace: 'nowrap',
    fontSize: '12px',
    color: 'rgb(255, 255, 255)',
    textAlign: 'center'
}



class Maps extends PureComponent {
    state = {
        houseList: [],
        showHouse: false
    }
    componentDidMount() {
        this.initMap()
    }
    initMap() {
        const map = new BMapGL.Map("container")
        //作用让在其他地方可以用到map
        this.map = map
        //获取当前城市
        const { label, value } = JSON.parse(localStorage.getItem('hkzf_city'))
        const myGeo = new BMapGL.Geocoder();
        // 将地址解析结果显示在地图上，并调整地图视野
        myGeo.getPoint(label, (point) => {
            console.log(point, '市')
            if (point) {
                map.centerAndZoom(point, 11);
                // ///开启鼠标滚轮缩放
                // map.enableScrollWheelZoom(true);
                //添加比例尺和平移缩放
                map.addControl(new BMapGL.NavigationControl())
                map.addControl(new BMapGL.ScaleControl())
                //调用createOverlay方法
                this.renderOverlay(point, value)
            }
        }, label)

        // 给地图绑定移动事件
        map.addEventListener('movestart', () => {
            // console.log('movestart')
            if (this.state.showHouse) {
                this.setState({
                    showHouse: false
                })
            }
        })
}


async renderOverlay(point, value) {
    //清除覆盖物
    setTimeout(() => {
        this.map.clearOverlays();
    })
    const { nextZoom, type } = this.getTypeAndZoom()
    Toast.loading('Loading...');
    const { data } = await areaMap(value)
    console.log(data)
    Toast.hide();
    data.body.forEach(item => {
        this.map.centerAndZoom(point, nextZoom);
        this.createOverlay(type, item)
    })
}

createOverlay(type, item) {
    const { longitude, latitude } = item.coord;
    const pointItem = new BMapGL.Point(longitude, latitude)
    if (type === 'circle') {
        this.creatCircle(pointItem, item.label, item.count, item.value)
    } else {
        this.creatRect(pointItem, item.label, item.count, item.value)
    }
}

//获取缩放比例以及形状
getTypeAndZoom() {
    // 调用地图的 getZoom() 方法，来获取当前缩放级别
    const zoom = this.map.getZoom()
    let nextZoom, type
    if (zoom > 10 && zoom < 12) {
        //区
        nextZoom = 13
        type = 'circle'
    } else if (zoom > 12 && zoom < 14) {
        //镇
        nextZoom = 15
        type = 'circle'
    } else {
        //小区
        type = 'rect'
    }
    return {
        nextZoom,
        type
    }

}

//获取区镇数据
creatCircle(point, name, count, value) {
    const opts = {
        position: point, // 指定文本标注所在的地理位置
        offset: new BMapGL.Size(-35, -35) // 设置文本偏移量
    };
    // 创建文本标注对象
    const labelValue = new BMapGL.Label('', opts);
    labelValue.setContent(` 
        <div class="${styles.bubble}">
            <p class="${styles.name}">${name}</p>
            <p>${count}套</p>
        </div>`)
    // 自定义文本标注样式
    labelValue.setStyle(pointStyle);
    //添加覆盖物
    this.map.addOverlay(labelValue);

    labelValue.addEventListener('click', (e) => {
        this.renderOverlay(point, value)
    })
}
//获取小区数据
creatRect(point, name, count, value) {
    const opts = {
        position: point, // 指定文本标注所在的地理位置
        offset: new BMapGL.Size(-50, -35) // 设置文本偏移量
    };
    var marker1 = new BMapGL.Marker(point);
    // 创建文本标注对象
    const labelValue = new BMapGL.Label('', opts);
    labelValue.setContent(` 
        <div class="${styles.rect}">
        <span class="${styles.housename}">${name}</span>
        <span class="${styles.housenum}">${count}套</span>
        <i class="${styles.arrow}"></i>
      </div>`)
    // 自定义文本标注样式
    labelValue.setStyle(pointStyle);
    //添加覆盖物
    this.map.addOverlay(labelValue);
    this.map.addOverlay(marker1);

    labelValue.addEventListener('click', e => {
        console.log(e)
        //点击获取房源小区列表数据
        this.getAreaHouses(value)
        //改变房源的位置
        //位置是定位
        const target = e.domEvent.changedTouches[0]
        console.log(target)
        this.map.panBy(
            window.innerWidth / 2 - target.clientX,
            (window.innerHeight - 330) / 2 - target.clientY
        )
    })

}

async getAreaHouses(cityId) {
    Toast.loading('Loading...');
    const { data } = await areaHouses(cityId)
    console.log(data)
    Toast.hide();
    this.setState({
        houseList: data.body.list,
        showHouse: true
    })
}
renderHouse(){
    return(
        this.state.houseList.map(item=>(
            <HouseItem 
            onClick={()=>{this.props.history.push(`/Detail/${item.houseCode}`)}}
            key={item.houseCode}
            price ={item.price}
            tags={item.tags}
            title={item.title}
            desc={item.desc}
            src ={BASE_URL + item.houseImg}
            ></HouseItem>
        ))
    )
}



render() {
    return (
        <div className={styles.map}>
            <NavBarCom>地图找房</NavBarCom>
            <div id="container" className={styles.container}></div>
            {/* 房源列表 */}
            {/* 添加 styles.show 展示房屋列表 */}
            <div
                className={[
                    styles.houseList,
                    this.state.showHouse ? styles.show : ''
                ].join(' ')}
            >
                <div className={styles.titleWrap}>
                    <h1 className={styles.listTitle}>房屋列表</h1>
                    <Link className={styles.titleMore} to="/home/list">更多房源 </Link>
                </div>
                <div className={styles.houseItems}>
                    {/* 房屋结构 */}
                   {this.renderHouse()}
                </div>
            </div>
        </div >
    );
}
}

// Home.propTypes = {

// };


export default Maps;