import request from '@/utils/request'
export function addarticle(data){
    return request({
        url:'article/add',
        method:"post",
        data:data
    })
}
export function getartlist(pageNum){
    return request({
        url:'article/list',
        method:"get",
         params:{pageNum}
    })
}
export function artdetial(id){
    return request({
        url:`article/art/${id}`,
        method:"get",
    })
}
export function updataArt(id,data){ 
    return request({
        url:`article/update/${id}`,
        method:"put",
        data:data
    })
}
export function pageview(id,data){
    return request({
        url:`/addpageview/${id}`,
        method:"put",
        data:data
    })
}
export function getuserartlist(pageNum,username){
    return request({
        url:`article/userart/${username}`,
        method:"get",
        params:{pageNum}
    })
}
export function outoffgoods(id){
    return request({
        url:`article/outoffgoods/${id}`,
        method:"get",
    })
}
export function ongoods(id){
    return request({
        url:`article/ongoods/${id}`,
        method:"get",
    })
}
export function searchgoods(data){
    return request({
        url:'article/search',
        method:"post",
        data:data
    })
}
export function delgood(id){
    return request({
        url:`article/del/${id}`,
        method:"get",
    })
}
