import request from '@/utils/request'

//获取信息接口
export function getMessage() {
    return request({
        url: "/showMessage",//接口地址
        method: "get"//请求方式
        //如果有参数 get是params post 是data
    })
}
export function addMessage(data) {
    return request({
        url: "/insertAllMessage",
        method: "post",
        data,
    })
}
export function delMessage(params) {
    return request({
        url: "/delOneMessage",
        method: "get",
        params
    })
}
export function searchAddress(data) {
    return request({
        url: "/searchaddressid",
        method:"post",
        data,
    })
}
export function messageId(params){
    return request({
        url:"/showOneMessage",
        method:"get",
        params,
    })
}
export function updateMessage(data){
    return request({
        url:"/updateMessage",
        method:"post",
        data
    })
}