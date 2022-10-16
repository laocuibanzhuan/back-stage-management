import request from '@/utils/request'

export function saveSkuInfo(data) {
    return request({
        url: '/admin/product/saveSkuInfo',
        method: 'post',
        data
    })
}

export function reqSkuList(id) {
    return request({
        url: `/admin/product/findBySpuId/${id}`,
        method: 'get'
    })
}

export function reqSkuList_(page, limit) {
    return request({
        url: `/admin/product/list/${page}/${limit}`,
        method: 'get'
    })
}

export function reqSale(id) {
    return request({
        url: `/admin/product/onSale/${id}`,
        method: 'get'
    })
}

export function reqUnSale(id) {
    return request({
        url: `/admin/product/cancelSale/${id}`,
        method: 'get'
    })
}

export function deleteSku(id) {
    return request({
        url: `/admin/product/deleteSku/${id}`,
        method: 'delete'
    })
}

export function reqSku(id) {
    return request({
        url: `/admin/product/getSkuById/${id}`,
        method: 'get'
    })
}