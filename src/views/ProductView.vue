<template>
  <div class="product-container">
    <section class="heading">
      <h3>产品详情</h3>
      <p> <router-link to="/">首页</router-link> / <router-link to="/shop">商城</router-link> / <span>{{ product.name || '产品' }}</span> </p>
    </section>

    <div v-if="product" class="product-detail">
      <div class="image-container">
        <img :src="product.image_url" :alt="product.name">
      </div>
      
      <div class="product-info">
        <h3>{{ product.name }}</h3>
        <!-- 评分星星 -->
        <div class="stars">
          <i class="fas fa-star"></i>
          <i class="fas fa-star"></i>
          <i class="fas fa-star"></i>
          <i class="fas fa-star"></i>
          <i class="far fa-star"></i>
          <span> (50) </span>
        </div>
        <!-- 评分星星结束 -->
        
        <div class="price">￥{{ product.price }}</div>
        
        <div class="stock">库存: {{ product.stock }}</div>
        
        <div class="description">
          <p>这是一个精美的湘绣作品，采用传统工艺精心制作，展现了湘绣的精湛技艺和独特魅力。</p>
        </div>
        
        <div v-if="isLoggedIn" class="action-buttons">
          <div class="quantity">
            <button @click="decreaseQuantity" :disabled="quantity <= 1">-</button>
            <input type="number" v-model="quantity" min="1" :max="product.stock">
            <button @click="increaseQuantity" :disabled="quantity >= product.stock">+</button>
          </div>
          
          <button @click="addToCart(product)" class="add-to-cart">加入购物车</button>
          <button @click="addToCollection(product)" class="add-to-collection">添加收藏</button>
        </div>
      </div>
    </div>
    
    <div v-else class="loading">加载中...</div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, inject } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const flash = inject('flash')
const store = inject('store')
const router = useRouter()
const route = useRoute()

// 状态管理
const product = ref(null)
const quantity = ref(1)

// 计算属性
const isLoggedIn = computed(() => store.isAuthenticated())

// 方法
const decreaseQuantity = () => {
  if (quantity.value > 1) {
    quantity.value--
  }
}

const increaseQuantity = () => {
  if (product.value && quantity.value < product.value.stock) {
    quantity.value++
  }
}

const addToCart = (selectedProduct) => {
  if (isLoggedIn.value) {
    store.addToCart(selectedProduct, quantity.value)
    flash('添加到购物车成功!')
  } else {
    router.push({ name: 'login', query: { redirect: `/product/${route.params.id}` } })
  }
}

const addToCollection = (selectedProduct) => {
  if (isLoggedIn.value) {
    store.addToCollect(selectedProduct)
    flash('添加收藏成功!')
  } else {
    router.push({ name: 'login', query: { redirect: `/product/${route.params.id}` } })
  }
}

// 获取产品详情
onMounted(() => {
  const productId = parseInt(route.params.id)
  
  // 在实际应用中，这里会调用API获取产品详情
  // 由于没有后端，我们使用模拟数据
  const mockProducts = [
    { id: 1, name: '北极熊', price: 10, stock: 10, image_url: 'https://pic1.imgdb.cn/item/67fe2d5688c538a9b5d1b564.jpg' },
    { id: 2, name: '月夜虎影', price: 10, stock: 10, image_url: 'https://pic1.imgdb.cn/item/67fe2d5688c538a9b5d1b563.jpg' },
    { id: 3, name: '金鱼', price: 10, stock: 10, image_url: 'https://pic1.imgdb.cn/item/67fe2d5688c538a9b5d1b562.jpg' },
    { id: 4, name: '虎头', price: 10, stock: 10, image_url: 'https://pic1.imgdb.cn/item/67fe2d5688c538a9b5d1b565.jpg' },
    { id: 5, name: '雄狮', price: 10, stock: 10, image_url: 'https://pic1.imgdb.cn/item/67fe2d5688c538a9b5d1b560.jpg' },
    { id: 6, name: '亲昵', price: 10, stock: 10, image_url: 'https://pic1.imgdb.cn/item/67fe2d5688c538a9b5d1b561.jpg' },
    { id: 7, name: '白虎头', price: 10, stock: 10, image_url: 'https://pic1.imgdb.cn/item/67fe2d5f88c538a9b5d1b569.jpg' },
    { id: 8, name: '饮水虎', price: 10, stock: 10, image_url: 'https://pic1.imgdb.cn/item/67fe2d5f88c538a9b5d1b56a.jpg' },
    { id: 9, name: '沙皮狗', price: 10, stock: 10, image_url: 'https://pic1.imgdb.cn/item/67fe2d5f88c538a9b5d1b56b.jpg' },
    { id: 10, name: '纸画绣 几维鸟', price: 10, stock: 10, image_url: 'https://pic1.imgdb.cn/item/67fe2d5f88c538a9b5d1b56e.jpg' },
    { id: 11, name: '雪归', price: 10, stock: 10, image_url: 'https://pic1.imgdb.cn/item/67fe2d5f88c538a9b5d1b56c.jpg' },
    { id: 12, name: '望月', price: 10, stock: 10, image_url: 'https://pic1.imgdb.cn/item/67fe2d5f88c538a9b5d1b56d.jpg' },
    { id: 13, name: '布什总统全家福', price: 10, stock: 10, image_url: 'https://pic1.imgdb.cn/item/67fe2d6e88c538a9b5d1b570.jpg' },
    { id: 14, name: '邓小平绣像', price: 10, stock: 10, image_url: 'https://pic1.imgdb.cn/item/67fe2d6f88c538a9b5d1b571.jpg' },
    { id: 15, name: '童趣', price: 10, stock: 10, image_url: 'https://pic1.imgdb.cn/item/67fe2d6f88c538a9b5d1b572.jpg' },
    { id: 16, name: '亚特兰大市长肖像', price: 10, stock: 10, image_url: 'https://pic1.imgdb.cn/item/67fe2d6f88c538a9b5d1b573.jpg' },
    { id: 17, name: '李仪徽研磨掺针绣连环画绣', price: 10, stock: 10, image_url: 'https://pic1.imgdb.cn/item/67fe2d6f88c538a9b5d1b574.jpg' },
    { id: 18, name: '毛泽东在陕北', price: 10, stock: 10, image_url: 'https://pic1.imgdb.cn/item/67fe2d7888c538a9b5d1b576.jpg' },
    { id: 19, name: '菡萏潇湘', price: 10, stock: 10, image_url: 'https://pic1.imgdb.cn/item/67fe2d7888c538a9b5d1b578.jpg' },
    { id: 20, name: '荷香熠熠', price: 10, stock: 10, image_url: 'https://pic1.imgdb.cn/item/67fe2d7a88c538a9b5d1b57b.jpg' },
    { id: 21, name: '秾芳图', price: 10, stock: 10, image_url: 'https://pic1.imgdb.cn/item/67fe2d7988c538a9b5d1b57a.jpg' },
    { id: 22, name: '马蹄莲', price: 10, stock: 10, image_url: 'https://pic1.imgdb.cn/item/67fe2d7988c538a9b5d1b579.jpg' },
    { id: 23, name: '黄底锦缎麒麟花卉帐檐', price: 10, stock: 10, image_url: 'https://pic1.imgdb.cn/item/67fe2d8488c538a9b5d1b594.jpg' },
    { id: 24, name: '套针绣 牡丹', price: 10, stock: 10, image_url: 'https://pic1.imgdb.cn/item/67fe2d8388c538a9b5d1b593.jpg' },
    { id: 25, name: '掺针绣 牡丹', price: 10, stock: 10, image_url: 'https://pic1.imgdb.cn/item/67fe2d8488c538a9b5d1b595.jpg' },
    { id: 26, name: '明净清幽幽', price: 10, stock: 10, image_url: 'https://pic1.imgdb.cn/item/67ff693088c538a9b5d35ee6.jpg' },
    { id: 27, name: '馨香月影清', price: 10, stock: 10, image_url: 'https://pic1.imgdb.cn/item/67fe2d8888c538a9b5d1b59d.jpg' },
    { id: 28, name: '百花争妍', price: 10, stock: 10, image_url: 'https://pic1.imgdb.cn/item/67fe2d8788c538a9b5d1b599.jpg' },
    { id: 29, name: '冬雪北国', price: 10, stock: 10, image_url: 'https://pic1.imgdb.cn/item/67fe2d9888c538a9b5d1b5a2.jpg' },
    { id: 30, name: '枫红爱晚', price: 10, stock: 10, image_url: 'https://pic1.imgdb.cn/item/67fe2d9988c538a9b5d1b5a3.jpg' },
    { id: 31, name: '幽谷清亭图', price: 10, stock: 10, image_url: 'https://pic1.imgdb.cn/item/67fe2d9b88c538a9b5d1b5a5.jpg' },
    { id: 32, name: '唐寅山水', price: 10, stock: 10, image_url: 'https://pic1.imgdb.cn/item/67fe2d9d88c538a9b5d1b5a7.jpg' },
    { id: 33, name: '李云青的山水图', price: 10, stock: 10, image_url: 'https://pic1.imgdb.cn/item/67fe2db388c538a9b5d1b5b4.jpg' },
    { id: 34, name: '湘西风情', price: 10, stock: 10, image_url: 'https://pic1.imgdb.cn/item/67fe2db888c538a9b5d1b5bf.jpg' },
    { id: 35, name: '油画白桦林', price: 10, stock: 10, image_url: 'https://pic1.imgdb.cn/item/67fe2d9988c538a9b5d1b5a4.jpg' },
    { id: 36, name: '山水条屏', price: 10, stock: 10, image_url: 'https://pic1.imgdb.cn/item/67fe2d9d88c538a9b5d1b5a6.jpg' },
    { id: 37, name: '墨色山水四页屏', price: 10, stock: 10, image_url: 'https://pic1.imgdb.cn/item/67fe2db988c538a9b5d1b5c0.jpg' },
    { id: 38, name: '韶山全景', price: 10, stock: 10, image_url: 'https://pic1.imgdb.cn/item/67fe2db988c538a9b5d1b5c1.jpg' },
    { id: 39, name: '瑶族挑花围裙 哪吒闹海', price: 10, stock: 10, image_url: 'https://pic1.imgdb.cn/item/67fe2db788c538a9b5d1b5b7.jpg' },
    { id: 40, name: '华主席鼓励我们绣韶山', price: 10, stock: 10, image_url: 'https://pic1.imgdb.cn/item/67fe2db988c538a9b5d1b5c2.jpg' },
    { id: 41, name: '桃源刺绣红呢地 "诸葛亮七擒孟获"堂彩', price: 10, stock: 10, image_url: 'https://pic1.imgdb.cn/item/67fe2dd188c538a9b5d1b5d5.jpg' },
    { id: 42, name: '壁画 羞女情', price: 10, stock: 10, image_url: 'https://pic1.imgdb.cn/item/67fe2dd788c538a9b5d1b5de.jpg' },
    { id: 43, name: '香港精品展签名', price: 10, stock: 10, image_url: 'https://pic1.imgdb.cn/item/67fe2dd588c538a9b5d1b5d8.jpg' },
    { id: 44, name: '人物故事绣片', price: 10, stock: 10, image_url: 'https://pic1.imgdb.cn/item/67fe2dd688c538a9b5d1b5dd.jpg' },
    { id: 45, name: '婴戏图6页屏风', price: 10, stock: 10, image_url: 'https://pic1.imgdb.cn/item/67fe2dd188c538a9b5d1b5d6.jpg' },
    { id: 46, name: '壁挂 太阳和人', price: 10, stock: 10, image_url: 'https://pic1.imgdb.cn/item/67ff6afb88c538a9b5d365f2.jpg' },
    { id: 47, name: '毛主席去安源', price: 10, stock: 10, image_url: 'https://pic1.imgdb.cn/item/67ff6b1388c538a9b5d36649.jpg' },
    { id: 48, name: '韩熙载夜宴图', price: 10, stock: 10, image_url: 'https://pic1.imgdb.cn/item/67ff6b3388c538a9b5d366bb.jpg' }
  ]
  
  const foundProduct = mockProducts.find(p => p.id === productId)
  if (foundProduct) {
    product.value = foundProduct
  } else {
    flash('产品不存在!', 'error')
    router.push('/shop')
  }
})
</script>

<style scoped>
/* 产品容器样式 - 符合project项目设计 */
.product-container {
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
  margin-bottom: 0;
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

/* 产品详情部分样式 */
.product-detail {
  display: flex;
  gap: 5rem;
  align-items: flex-start;
  padding: 5rem 9%;
  background-color: #fff;
  flex-wrap: wrap;
}

/* 图片容器样式 */
.image-container {
  flex: 1;
  min-width: 300px;
  max-width: 500px;
  position: relative;
  transition: all 0.3s ease;
}

.image-container:hover {
  transform: translateY(-10px);
}

.image-container img {
  width: 100%;
  height: auto;
  border-radius: 0.5rem;
  box-shadow: 0 1rem 3rem rgba(0, 0, 0, 0.15);
  transition: transform 0.5s ease;
  border: 0.2rem solid #fff;
}

.image-container:hover img {
  transform: scale(1.05);
}

/* 产品信息样式 */
.product-info {
  flex: 1;
  min-width: 300px;
  max-width: 500px;
  padding: 3rem;
  background-color: #fff;
  border-radius: 0.5rem;
  box-shadow: 0 0.5rem 1.5rem rgba(0, 0, 0, 0.05);
  border: 0.1rem solid var(--primary-light);
}

.product-info h3 {
  font-size: 2.5rem;
  color: var(--secondary-color);
  margin-bottom: 1.5rem;
  line-height: 1.3;
  position: relative;
  padding-bottom: 1rem;
}

.product-info h3::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 6rem;
  height: 0.3rem;
  background-color: var(--primary-color);
  border-radius: 0.5rem;
}

/* 评分星星样式 */
.product-info .stars {
  color: #f39c12;
  font-size: 1.8rem;
  margin-bottom: 2rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.product-info .stars span {
  color: var(--secondary-color);
  margin-left: 1rem;
  font-size: 1.4rem;
}

/* 价格样式 */
.product-info .price {
  font-size: 3rem;
  color: var(--primary-color);
  font-weight: bold;
  margin-bottom: 2rem;
  padding: 1rem 0;
  border-top: 0.1rem solid var(--primary-light);
  border-bottom: 0.1rem solid var(--primary-light);
}

/* 库存样式 */
.product-info .stock {
  font-size: 1.5rem;
  color: var(--secondary-color);
  margin-bottom: 2rem;
  padding: 1rem 0;
}

.product-info .stock strong {
  color: var(--primary-color);
}

/* 描述样式 */
.product-info .description {
  font-size: 1.6rem;
  color: var(--secondary-color);
  line-height: 1.8;
  margin-bottom: 3rem;
  padding: 1.5rem;
  background-color: rgba(36, 77, 77, 0.05);
  border-radius: 0.5rem;
  border-left: 0.4rem solid var(--primary-color);
}

/* 操作按钮容器 */
.product-info .action-buttons {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

/* 数量控制样式 */
.product-info .quantity {
  display: flex;
  align-items: center;
  width: fit-content;
  margin-bottom: 1.5rem;
  background-color: #f9f9f9;
  border-radius: 0.5rem;
  overflow: hidden;
}

.product-info .quantity button {
  width: 5rem;
  height: 5rem;
  background-color: var(--primary-light);
  border: none;
  cursor: pointer;
  font-size: 2rem;
  color: var(--primary-color);
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.product-info .quantity button:hover:not(:disabled) {
  background-color: var(--primary-color);
  color: #fff;
  transform: scale(1.05);
}

.product-info .quantity button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  background-color: #e0e0e0;
  color: #999;
}

.product-info .quantity input {
  width: 8rem;
  height: 5rem;
  text-align: center;
  border: none;
  outline: none;
  font-size: 1.8rem;
  font-weight: bold;
  color: var(--secondary-color);
  background-color: #fff;
}

/* 加入购物车按钮 */
.product-info .add-to-cart {
  background-color: var(--primary-color);
  color: white;
  border: none;
  padding: 1.5rem 2rem;
  font-size: 1.8rem;
  cursor: pointer;
  border-radius: 0.5rem;
  transition: all 0.3s ease;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
}

.product-info .add-to-cart:hover {
  background-color: var(--primary-light);
  transform: translateY(-3px);
  box-shadow: 0 1rem 2rem rgba(0, 0, 0, 0.1);
}

/* 添加收藏按钮 */
.product-info .add-to-collection {
  background-color: #fff;
  color: var(--primary-color);
  border: 0.2rem solid var(--primary-color);
  padding: 1.5rem 2rem;
  font-size: 1.8rem;
  cursor: pointer;
  border-radius: 0.5rem;
  transition: all 0.3s ease;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
}

.product-info .add-to-collection:hover {
  background-color: var(--primary-color);
  color: #fff;
  transform: translateY(-3px);
  box-shadow: 0 1rem 2rem rgba(0, 0, 0, 0.1);
}

/* 加载状态样式 */
.loading {
  text-align: center;
  font-size: 2rem;
  color: var(--secondary-color);
  padding: 6rem 2rem;
  background-color: #fff;
  border-radius: 0.5rem;
  margin: 2rem 9%;
  box-shadow: 0 0.5rem 1.5rem rgba(0, 0, 0, 0.05);
}

/* 响应式设计 - 大屏幕 */
@media (max-width: 1200px) {
  .product-detail {
    padding: 4rem 5%;
    gap: 4rem;
  }
  
  .heading {
    padding: 2rem 5%;
  }
}

/* 响应式设计 - 平板 */
@media (max-width: 991px) {
  .product-detail {
    flex-direction: column;
    align-items: center;
    gap: 3rem;
  }
  
  .image-container,
  .product-info {
    max-width: 100%;
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
  
  .product-detail {
    padding: 2rem;
  }
  
  .product-info {
    padding: 2rem;
  }
  
  .product-info h3 {
    font-size: 2.2rem;
  }
  
  .product-info .price {
    font-size: 2.8rem;
  }
  
  .product-info .description {
    font-size: 1.4rem;
  }
  
  .product-info .add-to-cart,
  .product-info .add-to-collection {
    font-size: 1.6rem;
    padding: 1.2rem 1.5rem;
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
  
  .product-detail {
    padding: 1.5rem;
  }
  
  .product-info {
    padding: 1.5rem;
  }
  
  .product-info h3 {
    font-size: 2rem;
  }
  
  .product-info .price {
    font-size: 2.5rem;
  }
  
  .product-info .quantity button {
    width: 4rem;
    height: 4rem;
    font-size: 1.6rem;
  }
  
  .product-info .quantity input {
    width: 6rem;
    height: 4rem;
    font-size: 1.6rem;
  }
  
  .product-info .add-to-cart,
  .product-info .add-to-collection {
    font-size: 1.5rem;
    padding: 1rem;
  }
  
  .loading {
    font-size: 1.8rem;
    padding: 4rem 1.5rem;
    margin: 1rem;
  }
}
</style>