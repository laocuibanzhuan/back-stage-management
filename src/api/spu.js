import request from '@/utils/request'

export function reqSpuList(info) {
    return request({
        url: `/admin/product/${info.page}/${info.limit}`,
        method: 'get',
        params:{category3Id:info.category3Id}
    })
}

export function reqAttrList() {
    return request({
        url: '/admin/product/baseTrademark/getTrademarkList',
        method: 'get'
    })
}

export function reqSaleAttrList() {
    return request({
        url: '/admin/product/baseSaleAttrList',
        method: 'get'
    })
}

export function reqSpuInfo(id) {
    return request({
        url: `/admin/product/getSpuById/${id}`,
        method: 'get'
    })
}

export function reqSpuPictures(id) {
    return request({
        url: `/admin/product/spuImageList/${id}`,
        method: 'get'
    })
}

export function reqSpuSaleAttrList(id) {
    return request({
        url: `/admin/product/spuSaleAttrList/${id}`,
        method: 'get'
    })
}

export function addSpu(data) {
    return request({
        url: '/admin/product/saveSpuInfo',
        method: 'post',
        data
    })
}

export function updateSpu(data) {
    return request({
        url: '/admin/product/updateSpuInfo',
        method: 'post',
        data
    })
}

export function deleteSpu(id) {
    return request({
        url: `/admin/product/deleteSpu/${id}`,
        method: 'delete'
    })
}