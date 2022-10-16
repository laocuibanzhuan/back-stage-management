import request from '@/utils/request'


export function getPageList(page, limit, searchObj) {
    return request({
        url: `/admin/acl/role/${page}/${limit}`,
        method: 'get',
        params: searchObj
    })
}

export function getById(id) {
    return request({
        url: `/admin/acl/role/get/${id}`,
        method: 'get'
    })
}

export function save(role) {
    return request({
        url: `/admin/acl/role/save`,
        method: 'post',
        data: role
    })
}

export function updateById(role) {
    return request({
        url: `/admin/acl/role/update`,
        method: 'put',
        data: role
    })
}

export function getAssign(roleId) {
    return request({
        url: `/admin/acl/role/toAssign/${roleId}`,
        method: 'get'
    })
}

export function removeById(id) {
    return request({
        url: `/admin/acl/role/remove/${id}`,
        method: 'delete'
    })
}

export function removeRoles(ids) {
    return request({
        url: `/admin/acl/role/batchRemove`,
        method: 'delete',
        data: ids
    })
}