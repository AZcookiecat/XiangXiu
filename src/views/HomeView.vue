<template>
  <div class="home-container">
    <section class="heading">
      <h3>首页</h3>
      <p> <router-link to="/">首页</router-link> / <span>关于</span> </p>
    </section>

    <section class="about">
      <div class="image">
        <img src="../../public/static/pictures/index.jpg" alt="湘绣展示">
      </div>
      <div class="content">
        <span>欢迎来到我们的湘绣元宇宙商城</span>
        <h3>希望我们的服务让您的体验更惊艳</h3>
        <a href="#" class="btn">阅读更多</a>
      </div>
    </section>

    <!-- 我们的服务开始 -->
    <section class="services">
      <h1 class="title"> <span>我们的服务</span> <a href="#">查看全部 >></a> </h1>
      <div class="box-container">
        <div class="box">
          <div class="icon-box"><i class="fas fa-palette fa-5x"></i></div>
          <h3>数字化作品欣赏</h3>
          <p>数字化博物馆是一个融合创新技术与文化内容的过程，数字化虚拟博物馆
            产品的核心目标是利用先进的信息技术，将实体博物馆的藏品、展览和文
            化内涵以数字化的形式呈现给用户，从而打破时间和空间的限制学习博物
            馆的文化资源。</p>
          <router-link to="/exhibition" class="btn">点我！</router-link>
        </div>

        <div class="box">
          <div class="icon-box"><i class="fas fa-university fa-5x"></i></div>
          <h3>数字化场馆游览</h3>
          <p>数字化湘绣非遗Unity虚拟现实展示是一种创新的非遗文化保护与传承方式，
            是当今国潮文化盛行，非遗文化传播的有力手段。它结合了数字技术和虚拟
            现实技术，为观众提供了沉浸式的湘绣艺术体验。我们推出此项功能以丰富
            用户体验。</p>
          <router-link to="/venue-tour" class="btn">点我！</router-link>
        </div>

        <div class="box">
          <div class="icon-box"><i class="fas fa-star fa-5x"></i></div>
          <h3>数字化非遗收藏</h3>
          <p>数字化湘绣非遗销售是虚拟博物馆数字化转型的重要一环。其通过充分利用数字技术手段和
            电商平台等渠道，博物馆商城可以推出更多具有文化内涵和竞争力的文创产品，满足
            与日俱增非遗消费者的多样化需求，促进文化的传播和发展。</p>
          <router-link to="/collect" class="btn">点我！</router-link>
        </div>

        <div class="box">
          <div class="icon-box"><i class="fas fa-shopping-bag fa-5x"></i></div>
          <h3>数字化非遗售卖</h3>
          <p>数字化湘绣非遗销售是虚拟博物馆数字化转型的重要一环。其通过充分利用数字技术手段和
            电商平台等渠道，博物馆商城可以推出更多具有文化内涵和竞争力的文创产品，满足
            与日俱增非遗消费者的多样化需求，促进文化的传播和发展。</p>
          <router-link to="/shop" class="btn">点我！</router-link>
        </div>

        <div class="box">
          <div class="icon-box"><i class="fas fa-robot fa-5x"></i></div>
          <h3>湘绣AI助手</h3>
          <p>智能湘绣AI助手为您提供关于湘绣的历史、技法、名家作品等各种信息咨询服务。随时随地解答您的疑问，让您深入了解湘绣文化的魅力。</p>
          <router-link to="/chat" class="btn">点我！</router-link>
        </div>

        <div class="box">
          <div class="icon-box"><i class="fas fa-project-diagram fa-5x"></i></div>
          <h3>湘绣知识图谱</h3>
          <p>探索湘绣的历史、技法、题材和名家之间的关联，通过可视化图谱深入了解湘绣文化。</p>
          <router-link to="/knowledge-graph" class="btn">点我！</router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
// 首页相关的逻辑可以在这里添加
</script>

<style scoped>
/* 首页容器样式 - 符合project项目设计 */
.home-container {
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

/* 关于我们部分样式 */
.about {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  align-items: center;
  margin-bottom: 4rem;
  padding: 4rem 9%;
  background-color: #fff;
}

.about .image {
  flex: 1;
  min-width: 300px;
}

.about .image img {
  width: 100%;
  height: auto;
  border-radius: 0.5rem;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.about .image img:hover {
  transform: scale(1.02);
}

.about .content {
  flex: 1;
  min-width: 300px;
}

.about .content span {
  display: block;
  font-size: 1.8rem;
  color: var(--primary-color);
  margin-bottom: 1rem;
  font-weight: 600;
}

.about .content h3 {
  font-size: 2.8rem;
  color: var(--primary-color);
  margin-bottom: 1.5rem;
  line-height: 1.3;
}

.about .content .btn {
  display: inline-block;
  margin-top: 2rem;
  padding: 0.9rem 3rem;
  font-size: 1.7rem;
  background: var(--primary-color);
  color: #fff;
  text-decoration: none;
  border-radius: 0.5rem;
  transition: background-color 0.3s ease, transform 0.3s ease;
}

.about .content .btn:hover {
  background-color: var(--primary-light);
  transform: translateY(-3px);
}

/* 服务部分样式 */
.services {
  background-color: #fff;
  padding: 4rem 9%;
}

.services .title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 3rem;
  border-bottom: 0.1rem solid var(--primary-color);
  padding-bottom: 1.5rem;
}

.services .title span {
  font-size: 2.5rem;
  color: var(--primary-color);
  font-weight: 600;
}

.services .title a {
  font-size: 1.5rem;
  color: var(--secondary-color);
  text-decoration: none;
}

.services .title a:hover {
  color: var(--primary-color);
}

/* 服务卡片容器样式 */
.services .box-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(30rem, 1fr));
  gap: 2rem;
}

/* 服务卡片样式 */
.services .box {
  background-color: #fff;
  border: 0.1rem solid rgba(0,0,0,0.1);
  padding: 3rem 2rem;
  border-radius: 0.5rem;
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  min-height: 500px; /* 统一卡片最小高度 */
  display: flex;
  flex-direction: column;
}

.services .box:hover {
  transform: translateY(-10px);
  box-shadow: 0 1rem 2rem rgba(0, 0, 0, 0.1);
  border-color: var(--primary-color);
}

.services .box:hover h3,
.services .box:hover .icon-box i {
  color: var(--primary-color);
}

/* 图标盒子样式 */
.services .box .icon-box {
  text-align: center;
  margin-bottom: 2rem;
}

.services .box .icon-box i {
  font-size: 4rem;
  color: var(--secondary-color);
  transition: color 0.3s ease;
}

/* 服务卡片标题样式 */
.services .box h3 {
  font-size: 2rem;
  text-align: center;
  margin-bottom: 1.5rem;
  color: var(--primary-color);
  transition: color 0.3s ease;
}

/* 服务卡片内容样式 */
.services .box p {
  color: var(--secondary-color);
  line-height: 1.8;
  margin-bottom: 2rem;
  font-size: 1.5rem;
  flex: 1; /* 让内容占据剩余空间 */
}

/* 服务卡片按钮样式 */
.services .box .btn {
  display: block;
  width: 100%;
  text-align: center;
  padding: 1.2rem; /* 增大内边距统一高度 */
  background-color: var(--primary-color);
  color: #fff;
  text-decoration: none;
  border-radius: 0.5rem;
  transition: background-color 0.3s ease, transform 0.3s ease;
  font-size: 1.8rem; /* 增大字体 */
  margin-top: auto; /* 自动 margin 使按钮固定在底部 */
  height: 50px; /* 统一按钮高度 */
  line-height: 26px; /* 垂直居中文字 */
}

.services .box .btn:hover {
  background-color: var(--primary-light);
  transform: scale(1.05);
}

/* 响应式设计 */
@media (max-width: 991px) {
  .about,
  .services {
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
  
  .about .content h3 {
    font-size: 2.4rem;
  }
  
  .services .title {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
  
  .services .title span {
    font-size: 2.2rem;
  }
  
  .services .box-container {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 450px) {
  .heading h3 {
    font-size: 2rem;
  }
  
  .about .content h3 {
    font-size: 2rem;
  }
  
  .services .title span {
    font-size: 2rem;
  }
  
  .services .box {
    padding: 2rem 1.5rem;
  }
  
  .services .box .icon-box i {
    font-size: 3rem;
  }
}
</style>