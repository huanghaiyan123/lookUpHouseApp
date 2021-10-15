import React, { PureComponent } from 'react';
import { Route } from 'react-router-dom';
import { TabBar } from 'antd-mobile';
import News from '../News'
import Index from '../Index'
import House from '../House'
import My from '../My'

// 导入组件自己的样式文件
import './index.css'


const TabBarList = [{
    title: '首页',
    path: '/home',
    icon: 'icon-ind',
},
{
    title: '找房',
    path: '/home/house',
    icon: 'icon-findHouse'
},
{
    title: '资讯',
    path: '/home/news',
    icon: 'icon-infom'
},
{
    title: '我的',
    path: '/home/my',
    icon: 'icon-my'
}]

class Home extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {selectedTab: this.props.location.pathname};
    }
    componentDidUpdate (prevProps){
        if(prevProps.location.pathname !== this.props.location.pathname){
            this.setState({
                selectedTab: this.props.location.pathname,
              });
        }
    }
    render() {
        return (
            <div  className="home">
                <Route path="/home"  exact component={Index} ></Route>
                <Route path="/home/news" component={News}></Route>
                <Route path="/home/house" component={House}></Route>
                <Route path="/home/my" component={My}></Route>
                

                <TabBar >
                    {TabBarList.map(item => {
                         return <TabBar.Item
                         title={item.title}
                         key={item.title}
                         icon={<i className={`iconfont ${item.icon}`} />}
                         data-seed="logId"
                         selectedIcon={<div style={{
                            width: '22px',
                            height: '22px',
                            background: 'url(https://zos.alipayobjects.com/rmsportal/iSrlOTqrKddqbOmlvUfq.svg) center center /  21px 21px no-repeat' }}
                          />
                          }
                        selected={this.state.selectedTab === item.path}
                         onPress={() => {
                            this.setState({
                              selectedTab: item.path,
                            });
                            this.props.history.push(item.path)
                          }}
                     >
                     </TabBar.Item> 
                    }
                    )}
                </TabBar>

            </div>
        );
    }
}

export default Home;