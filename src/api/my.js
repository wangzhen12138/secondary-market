import request from '../utils/request'
export function getsql() {
    return request({
        url: "/showMessage",//接口地址
        method: "get"//请求方式
        //如果有参数 get是params post 是data
    })
}