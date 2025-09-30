import './assets/style.css'
import './assets/style.css'
import { createApp, reactive } from 'vue'
import App from './App.vue'
import router from './router'
import '@fortawesome/fontawesome-free/css/all.min.css'
import { initUsers } from './utils/initUsers.js'

// 创建全局状态管理对象
export const store = {
  // 使用reactive将state转换为响应式对象
  state: reactive({
    user: null,
    isLoggedIn: false,
    cartItems: [],
    collectItems: []
  }),
  setUser(user) {
    this.state.user = user
    this.state.isLoggedIn = !!user
    // 保存用户信息到localStorage
    if (user) {
      localStorage.setItem('user', JSON.stringify(user))
    } else {
      localStorage.removeItem('user')
    }
  },
  getUser() {
    // 从localStorage获取用户信息
    if (!this.state.user) {
      const userStr = localStorage.getItem('user')
      if (userStr) {
        try {
          this.state.user = JSON.parse(userStr)
          this.state.isLoggedIn = true
        } catch (e) {
          console.error('Failed to parse user data from localStorage:', e)
        }
      }
    }
    return this.state.user
  },
  
  // 更新用户信息
  updateUser(user) {
    // 这是UserCenterView.vue中调用的方法
    // 它与setUser功能类似，但专门用于更新现有用户
    this.setUser(user)
  },
  isAuthenticated() {
    this.getUser() // 确保用户状态已初始化
    return this.state.isLoggedIn
  },
  logout() {
    this.setUser(null)
    this.state.cartItems = []
    this.state.collectItems = []
  },
  // 购物车相关方法
  addToCart(item, quantity = 1) {
    const existingItem = this.state.cartItems.find(i => i.id === item.id)
    if (existingItem) {
      existingItem.quantity += quantity
    } else {
      this.state.cartItems.push({...item, quantity})
    }
    this.saveCart()
  },
  removeFromCart(productId) {
    this.state.cartItems = this.state.cartItems.filter(item => item.id !== productId)
    this.saveCart()
  },
  getCartItems() {
    if (this.state.cartItems.length === 0) {
      const cartStr = localStorage.getItem('cart')
      if (cartStr) {
        try {
          this.state.cartItems = JSON.parse(cartStr)
        } catch (e) {
          console.error('Failed to parse cart data from localStorage:', e)
        }
      }
    }
    return this.state.cartItems
  },
  saveCart() {
    localStorage.setItem('cart', JSON.stringify(this.state.cartItems))
  },
  // 收藏相关方法
  addToCollect(item) {
    if (!this.state.collectItems.find(i => i.id === item.id)) {
      this.state.collectItems.push(item)
      this.saveCollect()
    }
  },
  removeFromCollect(productId) {
    this.state.collectItems = this.state.collectItems.filter(item => item.id !== productId)
    this.saveCollect()
  },
  getCollectItems() {
    if (this.state.collectItems.length === 0) {
      const collectStr = localStorage.getItem('collect')
      if (collectStr) {
        try {
          this.state.collectItems = JSON.parse(collectStr)
        } catch (e) {
          console.error('Failed to parse collect data from localStorage:', e)
        }
      }
    }
    return this.state.collectItems
  },
  saveCollect() {
    localStorage.setItem('collect', JSON.stringify(this.state.collectItems))
  }
}

const app = createApp(App)
app.use(router)

// 提供全局store
app.config.globalProperties.$store = store
// 使用provide提供store，以便组件通过inject获取
app.provide('store', store)

// 默认导出store
export default store

// 初始化用户数据
initUsers()

// 路由守卫，检查用户登录状态
router.beforeEach((to, from, next) => {
  // 需要登录的路由列表
  const requiresAuth = ['cart', 'collect']
  
  if (requiresAuth.includes(to.name) && !store.isAuthenticated()) {
    // 跳转到登录页面，并记录当前页面以便登录后返回
    next({ name: 'login', query: { redirect: to.path } })
  } else {
    next()
  }
})

app.mount('#app')
