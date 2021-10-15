import React, { PureComponent } from 'react';


import FilterFooter from '../../../components/FilterFooter'
import styles from './index.module.css'

class FilterMore extends PureComponent {
    state = {
        value : this.props.defaultValue
    }
    // componentWillReceiveProps(nextProps) {
    //     this.setState({
    //         isShowMore: nextProps.isShowMore,
    //         value : nextProps.defaultValue
    //     })
    // }
    cancel=()=>{
        const isShow = false
        this.props.onCancel(this.props.type,isShow) 
    }
    confirm = ()=>{
        const isShow = false
        this.props.onConfirm(this.props.type,this.state.value,isShow)
    }
    onTagClick(value){
        //有值就去掉,没有就赋值
        const newSelectValue = [...this.state.value]
        const index = newSelectValue.indexOf(value); 
        if(index < 0){
            newSelectValue.push(value)
        }else{
            newSelectValue.splice(index,1)
        }
        console.log(newSelectValue)
        
        this.setState({
            value : newSelectValue
        })
    }
    renderFilters(data){
        if(!data || !data.length){
            return 
        }
        return (
            data.map(item =>{
                const isSelected = this.state.value.indexOf(item.value) > -1;
                return (
                    <span key={item.value}  className={[styles.tag, isSelected ? styles.tagActive : ''].join(' ')}  onClick={() => this.onTagClick(item.value)}>{item.label}</span>
                )
            }
              
            ) 
        )
    }
    render() {
       const {roomType,oriented,floor,characteristic} = this.props
       console.log(roomType,oriented,floor,characteristic)
        return (
            <div className={[styles.root,this.props.isShowMore ? '' : styles.hide].join(' ')}>
                {/* 遮罩层 */}
                <div className={styles.mask}>
                </div>
                {/* 内容区域 */}
                <div className={styles.tags}>
                    <>
                        <dl className={styles.dl}>
                            <dt className={styles.dt}>户型</dt>
                            <dd className={styles.dd}>
                                {this.renderFilters(roomType)}
                            </dd>

                            <dt className={styles.dt}>朝向</dt>
                            <dd className={styles.dd}>
                                {this.renderFilters(oriented)}
                            </dd>

                            <dt className={styles.dt}>楼层</dt>
                            <dd className={styles.dd}>
                            {this.renderFilters(floor)}
                            </dd>

                            <dt className={styles.dt}>房屋亮点</dt>
                            <dd className={styles.dd}>
                                {this.renderFilters(characteristic)}
                            </dd>
                        </dl>
                    </>
                </div>
                {/* 底部 */}
                <FilterFooter className={styles.footer} cancelText='清除' cancel={this.cancel} confirm={this.confirm} ></FilterFooter>
            </div>
        );
    }
}

FilterMore.propTypes = {

};

export default FilterMore;