import React, { Component, createRef } from 'react'
import PropTypes from 'prop-types'
import styles from './index.module.css'


// 4 在 Sticky 组件中，创建两个 ref 对象（placeholder、content），分别指向占位元素和内容元素。
// 5 组件中，监听浏览器的 scroll 事件（注意销毁事件）。
// 6 在 scroll 事件中，通过 getBoundingClientRect() 方法得到筛选栏占位元素当前位置（top）。
// 7 判断 top 是否小于 0（是否在可视区内）。
// 8 如果小于，就添加需要吸顶样式（fixed），同时设置占位元素高度（与条件筛选栏高度相同）。
// 9 否则，就移除吸顶样式，同时让占位元素高度为 0。

class Sticky extends Component {
    placeholder = createRef()
    content = createRef()
    handleScroll = () => {
        const { height } = this.props
        const placeholder = this.placeholder.current
        const content = this.content.current
        //获取顶部距离
        const { top } = placeholder.getBoundingClientRect()
        // console.log(top)
        if (top < 0) {
            // 吸顶
            content.classList.add(styles.fixed)
            placeholder.style.height = `${height}px`
        }else{
            content.classList.remove(styles.fixed)
            placeholder.style.height = 0
        }
    }
    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll)
    }
    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll)
    }
    render() {
        return (
            <div>
                {/* 占位元素 */}
                <div ref={this.placeholder} />
                {/* 内容元素 */}
                <div ref={this.content}>{this.props.children}</div>
            </div>
        )
    }
}

Sticky.propTypes = {
    height: PropTypes.number.isRequired
};

export default Sticky;