//配置一些路由信息
import React from 'react';
import {  Route, BrowserRouter as Router ,Redirect } from 'react-router-dom';
import Home from './pages/Home'
import CityList from './pages/CityList'
import Maps from './pages/Map'
import List from './pages/List'
import HouseDetail from './pages/HouseDetail';
import Login from './pages/Login';
import Rent from './pages/Rent';
import RentAdd from './pages/Rent/Add';
import Search from './pages/Search';
import Register from './pages/Register'
import AuthRoute from './components/AuthRoute'


function App() {
    return (
     <Router>
       <div className="App">
        {/* 默认路由匹配时，跳转到 /home 实现路由重定向到首页 */}
        <Route path="/" exact render={() => <Redirect to="/home" />} />
        {/* <Link to="/home"></Link> */}
        <Route path="/home" component={Home}></Route>
        <Route path="/cityList" component={CityList}></Route>
        <AuthRoute path="/map" component={ Maps }></AuthRoute>
        <Route path="/list" component={ List }></Route>
        <AuthRoute path="/detail/:id" component={HouseDetail}></AuthRoute>
        <Route path="/login" component={Login}></Route>
        <Route path="/register" component={Register}></Route>
        <AuthRoute path="/rent" exact component={Rent}></AuthRoute>
        <AuthRoute path="/rent/add" component={RentAdd}></AuthRoute>
        <AuthRoute path="/search" component={Search}></AuthRoute>

       </div>
     </Router>
    )
 }

export default App;
