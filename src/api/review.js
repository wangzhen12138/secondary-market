import request from '@/utils/request'

export function addreview(data) {
  return request({
    url: 'review/addreview',
    method: 'post',
    data:data
  })

}
export function getreviewlist(pageNum,artid){
    return request({
        url:`review/reviewlist/${artid}`,
        method:"get",
        params:{pageNum}
    })
}
export function rereview(data){
    return request({
        url:`review/rereview`,
        method:"post",
        data:data
    })
}

