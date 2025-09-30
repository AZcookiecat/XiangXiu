<template>
  <div class="contact-container">
    <section class="heading">
      <h3>联系我们</h3>
      <p> <router-link to="/">首页</router-link> / <span>联系我们</span> </p>
    </section>

    <section class="intro">
      <div class="image">
        <img src="https://pic1.imgdb.cn/item/67fe2d5688c538a9b5d1b561.jpg" alt="联系我们">
      </div>
      <div class="content">
        <span>联系我们</span>
        <h3>欢迎咨询与合作</h3>
        <p>如果您对湘绣文化、产品或我们的服务有任何疑问，或者希望与我们进行合作，欢迎随时联系我们。我们将竭诚为您提供帮助。</p>
      </div>
    </section>

    <!-- 联系信息 -->
    <section class="contact-info">
      <h2>联系方式</h2>
      <div class="info-container">
        <div class="info-item">
          <div class="icon"><i class="fas fa-map-marker-alt"></i></div>
          <div class="text">
            <h3>地址</h3>
            <p>湖南省长沙市芙蓉区八一路418号湘绣文化中心</p>
          </div>
        </div>
        <div class="info-item">
          <div class="icon"><i class="fas fa-phone"></i></div>
          <div class="text">
            <h3>电话</h3>
            <p>+86 731-8888 8888</p>
          </div>
        </div>
        <div class="info-item">
          <div class="icon"><i class="fas fa-envelope"></i></div>
          <div class="text">
            <h3>邮箱</h3>
            <p>info@xiangxiu-museum.com</p>
          </div>
        </div>
        <div class="info-item">
          <div class="icon"><i class="fas fa-clock"></i></div>
          <div class="text">
            <h3>开放时间</h3>
            <p>周二至周日 9:00-17:00（周一闭馆）</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 联系表单 -->
    <section class="contact-form">
      <h2>发送信息</h2>
      <form @submit.prevent="submitForm">
        <div class="form-group">
          <label for="name">姓名</label>
          <input type="text" id="name" v-model="formData.name" required placeholder="请输入您的姓名">
        </div>
        <div class="form-group">
          <label for="email">邮箱</label>
          <input type="email" id="email" v-model="formData.email" required placeholder="请输入您的邮箱">
        </div>
        <div class="form-group">
          <label for="phone">电话</label>
          <input type="tel" id="phone" v-model="formData.phone" placeholder="请输入您的电话">
        </div>
        <div class="form-group">
          <label for="subject">主题</label>
          <select id="subject" v-model="formData.subject" required>
            <option value="">请选择咨询主题</option>
            <option value="参观预约">参观预约</option>
            <option value="产品咨询">产品咨询</option>
            <option value="合作洽谈">合作洽谈</option>
            <option value="学习培训">学习培训</option>
            <option value="其他">其他</option>
          </select>
        </div>
        <div class="form-group">
          <label for="message">留言内容</label>
          <textarea id="message" v-model="formData.message" rows="5" required placeholder="请输入您的留言内容"></textarea>
        </div>
        <button type="submit" class="btn submit-btn">发送信息</button>
      </form>
    </section>

    <!-- 社交媒体 -->
    <section class="social-media">
      <h2>关注我们</h2>
      <div class="social-links">
        <a href="#" class="social-item">
          <i class="fab fa-weixin fa-3x"></i>
          <span>微信公众号</span>
        </a>
        <a href="#" class="social-item">
          <i class="fab fa-weibo fa-3x"></i>
          <span>微博</span>
        </a>
        <a href="#" class="social-item">
          <i class="fab fa-youtube fa-3x"></i>
          <span>视频号</span>
        </a>
        <a href="#" class="social-item">
          <i class="fab fa-instagram fa-3x"></i>
          <span>Instagram</span>
        </a>
      </div>
    </section>

    <!-- 常见问题 -->
    <section class="faq">
      <h2>常见问题</h2>
      <div class="faq-container">
        <div class="faq-item" v-for="(item, index) in faqs" :key="index">
          <div class="faq-question" @click="toggleFaq(index)">
            <h3>{{ item.question }}</h3>
            <i class="fas fa-chevron-down" :class="{ active: activeFaq === index }"></i>
          </div>
          <div class="faq-answer" v-show="activeFaq === index">
            <p>{{ item.answer }}</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// 表单数据
const formData = ref({
  name: '',
  email: '',
  phone: '',
  subject: '',
  message: ''
})

// 常见问题
const faqs = ref([
  {
    question: '如何预约参观湘绣博物馆？',
    answer: '您可以通过我们的官方网站、电话或邮箱进行预约。参观前请提前3-5天预约，我们会根据您的需求安排专业讲解。团体参观（10人以上）需提前一周预约。'
  },
  {
    question: '湘绣产品如何保养？',
    answer: '湘绣产品应避免阳光直射、潮湿和高温环境，定期用干燥的软毛刷轻轻拂去灰尘。如需清洁，建议送专业机构处理。存放时应放在干燥通风处，可适当放置防虫剂。'
  },
  {
    question: '是否提供湘绣定制服务？',
    answer: '是的，我们提供个性化湘绣定制服务。您可以提供自己喜欢的图案、照片或主题，我们的专业设计师和绣工将为您量身定制独特的湘绣作品。定制周期根据作品大小和复杂程度而定，一般为1-3个月。'
  },
  {
    question: '如何参加湘绣培训课程？',
    answer: '我们定期举办湘绣入门、进阶培训班，面向不同年龄段和基础的学员。您可以通过我们的官方网站或微信公众号了解最新的培训课程信息，也可以直接联系我们咨询报名事宜。'
  },
  {
    question: '是否接受校企合作或文化交流活动？',
    answer: '我们非常欢迎各类校企合作和文化交流活动。如果您有合作意向，请通过电话或邮箱与我们联系，我们将安排专人与您洽谈具体合作事宜。'
  }
])

// 展开的FAQ项
const activeFaq = ref(null)

// 切换FAQ展开/收起
const toggleFaq = (index) => {
  if (activeFaq.value === index) {
    activeFaq.value = null
  } else {
    activeFaq.value = index
  }
}

// 提交表单
const submitForm = () => {
  // 这里可以添加表单提交逻辑
  alert('您的信息已发送，我们将尽快与您联系！')
  // 重置表单
  formData.value = {
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  }
}
</script>

<style scoped>
/* 联系页面容器样式 */
.contact-container {
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

/* 联系信息部分样式 */
.contact-info {
  background-color: #fff;
  padding: 4rem 9%;
  margin-bottom: 4rem;
}

.contact-info h2 {
  font-size: 2.5rem;
  color: var(--primary-color);
  margin-bottom: 3rem;
  text-align: center;
}

.info-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(25rem, 1fr));
  gap: 3rem;
}

/* 信息项样式 */
.info-item {
  display: flex;
  align-items: flex-start;
  gap: 2rem;
  padding: 2rem;
  background-color: #f9f9f9;
  border: 0.1rem solid rgba(0,0,0,0.1);
  border-radius: 0.5rem;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.info-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 1rem 2rem rgba(0, 0, 0, 0.1);
  border-color: var(--primary-color);
}

.info-item .icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  background-color: var(--primary-color);
  color: #fff;
  border-radius: 50%;
  flex-shrink: 0;
}

.info-item .icon i {
  font-size: 2rem;
}

.info-item .text h3 {
  font-size: 1.8rem;
  color: var(--primary-color);
  margin-bottom: 0.5rem;
}

.info-item .text p {
  color: var(--secondary-color);
  line-height: 1.6;
  font-size: 1.4rem;
  margin-bottom: 0;
}

/* 联系表单部分样式 */
.contact-form {
  background-color: #fff;
  padding: 4rem 9%;
  margin-bottom: 4rem;
}

.contact-form h2 {
  font-size: 2.5rem;
  color: var(--primary-color);
  margin-bottom: 3rem;
  text-align: center;
}

/* 表单样式 */
form {
  max-width: 800px;
  margin: 0 auto;
}

.form-group {
  margin-bottom: 2rem;
}

.form-group label {
  display: block;
  font-size: 1.6rem;
  color: var(--primary-color);
  margin-bottom: 0.8rem;
  font-weight: 500;
}

.form-group input,
.form-group select,
.form-group textarea {
  width: 100%;
  padding: 1.2rem 1.5rem;
  font-size: 1.6rem;
  border: 0.1rem solid rgba(0,0,0,0.1);
  border-radius: 0.5rem;
  outline: none;
  transition: border-color 0.3s ease;
  background-color: #fff;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  border-color: var(--primary-color);
}

.form-group textarea {
  resize: vertical;
  min-height: 150px;
}

/* 提交按钮样式 */
.submit-btn {
  display: block;
  width: 100%;
  padding: 1.2rem;
  font-size: 1.8rem;
  background: var(--primary-color);
  color: #fff;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s ease;
}

.submit-btn:hover {
  background-color: var(--primary-light);
  transform: translateY(-3px);
}

/* 社交媒体部分样式 */
.social-media {
  background-color: #fff;
  padding: 4rem 9%;
  margin-bottom: 4rem;
}

.social-media h2 {
  font-size: 2.5rem;
  color: var(--primary-color);
  margin-bottom: 3rem;
  text-align: center;
}

.social-links {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 3rem;
}

/* 社交项样式 */
.social-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  background-color: #f9f9f9;
  border: 0.1rem solid rgba(0,0,0,0.1);
  border-radius: 0.5rem;
  text-decoration: none;
  transition: all 0.3s ease;
  min-width: 150px;
}

.social-item:hover {
  transform: translateY(-10px);
  box-shadow: 0 1rem 2rem rgba(0, 0, 0, 0.1);
  border-color: var(--primary-color);
  background-color: var(--primary-color);
  color: #fff;
}

.social-item i {
  font-size: 4rem;
  color: var(--primary-color);
  margin-bottom: 1rem;
  transition: color 0.3s ease;
}

.social-item:hover i {
  color: #fff;
}

.social-item span {
  font-size: 1.6rem;
  color: var(--secondary-color);
  transition: color 0.3s ease;
}

.social-item:hover span {
  color: #fff;
}

/* 常见问题部分样式 */
.faq {
  background-color: #fff;
  padding: 4rem 9%;
  margin-bottom: 4rem;
}

.faq h2 {
  font-size: 2.5rem;
  color: var(--primary-color);
  margin-bottom: 3rem;
  text-align: center;
}

.faq-container {
  max-width: 800px;
  margin: 0 auto;
}

/* FAQ项样式 */
.faq-item {
  margin-bottom: 1.5rem;
  border: 0.1rem solid rgba(0,0,0,0.1);
  border-radius: 0.5rem;
  overflow: hidden;
}

/* FAQ问题样式 */
.faq-question {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 2rem;
  background-color: #f9f9f9;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.faq-question:hover {
  background-color: #f0f0f0;
}

.faq-question h3 {
  font-size: 1.8rem;
  color: var(--primary-color);
  margin: 0;
  line-height: 1.4;
}

.faq-question i {
  font-size: 1.6rem;
  color: var(--secondary-color);
  transition: transform 0.3s ease;
}

.faq-question i.active {
  transform: rotate(180deg);
  color: var(--primary-color);
}

/* FAQ答案样式 */
.faq-answer {
  padding: 0 2rem;
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease, padding 0.3s ease;
}

.faq-answer p {
  color: var(--secondary-color);
  line-height: 1.6;
  font-size: 1.4rem;
  margin: 1.5rem 0;
}

.faq-item .faq-answer {
  max-height: 500px;
}

/* 响应式设计 */
@media (max-width: 991px) {
  .intro,
  .contact-info,
  .contact-form,
  .social-media,
  .faq {
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
  
  .info-container,
  .social-links {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  
  .social-item {
    width: 100%;
    max-width: 300px;
    margin: 0 auto;
  }
}

@media (max-width: 450px) {
  .heading h3 {
    font-size: 2rem;
  }
  
  .intro .content h3 {
    font-size: 2rem;
  }
  
  .info-item,
  .form-group input,
  .form-group select,
  .form-group textarea {
    padding: 1rem 1.2rem;
  }
  
  .faq-question h3 {
    font-size: 1.6rem;
  }
}
</style>