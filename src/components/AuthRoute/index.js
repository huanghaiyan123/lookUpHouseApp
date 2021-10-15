import React from 'react';

// import PropTypes from 'prop-types'
import { Route, Redirect } from 'react-router-dom';
// import styles from './index.module.css'
import { isAuth } from '../../utils/auth';



const AuthRoute = ({ component: Component,  ...test  }) => {
    const isLogin = isAuth()
    return (
        <Route
            {...test}
            render={props => {
                console.log(props,isLogin,111)
               return (
                isLogin ? <Component {...props}></Component> : <Redirect to={{
                    pathname: '/login',
                    state: {
                        from: props.location
                    }
                }}></Redirect>
               ) 
            }}
        />
    );

}


AuthRoute.propTypes = {

};

export default AuthRoute;