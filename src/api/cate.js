import request from '@/utils/request'
export function addcate(data){
    return request({
        url:'cate/add',
        method:"post",
        data:data
    })
}
export function catelist(){
    return request({
        url:'cate/list',
        method:"get",
    })
}
export function delcate(id){
    return request({
        url:`cate/del/${id}`,
        method:"get",
    })
}