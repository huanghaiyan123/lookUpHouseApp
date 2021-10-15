import axios from 'axios'
// create an axios instance

import { getToken, removeToken } from './auth'

const service = axios.create({
  baseURL: 'http://localhost:8080/', // api 的 base_url
  timeout: 5000 * 6 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // Do something before request is sent
     // 添加请求头
     config.headers.Authorization = getToken('hkzf_token')
    return config
  },
  error => {
    // Do something with request error
    console.log(error) // for debug
    Promise.reject(error)
  }
)

/** 添加响应拦截器  **/
service.interceptors.response.use(response => {
  if (response.status === 400) {
    // 此时，说明 token 失效，直接移除 token 即可
    removeToken()
  }
  // console.log(response)
  // 响应结果里的 statusText: ''是我与后台的约定，大家可以根据实际情况去做对应的判断
  if (response.status === 200) {     
      return response
  } else {
      return Promise.reject(response.data.message)
  }
}, error => {
  if (error.response) {
      // token或者登陆失效情况下跳转到登录页面，根据实际情况，在这里可以根据不同的响应错误结果，做对应的事。这里我以401判断为例
      // if (error.response.status === 401) {    
      //     //针对框架跳转到登陆页面
      //     this.props.history.push('/login');
      // }
      return Promise.reject(error)
  } else {
      return Promise.reject('请求超时, 请刷新重试')
  }
})

service.get = function httpGet(url, params) {
  return service({
    method: 'get',
    url,
    params
  })
}

service.post = function httpPost(url, data) {
  return service({
    method: 'post',
    url,
    data
  })
}

service.postFormData = function(url, data) {
  return service({
    method: 'post',
    url,
    data,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}


export default service
