import request from '../utils/request'
//添加等级
export function addaddress(data) {
    return request({
        url: "/insertOneAddress",
        method: "post",
        data: data
    })
}
//获取等级
export function getaddress() {
    return request({
        url: "/showAddresses",
        method: "get",

    })
}
//删除等级
export function deladdress(params) {
    return request({
        url: "/delOneAddress",
        method: "get",   
        params
    })
}