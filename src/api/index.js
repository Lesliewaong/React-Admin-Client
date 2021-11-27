/**
 * 要求: 能根据接口文档定义接口请求
 * 包含应用中所有接口请求函数的模块
 * 每个函数的返回值都是promise
 */
import ajax from "./ajax";

// 登陆 ajax第二个参数必须是对象，username:username => username 匹配请求参数
export const reqLogin = (username, password) => ajax('/login', { username, password }, 'POST')
// 天气
export const reqWeather = (key, location) => ajax('https://devapi.qweather.com/v7/weather/now', { key, location })
// reqWeather('d6d54c0f8bb54160b97507ce068abda8','101010100')
// 获取一级/二级分类列表
export const reqCateGories = (parentId) => ajax('/manage/category/list', { parentId })
// 添加分类 传两个属性
export const reqAddCateGory = (categoryName, parentId) => ajax('/manage/category/add', { categoryName, parentId }, 'POST')
// 更新分类 传一个对象 解构 外部传的时候名字要一致
export const reqUpdateCateGories = ({ categoryName, categoryId }) => ajax('/manage/category/update', { categoryName, categoryId }, 'POST')
// 获取分类（根据分类ID）
export const reqCategory = (categoryId) => ajax('/manage/category/info', {categoryId})
// 获取商品分页列表
export const reqProducts = (pageNum, pageSize) => ajax('/manage/product/list', { pageNum, pageSize })
// 更新商品的状态(上架/下架)
export const reqUpdatesProductsStatus = (productId, status) => ajax('/manage/product/updateStatus', { productId, status }, 'POST')
// 搜索商品分页列表 (根据商品名称/商品描述)
// searchType: 搜索的类型, productName/productDesc
// searchName: 关键字
export const reqSearchProducts = ({ pageNum, pageSize, searchName, searchType }) =>
    ajax('/manage/product/search', {
        pageNum,
        pageSize,
        [searchType]: searchName,
    })
// 删除指定名称的图片
export const reqDeleteImg = (name) => ajax('/manage/img/delete', {name}, 'POST')
// 添加/修改商品 product本身就是对象
export const reqAddOrUpdateProduct = (product) => ajax('/manage/product/' + ( product._id?'update':'add'), product, 'POST')
// 获取所有角色的列表
export const reqRoles = () => ajax('/manage/role/list')
// 添加角色
export const reqAddRole = (roleName) => ajax('/manage/role/add', {roleName}, 'POST')
// 添加角色 role本身就是对象
export const reqUpdateRole = (role) => ajax('/manage/role/update', role, 'POST')


// 获取所有用户的列表
export const reqUsers = () => ajax('/manage/user/list')
// 删除指定用户
export const reqDeleteUser = (userId) => ajax('/manage/user/delete', {userId}, 'POST')
// 添加/更新用户 user本身就是对象
export const reqAddOrUpdateUser = (user) => ajax('/manage/user/'+(user._id ? 'update' : 'add'), user, 'POST')