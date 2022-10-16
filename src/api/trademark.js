import request from '@/utils/request'

export function reqPageList(page, limit) {
    return request({
        url: `/admin/product/baseTrademark/${page}/${limit}`,
        method: 'get'
    })
}

export function addNewTrade(data) {
    return request({
        url: '/admin/product/baseTrasdemark/save',
        method: 'post',
        data
    })
}

export function updateTrade(data) {
    return request({
        url: '/admin/product/baseTrademark/update',
        method: 'put',
        data
    })
}

export function deleteTrade(id) {
    return request({
        url: `/admin/product/baseTrademark/${id}`,
        method: 'delete'
    })
}
