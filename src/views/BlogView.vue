<template>
  <div class="blog-container">
    <section class="heading">
      <h3>湘绣博客</h3>
      <p> <router-link to="/">首页</router-link> / <span>湘绣博客</span> </p>
    </section>

    <section class="intro">
      <div class="image">
        <img src="https://pic1.imgdb.cn/item/67fe2d5688c538a9b5d1b561.jpg" alt="湘绣博客">
      </div>
      <div class="content">
        <span>文化传承</span>
        <h3>探索湘绣的艺术世界</h3>
        <p>通过我们的博客，深入了解湘绣的历史、技艺、文化内涵和现代发展。这里有专业的湘绣知识、艺术家访谈、制作教程和行业动态。</p>
      </div>
    </section>

    <!-- 博客文章列表 -->
    <section class="blog-posts">
      <div class="blog-header">
        <h1 class="title"> <span>最新文章</span> </h1>
        <div class="search-bar">
          <input type="text" placeholder="搜索文章..." v-model="searchQuery">
          <button class="search-btn">搜索</button>
        </div>
      </div>

      <div class="posts-container">
        <div class="blog-post" v-for="post in filteredPosts" :key="post.id">
          <div class="post-image">
            <img :src="post.image" :alt="post.title">
          </div>
          <div class="post-content">
            <div class="post-meta">
              <span class="category">{{ post.category }}</span>
              <span class="date">{{ post.date }}</span>
            </div>
            <h3 class="post-title">{{ post.title }}</h3>
            <p class="post-excerpt">{{ post.excerpt }}</p>
            <button class="read-more">阅读全文</button>
          </div>
        </div>
      </div>

      <!-- 分页 -->
      <div class="pagination">
        <button class="page-btn prev" :disabled="currentPage === 1">上一页</button>
        <button class="page-btn" v-for="page in totalPages" :key="page" :class="{ active: page === currentPage }" @click="currentPage = page">{{ page }}</button>
        <button class="page-btn next" :disabled="currentPage === totalPages">下一页</button>
      </div>
    </section>

    <!-- 推荐阅读 -->
    <section class="recommended">
      <h2>推荐阅读</h2>
      <div class="recommended-container">
        <div class="recommended-item" v-for="item in recommendedPosts" :key="item.id">
          <div class="recommended-image">
            <img :src="item.image" :alt="item.title">
          </div>
          <div class="recommended-content">
            <h3>{{ item.title }}</h3>
            <span>{{ item.date }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- 博客分类 -->
    <section class="blog-categories">
      <h2>文章分类</h2>
      <div class="category-list">
        <div class="category-item" v-for="category in categories" :key="category.id">
          <span>{{ category.name }}</span>
          <span class="count">({{ category.count }})</span>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// 搜索查询
const searchQuery = ref('')

// 当前页码
const currentPage = ref(1)
const postsPerPage = 6

// 博客文章数据
const posts = ref([
  {
    id: 1,
    title: '湘绣的历史渊源与发展演变',
    excerpt: '湘绣是中国传统刺绣工艺之一，历史悠久，技艺精湛。本文将带您了解湘绣的起源、发展历程和艺术特色...',
    category: '历史文化',
    date: '2023-08-15',
    image: 'https://pic1.imgdb.cn/item/67fe2d5688c538a9b5d1b561.jpg'
  },
  {
    id: 2,
    title: '湘绣针法详解：从平针到鬅毛针',
    excerpt: '湘绣以其独特的针法著称，本文详细介绍了湘绣的主要针法类型、特点和应用场景，帮助您深入了解湘绣技艺...',
    category: '工艺技法',
    date: '2023-08-10',
    image: 'https://pic1.imgdb.cn/item/67fe2d5688c538a9b5d1b561.jpg'
  },
  {
    id: 3,
    title: '现代湘绣艺术家访谈：传承与创新',
    excerpt: '我们采访了当代著名湘绣艺术家，探讨传统工艺在现代社会的传承与创新，以及湘绣艺术的未来发展方向...',
    category: '艺术家风采',
    date: '2023-08-05',
    image: 'https://pic1.imgdb.cn/item/67fe2d5688c538a9b5d1b561.jpg'
  },
  {
    id: 4,
    title: '湘绣与现代设计的融合与应用',
    excerpt: '随着时代的发展，湘绣开始与现代设计元素相结合，应用于时尚、家居等多个领域，焕发出新的生命力...',
    category: '创新应用',
    date: '2023-07-30',
    image: 'https://pic1.imgdb.cn/item/67fe2d5688c538a9b5d1b561.jpg'
  },
  {
    id: 5,
    title: '湘绣的色彩搭配艺术',
    excerpt: '湘绣以其丰富的色彩表现力著称，本文解析了湘绣的色彩特点、搭配原则和传统色系的文化内涵...',
    category: '艺术理论',
    date: '2023-07-25',
    image: 'https://pic1.imgdb.cn/item/67fe2d5688c538a9b5d1b561.jpg'
  },
  {
    id: 6,
    title: '湘绣题材与图案的文化寓意',
    excerpt: '湘绣作品中常见的题材和图案背后蕴含着丰富的文化寓意，本文为您解读这些图案的象征意义和文化内涵...',
    category: '文化解读',
    date: '2023-07-20',
    image: 'https://pic1.imgdb.cn/item/67fe2d5688c538a9b5d1b561.jpg'
  },
  {
    id: 7,
    title: '湘绣制作工艺流程全解析',
    excerpt: '从选料到成品，湘绣的制作过程繁琐而精细。本文详细介绍了湘绣的工艺流程，带您了解一件湘绣作品的诞生过程...',
    category: '工艺技法',
    date: '2023-07-15',
    image: 'https://pic1.imgdb.cn/item/67fe2d5688c538a9b5d1b561.jpg'
  },
  {
    id: 8,
    title: '湘绣在国际舞台上的影响力',
    excerpt: '近年来，湘绣作为中国传统工艺的代表之一，在国际舞台上日益受到关注。本文介绍了湘绣的国际交流与影响...',
    category: '国际交流',
    date: '2023-07-10',
    image: 'https://pic1.imgdb.cn/item/67fe2d5688c538a9b5d1b561.jpg'
  }
])

// 推荐阅读文章
const recommendedPosts = ref([
  {
    id: 101,
    title: '湘绣收藏与鉴赏指南',
    date: '2023-07-05',
    image: 'https://pic1.imgdb.cn/item/67fe2d5688c538a9b5d1b561.jpg'
  },
  {
    id: 102,
    title: '湘绣与其他刺绣工艺的比较',
    date: '2023-07-01',
    image: 'https://pic1.imgdb.cn/item/67fe2d5688c538a9b5d1b561.jpg'
  },
  {
    id: 103,
    title: '湘绣的保护与传承现状',
    date: '2023-06-25',
    image: 'https://pic1.imgdb.cn/item/67fe2d5688c538a9b5d1b561.jpg'
  }
])

// 文章分类
const categories = ref([
  { id: 1, name: '历史文化', count: 12 },
  { id: 2, name: '工艺技法', count: 8 },
  { id: 3, name: '艺术家风采', count: 6 },
  { id: 4, name: '创新应用', count: 5 },
  { id: 5, name: '艺术理论', count: 7 },
  { id: 6, name: '文化解读', count: 9 },
  { id: 7, name: '国际交流', count: 4 }
])

// 过滤后的文章
const filteredPosts = computed(() => {
  if (!searchQuery.value) {
    return posts.value
  }
  return posts.value.filter(post => 
    post.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    post.excerpt.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    post.category.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

// 总页数
const totalPages = computed(() => {
  return Math.ceil(filteredPosts.value.length / postsPerPage)
})

// 当前页显示的文章
const currentPosts = computed(() => {
  const start = (currentPage.value - 1) * postsPerPage
  const end = start + postsPerPage
  return filteredPosts.value.slice(start, end)
})
</script>

<style scoped>
/* 博客页面容器样式 */
.blog-container {
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

/* 博客文章部分样式 */
.blog-posts {
  background-color: #fff;
  padding: 4rem 9%;
  margin-bottom: 4rem;
}

/* 博客头部 */
.blog-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 3rem;
  border-bottom: 0.1rem solid var(--primary-color);
  padding-bottom: 1.5rem;
}

.blog-header .title span {
  font-size: 2.5rem;
  color: var(--primary-color);
  font-weight: 600;
}

/* 搜索栏样式 */
.search-bar {
  display: flex;
  align-items: center;
}

.search-bar input {
  padding: 0.9rem 1.5rem;
  font-size: 1.6rem;
  border: 0.1rem solid rgba(0,0,0,0.1);
  border-radius: 0.5rem 0 0 0.5rem;
  outline: none;
  width: 250px;
}

.search-bar input:focus {
  border-color: var(--primary-color);
}

.search-btn {
  padding: 0.9rem 1.5rem;
  font-size: 1.6rem;
  background-color: var(--primary-color);
  color: #fff;
  border: none;
  border-radius: 0 0.5rem 0.5rem 0;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.search-btn:hover {
  background-color: var(--primary-light);
}

/* 文章容器样式 */
.posts-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(35rem, 1fr));
  gap: 3rem;
  margin-bottom: 3rem;
}

/* 博客文章卡片样式 */
.blog-post {
  background-color: #fff;
  border: 0.1rem solid rgba(0,0,0,0.1);
  border-radius: 0.5rem;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  display: flex;
  flex-direction: column;
}

.blog-post:hover {
  transform: translateY(-10px);
  box-shadow: 0 1rem 2rem rgba(0, 0, 0, 0.1);
  border-color: var(--primary-color);
}

/* 文章图片样式 */
.post-image {
  width: 100%;
  height: 200px;
  overflow: hidden;
}

.post-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.blog-post:hover .post-image img {
  transform: scale(1.05);
}

/* 文章内容样式 */
.post-content {
  padding: 2rem;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.post-meta {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
  font-size: 1.4rem;
}

.post-meta .category {
  color: var(--primary-color);
  font-weight: 500;
}

.post-meta .date {
  color: var(--secondary-color);
}

.post-title {
  font-size: 2rem;
  color: var(--primary-color);
  margin-bottom: 1rem;
  line-height: 1.3;
}

.post-excerpt {
  color: var(--secondary-color);
  line-height: 1.6;
  font-size: 1.4rem;
  margin-bottom: 2rem;
  flex: 1;
}

.read-more {
  display: inline-block;
  padding: 0.9rem 2rem;
  font-size: 1.6rem;
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

.read-more:hover {
  background-color: var(--primary-light);
  transform: translateY(-3px);
}

/* 分页样式 */
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin-top: 3rem;
}

.page-btn {
  padding: 0.8rem 1.5rem;
  font-size: 1.6rem;
  background-color: #f5f5f5;
  color: var(--secondary-color);
  border: 0.1rem solid rgba(0,0,0,0.1);
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.page-btn:hover:not(:disabled) {
  background-color: var(--primary-light);
  color: #fff;
  border-color: var(--primary-color);
}

.page-btn.active {
  background-color: var(--primary-color);
  color: #fff;
  border-color: var(--primary-color);
}

.page-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* 推荐阅读样式 */
.recommended {
  background-color: #fff;
  padding: 4rem 9%;
  margin-bottom: 4rem;
}

.recommended h2 {
  font-size: 2.5rem;
  color: var(--primary-color);
  margin-bottom: 2rem;
  text-align: center;
}

.recommended-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(25rem, 1fr));
  gap: 2rem;
}

.recommended-item {
  display: flex;
  gap: 1.5rem;
  padding: 1.5rem;
  border: 0.1rem solid rgba(0,0,0,0.1);
  border-radius: 0.5rem;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
}

.recommended-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 1rem 2rem rgba(0, 0, 0, 0.1);
  border-color: var(--primary-color);
}

.recommended-image {
  width: 100px;
  height: 100px;
  flex-shrink: 0;
  overflow: hidden;
  border-radius: 0.5rem;
}

.recommended-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.recommended-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.recommended-content h3 {
  font-size: 1.6rem;
  color: var(--primary-color);
  margin-bottom: 0.5rem;
  line-height: 1.3;
}

.recommended-content span {
  font-size: 1.4rem;
  color: var(--secondary-color);
}

/* 博客分类样式 */
.blog-categories {
  background-color: #fff;
  padding: 4rem 9%;
  margin-bottom: 4rem;
}

.blog-categories h2 {
  font-size: 2.5rem;
  color: var(--primary-color);
  margin-bottom: 2rem;
  text-align: center;
}

.category-list {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  justify-content: center;
}

.category-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 2rem;
  background-color: #f5f5f5;
  border: 0.1rem solid rgba(0,0,0,0.1);
  border-radius: 2rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.category-item:hover {
  background-color: var(--primary-color);
  color: #fff;
  border-color: var(--primary-color);
}

.category-item span {
  font-size: 1.6rem;
}

.category-item .count {
  font-size: 1.4rem;
  opacity: 0.8;
}

/* 响应式设计 */
@media (max-width: 991px) {
  .intro,
  .blog-posts,
  .recommended,
  .blog-categories {
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
  
  .blog-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 2rem;
  }
  
  .search-bar {
    width: 100%;
  }
  
  .search-bar input {
    width: 100%;
  }
  
  .posts-container,
  .recommended-container {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 450px) {
  .heading h3 {
    font-size: 2rem;
  }
  
  .intro .content h3 {
    font-size: 2rem;
  }
  
  .blog-header .title span {
    font-size: 2rem;
  }
  
  .recommended-item {
    flex-direction: column;
  }
  
  .recommended-image {
    width: 100%;
    height: 150px;
  }
}
</style>