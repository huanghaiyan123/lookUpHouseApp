//项目组件库导入，渲染
import React from 'react';
import ReactDOM from 'react-dom';

import 'antd-mobile/dist/antd-mobile.css';  

// 导入字体图标库的样式文件
import './assets/fonts/iconfont.css'

//放在后面避免样式覆盖
import './index.css';

import App from './App';


ReactDOM.render( 
<App />,
document.getElementById('root')
);

