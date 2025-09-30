<template>
  <div class="cart-container">
    <section class="heading">
      <h3>购物车</h3>
      <p> <router-link to="/">首页</router-link> / <router-link to="/shop">商城</router-link> / <span>购物车</span> </p>
    </section>

    <div v-if="cartItems.length > 0" class="cart-content">
      <div class="cart-items">
        <table class="cart-table">
          <thead>
            <tr>
              <th>
                <input type="checkbox" v-model="selectAll" @change="toggleSelectAll">
              </th>
              <th>商品信息</th>
              <th>单价</th>
              <th>数量</th>
              <th>小计</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in cartItems" :key="item.id">
              <td>
                <input type="checkbox" v-model="item.selected" @change="updateTotal">
              </td>
              <td class="product-info">
                <img :src="item.image_url" :alt="item.name" loading="lazy" class="cart-item-image">
                <span class="cart-item-name">{{ item.name }}</span>
              </td>
              <td class="price">￥{{ item.price }}</td>
              <td class="quantity">
                <button @click="decreaseQuantity(item)" :disabled="item.quantity <= 1" class="quantity-btn minus-btn">-</button>
                <input type="number" v-model="item.quantity" min="1" @change="updateTotal" class="quantity-input">
                <button @click="increaseQuantity(item)" class="quantity-btn plus-btn">+</button>
              </td>
              <td class="subtotal" v-if="item.selected">￥{{ item.price * item.quantity }}</td>
              <td class="subtotal" v-else>￥0</td>
              <td class="action">
                <button @click="removeFromCart(item.id)" class="remove-btn" title="删除商品">
                  <i class="fas fa-trash-alt"></i> 删除
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <div class="cart-summary">
        <div class="summary-actions">
          <button @click="clearSelectedItems" class="clear-btn" :disabled="selectedCount === 0">
            <i class="fas fa-trash"></i> 清空选中
          </button>
        </div>
        <div class="total">
          <span>合计:</span>
          <span class="amount">￥{{ totalAmount }}</span>
        </div>
        <div class="selected-count">
          已选择 <span class="count">{{ selectedCount }}</span> 件商品
        </div>
        
        <div class="checkout">
          <button @click="checkout" class="checkout-btn" :disabled="selectedCount === 0">
            <i class="fas fa-shopping-cart"></i> 去结算
          </button>
        </div>
      </div>
    </div>
    
    <div v-else class="empty-cart">
      <div class="empty-cart-icon">
        <i class="fas fa-shopping-cart"></i>
      </div>
      <p>购物车还是空的，快去挑选心仪的商品吧！</p>
      <router-link to="/shop" class="go-shop-btn">
        <i class="fas fa-store"></i> 去商城
      </router-link>
    
      <!-- 推荐商品 -->
      <div class="recommended-products" v-if="recommendedProducts.length > 0">
        <h4>为您推荐</h4>
        <div class="product-grid">
          <div v-for="product in recommendedProducts" :key="product.id" class="recommended-product">
            <img :src="product.image_url" :alt="product.name" class="product-image">
            <div class="product-info">
              <h5>{{ product.name }}</h5>
              <p class="product-price">￥{{ product.price }}</p>
              <button @click="addRecommendedToCart(product)" class="add-to-cart-btn">
                <i class="fas fa-plus"></i> 加入购物车
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch, inject } from 'vue'
import { useRouter } from 'vue-router'

const flash = inject('flash')

const router = useRouter()
// 修改store的获取方式
const store = inject('store')

// 状态管理
const cartItems = ref([])
const selectAll = ref(false)
const recommendedProducts = ref([])

// 计算属性
const isLoggedIn = computed(() => store.isAuthenticated())
const selectedCount = computed(() => {
  return cartItems.value.filter(item => item.selected).length
})
const totalAmount = computed(() => {
  return cartItems.value
    .filter(item => item.selected)
    .reduce((total, item) => total + (item.price * item.quantity), 0)
})

// 方法
const updateCartItems = () => {
  // 正确调用store中的方法
  const items = store.getCartItems()
  // 为每个商品添加selected属性（如果不存在）
  cartItems.value = items.map(item => ({
    ...item,
    selected: item.selected !== undefined ? item.selected : true
  }))
}

const toggleSelectAll = () => {
  cartItems.value.forEach(item => {
    item.selected = selectAll.value
  })
  updateTotal()
}

const updateTotal = () => {
  // 确保购物车数据更新到store
  store.saveCart()
  
  // 检查是否所有商品都被选中
  const allSelected = cartItems.value.every(item => item.selected)
  const hasItems = cartItems.value.length > 0
  selectAll.value = allSelected && hasItems
}

const decreaseQuantity = (item) => {
  if (item.quantity > 1) {
    item.quantity--
    updateTotal()
  }
}

const increaseQuantity = (item) => {
  item.quantity++
  updateTotal()
}

const removeFromCart = (itemId) => {
  store.removeFromCart(itemId)
  updateCartItems()
  flash && flash('商品已从购物车移除!')
}

const clearSelectedItems = () => {
  const selectedIds = cartItems.value
    .filter(item => item.selected)
    .map(item => item.id)
  
  selectedIds.forEach(id => store.removeFromCart(id))
  updateCartItems()
  flash && flash('已清空选中的商品!')
}

const checkout = () => {
  if (selectedCount.value === 0) {
    flash && flash('请选择要结算的商品!')
    return
  }
  
  // 检查是否登录
  if (!isLoggedIn.value) {
    router.push({ name: 'login', query: { redirect: '/cart' } })
    return
  }
  
  // 模拟结算功能
  flash && flash('即将前往结算页面!')
  // 在实际应用中，这里会跳转到结算页面
  // router.push('/checkout')
}

// 添加推荐商品到购物车
const addRecommendedToCart = (product) => {
  store.addToCart(product)
  updateCartItems()
  flash && flash('商品已添加到购物车!')
}

// 加载模拟推荐数据
const loadRecommendedProducts = () => {
  recommendedProducts.value = [
    {
      id: 101,
      name: '绣艺精品 - 山水图',
      price: 299.99,
      image_url: '/static/pictures/product1.jpg' || 'https://picsum.photos/seed/product101/300/300',
      description: '精美的传统刺绣工艺品，展现中国山水画的趣味'
    },
    {
      id: 102,
      name: '绣艺小物 - 手帕礼盒',
      price: 89.99,
      image_url: '/static/pictures/product2.jpg' || 'https://picsum.photos/seed/product102/300/300',
      description: '精致的刺绣手帕，适合送礼或自用'
    },
    {
      id: 103,
      name: '绣艺摆件 - 花开富贵',
      price: 199.99,
      image_url: '/static/pictures/product3.jpg' || 'https://picsum.photos/seed/product103/300/300',
      description: '刺绣装饰摆件，增添家居艺术氛围'
    }
  ]
}

// 初始化购物车数据
onMounted(() => {
  updateCartItems()
  loadRecommendedProducts()
  
  // 检查是否所有商品都被选中
  const hasItems = cartItems.value.length > 0
  const allSelected = hasItems && cartItems.value.every(item => item.selected)
  selectAll.value = allSelected
})

// 监听购物车数据变化
watch(cartItems, () => {
  updateTotal()
}, { deep: true })
</script>

<style scoped>
/* CSS变量定义 */
:root {
  --primary-color: #244d4d;
  --primary-light: #3a6e6e;
  --secondary-color: #333;
  --danger-color: #e74c3c;
  --danger-light: #c0392b;
  --warning-color: #f39c12;
  --success-color: #2ecc71;
  --background-color: #f9f9f9;
  --white: #fff;
  --border-color: #e0e0e0;
  --text-color: #333;
  --text-secondary: #666;
  --box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
  --transition: all 0.3s ease;
}

/* 购物车容器样式 - 符合project项目设计 */
.cart-container {
  max-width: 1200px;
  margin: 0 auto;
  margin-top: 100px; /* 为固定的导航栏留出空间 */
  padding-bottom: 50px;
}

/* 页面标题样式 */
.heading {
  background: var(--primary-color);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 2rem 9%;
  margin-bottom: 0;
  position: relative;
  overflow: hidden;
}

.heading::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0) 100%);
}

.heading h3 {
  font-size: 2.8rem;
  text-transform: uppercase;
  color: #fff;
  font-weight: 600;
  letter-spacing: 1px;
  margin-bottom: 0;
  position: relative;
  z-index: 1;
}

.heading p {
  color: #fff;
  font-size: 1.8rem;
  margin: 0;
  position: relative;
  z-index: 1;
}

.heading p a {
  color: #fff;
  text-decoration: none;
  transition: color 0.3s ease;
}

.heading p a:hover {
  color: var(--warning-color);
  text-decoration: underline;
}

.heading p span {
  color: var(--warning-color);
}

/* 购物车内容区域 */
.cart-content {
  display: flex;
  flex-direction: column;
  gap: 3rem;
  padding: 4rem 9%;
  background-color: #fff;
  box-shadow: var(--box-shadow);
  margin-top: 30px;
  border-radius: 8px;
  animation: fadeIn 0.5s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.cart-items {
  flex: 1;
}

/* 购物车表格样式 */
.cart-table {
  width: 100%;
  border-collapse: collapse;
  background-color: #fff;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.05);
  border-radius: 0.8rem;
  overflow: hidden;
}

.cart-table th,
.cart-table td {
  padding: 1.5rem;
  text-align: left;
  border-bottom: 0.1rem solid #eee;
  font-size: 1.6rem;
  transition: background-color 0.3s ease;
}

.cart-table th {
  background-color: var(--primary-light);
  font-weight: bold;
  color: #fff;
  text-transform: uppercase;
  letter-spacing: 0.1rem;
  position: relative;
}

.cart-table tbody tr {
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.cart-table tbody tr:hover {
  background-color: rgba(36, 77, 77, 0.03);
  transform: translateX(5px);
}

.cart-table tbody tr:last-child td {
  border-bottom: none;
}

/* 商品信息单元格 */
.cart-table td.product-info {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.cart-table td.product-info img.cart-item-image {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 0.5rem;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border: 2px solid #f0f0f0;
}

.cart-table td.product-info img.cart-item-image:hover {
  transform: scale(1.05);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.cart-table td.product-info span.cart-item-name {
  color: var(--secondary-color);
  font-size: 1.6rem;
  max-width: 250px;
  font-weight: 500;
  line-height: 1.4;
}

/* 价格样式 */
.cart-table td.price {
  color: var(--primary-color);
  font-weight: bold;
  font-size: 1.7rem;
}

/* 数量控制 */
.cart-table td.quantity {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.cart-table td.quantity button.quantity-btn {
  width: 3.5rem;
  height: 3.5rem;
  background-color: var(--primary-light);
  border: 0.1rem solid var(--primary-color);
  cursor: pointer;
  font-size: 1.8rem;
  border-radius: 0.5rem;
  color: var(--primary-color);
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
}

.cart-table td.quantity button.quantity-btn:hover:not(:disabled) {
  background-color: var(--primary-color);
  color: #fff;
  transform: scale(1.1);
  box-shadow: 0 2px 8px rgba(36, 77, 77, 0.3);
}

.cart-table td.quantity button.quantity-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  background-color: #f1f1f1;
  border-color: #ddd;
  color: #999;
}

.cart-table td.quantity input.quantity-input {
  width: 7rem;
  height: 3.5rem;
  text-align: center;
  border: 0.1rem solid var(--primary-light);
  outline: none;
  border-radius: 0.5rem;
  font-size: 1.6rem;
  padding: 0 0.5rem;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

.cart-table td.quantity input.quantity-input:focus {
  border-color: var(--primary-color);
  box-shadow: 0 0 0 0.2rem rgba(36, 77, 77, 0.1);
}

/* 小计样式 */
.cart-table td.subtotal {
  color: var(--primary-color);
  font-weight: bold;
  font-size: 1.7rem;
}

/* 删除按钮样式 */
.cart-table td.action button.remove-btn {
  background-color: var(--danger-color);
  color: white;
  border: none;
  padding: 0.8rem 1.6rem;
  cursor: pointer;
  border-radius: 0.5rem;
  transition: all 0.3s ease;
  font-size: 1.5rem;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

.cart-table td.action button.remove-btn:hover {
  background-color: var(--danger-light);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(231, 76, 60, 0.3);
}

/* 购物车摘要 */
.cart-summary {
  background-color: #fff;
  border: 0.1rem solid var(--primary-light);
  padding: 3rem;
  border-radius: 0.8rem;
  text-align: right;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.05);
  position: relative;
  overflow: hidden;
}

.cart-summary::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 4px;
  background: linear-gradient(90deg, var(--primary-color), var(--primary-light));
}

.cart-summary .summary-actions {
  margin-bottom: 2rem;
  text-align: left;
}

.cart-summary .summary-actions button.clear-btn {
  background-color: transparent;
  color: var(--danger-color);
  border: 1px solid var(--danger-color);
  padding: 0.8rem 1.6rem;
  cursor: pointer;
  border-radius: 0.5rem;
  transition: all 0.3s ease;
  font-size: 1.5rem;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

.cart-summary .summary-actions button.clear-btn:hover:not(:disabled) {
  background-color: var(--danger-color);
  color: white;
  transform: translateY(-1px);
}

.cart-summary .summary-actions button.clear-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  color: #999;
  border-color: #ddd;
}

.cart-summary .total {
  margin-bottom: 1.5rem;
  font-size: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 0;
  border-bottom: 1px solid #eee;
}

.cart-summary .total span:first-child {
  color: var(--secondary-color);
  font-weight: 500;
}

.cart-summary .total .amount {
  color: var(--primary-color);
  font-weight: bold;
  font-size: 2.5rem;
}

.cart-summary .selected-count {
  margin-bottom: 2rem;
  font-size: 1.6rem;
  color: var(--text-secondary);
  text-align: right;
}

.cart-summary .selected-count .count {
  color: var(--primary-color);
  font-weight: bold;
  font-size: 1.8rem;
}

/* 结算按钮 */
.cart-summary .checkout button.checkout-btn {
  background-color: var(--primary-color);
  color: white;
  border: none;
  padding: 1.2rem 3rem;
  font-size: 1.8rem;
  cursor: pointer;
  border-radius: 0.5rem;
  transition: all 0.3s ease;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1rem;
  display: inline-flex;
  align-items: center;
  gap: 0.8rem;
  min-width: 200px;
  justify-content: center;
}

.cart-summary .checkout button.checkout-btn:hover:not(:disabled) {
  background-color: var(--primary-light);
  transform: translateY(-3px);
  box-shadow: 0 8px 20px rgba(36, 77, 77, 0.3);
}

.cart-summary .checkout button.checkout-btn:disabled {
  background-color: #ccc;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

/* 空购物车状态 */
.empty-cart {
  text-align: center;
  padding: 8rem 4rem;
  background-color: #fff;
  border-radius: 0.8rem;
  box-shadow: var(--box-shadow);
  margin-top: 30px;
}

.empty-cart .empty-cart-icon {
  font-size: 8rem;
  color: #e0e0e0;
  margin-bottom: 2rem;
  animation: float 3s ease-in-out infinite;
}

@keyframes float {
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-15px);
  }
  100% {
    transform: translateY(0px);
  }
}

.empty-cart p {
  font-size: 2rem;
  color: var(--secondary-color);
  margin-bottom: 3rem;
  line-height: 1.6;
}

.empty-cart .go-shop-btn {
  background-color: var(--primary-color);
  color: white;
  text-decoration: none;
  padding: 1.2rem 3rem;
  font-size: 1.8rem;
  border-radius: 0.5rem;
  transition: all 0.3s ease;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1rem;
  display: inline-flex;
  align-items: center;
  gap: 0.8rem;
  min-width: 180px;
  justify-content: center;
}

.empty-cart .go-shop-btn:hover {
  background-color: var(--primary-light);
  transform: translateY(-3px);
  box-shadow: 0 8px 20px rgba(36, 77, 77, 0.3);
}

/* 推荐商品样式 */
.recommended-products {
  margin-top: 50px;
  padding-top: 30px;
  border-top: 1px solid var(--border-color);
}

.recommended-products h4 {
  font-size: 2rem;
  color: var(--primary-color);
  margin-bottom: 2rem;
  position: relative;
  display: inline-block;
}

.recommended-products h4::after {
  content: '';
  position: absolute;
  bottom: -8px;
  left: 0;
  width: 100%;
  height: 3px;
  background-color: var(--primary-light);
  border-radius: 3px;
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
}

.recommended-product {
  background-color: #fff;
  border-radius: 0.8rem;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  border: 1px solid #f0f0f0;
}

.recommended-product:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
}

.recommended-product .product-image {
  width: 100%;
  height: 220px;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.recommended-product:hover .product-image {
  transform: scale(1.05);
}

.recommended-product .product-info {
  padding: 1.5rem;
  text-align: left;
}

.recommended-product .product-info h5 {
  font-size: 1.6rem;
  color: var(--text-color);
  margin-bottom: 1rem;
  font-weight: 600;
  line-height: 1.4;
}

.recommended-product .product-info .product-price {
  font-size: 1.8rem;
  color: var(--primary-color);
  font-weight: bold;
  margin-bottom: 1.5rem;
}

.recommended-product .product-info .add-to-cart-btn {
  background-color: var(--primary-light);
  color: white;
  border: none;
  padding: 0.8rem 1.6rem;
  cursor: pointer;
  border-radius: 0.5rem;
  transition: all 0.3s ease;
  font-size: 1.5rem;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  width: 100%;
  justify-content: center;
}

.recommended-product .product-info .add-to-cart-btn:hover {
  background-color: var(--primary-color);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(36, 77, 77, 0.3);
}

/* 复选框样式 */
.cart-table input[type="checkbox"] {
  width: 2rem;
  height: 2rem;
  cursor: pointer;
  accent-color: var(--primary-color);
  transition: transform 0.2s ease;
}

.cart-table input[type="checkbox"]:hover {
  transform: scale(1.1);
}

/* 响应式设计 - 大屏幕 */
@media (max-width: 1200px) {
  .cart-content {
    padding: 3rem 5%;
  }
  
  .heading {
    padding: 2rem 5%;
  }
  
  .cart-container {
    margin-left: 2%;
    margin-right: 2%;
  }
}

/* 响应式设计 - 平板 */
@media (max-width: 991px) {
  .cart-table td.product-info span {
    max-width: 180px;
  }
  
  .cart-table th,
  .cart-table td {
    padding: 1.2rem;
    font-size: 1.5rem;
  }
  
  .product-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* 响应式设计 - 手机 */
@media (max-width: 768px) {
  .heading h3 {
    font-size: 2.4rem;
  }
  
  .heading p {
    font-size: 1.6rem;
  }
  
  .cart-content {
    padding: 2rem;
    gap: 2rem;
  }
  
  .cart-table {
    display: block;
    overflow-x: auto;
    white-space: nowrap;
  }
  
  .cart-table th,
  .cart-table td {
    padding: 1rem;
    font-size: 1.4rem;
  }
  
  .cart-table td.product-info {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.8rem;
  }
  
  .cart-table td.product-info img {
    width: 60px;
    height: 60px;
  }
  
  .cart-table td.product-info span {
    max-width: 150px;
    white-space: normal;
  }
  
  .cart-summary {
    padding: 2rem;
  }
  
  .cart-summary .total {
    font-size: 1.8rem;
  }
  
  .cart-summary .total .amount {
    font-size: 2.2rem;
  }
  
  .cart-summary .checkout button,
  .empty-cart .go-shop-btn {
    padding: 1rem 2rem;
    font-size: 1.6rem;
  }
  
  .product-grid {
    grid-template-columns: 1fr;
  }
  
  .empty-cart-icon {
    font-size: 6rem !important;
  }
}

/* 响应式设计 - 小手机 */
@media (max-width: 450px) {
  .heading h3 {
    font-size: 2rem;
  }
  
  .heading p {
    font-size: 1.4rem;
  }
  
  .cart-content {
    padding: 1.5rem;
  }
  
  .cart-table th,
  .cart-table td {
    padding: 0.8rem;
    font-size: 1.3rem;
  }
  
  .cart-table td.product-info img {
    width: 50px;
    height: 50px;
  }
  
  .cart-summary .total {
    font-size: 1.6rem;
  }
  
  .cart-summary .total .amount {
    font-size: 2rem;
  }
  
  .cart-summary .checkout button,
  .empty-cart .go-shop-btn {
    padding: 0.8rem 1.5rem;
    font-size: 1.5rem;
  }
  
  .empty-cart {
    padding: 6rem 2rem;
  }
  
  .empty-cart p {
    font-size: 1.8rem;
  }
  
  .empty-cart-icon {
    font-size: 5rem !important;
  }
}

/* 滚动条样式优化 */
.cart-table::-webkit-scrollbar {
  height: 6px;
}

.cart-table::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 3px;
}

.cart-table::-webkit-scrollbar-thumb {
  background: var(--primary-light);
  border-radius: 3px;
}

.cart-table::-webkit-scrollbar-thumb:hover {
    background: var(--primary-color);
  }
</style>