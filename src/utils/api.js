//获取轮播图
import request from './request'


export function fetchBannerList() {
  return request({
    url: '/home/swiper',
    method: 'get'
  })
}

export function fetchHomeGroups() {
  return request({
    url: '/home/groups',
    method: 'get'
  })
}

export function fetchHomeNews(query) {
  return request({
    url: '/home/news',
    method: 'get',
    params: query
  })
}

export function areaInfo(name) {
  return request({
    url: '/area/info? name=' + name,
    method: 'get'
  })
}

export function areaCity() {
  return request({
    url: '/area/city?level=1' ,
    method: 'get'
  })
}

export function areaHotCity() {
  return request({
    url: '/area/hot',
    method: 'get'
  })
}



export function areaMap(id) {
  return request({
    url: '/area/map?id='+id,
    method: 'get'
  })
}

export function areaHouses(cityId) {
  return request({
    url: '/houses?cityId='+cityId,
    method: 'get'
  })
}

export function queryHouses() {
  return request({
    url: '/houses/params?authorization=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJRCI6NiwiaWF0IjoxNTU1OTIyMjU4LCJleHAiOjE1OTE5MTg2NTh9.Z967JTclvj2ldAXDhAX6SHTgY3iB2Z-qCJ1-cYimwJM',
    method: 'get'
  })
}

export function housesCondition(value) {
  return request({
    url: '/houses/condition?id='+ value,
    method: 'get'
  })
}

export function getHouseList(params) {
  return request({
    url: '/houses',
    method: 'get',
    params : params
  })
}
export function getHouseDetail(id) {
  return request({
    url: '/houses/'+id,
    method: 'get'
  })
}

export function getUserFavorites() {
  return request({
    url: '/user/favorites',
    method: 'get'
  })
}
export function addUserFavorites(id) {
  return request({
    url: '/user/favorites/'+id,
    method: 'post'
  })
}
export function deleteUserFavorites(id) {
  return request({
    url: '/user/favorites/'+id,
    method: 'delete'
  })
}
export function login(params) {
  return request.post('/user/login',params)
}
export function register(params) {
  return request.post('/user/registered',params)
}
export function community(params) {
  return request({
    url: '/area/community',
    method: 'get',
    params
  })
}
export function userHouse(params) {
  return request.post('/user/houses',params)
}
export function houseImage(params) {
  return request.postFormData('/houses/image',params)
}
export function userInfo() {
  return request.get('/user')
}
export function logout() {
  return request.post('/user/logout')
}














