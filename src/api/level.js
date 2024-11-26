import request from '../utils/request'
//添加等级
export function addLevel(data) {
    return request({
        url: "/insertOneLevel",
        method: "post",
        data: data
    })
}
//获取等级
export function getLevel() {
    return request({
        url: "/showLevel",
        method: "get",

    })
}
//删除等级
export function delLevel(params) {
    return request({
        url: "/delOneLevel",
        method: "get",
        params
    })
}