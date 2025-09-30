<template>
  <div class="peripheral-container">
    <section class="heading">
      <h3>湘绣周边</h3>
      <p> <router-link to="/">首页</router-link> / <span>湘绣周边</span> </p>
    </section>

    <section class="intro">
      <div class="image">
        <img src="https://pic1.imgdb.cn/item/67fe2d5688c538a9b5d1b561.jpg" alt="湘绣周边">
      </div>
      <div class="content">
        <span>文创精品</span>
        <h3>湘绣周边产品系列</h3>
        <p>探索我们精心设计的湘绣周边产品，将传统工艺与现代生活完美融合。每一件产品都承载着湘绣的精湛技艺和文化底蕴，为您的生活增添一份艺术气息。</p>
      </div>
    </section>

    <!-- 周边产品展示 -->
    <section class="products">
      <h1 class="title"> <span>精选周边产品</span> </h1>
      <div class="product-container">
        <div class="product-card" v-for="product in products" :key="product.id">
          <div class="product-image">
            <img :src="product.image" :alt="product.name">
          </div>
          <div class="product-info">
            <h3>{{ product.name }}</h3>
            <p>{{ product.description }}</p>
            <div class="price">¥{{ product.price }}</div>
            <button class="btn add-to-cart">加入购物车</button>
          </div>
        </div>
      </div>
    </section>

    <!-- 产品分类 -->
    <section class="categories">
      <h2>产品分类</h2>
      <div class="category-list">
        <div class="category-item" v-for="category in categories" :key="category.id">
          <i :class="category.icon"></i>
          <span>{{ category.name }}</span>
        </div>
      </div>
    </section>

    <!-- 特色专区 -->
    <section class="featured">
      <h2>特色专区</h2>
      <div class="featured-container">
        <div class="featured-item">
          <h3>限量定制</h3>
          <p>个性化定制专属湘绣周边，独一无二的艺术珍品</p>
          <button class="btn learn-more">了解更多</button>
        </div>
        <div class="featured-item">
          <h3>季节限定</h3>
          <p>应季推出的限定版湘绣周边，限量发售</p>
          <button class="btn learn-more">了解更多</button>
        </div>
        <div class="featured-item">
          <h3>套装礼盒</h3>
          <p>精心搭配的湘绣周边套装，送礼佳品</p>
          <button class="btn learn-more">了解更多</button>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// 周边产品数据
const products = ref([
  {
    id: 1,
    name: '湘绣丝巾',
    description: '采用优质桑蚕丝，手工绣制的精美丝巾',
    price: 398,
    image: 'https://pic1.imgdb.cn/item/67fe2d5688c538a9b5d1b561.jpg'
  },
  {
    id: 2,
    name: '湘绣笔记本',
    description: '封面采用湘绣工艺，内页优质纸张',
    price: 158,
    image: 'https://pic1.imgdb.cn/item/67fe2d5688c538a9b5d1b561.jpg'
  },
  {
    id: 3,
    name: '湘绣书签套装',
    description: '精美湘绣书签，一套四枚',
    price: 88,
    image: 'https://pic1.imgdb.cn/item/67fe2d5688c538a9b5d1b561.jpg'
  },
  {
    id: 4,
    name: '湘绣抱枕',
    description: '舒适面料，精致湘绣图案',
    price: 268,
    image: 'https://pic1.imgdb.cn/item/67fe2d5688c538a9b5d1b561.jpg'
  },
  {
    id: 5,
    name: '湘绣手机壳',
    description: '时尚手机壳，点缀湘绣元素',
    price: 128,
    image: 'https://pic1.imgdb.cn/item/67fe2d5688c538a9b5d1b561.jpg'
  },
  {
    id: 6,
    name: '湘绣装饰画',
    description: '小型湘绣装饰画，适合家居装饰',
    price: 598,
    image: 'https://pic1.imgdb.cn/item/67fe2d5688c538a9b5d1b561.jpg'
  }
])

// 产品分类数据
const categories = ref([
  { id: 1, name: '服饰配饰', icon: 'fas fa-tshirt fa-2x' },
  { id: 2, name: '文具用品', icon: 'fas fa-pencil-alt fa-2x' },
  { id: 3, name: '家居装饰', icon: 'fas fa-couch fa-2x' },
  { id: 4, name: '数码配件', icon: 'fas fa-mobile-alt fa-2x' },
  { id: 5, name: '礼品套装', icon: 'fas fa-gift fa-2x' }
])
</script>

<style scoped>
/* 周边页面容器样式 */
.peripheral-container {
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

/* 简介部分样式 */
.intro {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  align-items: center;
  margin-bottom: 4rem;
  padding: 4rem 9%;
  background-color: #fff;
}

.intro .image {
  flex: 1;
  min-width: 300px;
}

.intro .image img {
  width: 100%;
  height: auto;
  border-radius: 0.5rem;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.intro .image img:hover {
  transform: scale(1.02);
}

.intro .content {
  flex: 1;
  min-width: 300px;
}

.intro .content span {
  display: block;
  font-size: 1.8rem;
  color: var(--primary-color);
  margin-bottom: 1rem;
  font-weight: 600;
}

.intro .content h3 {
  font-size: 2.8rem;
  color: var(--primary-color);
  margin-bottom: 1.5rem;
  line-height: 1.3;
}

.intro .content p {
  color: var(--secondary-color);
  line-height: 1.8;
  font-size: 1.6rem;
  margin-bottom: 0;
}

/* 产品展示部分样式 */
.products {
  background-color: #fff;
  padding: 4rem 9%;
  margin-bottom: 4rem;
}

.products .title {
  display: flex;
  align-items: center;
  margin-bottom: 3rem;
  border-bottom: 0.1rem solid var(--primary-color);
  padding-bottom: 1.5rem;
}

.products .title span {
  font-size: 2.5rem;
  color: var(--primary-color);
  font-weight: 600;
}

/* 产品容器样式 */
.product-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(30rem, 1fr));
  gap: 2rem;
}

/* 产品卡片样式 */
.product-card {
  background-color: #fff;
  border: 0.1rem solid rgba(0,0,0,0.1);
  border-radius: 0.5rem;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.product-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 1rem 2rem rgba(0, 0, 0, 0.1);
  border-color: var(--primary-color);
}

/* 产品图片样式 */
.product-image {
  width: 100%;
  height: 250px;
  overflow: hidden;
}

.product-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.product-card:hover .product-image img {
  transform: scale(1.05);
}

/* 产品信息样式 */
.product-info {
  padding: 2rem;
}

.product-info h3 {
  font-size: 2rem;
  color: var(--primary-color);
  margin-bottom: 1rem;
}

.product-info p {
  color: var(--secondary-color);
  line-height: 1.6;
  font-size: 1.4rem;
  margin-bottom: 1.5rem;
  height: 45px;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
}

.product-info .price {
  font-size: 1.8rem;
  color: var(--warning-color);
  font-weight: 600;
  margin-bottom: 1.5rem;
}

/* 按钮样式 */
.btn {
  display: inline-block;
  padding: 0.9rem 3rem;
  font-size: 1.7rem;
  background: var(--primary-color);
  color: #fff;
  text-decoration: none;
  border-radius: 0.5rem;
  transition: background-color 0.3s ease, transform 0.3s ease;
  border: none;
  cursor: pointer;
  width: 100%;
  text-align: center;
}

.btn:hover {
  background-color: var(--primary-light);
  transform: translateY(-3px);
}

/* 分类部分样式 */
.categories {
  background-color: #fff;
  padding: 4rem 9%;
  margin-bottom: 4rem;
}

.categories h2 {
  font-size: 2.5rem;
  color: var(--primary-color);
  margin-bottom: 2rem;
  text-align: center;
}

.category-list {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  justify-content: center;
}

.category-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  border: 0.1rem solid rgba(0,0,0,0.1);
  border-radius: 0.5rem;
  min-width: 150px;
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
}

.category-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 1rem 2rem rgba(0, 0, 0, 0.1);
  border-color: var(--primary-color);
}

.category-item i {
  font-size: 3rem;
  color: var(--primary-color);
  margin-bottom: 1rem;
}

.category-item span {
  font-size: 1.6rem;
  color: var(--secondary-color);
}

/* 特色专区样式 */
.featured {
  background-color: #fff;
  padding: 4rem 9%;
  margin-bottom: 4rem;
}

.featured h2 {
  font-size: 2.5rem;
  color: var(--primary-color);
  margin-bottom: 2rem;
  text-align: center;
}

.featured-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(30rem, 1fr));
  gap: 2rem;
}

.featured-item {
  background-color: #f9f9f9;
  padding: 3rem;
  border-radius: 0.5rem;
  text-align: center;
  border: 0.1rem solid rgba(0,0,0,0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.featured-item:hover {
  transform: translateY(-10px);
  box-shadow: 0 1rem 2rem rgba(0, 0, 0, 0.1);
  border-color: var(--primary-color);
}

.featured-item h3 {
  font-size: 2rem;
  color: var(--primary-color);
  margin-bottom: 1rem;
}

.featured-item p {
  color: var(--secondary-color);
  line-height: 1.6;
  font-size: 1.4rem;
  margin-bottom: 2rem;
}

/* 响应式设计 */
@media (max-width: 991px) {
  .intro,
  .products,
  .categories,
  .featured {
    padding: 3rem 5%;
  }
  
  .heading {
    padding: 2rem 5%;
  }
}

@media (max-width: 768px) {
  .heading h3 {
    font-size: 2.4rem;
  }
  
  .heading p {
    font-size: 1.6rem;
  }
  
  .intro .content h3 {
    font-size: 2.4rem;
  }
  
  .products .title span {
    font-size: 2.2rem;
  }
  
  .product-container,
  .featured-container {
    grid-template-columns: 1fr;
  }
  
  .category-list {
    flex-direction: column;
    align-items: center;
  }
  
  .category-item {
    width: 100%;
    max-width: 400px;
  }
}

@media (max-width: 450px) {
  .heading h3 {
    font-size: 2rem;
  }
  
  .intro .content h3 {
    font-size: 2rem;
  }
  
  .products .title span {
    font-size: 2rem;
  }
  
  .product-card,
  .featured-item {
    padding: 1.5rem;
  }
}
</style>