import request from '@/utils/request'

export function getList(params) {
  return request({
    url: 'api/blog/list',
    method: 'get',
    params
  })
}
