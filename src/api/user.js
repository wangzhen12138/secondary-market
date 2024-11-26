import request from '@/utils/request'

export function login(data) {
    console.log(data);
  return request({
    url: 'users/login',
    method: 'post',
    data:data
  })

}
export function updateinfo(token,data) {
  return request({
    url: `users/updateinfo/${token}`,
    method: 'put',
    data:data
  })
}
export function getInfo(token,data) {
  return request({
    url: `users/getinfor/${token}`,
    method: 'put',
    data:data
  })
}
export function searchinfo(token,data) {
  return request({
    url: `users/searchinfo/${token}`,
    method: 'put',
    data:data
  })
}

export function logout(data) {
  return request({
    url: 'users/logout',
    method: 'post',
    data:data
  })
}
export function add(data) {
  return request({
    url: 'users/add',
    method: 'post',
    data:data
  })
}
export function getuserlist() {
  return request({
    url: `users/userlist`,
    method: 'get',
  
  })
}

