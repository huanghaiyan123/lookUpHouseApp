import React, { PureComponent } from 'react';
import { PickerView } from 'antd-mobile';
import FilterFooter from '../../../components/FilterFooter'
import styles from './index.module.css'

class FilterPicker extends PureComponent {
   state = {
        value: this.props.defaultValue
    };
    componentWillReceiveProps(nextProps) {
        console.log(nextProps)
        this.setState({
            // isShow: nextProps.isShowPicker,
            value : nextProps.defaultValue
        }) 
    }
    cancel=()=>{
        const isShow = false
        this.props.onCancel(this.props.type,isShow) 
    }
    confirm = ()=>{
        const isShow = false
        this.props.onConfirm(this.props.type,this.state.value,isShow)
    }
    onScrollChange = (value) => {
        console.log(value);
        this.setState({
            value: value
          })
      }
    render() {
        return (
            <div className={this.props.isShowPicker ? '' : styles.hide}>
                <PickerView
                    data={this.props.data}
                    value={this.state.value}
                    cols={this.props.cols}
                    onScrollChange={this.onScrollChange}
                />
                <FilterFooter cancel={this.cancel} confirm={this.confirm}></FilterFooter>
            </div>
        );
    }
}

FilterPicker.propTypes = {

};

export default FilterPicker;