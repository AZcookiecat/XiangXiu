<template>
  <div class="venue-exhibition-container">
    <!-- 标题区 -->
    <section class="heading">
      <h3>湘绣场馆</h3>
      <p> <router-link to="/">首页</router-link> / <span>场馆</span> </p>
    </section>

    <!-- 视频展示区 -->
    <section class="hero-section">
      <div class="video-container">
        <video autoplay loop muted playsinline class="hero-video">
          <source :src="videoSrc" type="video/mp4">
          您的浏览器不支持视频标签。
        </video>
        <div class="video-overlay">
          <div class="overlay-content">
            <h2>探索湘绣艺术之美</h2>
            <p>沉浸式体验中国传统工艺的精髓与魅力</p>
            <button class="explore-btn" @click="scrollToGallery">探索场馆</button>
          </div>
        </div>
      </div>
    </section>

    <!-- 场馆展区 -->
    <section class="gallery-section" ref="gallerySection">
      <div class="section-title">
        <h2>场馆展区</h2>
        <p>湘绣艺术的全方位展示空间</p>
      </div>

      <div class="gallery-grid">
        <!-- 场馆展区卡片 -->
        <div v-for="(venue, index) in venues" :key="venue.id" class="gallery-card">
          <div class="card-image">
            <img :src="venue.image" :alt="venue.title">
            <div class="card-overlay">
              <button class="view-details-btn" @click="viewDetails(venue)">
                查看详情
              </button>
            </div>
          </div>
          <div class="card-content">
            <h3>{{ venue.title }}</h3>
            <p>{{ venue.description.substring(0, 100) }}...</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 场馆简介区 -->
    <section class="about-section">
      <div class="container">
        <div class="about-content">
          <div class="about-text">
            <h2>关于湘绣场馆</h2>
            <p>湘绣场馆是展示中国传统湘绣艺术的专业展览馆，位于湖南省长沙市。场馆面积达2000平方米，分为正厅、连廊、交易区、绣品展示区、互动体验区和多功能厅六大区域。</p>
            <p>场馆以现代化的展示手段，结合传统与科技，为观众提供沉浸式的湘绣艺术体验。在这里，您可以欣赏到历代湘绣珍品，了解湘绣的历史与文化，观看绣师现场创作，甚至亲手体验刺绣技艺。</p>
          </div>
          <div class="about-image">
            <img :src="venueBackground" alt="湘绣场馆">
          </div>
        </div>
      </div>
    </section>

    <!-- 详情弹窗 -->
    <div v-if="selectedVenue" class="modal-overlay" @click="closeModal">
      <div class="modal-content" @click.stop>
        <button class="close-btn" @click="closeModal">&times;</button>
        <div class="modal-body">
          <div class="modal-image">
            <img :src="selectedVenue.image" :alt="selectedVenue.title">
          </div>
          <div class="modal-details">
            <h3>{{ selectedVenue.title }}</h3>
            <p>{{ selectedVenue.description }}</p>
            <div v-if="selectedVenue.features" class="venue-features">
              <h4>展区特色：</h4>
              <ul>
                <li v-for="(feature, index) in selectedVenue.features" :key="index">{{ feature }}</li>
              </ul>
            </div>
            <a v-if="selectedVenue.link" :href="selectedVenue.link" class="venue-link">了解更多</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// 场馆数据
const venues = ref([
  {
    id: 1,
    title: "正厅",
    description: "正厅是湘绣场馆的核心区域，展示了湘绣艺术的历史脉络和代表作品。正厅采用传统与现代相结合的设计风格，顶部悬挂着大型湘绣装饰，墙面陈列着历代湘绣珍品，包括清代的宫廷绣品和现代的创新作品。",
    image: "/static/pictures/屏幕截图 2024-05-01 120132.png",
    features: ["湘绣历史沿革展示", "珍贵文物陈列", "多媒体互动装置"],
    link: "/venue-tour"
  },
  {
    id: 2,
    title: "连廊",
    description: "连廊连接着正厅和各个展示区，两侧墙面装饰着湘绣元素的艺术装置，地面采用传统纹样的拼花设计。连廊不仅是交通空间，更是艺术展示的延伸，通过灯光和投影技术，营造出流动的视觉效果。",
    image: "/static/pictures/屏幕截图 2024-05-01 120209.png",
    features: ["艺术装置展示", "光影艺术效果", "休息区"],
    link: "/venue-tour"
  },
  {
    id: 3,
    title: "交易区",
    description: "交易区提供各种湘绣商品供游客选购，包括实用的绣品如围巾、手帕、家居装饰品，以及收藏级别的艺术品。所有商品均由专业绣师手工制作，保证品质和艺术性。交易区还设有定制服务，满足顾客的个性化需求。",
    image: "/static/pictures/屏幕截图 2024-05-01 120348.png",
    features: ["湘绣商品销售", "定制服务", "产品介绍"],
    link: "/shop"
  },
  {
    id: 4,
    title: "绣品展示区",
    description: "绣品展示区集中展示了各种题材和风格的湘绣作品，包括人物、山水、花鸟、走兽等传统题材，以及现代艺术风格的创新作品。展示区采用恒温恒湿的环境控制，确保绣品的保存条件，同时通过智能导览系统，为游客提供详细的作品介绍。",
    image: "/static/pictures/屏幕截图 2024-05-01 120501.png",
    features: ["专题展览", "智能导览", "保护展示柜"],
    link: "/exhibition"
  },
  {
    id: 5,
    title: "互动体验区",
    description: "互动体验区是场馆的亮点之一，游客可以在这里亲手体验刺绣技艺，在专业老师的指导下完成简单的刺绣作品。体验区还设有多媒体互动装置，通过数字技术展示湘绣的制作过程，让游客更直观地了解湘绣技艺。",
    image: "/static/pictures/屏幕截图 2024-05-01 120533.png",
    features: ["刺绣体验", "多媒体互动", "教学指导"],
    link: "/venue-tour"
  },
  {
    id: 6,
    title: "多功能厅",
    description: "多功能厅用于举办各类活动，如学术讲座、艺术研讨会、湘绣表演等。厅内配备先进的音响和投影设备，可容纳200人同时参与活动。多功能厅的设计灵活多变，可以根据不同活动需求进行布局调整。",
    image: "/static/pictures/屏幕截图 2024-05-01 120627.png",
    features: ["学术活动", "艺术表演", "培训课程"],
    link: "/venue-tour"
  }
])

// 资源路径
const videoSrc = ref('/static/pictures/湘绣1.0.mp4')
const venueBackground = ref('/static/pictures/场馆背景图.png')

// 状态管理
const selectedVenue = ref(null)
const gallerySection = ref(null)

// 方法
const viewDetails = (venue) => {
  selectedVenue.value = venue
}

const closeModal = () => {
  selectedVenue.value = null
}

const scrollToGallery = () => {
  gallerySection.value.scrollIntoView({ behavior: 'smooth' })
}

// 监听ESC键关闭弹窗
window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && selectedVenue.value) {
    closeModal()
  }
})
</script>

<style scoped>
/* 容器样式 */
.venue-exhibition-container {
  min-height: 100vh;
  background-color: var(--background-color);
}

/* 标题区样式 */
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



/* 视频展示区样式 */
.hero-section {
  position: relative;
  height: 80vh;
  min-height: 600px;
  overflow: hidden;
}

.video-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.hero-video {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.video-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

.overlay-content {
  text-align: center;
  color: white;
  max-width: 800px;
}

.overlay-content h2 {
  font-size: 4.8rem;
  margin-bottom: 2rem;
  text-transform: uppercase;
  letter-spacing: 2px;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
}

.overlay-content p {
  font-size: 2rem;
  margin-bottom: 3rem;
  text-shadow: 0 2px 5px rgba(0, 0, 0, 0.5);
}

.explore-btn {
  background-color: var(--primary-color);
  color: white;
  border: none;
  padding: 1.5rem 3rem;
  font-size: 1.8rem;
  font-weight: 600;
  border-radius: 5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.explore-btn:hover {
  background-color: var(--primary-light);
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
}

/* 场馆展区样式 */
.gallery-section {
  padding: 8rem 9%;
  background-color: white;
}

.section-title {
  text-align: center;
  margin-bottom: 6rem;
}

.section-title h2 {
  font-size: 3.6rem;
  color: var(--primary-color);
  margin-bottom: 1.5rem;
  position: relative;
  padding-bottom: 1.5rem;
  display: inline-block;
}

.section-title h2::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 12rem;
  height: 0.4rem;
  background-color: var(--primary-color);
  border-radius: 0.5rem;
}

.section-title p {
  font-size: 1.8rem;
  color: var(--secondary-light);
  max-width: 600px;
  margin: 0 auto;
}

.gallery-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(38rem, 1fr));
  gap: 4rem;
}

.gallery-card {
  background-color: white;
  border-radius: 0.5rem;
  overflow: hidden;
  box-shadow: 0 0.5rem 1.5rem rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  border: 0.1rem solid var(--primary-light);
}

.gallery-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 1rem 3rem rgba(0, 0, 0, 0.1);
}

.card-image {
  position: relative;
  height: 280px;
  overflow: hidden;
}

.card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.gallery-card:hover .card-image img {
  transform: scale(1.05);
}

.card-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.gallery-card:hover .card-overlay {
  opacity: 1;
}

.view-details-btn {
  background-color: var(--primary-color);
  color: white;
  border: none;
  padding: 1rem 2rem;
  font-size: 1.6rem;
  font-weight: 600;
  border-radius: 5rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.view-details-btn:hover {
  background-color: var(--primary-light);
  transform: scale(1.1);
}

.card-content {
  padding: 2rem;
}

.card-content h3 {
  font-size: 2.2rem;
  color: var(--primary-color);
  margin-bottom: 1rem;
}

.card-content p {
  font-size: 1.5rem;
  color: var(--secondary-light);
  line-height: 1.8;
}

/* 场馆简介区样式 */
.about-section {
  padding: 8rem 9%;
  background-color: var(--background-color);
}

.container {
  max-width: 1400px;
  margin: 0 auto;
}

.about-content {
  display: flex;
  gap: 5rem;
  align-items: center;
}

.about-text {
  flex: 1;
}

.about-text h2 {
  font-size: 3.2rem;
  color: var(--primary-color);
  margin-bottom: 2rem;
  position: relative;
  padding-bottom: 1.5rem;
}

.about-text h2::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 10rem;
  height: 0.4rem;
  background-color: var(--primary-color);
  border-radius: 0.5rem;
}

.about-text p {
  font-size: 1.6rem;
  color: var(--secondary-light);
  line-height: 1.8;
  margin-bottom: 2rem;
}

.about-image {
  flex: 1;
  border-radius: 0.5rem;
  overflow: hidden;
  box-shadow: 0 1rem 3rem rgba(0, 0, 0, 0.1);
}

/* 弹窗样式 */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 2rem;
}

.modal-content {
  background-color: white;
  border-radius: 0.5rem;
  max-width: 1000px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  box-shadow: 0 1rem 3rem rgba(0, 0, 0, 0.2);
}

.close-btn {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  font-size: 2.5rem;
  cursor: pointer;
  color: var(--secondary-color);
  z-index: 10;
  width: 4rem;
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.9);
  transition: all 0.3s ease;
}

.close-btn:hover {
  background-color: var(--warning-color);
  color: white;
}

.modal-body {
  display: flex;
  flex-direction: row;
}

.modal-image {
  width: 50%;
}

.modal-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.modal-details {
  padding: 3rem;
  width: 50%;
}

.modal-details h3 {
  font-size: 2.8rem;
  color: var(--primary-color);
  margin-bottom: 2rem;
}

.modal-details p {
  font-size: 1.6rem;
  color: var(--secondary-light);
  line-height: 1.8;
  margin-bottom: 2rem;
}

.venue-features {
  margin-bottom: 2rem;
}

.venue-features h4 {
  font-size: 1.8rem;
  color: var(--primary-color);
  margin-bottom: 1rem;
}

.venue-features ul {
  list-style: none;
  padding: 0;
}

.venue-features li {
  font-size: 1.5rem;
  color: var(--secondary-light);
  margin-bottom: 1rem;
  padding-left: 2rem;
  position: relative;
  line-height: 1.6;
}

.venue-features li::before {
  content: '•';
  color: var(--primary-color);
  font-weight: bold;
  position: absolute;
  left: 0;
  font-size: 1.8rem;
}

.venue-link {
  display: inline-block;
  background-color: var(--primary-color);
  color: white;
  padding: 1rem 2rem;
  font-size: 1.6rem;
  font-weight: 600;
  border-radius: 5rem;
  text-decoration: none;
  transition: all 0.3s ease;
}

.venue-link:hover {
  background-color: var(--primary-light);
  transform: translateY(-3px);
  box-shadow: 0 0.5rem 1.5rem rgba(36, 77, 77, 0.2);
}

/* 响应式设计 */
@media (max-width: 1200px) {
  .overlay-content h2 {
    font-size: 4rem;
  }
  
  .overlay-content p {
    font-size: 1.8rem;
  }
  
  .gallery-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .about-content {
    gap: 4rem;
  }
}

@media (max-width: 991px) {
  .hero-section {
    height: 70vh;
  }
  
  .overlay-content h2 {
    font-size: 3.5rem;
  }
  
  .overlay-content p {
    font-size: 1.6rem;
  }
  
  .gallery-section {
    padding: 6rem 5%;
  }
  
  .about-section {
    padding: 6rem 5%;
  }
  
  .about-content {
    flex-direction: column;
  }
  
  .about-text, .about-image {
    width: 100%;
  }
  
  .modal-body {
    flex-direction: column;
  }
  
  .modal-image {
    width: 100%;
    height: 300px;
  }
  
  .modal-details {
    width: 100%;
  }
}

@media (max-width: 768px) {
  .heading h3 {
    font-size: 2.4rem;
  }
  
  .heading p {
    font-size: 1.6rem;
  }
  
  .hero-section {
    height: 60vh;
    min-height: 400px;
  }
  
  .overlay-content h2 {
    font-size: 3rem;
  }
  
  .overlay-content p {
    font-size: 1.4rem;
  }
  
  .explore-btn {
    padding: 1.2rem 2.5rem;
    font-size: 1.6rem;
  }
  
  .gallery-grid {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
  
  .section-title h2 {
    font-size: 3rem;
  }
  
  .section-title p {
    font-size: 1.6rem;
  }
  
  .card-image {
    height: 250px;
  }
  
  .modal-content {
    margin: 1rem;
  }
  
  .modal-details {
    padding: 2rem;
  }
  
  .modal-details h3 {
    font-size: 2.4rem;
  }
}

@media (max-width: 450px) {
  .heading {
    padding: 1.5rem 2rem;
  }
  
  .heading h3 {
    font-size: 2rem;
  }
  
  .heading p {
    font-size: 1.4rem;
  }
  
  .hero-section {
    height: 50vh;
  }
  
  .overlay-content h2 {
    font-size: 2.5rem;
  }
  
  .overlay-content p {
    font-size: 1.3rem;
  }
  
  .explore-btn {
    padding: 1rem 2rem;
    font-size: 1.4rem;
  }
  
  .gallery-section {
    padding: 4rem 2rem;
  }
  
  .section-title h2 {
    font-size: 2.5rem;
  }
  
  .about-section {
    padding: 4rem 2rem;
  }
  
  .about-text h2 {
    font-size: 2.5rem;
  }
  
  .modal-details h3 {
    font-size: 2rem;
  }
  
  .close-btn {
    font-size: 2rem;
    width: 3.5rem;
    height: 3.5rem;
  }
}
</style>