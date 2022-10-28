# 项目介绍

学习网址：https://www.bilibili.com/video/BV1Vf4y1T7bw/

采用https://github.com/PanJiaChen/vue-admin-template模板，完成尚品汇的后台管理

## 侧边栏与面包屑

由于模板的完善封装，只需在VueRouter中配置路由及路由的元信息title和icon

就可以自动完成侧边栏的导航区和面包屑

## 主区域

本人亲手复刻了此项目的大多数内容（权限管理部分完全复制）

部分代码实现的方式不同，但完全可以达到要求，效果与原项目相差无几

## 响应式布局

模板在一定程度上实现了PC端和移动端的适配

本人在大多数情况下都没有考虑响应式布局

部分使用ElementUI的场景可能实现了响应式布局

# 接口地址

## 登录，权限，用户

http://39.98.123.211:8170/swagger-ui.html

## 增加、修改、删除商品

由于未知原因，无法访问
http://39.98.123.211:8216/swagger-ui.html

## 上传图片

由于未知原因，无法上传图片

http://gmall-h5-api.atguigu.cn/admin/product/fileUpload

# 项目周期

于2022年10月8日开始，2022年10月16日结束

每天工作时间不等，平均7小时（包括看视频、书写代码、调试、复习）

虽然完成了全部内容，但对于模板不不甚了解，还需花时间研读

# 项目依赖

绝大多部分使用ElementUI完成了展示数据、修改数据、收集数据等核心业务逻辑

部分场景使用了ECharts展示默认数据

少数依赖的版本不同，引入与使用有较大差异

# 项目心得

## 项目总体

本人理解能力有限，难以清楚理解尚硅谷后台抽象模型的各个部分及各个部分的相互联系

导致思路混乱，全局业务逻辑理解欠缺

## 网络请求

部分接口文档无法访问、接口情况难以全面了解，导致编写请求效率低下

## layout路由布局

侧边栏部分与面包屑部分完全由模板完成

第一次接触模板，加上引用关系错综复杂，难以理解透彻

## 数据收集

表单验证需要考虑多种情况，包括基本的去空格、验证唯一性、验证合法性

数据收集还需要考虑数据的格式与数据值的嵌套关系

数据收集结束后还需清除已收集数据的缓存

## 权限管理

由于接口设计的原因，路由的name属性必须与后端设计的name完全一致

由于按钮权限的工作量大，技术含量几乎为零，所以没有处理按钮权限

为了避免异步路由在页面刷新时丢失，本人将路由权限的计算和路由合并写成一般函数

进行路由跳转和页面刷新时调用

页面刷新时，router都会被重置，此时的router只能处理常量路由

如果跳转的地址不在常量路由中，则会产生404错误

# 关于警告

## can't get DOM

本人把图表写在了el-tabs中，而el-tabs由于某些未知原因在父组件mounted之后并没有宽高

导致图表无法获取宽高，出现警告

父组件mounted之后很短时间内el-tabs解析就会完成，从而显示图表，不影响总体

**解决方式：**改变布局，将图表放在el-tabs外

# 关于注释

此次项目的难度较低，且练习过此项目的朋友很多

再由于本人能力有限，对于模板的多数部分没有很好的理解

为了避免误人子弟，因此没有写注释



