
import React, { PureComponent } from 'react';

import { Flex, Carousel, Grid, WingBlank } from 'antd-mobile';

import { fetchBannerList, fetchHomeGroups, fetchHomeNews } from '../../utils/api'
import { BASE_URL } from '../../utils/url'
import Search from '../../components/SearchHeader'


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
            curCityName : city.label
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
        console.log(this.state.navList,this.props)
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

class Index extends PureComponent {
    state = {
        // 租房小组数据
        groups: [],
        // 最新资讯
        news: []
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
        this.getHomeGroups()
        this.getHomeNews()
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

    render() {
        return (
            <div className="index">
                <Banner ></Banner>
                <NavBar {...this.props}></NavBar>
                <Group data={this.state.groups}></Group>

                {/* 最新资讯 */}
                <div className="news">
                    <h3 className="group-title">最新资讯</h3>
                    <WingBlank size="md">{this.renderNews()}</WingBlank>
                </div>
            </div>
        );
    }
}

export default Index;