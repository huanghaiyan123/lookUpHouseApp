import React, { PureComponent } from 'react';
import { SearchBar } from 'antd-mobile';
import { community } from '../../utils/api'
// import PropTypes from 'prop-types';
import styles from './index.module.css'

class Search extends PureComponent {
    state = {
        value: '',
        list: []
    }
    timerId = null
     fetchCommunity =async (name)=> {
        const city = JSON.parse(localStorage.getItem('hkzf_city'))
        const id = city.value
        const params = { name, id }
        const { data } = await community(params)
        this.setState({
            list: data.body
        })

    }
    onChange = (value) => {
        this.setState({ value: value })
        if(!value){
            return this.setState({
                list: []
            }) 
        }
        this.setState({ value });
        console.log(this.timerId)
        //发送搜索请求获取数据
        clearTimeout( this.timerId)
        this.timerId = setTimeout(() => {
            this.fetchCommunity(value)
        }, 1000)


    }
    renderList = () => {
        return (
            this.state.list.map(item => {
                return <li key={item.community} className={styles.tip} onClick={() => {
                    console.log( this.props)
                    this.props.history.push({
                        pathname: '/rent/add', query: {
                            name: item.communityName,
                            id: item.community
                        }
                    })
                }}>{item.communityName}</li>
            })
        )
    }
    render() {
        return (
            <div className={styles.root}>
                <SearchBar
                    value={this.state.value}
                    placeholder="请输入小区名字"
                    onCancel={() => {
                        this.setState({
                            value: ''
                        })
                        this.props.history.push('/home')
                    }}
                    showCancelButton
                    onChange={this.onChange}
                />
                <ul className={styles.tips}>{this.renderList()}</ul>
            </div>
        );
    }
}

// Search.propTypes = {

// };

export default Search;