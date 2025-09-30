<template>
  <header class="header">
    <router-link to="/" class="logo"> <i class="fas fa-lightbulb"></i> 元生湘缘 </router-link>

    <form action="" class="search-form">
      <input type="search" placeholder="在此搜索..." id="search-box">
      <label for="search-box" class="fas fa-search"></label>
    </form>

    <!-- 登录后显示问候语 -->
    <div v-if="isLoggedIn && user" class="user-greeting">
      <div class="greeting-text">你好，{{ user.username }}</div>
    </div>

    <!-- 侧边导航栏开始 -->
    <div class="icons">
      <div id="menu-btn" class="fas fa-bars" @click="toggleMenu"></div>
      <div id="cart-btn" class="fas fa-shopping-cart" @click="goToCart"></div>
      <div id="login-btn" class="fas fa-user" @click="toggleLogin"></div>
    </div>
    <!-- 侧边导航栏结束 -->

    <!-- navbar导航栏 -->
    <nav class="navbar" :class="{ active: isMenuActive }">
      <div class="panel-header">
        <h3 class="panel-title">导航菜单</h3>
        <div class="panel-closer fas fa-times" @click="closeAll"></div>
      </div>

      
      <router-link to="/shop">商店</router-link>
      <router-link to="/peripheral">周边</router-link>
      <router-link to="/exhibition">作品</router-link>
      <router-link to="/venue-exhibition">场馆</router-link>
      <router-link to="/knowledge-graph">知识图谱</router-link>
      <router-link to="/blog">博客</router-link>
      <router-link to="/team">团队</router-link>
      <router-link to="/contact">联系我们</router-link>
      <router-link to="/user-center">我的</router-link>
      <router-link to="/collect">我的收藏</router-link>
      <router-link to="/cart">购物车</router-link>
    </nav>

    <!-- 购物表单 -->
    <div class="shopping-cart" :class="{ active: isCartActive }" @click.stop>
      <div class="panel-header">
        <h3>购物车</h3>
        <div class="panel-closer fas fa-times" @click="closeAll"></div>
      </div>
      <div v-if="cartItems.length > 0">
        <button type="button" id="select-all" @click="selectAllItems">全选</button>
        <div v-for="item in cartItems" :key="item.id" class="box">
          <i class="fas fa-times" @click="removeFromCart(item.id)"></i>
          <input type="checkbox" :name="'selected_items'" :value="item.id" class="cart-checkbox" v-model="selectedItems">
          <img :src="item.image_url" :alt="item.name">
          <div class="content">
            <h3>{{ item.name }}</h3>
            <span class="quantity"> {{ item.quantity }} </span>
            <span class="multiply"> x </span>
            <span class="price"> {{ item.price }} </span>
            <span class="total"> {{ item.quantity * item.price }} </span>
            <button class="button" @click="removeFromCart(item.id)">移出购物车</button>
          </div>
        </div>
        <h3 class="total"> 总计:￥<span id="total-price">{{ totalPrice }}</span> </h3>
        <button class="btn" @click="checkout">结算</button>
      </div>
      <div v-else>
        <h4>购物车空空如也!</h4>
      </div>
    </div>

    <!-- 登录表单 -->
    <div class="login-form" :class="{ active: isLoginActive }" @click.stop>
      <div v-if="isLoggedIn" class="xianshi">
        <div class="panel-header">
            <h3 class="panel-title">欢迎回来！</h3>
            <div class="panel-closer fas fa-times" @click="closeAll"></div>
          </div>
        <div class="user-info">
          <p class="user-detail">用户名：{{ user.username }}</p>
          <p class="user-detail">邮箱：{{ user.email }}</p>
        </div>
        <div class="action-buttons">
          <button class="btn primary-btn" @click="logout">退出登录</button>
        </div>
      </div>
      <div v-else>
        <form @submit.prevent="login" class="login-form-content">
          <div class="panel-header">
              <h3 class="panel-title">登录</h3>
              <div class="panel-closer fas fa-times" @click="closeAll"></div>
            </div>
          <div class="form-group">
            <input type="text" v-model="username" placeholder="输入您的账号" class="box" required>
          </div>
          <div class="form-group">
            <input type="password" v-model="password" placeholder="输入您的密码" class="box" required>
          </div>
          <div class="remember">
            <input type="checkbox" id="remember-me" v-model="rememberMe">
            <label for="remember-me">记住我</label>
          </div>
          <div class="form-group">
            <input type="submit" value="立即登录" class="btn primary-btn" name="login">
          </div>
          <div class="form-links">
            <p>忘记密码？<a href="#" class="link">点击这里</a></p>
            <p>没有账号？ <router-link to="/register" class="link">立即创建</router-link></p>
          </div>
        </form>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, inject } from 'vue'
import { useRouter } from 'vue-router'

const flash = inject('flash')

const router = useRouter()
const store = inject('store')

// 状态管理
const isMenuActive = ref(false)
const isSearchActive = ref(false)
const isCartActive = ref(false)
const isLoginActive = ref(false)
const selectedItems = ref([])
const username = ref('')
const password = ref('')
const rememberMe = ref(false)

// 计算属性 - 检查是否有任何面板处于激活状态
const isAnyPanelActive = computed(() => {
  return isMenuActive.value || isSearchActive.value || isCartActive.value || isLoginActive.value
})

const isLoggedIn = computed(() => store.isAuthenticated())
const user = computed(() => store.getUser())
const cartItems = computed(() => store.getCartItems())
const totalPrice = computed(() => {
  return cartItems.value.reduce((total, item) => total + (item.price * item.quantity), 0)
})

// 方法
const toggleMenu = () => {
  isMenuActive.value = !isMenuActive.value
  closeOtherPanels('menu')
}

const toggleSearch = () => {
  isSearchActive.value = !isSearchActive.value
  closeOtherPanels('search')
}

const goToCart = () => {
  if (!isLoggedIn.value) {
    flash('请先登录！', 'warning')
    toggleLogin() // 显示登录面板
  } else {
    router.push('/cart')
  }
}

const toggleLogin = () => {
  isLoginActive.value = !isLoginActive.value
  closeOtherPanels('login')
}

const closeAll = () => {
  isMenuActive.value = false
  isSearchActive.value = false
  isCartActive.value = false
  isLoginActive.value = false
}

const closeOtherPanels = (currentPanel) => {
  if (currentPanel !== 'menu') isMenuActive.value = false
  if (currentPanel !== 'search') isSearchActive.value = false
  if (currentPanel !== 'cart') isCartActive.value = false
  if (currentPanel !== 'login') isLoginActive.value = false
}

const selectAllItems = () => {
  if (selectedItems.value.length === cartItems.value.length) {
    selectedItems.value = []
  } else {
    selectedItems.value = cartItems.value.map(item => item.id)
  }
}

const removeFromCart = (productId) => {
  store.removeFromCart(productId)
  flash('删除成功!')
  // 从选中项中移除
  selectedItems.value = selectedItems.value.filter(id => id !== productId)
}

const checkout = () => {
  if (selectedItems.value.length === 0) {
    flash('请至少选择一件商品！')
    return
  }
  // 在实际应用中，这里会调用API进行结算
  selectedItems.value.forEach(productId => {
    store.removeFromCart(productId)
  })
  flash('结算成功!')
  selectedItems.value = []
  router.push('/cart')
}

const login = async () => {
  // 在实际应用中，这里会调用API进行登录
  // 由于没有后端，我们从localStorage中查找用户
  const existingUsers = JSON.parse(localStorage.getItem('users') || '[]')
  
  // 添加调试信息
  console.log('尝试登录的用户名:', username.value)
  console.log('localStorage中的用户数量:', existingUsers.length)
  
  // 查找匹配的用户 - 支持用户名或邮箱登录
  const user = existingUsers.find(u => 
    (u.username === username.value || u.email === username.value) && u.password === password.value
  )
  
  if (user) {
    store.setUser(user)
    flash('登录成功！')
    isLoginActive.value = false
    
    // 清空表单
    username.value = ''
    password.value = ''
    
    // 登录成功后导航到首页，确保问候语正确显示
    router.push('/')
  } else {
    // 查找是否存在该用户名或邮箱
    const userExists = existingUsers.find(u => u.username === username.value || u.email === username.value)
    if (userExists) {
      console.log('用户名/邮箱存在但密码不匹配')
      flash('密码错误！', 'error')
    } else {
      console.log('用户名和邮箱都不存在')
      flash('用户名或邮箱不存在！', 'error')
    }
    return
  }
}

const logout = () => {
  store.logout()
  flash('登出成功！')
  isLoginActive.value = false
  router.push('/')
}

// 点击页面其他区域关闭所有面板
const handleClickOutside = (event) => {
  if (!event.target.closest('.header')) {
    closeAll()
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
  // 初始化用户状态
  store.getUser()
})

// 清理事件监听器
onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped>
/* 头部导航样式 - 符合project项目设计 */
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background-color: #fff;
  padding: 1.5rem 9%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 1000;
  box-shadow: 0 0.3rem 1.5rem rgba(0,0,0,0.1);
  border-bottom: 0.2rem solid var(--primary-color);
}

/* Logo样式 */
.logo {
  color: var(--primary-color);
  font-size: 2.5rem;
  font-weight: 700;
  text-decoration: none;
  display: flex;
  align-items: center;
  transition: transform 0.3s ease;
}

.logo:hover {
  transform: scale(1.05);
}

.logo i {
  margin-right: 1rem;
  color: var(--primary-color);
  font-size: 2.8rem;
  animation: rotate 5s linear infinite;
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

/* 搜索框样式 */
.search-form {
  position: relative;
  flex: 1;
  max-width: 600px;
  margin: 0 3rem;
}

.search-form input {
  width: 100%;
  padding: 1rem 1.5rem;
  border: 0.2rem solid var(--primary-light);
  border-radius: 0.5rem;
  font-size: 1.7rem;
  color: var(--secondary-color);
  outline: none;
  transition: border-color 0.3s ease;
}

.search-form input:focus {
  border-color: var(--primary-color);
  box-shadow: 0 0 0 0.3rem rgba(36, 77, 77, 0.1);
}

.search-form label {
  position: absolute;
  right: 1.5rem;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  color: var(--primary-color);
  font-size: 2rem;
  transition: transform 0.3s ease;
}

.search-form label:hover {
  transform: translateY(-50%) scale(1.1);
}

/* 图标按钮样式 - 统一按钮位置和高度 */
.icons {
  display: flex;
  gap: 2rem;
  align-items: center;
}

.icons div {
  cursor: pointer;
  font-size: 2.2rem;
  color: var(--primary-color);
  transition: all 0.3s ease;
  position: relative;
  width: 4.5rem;
  height: 4.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
}

/* 面板头部样式 */
.panel-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding-bottom: 1.5rem;
  border-bottom: 0.2rem solid var(--primary-light);
}

/* 面板标题样式 */
.panel-title {
  color: var(--primary-color);
  font-size: 3rem;
  font-weight: 700;
  margin: 0;
  text-align: center;
  flex: 1;
}

/* 面板关闭按钮样式 */
.panel-closer {
  cursor: pointer;
  font-size: 2rem;
  color: var(--primary-color);
  transition: all 0.3s ease;
  background-color: transparent;
  border: none;
  width: 3.5rem;
  height: 3.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
}

.panel-closer:hover {
  color: #fff;
  background-color: var(--primary-color);
  transform: rotate(90deg);
  box-shadow: 0 0.3rem 1rem rgba(36, 77, 77, 0.3);
}

.icons div:hover {
  color: #fff;
  background-color: var(--primary-color);
  transform: scale(1.1);
  box-shadow: 0 0.5rem 1.5rem rgba(36, 77, 77, 0.3);
}

/* 导航栏样式 */
.navbar {
  position: fixed;
  top: 0;
  right: -100%;
  width: 35rem;
  height: 100vh;
  background-color: #fff;
  padding: 10rem 3rem;
  transition: right 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: -0.5rem 0 2rem rgba(0, 0, 0, 0.15);
  overflow-y: auto;
  border-left: 0.1rem solid var(--primary-light);
}

.navbar.active {
  right: 0;
}

.navbar a {
  display: block;
  padding: 1.5rem 2rem;
  font-size: 2rem;
  color: var(--primary-color);
  text-decoration: none;
  transition: all 0.3s ease;
  margin-bottom: 0.5rem;
  border-radius: 0.5rem;
  position: relative;
  overflow: hidden;
}

.navbar a:hover {
  color: #fff;
  background-color: var(--primary-color);
  transform: translateX(1rem);
  box-shadow: 0 0.5rem 1.5rem rgba(36, 77, 77, 0.2);
}

.navbar a::before {
  content: '';
  position: absolute;
  left: -2rem;
  top: 50%;
  transform: translateY(-50%);
  width: 1rem;
  height: 1rem;
  background-color: var(--warning-color);
  border-radius: 50%;
  opacity: 0;
  transition: all 0.3s ease;
}

.navbar a:hover::before {
  left: 1rem;
  opacity: 1;
}

/* 购物车样式 */
.shopping-cart {
  position: fixed;
  top: 0;
  right: -100%;
  width: 35rem;
  height: 100vh;
  background-color: #fff;
  padding: 10rem 3rem;
  overflow-y: auto;
  transition: right 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: -0.5rem 0 2rem rgba(0, 0, 0, 0.15);
  border-left: 0.1rem solid var(--primary-light);
}

.shopping-cart.active {
  right: 0;
}

/* 登录表单样式 */
.login-form {
  position: fixed;
  top: 0;
  right: -100%;
  width: 35rem;
  height: 100vh;
  background-color: #fff;
  padding: 10rem 3rem;
  transition: right 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: -0.5rem 0 2rem rgba(0, 0, 0, 0.15);
  border-left: 0.1rem solid var(--primary-light);
  overflow-y: auto;
  display: flex;
  flex-direction: column;
}

.login-form.active {
  right: 0;
}

/* 已登录显示样式 */
.xianshi {
  padding: 2rem;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.xianshi h3 {
  color: var(--primary-color);
  font-size: 2.4rem;
  text-align: center;
  margin-bottom: 2rem;
}

.user-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 2rem 0;
}

.user-detail {
  font-size: 1.8rem;
  color: var(--secondary-color);
  margin: 1.5rem 0;
  padding: 1.5rem 2rem;
  background-color: rgba(36, 77, 77, 0.05);
  border-radius: 0.5rem;
  border-left: 0.4rem solid var(--primary-color);
  width: 100%;
  max-width: 300px;
  text-align: center;
}

.action-buttons {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  width: 100%;
  max-width: 300px;
  margin: 0 auto;
}

/* 登录表单内容样式 */
.login-form-content {
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 1rem 0;
}

.form-group {
  margin-bottom: 2rem;
  width: 100%;
  display: flex;
  justify-content: center;
}

/* 输入框样式 */
.form-group .box {
  width: 90%;
  max-width: 400px;
  padding: 1.5rem 2rem;
  border: 0.2rem solid var(--primary-light);
  border-radius: 0.8rem;
  font-size: 1.8rem;
  color: var(--secondary-color);
  outline: none;
  transition: all 0.3s ease;
}

.form-group .box:focus {
  border-color: var(--primary-color);
  box-shadow: 0 0 0 0.3rem rgba(36, 77, 77, 0.1);
  transform: translateY(-2px);
}

.form-links {
  margin-top: 3rem;
  text-align: center;
}

.form-links p {
  margin: 1rem 0;
  font-size: 1.6rem;
  color: var(--secondary-color);
}

/* 记住我选项样式 */
.remember {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 2rem 0;
}

.remember input[type="checkbox"] {
  width: 1.8rem;
  height: 1.8rem;
  margin-right: 1rem;
  cursor: pointer;
}

.remember label {
  font-size: 1.8rem;
  color: var(--secondary-color);
  cursor: pointer;
  user-select: none;
}

.link {
  color: var(--primary-color);
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease;
}

.link:hover {
  color: var(--primary-dark);
  text-decoration: underline;
}

/* 按钮样式 */
.btn {
  padding: 1.2rem 2.4rem;
  border: none;
  border-radius: 0.5rem;
  font-size: 1.7rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 100%;
  text-align: center;
  text-decoration: none;
}

.primary-btn {
  background-color: var(--primary-color);
  color: white;
}

.primary-btn:hover {
  background-color: var(--primary-dark);
  transform: translateY(-2px);
  box-shadow: 0 0.5rem 1.5rem rgba(36, 77, 77, 0.3);
}

.secondary-btn {
  background-color: var(--light-color);
  color: var(--primary-color);
  border: 0.2rem solid var(--primary-color);
}

.secondary-btn:hover {
    background-color: var(--primary-light);
    transform: translateY(-2px);
    box-shadow: 0 0.3rem 1rem rgba(36, 77, 77, 0.2);
  }

/* 响应式设计 - 大屏幕 */
@media (max-width: 1200px) {
  .header {
    padding: 1.5rem 5%;
  }
  
  .search-form {
    max-width: 400px;
    margin: 0 2rem;
  }
  
  .logo {
    font-size: 2.2rem;
  }
  
  .logo i {
    font-size: 2.5rem;
  }
}

/* 响应式设计 - 平板 */
@media (max-width: 991px) {
  .header {
    padding: 1.5rem 3%;
  }
  
  .search-form {
    max-width: 300px;
    margin: 0 1.5rem;
  }
  
  .icons {
    gap: 1.5rem;
  }
  
  .icons div {
    font-size: 2rem;
    width: 4rem;
    height: 4rem;
  }
}

/* 响应式设计 - 手机 */
@media (max-width: 768px) {
  .header {
    padding: 1.2rem 5%;
  }
  
  .search-form {
    display: none;
  }
  
  .navbar, .shopping-cart, .login-form {
    width: 100%;
    padding: 8rem 2rem;
  }
  
  #closer {
    display: none;
    top: 1.5rem;
    right: 1.5rem;
    font-size: 2.5rem;
    width: 4.5rem;
    height: 4.5rem;
  }
  
  #closer.show {
    display: flex;
  }
  
  .logo {
    font-size: 2rem;
  }
  
  .logo i {
    font-size: 2.2rem;
  }
}

/* 响应式设计 - 小手机 */
@media (max-width: 450px) {
  .header {
    padding: 1rem 3%;
  }
  
  .icons {
    gap: 1rem;
  }
  
  .icons div {
    font-size: 1.8rem;
    width: 3.5rem;
    height: 3.5rem;
  }
  
  .navbar, .shopping-cart, .login-form {
    padding: 8rem 1.5rem;
  }
  
  .logo {
    font-size: 1.8rem;
  }
  
  .logo i {
    font-size: 2rem;
    margin-right: 0.5rem;
  }
  
  #closer {
    display: none;
    top: 1rem;
    right: 1rem;
    font-size: 2.2rem;
    width: 4rem;
    height: 4rem;
  }
  
  #closer.show {
    display: flex;
  }
}
  /* 用户问候语样式 */
  .user-greeting {
    text-align: center;
    padding: 1rem;
    margin-bottom: 1rem;
  }
  
  .greeting-text {
    color: var(--primary-color);
    font-size: 1.4rem;
    font-weight: 500;
  }
</style>