//考虑到刷新后会重置路由，为了保存允许的路由，还要考虑登出时删除路由
//需将允许的路由保存在sessionStorage中
//重置路由时使用保存的路由，如此便可实现完善的页面刷新

export function getRoutes() {
    return sessionStorage.getItem('routes')
}

export function setRoutes(routes) {
    return sessionStorage.setItem('routes', routes)
}

export function removeRoutes() {
    return sessionStorage.removeItem('routes')
}