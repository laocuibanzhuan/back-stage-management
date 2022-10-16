import request from '@/utils/request'

export function getPermissionList() {
  return request({
    url: `/admin/acl/permission`,
    method: 'get'
  })
}

export function removePermission(id) {
  return request({
    url: `/admin/acl/permission/remove/${id}`,
    method: "delete"
  })
}

export function addPermission(permission) {
  return request({
    url: `/admin/acl/permission/save`,
    method: "post",
    data: permission
  })
}

export function updatePermission(permission) {
  return request({
    url: `/admin/acl/permission/update`,
    method: "put",
    data: permission
  })
}

export function toAssign(roleId) {
  return request({
    url: `/admin/acl/permission/toAssign/${roleId}`,
    method: 'get'
  })
}

export function doAssign(roleId, permissionId) {
  return request({
    url: `/admin/acl/permission/doAssign`,
    method: "post",
    params: { roleId, permissionId }
  })
}

