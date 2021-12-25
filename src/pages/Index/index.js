
import React, { PureComponent } from 'react';

import { Flex, Carousel, Grid, WingBlank, Button } from 'antd-mobile';

import { fetchBannerList, fetchHomeGroups, fetchHomeNews } from '../../utils/api'
import { BASE_URL } from '../../utils/url'
import Search from '../../components/SearchHeader'

import { CheckOutline, CloseOutline } from 'antd-mobile-icons'



// 导入utils中获取定位城市的方法
import { getAreaInfo } from '../../utils'

// 导入样式文件
import './index.scss'


// 导入导航菜单图片
import Nav1 from '../../assets/images/nav-1.png'
import Nav2 from '../../assets/images/nav-2.png'
import Nav3 from '../../assets/images/nav-3.png'
import Nav4 from '../../assets/images/nav-4.png'

// import PropTypes from 'prop-types';
//滚动条轮播图
class Banner extends React.Component {
    state = {
        bannnerList: [],
        imgHeight: 212,
        isSwiperLoaded: false,
        // 当前城市名称
        curCityName: ''
    }
    async getBannerList() {
        const { data } = await fetchBannerList()
        this.setState({
            bannnerList: data.body,
            isSwiperLoaded: true
        })
    }

    // async getAreaInfo() {
    //     const BMapGL = window.BMapGL
    //     //获取定位信息
    //     const LocalCity = new BMapGL.LocalCity();
    //     LocalCity.get(async (res) => {
    //         const { data } = await areaInfo(res.name)
    //         this.setState({
    //             curCityName: data.body.label,
    //         })
    //     });

    // }



    async componentDidMount() {
        this.getBannerList()
        const city = await getAreaInfo()
        this.setState({
            curCityName: city.label
        })

    }

    render() {
        return (
            <div className="swiper">
                {this.state.isSwiperLoaded ?
                    (<Carousel
                        autoplay
                        infinite
                        autoplayInterval={5000}
                    >
                        {this.state.bannnerList.map(item => (
                            <a
                                key={item.id}
                                href="http://www.alipay.com"
                                style={{ display: 'inline-block', width: '100%', height: this.state.imgHeight }}
                            >
                                <img
                                    src={BASE_URL + item.imgSrc}
                                    alt=""
                                    style={{ width: '100%', verticalAlign: 'top' }}
                                />
                            </a>
                        ))}
                    </Carousel>) : (
                        ''
                    )}
                <Search cityName={this.state.curCityName} ></Search>
            </div>
        )
    }
}


//导航栏
class NavBar extends React.Component {
    state = {
        navList: [
            {
                id: 1,
                imgSrc: Nav1,
                imgText: '整租',
                path: '/home/list'
            },
            {
                id: 2,
                imgSrc: Nav2,
                imgText: '合租',
                path: '/home/list'
            },
            {
                id: 3,
                imgSrc: Nav3,
                imgText: '地图找房',
                path: '/map'
            },
            {
                id: 4,
                imgSrc: Nav4,
                imgText: '去出租',
                path: '/rent/add'
            }]
    }

    render() {
        console.log(this.state.navList, this.props)
        return (
            <div className="nav">
                <Flex>
                    {this.state.navList.map(item =>
                        <Flex.Item key={item.id} onClick={() => this.props.history.push(item.path)}>
                            <img src={item.imgSrc} alt=""></img>
                            <h2>{item.imgText}</h2>
                        </Flex.Item>
                    )}
                </Flex>
            </div>
        )
    }
}

//租房小组
const Group = (props) => (
    <div className="group">
        <h3 className="group-title">
            租房小组 <span className="more">更多</span>
        </h3>
        <Grid
            data={props.data}
            columnNum={2}
            square={false}
            hasLine={false}
            renderItem={item => (
                <Flex className="group-item" justify="around" key={item.id}>
                    <div className="desc">
                        <p className="title">{item.title}</p>
                        <span className="info">{item.desc}</span>
                    </div>
                    <img src={`http://localhost:8080${item.imgSrc}`} alt="" />
                </Flex>
            )} />
    </div>
);

const list = [
    { key: '1', fundid: '10001', projectid: '0', nodetype: '0', qryflag: true, operflag: true, traderight: '@' },
    { key: '2', fundid: '10001', projectid: '1', nodetype: '1', qryflag: true, operflag: true, traderight: '@' },
    { key: '3', fundid: '10001', projectid: '1', nodetype: '2', qryflag: true, operflag: true, traderight: '@' },
    { key: '4', fundid: '10001', projectid: '2', nodetype: '1', qryflag: true, operflag: true, traderight: '@' },
    { key: '5', fundid: '10001', projectid: '2', nodetype: '2', qryflag: true, operflag: true, traderight: '@' },
    { key: '6', fundid: '10002', projectid: '0', nodetype: '0', qryflag: true, operflag: true, traderight: '@' },
    { key: '7', fundid: '10002', projectid: '3', nodetype: '1', qryflag: true, operflag: true, traderight: '@' },
    { key: '8', fundid: '10002', projectid: '3', nodetype: '2', qryflag: true, operflag: true, traderight: '@' },
    { key: '9', fundid: '10002', projectid: '4', nodetype: '1', qryflag: true, operflag: true, traderight: '@' },
    { key: '10', fundid: '10002', projectid: '4', nodetype: '2', qryflag: true, operflag: true, traderight: '@' },

]
class Index extends PureComponent {
    state = {
        // 租房小组数据
        groups: [],
        // 最新资讯
        news: [],
        list: [],
        newList: []
    }
    async getHomeGroups() {
        const { data } = await fetchHomeGroups()
        this.setState({
            groups: data.body
        })
    }

    async getHomeNews() {
        const area = 'AREA%7C88cff55c-aaa4-e2e0'
        const { data } = await fetchHomeNews({ area })
        this.setState({
            news: data.body
        })
    }

    componentDidMount() {
        // this.getHomeGroups()
        // this.getHomeNews()
    }

    //资讯
    renderNews() {
        return this.state.news.map(item => (
            <div className="news-item" key={item.id}>
                <div className="imgwrap">
                    <img
                        className="img"
                        src={`http://localhost:8080${item.imgSrc}`}
                        alt=""
                    />
                </div>
                <Flex className="content" direction="column" justify="between">
                    <h3 className="title">{item.title}</h3>
                    <Flex className="info" justify="between">
                        <span>{item.from}</span>
                        <span>{item.date}</span>
                    </Flex>
                </Flex>
            </div>
        ))
    }
    // dataFormat(item, type) {
    //     //如果点击qryflag&& operflag ,传对应list
    //     this.state.newList = list.filter(r => item.fundid === r.fundid)
    //     if (type === 'qryflag') {
    //         if (item.qryflag) {
    //             if (item.nodetype === '1') this.state.newList = this.state.newList.filter(r => r.nodetype !== '0' && item.projectid === r.projectid)
    //             if (item.nodetype === '2') this.state.newList = this.state.newList.filter(r => r.nodetype === '2' && item.projectid === r.projectid)

    //         }
    //     } else {
    //         if (item.operflag) {
    //             if (item.nodetype === '1') this.state.newList = this.state.newList.filter(r => r.nodetype !== '0'&& item.projectid === r.projectid)
    //             if (item.nodetype === '2') this.state.newList = this.state.newList.filter(r => r.nodetype === '2'&& item.projectid === r.projectid)

    //         }
    //     }
    // }
    /** 变成平铺数据
    * @param data tree数据
   */
    transformFlatData(data) {
        let list = []
        let queueList = [...data]
        while (queueList.length) {
            let node = Object.assign({}, queueList.shift())
            if (node.children) {
                queueList.push(...node.children)
            }
            delete node.children
            list.push(node)
        }
        return list
    }


    /** 过滤出操作查询改变的list数据 
     * @param type 操作类型
     * @param record 操作的数据
     * @param 
    */
    filterRightList(record, type) {
        let list = []
        // list = this.transformFlatData(record)
        this.state.list.forEach(r => {
            let obj = Object.assign({}, r)
            if (r.fundid === record.fundid) {
                list.push(obj)
            }
        })
        this.changeStatus(type, record, list)

        //变化的数据替换掉老数据
        this.state.list.map(v=>{
            let item = list.find(a=>a.projectId == v.projectId && a.fundid == v.fundid && a.nodetype == v.nodetype)
            //  console.log(item)   
            v.qryflag = item?.qryflag
            v.operflag = item?.operflag
        
        })
        console.log(this.state.list,list)
    }

    /** 操作查询改变的数据 
   * @param type 操作类型
   * @param record 操作的数据
   * @param list 需要变化的数据
  */
    changeStatus(type, record, list) {
        //对于不同操作可能数据改变list还会有变化
        if (record.qryflag || record.operflag) {
            if (record.nodetype === '1') list = list.filter(r => r.nodetype !== '0' && record.projectid === r.projectid)
            if (record.nodetype === '2') list = list.filter(r => r.nodetype === '2' && record.projectid === r.projectid)
        }
        // console.log(list)
        list.map(r => {
            if (type === 'qryflag') {
                if (record.qryflag) {
                    r.operflag = false
                }
                r.qryflag = !r.qryflag
            } else {
                if (!record.operflag) {
                    r.qryflag = true
                }
                r.operflag = !r.operflag
            }
            return r
        })
        // console.log(list)
    }
    itemClick(item, type) {
        this.filterRightList(item, type)
    }
    //list
    renderList() {
        list.forEach(r => {
            let obj = Object.assign({}, r)
            this.state.list.push(obj)
        })
        console.log(this.state.list, 2)
        return this.state.list.map(item => (
            <li key={item.key} className="liItem">
                {this.renderItem(item)}
            </li>
        ))
    }
    /** 保存数据 */
    saveData() {
        
    }
    renderItem(item) {
        return <div>
            <Flex>
                {item.qryflag ? <Flex.Item onClick={() => this.itemClick(item, 'qryflag')}>
                    <CheckOutline ></CheckOutline>
                </Flex.Item> :
                    <Flex.Item onClick={() => this.itemClick(item, 'qryflag')}>
                        <CloseOutline ></CloseOutline>
                    </Flex.Item>}
                {item.operflag ? <Flex.Item onClick={() => this.itemClick(item, 'operflag')}>
                    <CheckOutline ></CheckOutline>
                </Flex.Item> :
                    <Flex.Item onClick={() => this.itemClick(item, 'operflag')}>
                        <CloseOutline ></CloseOutline>
                    </Flex.Item>}

            </Flex>


        </div>
    }
    render() {
        // console.log(this.renderList())
        return (
            <div className="index">
                {/* <Banner ></Banner>
                <NavBar {...this.props}></NavBar>
                <Group data={this.state.groups}></Group>

                {/* 最新资讯 */}
                {/* <div className="news">
                    <h3 className="group-title">最新资讯</h3>
                    <WingBlank size="md">{this.renderNews()}</WingBlank>
                </div> */}
                <ul>
                    {this.renderList()}
                </ul>
                <Button onClick={this.saveData}>保存</Button>
            </div>
        );
    }
}

export default Index;