import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/admin/acl/index/login',
    method: 'post',
    data
  })
}

export function getInfo() {
  return request({
    url: '/admin/acl/index/info',
    method: 'get'
  })
}

export function logout() {
  return request({
    url: '/admin/acl/index/logout',
    method: 'post'
  })
}

export function getMenu() {
  return request('/admin/acl/index/menu')
}

export function getPageList(page, limit, searchObj) {
  return request({
    url: `/admin/acl/user/${page}/${limit}`,
    method: 'get',
    params: searchObj
  })
}

export function getById(id) {
  return request({
    url: `/admin/acl/user/get/${id}`,
    method: 'get'
  })
}

export function add(user) {
  return request({
    url: `/admin/acl/user/save`,
    method: 'post',
    data: user
  })
}

export function update(user) {
  return request({
    url: `/admin/acl/user/update`,
    method: 'put',
    data: user
  })
}

export function getRoles(userId) {
  return request({
    url: `/admin/acl/user/toAssign/${userId}`,
    method: 'get'
  })
}

export function assignRoles(userId, roleId) {
  return request({
    url: `/admin/acl/user/doAssign`,
    method: 'post',
    params: {
      userId,
      roleId
    }
  })
}

export function removeById(id) {
  return request({
    url: `/admin/acl/user/remove/${id}`,
    method: 'delete'
  })
}

export function removeUsers(ids) {
  return request({
    url: `/admin/acl/user/batchRemove`,
    method: 'delete',
    data: ids
  })
}
