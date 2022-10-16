import request from '@/utils/request'

export function reqGoodsList_1() {
    return request({
        url: '/admin/product/getCategory1/',
        method: 'get'
    })
}

export function reqGoodsList_2(id) {
    return request({
        url: `/admin/product/getCategory2/${id}`,
        method: 'get'
    })
}

export function reqGoodsList_3(id) {
    return request({
        url: `/admin/product/getCategory3/${id}`,
        method: 'get'
    })
}

export function reqGoodsList(ids) {
    return request({
        url: `/admin/product/attrInfoList/${ids.id1}/${ids.id2}/${ids.id3}`,
        method: 'get'
    })
}

export function addGoodsAttr(data) {
    return request({
        url: '/admin/product/saveAttrInfo',
        method: 'post',
        data
    })
}

export function deleteGoodsAttr(id) {
    return request({
        url: `/admin/product/deleteAttr/${id}`,
        method: 'delete'
    })
}