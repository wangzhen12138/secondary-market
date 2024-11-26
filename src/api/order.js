import request from '@/utils/request'


export function add(data) {
  return request({
    url: 'order/add',
    method: 'post',
    data:data
  })
}
export function getorderlist(pageNum){
    return request({
        url:'order/list',
        method:"get",
         params:{pageNum}
    })
}
export function getuserorderlist(pageNum,username){
    return request({
        url:`order/userorder/${username}`,
        method:"get", 
        params:{pageNum}
    })
}
export function getusersoldlist(pageNum,username){
    return request({
        url:`order/usersold/${username}`,
        method:"get",
        params:{pageNum}
    })
}
export function getorderdetial(id){
    return request({
        url:`order/getorderdetial/${id}`,
        method:"get",
        
    })
}
export function changeorder(id,state){
    return request({
        url:`order/changeorder/${id}`,
        method:"post",
        data:{state}
        
    })
}
export function getadminorder(pageNum){
    return request({
        url:`order/adminorder`,
        method:"get",
        params:{pageNum}
    })
}

