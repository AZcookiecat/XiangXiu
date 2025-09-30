<template>
  <div class="shop-container">
    <section class="heading">
      <h3>商城</h3>
      <p> <router-link to="/">首页</router-link> / <span>商城</span> </p>
    </section>

    <section class="category">
      <h1 class="title"> <span>我们的种类</span> <a href="#">view all</a> </h1>
      <div class="box-container">
        <a href="#" class="box">
          <img src="https://pic1.imgdb.cn/item/67fe2d5688c538a9b5d1b564.jpg" alt="湘绣3号">
          <h3>北极熊</h3>
        </a>
        <a href="#" class="box">
          <img src="https://pic1.imgdb.cn/item/67fe2d5688c538a9b5d1b563.jpg" alt="湘绣4号">
          <h3>月夜虎影</h3>
        </a>
        <a href="#" class="box">
          <img src="https://pic1.imgdb.cn/item/67fe2d5688c538a9b5d1b562.jpg" alt="湘绣5号">
          <h3>金鱼</h3>
        </a>
        <a href="#" class="box">
          <img src="https://pic1.imgdb.cn/item/67fe2d5688c538a9b5d1b565.jpg" alt="湘绣6号">
          <h3>虎头</h3>
        </a>
        <a href="#" class="box">
          <img src="https://pic1.imgdb.cn/item/67fe2d5688c538a9b5d1b560.jpg" alt="湘绣7号">
          <h3>雄狮</h3>
        </a>
      </div>
    </section>

    <!-- 产品开始 -->
    <section class="products">
      <h1 class="title"> <span>我们的产品</span> <a href="#">view all</a> </h1>
      <div class="box-container">
        <div v-for="product in products" :key="product.id" class="box">
          <div class="image">
            <img :src="product.image_url" :alt="product.name">
          </div>
          <div class="content">
            <div class="price">￥{{ product.price }}</div>
            <h3><router-link :to="{ name: 'product', params: { id: product.id } }">{{ product.name }}</router-link></h3>
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
          </div>
          <div v-if="isLoggedIn" class="button-container">
            <button @click="addToCart(product)" class="fas fa-shopping-cart"></button>
            <button @click="addToCollection(product)" class="fas fa-heart"></button>
            <button @click="viewProduct(product.id)" class="fas fa-eye"></button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, inject } from 'vue'
import { useRouter } from 'vue-router'

const flash = inject('flash')
const store = inject('store')
const router = useRouter()

// 状态管理
const products = ref([])

// 计算属性
const isLoggedIn = computed(() => store.isAuthenticated())

// 方法
const addToCart = (product) => {
  if (isLoggedIn.value) {
    store.addToCart(product, 1)
    flash('添加成功!')
  } else {
    router.push({ name: 'login', query: { redirect: '/shop' } })
  }
}

const addToCollection = (product) => {
  if (isLoggedIn.value) {
    store.addToCollect(product)
    flash('添加收藏成功!')
  } else {
    router.push({ name: 'login', query: { redirect: '/shop' } })
  }
}

const viewProduct = (productId) => {
  router.push({ name: 'product', params: { id: productId } })
}

// 初始化产品数据
onMounted(() => {
  // 在实际应用中，这里会调用API获取产品数据
  // 由于没有后端，我们使用模拟数据
  products.value = [
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
})
</script>

<style scoped>
/* 商城容器样式 - 符合project项目设计 */
.shop-container {
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

/* 分类部分样式 */
.category {
  margin-bottom: 6rem;
  padding: 4rem 9%;
  background-color: #fff;
}

.category .title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 3rem;
  border-bottom: 0.1rem solid var(--primary-color);
  padding-bottom: 1.5rem;
}

.category .title span {
  font-size: 2.5rem;
  color: var(--primary-color);
  font-weight: 600;
}

.category .title a {
  font-size: 1.5rem;
  color: var(--secondary-color);
  text-decoration: none;
  transition: color 0.3s ease;
}

.category .title a:hover {
  color: var(--primary-color);
}

/* 分类卡片容器 */
.category .box-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(18rem, 1fr));
  gap: 2rem;
}

/* 分类卡片样式 */
.category .box {
  text-align: center;
  text-decoration: none;
  padding: 1.5rem;
  border-radius: 0.5rem;
  transition: all 0.3s ease;
  background-color: #fff;
  border: 0.1rem solid rgba(0, 0, 0, 0.1);
}

.category .box:hover {
  transform: translateY(-10px);
  box-shadow: 0 1rem 2rem rgba(0, 0, 0, 0.1);
  border-color: var(--primary-color);
}

.category .box img {
  width: 100%;
  height: 180px;
  object-fit: cover;
  border-radius: 0.5rem;
  margin-bottom: 1rem;
  transition: transform 0.3s ease;
}

.category .box:hover img {
  transform: scale(1.05);
}

.category .box h3 {
  color: var(--secondary-color);
  font-size: 1.8rem;
  margin: 0;
  transition: color 0.3s ease;
}

.category .box:hover h3 {
  color: var(--primary-color);
}

/* 产品部分样式 */
.products {
  padding: 4rem 9%;
  background-color: #fff;
}

.products .title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 4rem;
  border-bottom: 0.1rem solid var(--primary-color);
  padding-bottom: 1.5rem;
}

.products .title span {
  font-size: 2.5rem;
  color: var(--primary-color);
  font-weight: 600;
}

.products .title a {
  font-size: 1.5rem;
  color: var(--secondary-color);
  text-decoration: none;
  transition: color 0.3s ease;
}

.products .title a:hover {
  color: var(--primary-color);
}

/* 产品卡片容器 */
.products .box-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(28rem, 1fr));
  gap: 3rem;
}

/* 产品卡片样式 */
.products .box {
  background-color: #fff;
  border: 0.1rem solid rgba(0, 0, 0, 0.1);
  border-radius: 0.5rem;
  overflow: hidden;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
}

.products .box:hover {
  transform: translateY(-10px);
  box-shadow: 0 1rem 2rem rgba(0, 0, 0, 0.1);
  border-color: var(--primary-color);
}

/* 产品图片容器 */
.products .box .image {
  width: 100%;
  height: 250px;
  overflow: hidden;
  position: relative;
}

.products .box .image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.products .box:hover .image img {
  transform: scale(1.1);
}

/* 产品内容 */
.products .box .content {
  padding: 2rem;
  flex: 1;
}

/* 产品价格 */
.products .box .content .price {
  font-size: 2rem;
  color: var(--primary-color);
  font-weight: bold;
  margin-bottom: 1rem;
}

/* 产品名称 */
.products .box .content h3 {
  font-size: 1.8rem;
  color: var(--secondary-color);
  margin-bottom: 1.5rem;
  line-height: 1.4;
}

.products .box .content h3 a {
  color: var(--secondary-color);
  text-decoration: none;
  transition: color 0.3s ease;
}

.products .box .content h3 a:hover {
  color: var(--primary-color);
}

/* 产品评分 */
.products .box .content .stars {
  color: #f39c12;
  font-size: 1.6rem;
  margin-bottom: 1.5rem;
}

.products .box .content .stars span {
  color: var(--secondary-color);
  margin-left: 0.5rem;
}

/* 按钮容器 */
.products .box .button-container {
  display: flex;
  justify-content: space-around;
  padding: 1.5rem;
  border-top: 0.1rem solid rgba(0, 0, 0, 0.1);
  background-color: #f9f9f9;
}

/* 按钮样式 */
.products .box .button-container button {
  width: 4.5rem;
  height: 4.5rem;
  background-color: #fff;
  border: 0.1rem solid var(--primary-light);
  border-radius: 50%;
  font-size: 1.8rem;
  color: var(--secondary-color);
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.products .box .button-container button:hover {
  background-color: var(--primary-color);
  color: #fff;
  border-color: var(--primary-color);
  transform: translateY(-3px);
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.1);
}

/* 响应式设计 - 大屏幕 */
@media (max-width: 1200px) {
  .category,
  .products {
    padding: 3rem 5%;
  }
  
  .heading {
    padding: 2rem 5%;
  }
  
  .products .box-container {
    grid-template-columns: repeat(auto-fit, minmax(25rem, 1fr));
  }
}

/* 响应式设计 - 平板 */
@media (max-width: 991px) {
  .category .box-container {
    grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr));
  }
  
  .products .box-container {
    grid-template-columns: repeat(auto-fit, minmax(22rem, 1fr));
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
  
  .category,
  .products {
    padding: 2rem;
  }
  
  .category .title,
  .products .title {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
  
  .category .title span,
  .products .title span {
    font-size: 2.2rem;
  }
  
  .category .box-container {
    grid-template-columns: repeat(auto-fit, minmax(14rem, 1fr));
    gap: 1.5rem;
  }
  
  .products .box-container {
    grid-template-columns: 1fr;
  }
  
  .products .box .image {
    height: 220px;
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
  
  .category,
  .products {
    padding: 1.5rem;
  }
  
  .category .title span,
  .products .title span {
    font-size: 2rem;
  }
  
  .category .box-container {
    grid-template-columns: repeat(auto-fit, minmax(12rem, 1fr));
    gap: 1rem;
  }
  
  .category .box img {
    height: 150px;
  }
  
  .products .box .image {
    height: 200px;
  }
  
  .products .box .content {
    padding: 1.5rem;
  }
  
  .products .box .content h3 {
    font-size: 1.6rem;
  }
  
  .products .box .button-container button {
    width: 4rem;
    height: 4rem;
    font-size: 1.6rem;
  }
}
</style>