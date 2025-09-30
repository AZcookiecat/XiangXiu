<template>
  <div class="collect-container">
    <!-- 页面标题和导航路径 -->
    <section class="heading">
      <h3>数字化非遗收藏</h3>
      <p> <router-link to="/">首页</router-link> / <span>我的收藏</span> </p>
    </section>

    <!-- 主要内容区域 -->
    <div v-if="currentUser" class="collect-content">
      <!-- 收藏作品网格 -->
      <div v-if="collection.length > 0" class="collection-grid">
        <div v-for="item in collection" :key="item.id" class="collection-item">
          <div class="item-image">
            <img :src="item.image_url" :alt="item.name">
            <button @click="removeFromCollection(item.id)" class="remove-btn">
              <i class="fas fa-heart-broken"></i>
            </button>
          </div>
          <div class="item-info">
            <h4><router-link :to="{ name: 'product', params: { id: item.id } }">
              {{ item.name }}
            </router-link></h4>
            <p class="price">￥{{ item.price }}</p>
            <div class="item-details">
              <span class="category">{{ item.category || '非遗作品' }}</span>
              <span class="collect-date">{{ formatDate(item.collectedAt) }}</span>
            </div>
          </div>
          <div class="action-buttons">
            <button @click="addToCart(item)" class="add-to-cart-btn">
              <i class="fas fa-shopping-cart"></i> 加入购物车
            </button>
          </div>
        </div>
      </div>
      
      <!-- 空状态 -->
      <div v-else class="empty-collection">
        <div class="empty-icon">
          <i class="fas fa-heart"></i>
        </div>
        <h4>暂无收藏作品</h4>
        <p>快去浏览我们的数字化非遗作品，收藏您喜爱的作品吧！</p>
        <router-link to="/exhibition" class="explore-btn">
          浏览作品
        </router-link>
      </div>
    </div>
    
    <!-- 未登录状态 -->
    <div v-else class="not-logged-in">
      <div class="login-icon">
        <i class="fas fa-user"></i>
      </div>
      <h4>请先登录</h4>
      <p>登录后即可查看您收藏的数字化非遗作品</p>
      <router-link to="/login" class="login-btn">
        立即登录
      </router-link>
    </div>
  </div>
  
  <!-- 自定义确认弹窗 -->
  <div v-if="showConfirmDialog" class="custom-dialog-overlay">
    <div class="custom-dialog">
      <h4>确认移除</h4>
      <p>确定要移除这件收藏吗？</p>
      <div class="dialog-buttons">
        <button @click="cancelRemove" class="cancel-btn">
          取消
        </button>
        <button @click="confirmRemove" class="confirm-btn">
          确认
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, inject } from 'vue'
import { useRouter } from 'vue-router'

const flash = inject('flash')
const store = inject('store')
const router = useRouter()

// 状态管理
const currentUser = ref(null)
const collection = ref([])
// 弹窗状态
const showConfirmDialog = ref(false)
const itemToRemove = ref(null)

// 计算属性 - 检查是否登录
const isLoggedIn = () => store.isAuthenticated()

// 格式化日期
const formatDate = (dateString) => {
  if (!dateString) return '刚刚'
  const date = new Date(dateString)
  return date.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  })
}

// 加载用户收藏数据
const loadCollection = () => {
  const user = store.getUser()
  if (user) {
    currentUser.value = { ...user }
    
    // 获取收藏数据
    const collectItems = store.getCollectItems()  // 修正方法名
    
    // 直接使用真实收藏数据，不添加模拟数据
    collection.value = [...collectItems]
  }
}

// 打开确认弹窗
const openConfirmDialog = (itemId) => {
  itemToRemove.value = itemId
  showConfirmDialog.value = true
}

// 确认移除
const confirmRemove = () => {
  if (itemToRemove.value) {
    store.removeFromCollect(itemToRemove.value)
    collection.value = [...store.getCollectItems()]  // 修正方法名
    flash('已从收藏中移除!')
  }
  showConfirmDialog.value = false
  itemToRemove.value = null
}

// 取消移除
const cancelRemove = () => {
  showConfirmDialog.value = false
  itemToRemove.value = null
}

// 从收藏中移除
const removeFromCollection = (itemId) => {
  openConfirmDialog(itemId)
}

// 添加到购物车
const addToCart = (item) => {
  store.addToCart(item, 1)
  flash('已成功添加到购物车!')
}

// 初始化加载
onMounted(() => {
  // 不管是否登录，都加载数据，但根据登录状态显示不同内容
  loadCollection()
})
</script>

<style scoped>
/* 主容器样式 */
.collect-container {
  max-width: 1200px;
  margin: 0 auto;
  margin-top: 100px; /* 为固定的导航栏留出空间 */
}

/* 页面标题样式 */
.heading {
  background: var(--primary-color);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 2rem 9%;
  margin-bottom: 3rem;
}

.heading h3 {
  font-size: 2.8rem;
  text-transform: uppercase;
  color: #fff;
  font-weight: 600;
  letter-spacing: 1px;
  margin-bottom: 0;
}

.heading p {
  color: #fff;
  font-size: 1.8rem;
  margin: 0;
}

.heading p a {
  color: #fff;
  text-decoration: none;
}

.heading p a:hover {
  color: var(--warning-color);
}

.heading p span {
  color: var(--warning-color);
}

/* 收藏内容区域 */
.collect-content {
  background-color: #fff;
  border-radius: 0.5rem;
  overflow: hidden;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.1);
  padding: 4rem 9%;
}

/* 收藏网格布局 */
.collection-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 3rem;
}

/* 收藏项样式 */
.collection-item {
  border: 0.1rem solid var(--primary-light);
  border-radius: 0.5rem;
  overflow: hidden;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.collection-item:hover {
  box-shadow: 0 1rem 2rem rgba(0, 0, 0, 0.1);
  border-color: var(--primary-color);
  transform: translateY(-5px);
}

/* 收藏项图片 */
.item-image {
  position: relative;
  overflow: hidden;
  height: 220px;
}

.item-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.collection-item:hover .item-image img {
  transform: scale(1.05);
}

/* 移除按钮 - 默认隐藏，只在hover时显示 */
.remove-btn {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background-color: rgba(255, 255, 255, 0.9);
  color: var(--danger-color);
  border: none;
  border-radius: 50%;
  width: 35px;
  height: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 1.6rem;
  padding: 0;
  opacity: 0; /* 默认隐藏 */
  transform: scale(0.8);
}

/* 当鼠标悬停在商品图片上时显示移除按钮 */
.collection-item:hover .remove-btn {
  opacity: 1;
  transform: scale(1);
}

.remove-btn:hover {
  background-color: var(--danger-color);
  color: white;
  transform: scale(1.1);
}

/* 收藏项信息 */
.item-info {
  padding: 2rem;
  flex-grow: 1;
}

.item-info h4 {
  font-size: 2rem;
  color: var(--primary-color);
  margin-bottom: 1rem;
  font-weight: 600;
  line-height: 1.3;
}

.item-info h4 a:hover {
  color: var(--primary-light);
}

.price {
  font-size: 1.8rem;
  color: var(--primary-color);
  font-weight: 600;
  margin-bottom: 1rem;
}

/* 自定义弹窗样式 */
.custom-dialog-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  animation: fadeIn 0.3s ease;
}

.custom-dialog {
  background-color: white;
  border-radius: 0.8rem;
  padding: 3rem;
  width: 90%;
  max-width: 450px;
  box-shadow: 0 2rem 4rem rgba(0, 0, 0, 0.2);
  animation: slideUp 0.3s ease;
  text-align: center;
}

.custom-dialog h4 {
  font-size: 2rem;
  color: var(--primary-color);
  margin-bottom: 1.5rem;
  font-weight: 600;
}

.custom-dialog p {
  font-size: 1.6rem;
  color: var(--text-secondary);
  margin-bottom: 2.5rem;
  line-height: 1.5;
}

.dialog-buttons {
  display: flex;
  gap: 1.5rem;
  justify-content: center;
}

.cancel-btn, .confirm-btn {
  padding: 1rem 2.5rem;
  border: none;
  border-radius: 0.5rem;
  font-size: 1.6rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  min-width: 100px;
}

.cancel-btn {
  background-color: #f5f5f5;
  color: var(--text-primary);
  border: 0.1rem solid #e0e0e0;
}

.cancel-btn:hover {
  background-color: #e0e0e0;
  transform: translateY(-2px);
}

.confirm-btn {
  background-color: var(--danger-color);
  color: white;
}

.confirm-btn:hover {
  background-color: #c82333;
  transform: translateY(-2px);
  box-shadow: 0 0.5rem 1rem rgba(220, 53, 69, 0.2);
}

/* 动画效果 */
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 响应式弹窗 */
@media (max-width: 450px) {
  .custom-dialog {
    padding: 2.5rem 2rem;
    margin: 0 2rem;
  }
  
  .custom-dialog h4 {
    font-size: 1.8rem;
  }
  
  .custom-dialog p {
    font-size: 1.5rem;
  }
  
  .dialog-buttons {
    flex-direction: column;
    gap: 1rem;
  }
  
  .cancel-btn, .confirm-btn {
    width: 100%;
  }
}

.item-details {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.4rem;
  color: var(--text-secondary);
}

.category {
  background-color: var(--primary-lighter);
  padding: 0.3rem 1rem;
  border-radius: 1.5rem;
}

/* 操作按钮 */
.action-buttons {
  padding: 0 2rem 2rem;
}

.add-to-cart-btn {
  width: 100%;
  background-color: var(--primary-color);
  color: white;
  border: none;
  padding: 1.2rem;
  cursor: pointer;
  border-radius: 0.5rem;
  transition: all 0.3s ease;
  font-size: 1.6rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.add-to-cart-btn:hover {
  background-color: var(--primary-light);
  transform: translateY(-3px);
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.1);
}

/* 空状态样式 */
.empty-collection,
.not-logged-in {
  text-align: center;
  padding: 8rem 4rem;
  background-color: var(--primary-lighter);
  border-radius: 0.5rem;
  border: 0.1rem solid var(--primary-light);
}

.empty-icon,
.login-icon {
  font-size: 10rem;
  color: var(--primary-light);
  margin-bottom: 3rem;
  opacity: 0.7;
}

.empty-collection h4,
.not-logged-in h4 {
  font-size: 2.4rem;
  color: var(--primary-color);
  margin-bottom: 1.5rem;
  font-weight: 600;
}

.empty-collection p,
.not-logged-in p {
  font-size: 1.6rem;
  color: var(--text-secondary);
  margin-bottom: 3rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.6;
}

.explore-btn,
.login-btn {
  background-color: var(--primary-color);
  color: white;
  text-decoration: none;
  padding: 1.2rem 3rem;
  border-radius: 0.5rem;
  font-size: 1.6rem;
  font-weight: 500;
  transition: all 0.3s ease;
  display: inline-block;
}

.explore-btn:hover,
.login-btn:hover {
  background-color: var(--primary-light);
  transform: translateY(-3px);
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.1);
  color: white;
}

/* 响应式设计 */
@media (max-width: 1200px) {
  .collect-container {
    max-width: 100%;
    padding: 0 2rem;
  }
  
  .collection-grid {
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 2rem;
  }
}

@media (max-width: 991px) {
  .heading {
    flex-direction: column;
    text-align: center;
    gap: 1rem;
  }
  
  .heading h3 {
    font-size: 2.4rem;
  }
  
  .heading p {
    font-size: 1.6rem;
  }
}

@media (max-width: 768px) {
  .collect-content {
    padding: 3rem 5%;
  }
  
  .collection-grid {
    grid-template-columns: 1fr;
  }
  
  .empty-collection,
  .not-logged-in {
    padding: 6rem 2rem;
  }
}

@media (max-width: 450px) {
  .collect-container {
    margin-top: 80px;
  }
  
  .heading {
    padding: 1.5rem 5%;
  }
  
  .heading h3 {
    font-size: 2rem;
  }
  
  .item-image {
    height: 200px;
  }
  
  .empty-icon,
  .login-icon {
    font-size: 8rem;
  }
}
</style>