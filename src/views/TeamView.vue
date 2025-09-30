<template>
  <div class="team-container">
    <section class="heading">
      <h3>我们的团队</h3>
      <p> <router-link to="/">首页</router-link> / <span>我们的团队</span> </p>
    </section>

    <section class="intro">
      <div class="image">
        <img src="https://pic1.imgdb.cn/item/67fe2d5688c538a9b5d1b561.jpg" alt="团队合影">
      </div>
      <div class="content">
        <span>关于我们</span>
        <h3>致力于湘绣文化的传承与创新</h3>
        <p>我们是一支由湘绣艺术家、文化学者、技术专家组成的跨学科团队，致力于将传统湘绣文化与现代科技相结合，推动湘绣艺术的传承、创新与发展。</p>
      </div>
    </section>

    <!-- 团队成员展示 -->
    <section class="team-members">
      <h1 class="title"> <span>核心团队成员</span> </h1>
      <div class="members-container">
        <div class="member-card" v-for="member in teamMembers" :key="member.id">
          <div class="member-image">
            <img :src="member.image" :alt="member.name">
          </div>
          <div class="member-info">
            <h3>{{ member.name }}</h3>
            <p class="position">{{ member.position }}</p>
            <p class="bio">{{ member.bio }}</p>
            <div class="social-links">
              <a href="#" class="social-icon"><i class="fab fa-weixin"></i></a>
              <a href="#" class="social-icon"><i class="fab fa-weibo"></i></a>
              <a href="#" class="social-icon"><i class="fas fa-envelope"></i></a>
            </div>
          </div>
        </div>
      </div>
    </section>
                          
    <!-- 团队荣誉 -->
    <section class="achievements">
      <h2>团队荣誉</h2>
      <div class="achievements-container">
        <div class="achievement-item" v-for="achievement in achievements" :key="achievement.id">
          <h3>{{ achievement.title }}</h3>
          <p>{{ achievement.description }}</p>
          <span class="year">{{ achievement.year }}</span>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// 团队成员数据
const teamMembers = ref([
  {
    id: 1,
    name: '朱理婧',
    position: '项目指导老师',
    bio: '本科毕业于西南交通大学轨道交通信号与控制专业，硕士研究生毕业于英国曼彻斯特大学管理与信息系统专业，现任湖南工商大学数字媒体工程与人文学院专任教师。主要研究领域为管理与信息系统、数字经济等。',
    image: '/static/pictures/xiaozhu.jpeg'
  },
  {
    id: 2,
    name: '李博士',
    position: '文化总监',
    bio: '艺术学博士，研究方向为中国传统工艺文化，致力于湘绣文化的理论研究与传播推广。',
    image: 'https://pic1.imgdb.cn/item/67fe2d5688c538a9b5d1b561.jpg'
  },
  {
    id: 3,
    name: '王设计师',
    position: '创意设计总监',
    bio: '知名设计师，专注于传统工艺与现代设计的融合创新，设计的湘绣文创产品深受年轻人喜爱。',
    image: 'https://pic1.imgdb.cn/item/67fe2d5688c538a9b5d1b561.jpg'
  },
  {
    id: 4,
    name: '刘工程师',
    position: '技术总监',
    bio: '数字媒体技术专家，负责湘绣数字化保护与创新应用技术的研发，推动湘绣与数字技术的融合。',
    image: 'https://pic1.imgdb.cn/item/67fe2d5688c538a9b5d1b561.jpg'
  },
  {
    id: 5,
    name: '赵经理',
    position: '运营总监',
    bio: '文化产业运营专家，负责团队项目的策划与运营，致力于湘绣文化的市场化推广。',
    image: 'https://pic1.imgdb.cn/item/67fe2d5688c538a9b5d1b561.jpg'
  },
  {
    id: 6,
    name: '陈老师',
    position: '培训导师',
    bio: '资深湘绣教师，拥有丰富的教学经验，负责团队的人才培养与教育推广工作。',
    image: 'https://pic1.imgdb.cn/item/67fe2d5688c538a9b5d1b561.jpg'
  }
])

// 团队荣誉数据
const achievements = ref([
  {
    id: 1,
    title: '针披寄湘锦——湘绣传统文化虚拟实验平台',
    description: '第十七届中国大学生计算机设计大赛中南地区赛三等奖',
    year: '2024年'
  },
  {
    id: 2,
    title: '针披寄湘锦——湘绣传统文化虚拟实验平台',
    description: '2024湖南省大学生数字媒体创意设计大赛二等奖',
    year: '2024年'
  },
  {
    id: 3,
    title: '元生湘缘——元宇宙数字湘绣生态系统',
    description: '第十八届中国大学生计算机设计大赛中南地区赛三等奖',
    year: '2025年'
  }
])
</script>

<style scoped>
/* 团队页面容器样式 */
.team-container {
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

/* 团队成员部分样式 */
.team-members {
  background-color: #fff;
  padding: 4rem 9%;
  margin-bottom: 4rem;
}

.team-members .title {
  display: flex;
  align-items: center;
  margin-bottom: 3rem;
  border-bottom: 0.1rem solid var(--primary-color);
  padding-bottom: 1.5rem;
}

.team-members .title span {
  font-size: 2.5rem;
  color: var(--primary-color);
  font-weight: 600;
}

/* 成员容器样式 */
.members-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(30rem, 1fr));
  gap: 3rem;
}

/* 成员卡片样式 */
.member-card {
  background-color: #fff;
  border: 0.1rem solid rgba(0,0,0,0.1);
  border-radius: 0.5rem;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  text-align: center;
}

.member-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 1rem 2rem rgba(0, 0, 0, 0.1);
  border-color: var(--primary-color);
}

/* 成员图片样式 */
.member-image {
  width: 100%;
  height: 300px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f5f5f5;
}

.member-image img {
  width: 80%;
  height: 80%;
  object-fit: cover;
  border-radius: 50%;
  border: 5px solid #fff;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.member-card:hover .member-image img {
  transform: scale(1.05);
}

/* 成员信息样式 */
.member-info {
  padding: 2rem;
}

.member-info h3 {
  font-size: 2rem;
  color: var(--primary-color);
  margin-bottom: 0.5rem;
}

.member-info .position {
  font-size: 1.6rem;
  color: var(--secondary-color);
  margin-bottom: 1rem;
  font-weight: 500;
}

.member-info .bio {
  color: var(--secondary-color);
  line-height: 1.6;
  font-size: 1.4rem;
  margin-bottom: 1.5rem;
}

/* 社交链接样式 */
.social-links {
  display: flex;
  justify-content: center;
  gap: 1rem;
}

.social-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background-color: #f5f5f5;
  color: var(--primary-color);
  border-radius: 50%;
  transition: all 0.3s ease;
  text-decoration: none;
}

.social-icon:hover {
  background-color: var(--primary-color);
  color: #fff;
  transform: translateY(-3px);
}

.social-icon i {
  font-size: 1.8rem;
}

/* 团队文化部分样式 */
.team-culture {
  background-color: #fff;
  padding: 4rem 9%;
  margin-bottom: 4rem;
}

.team-culture h2 {
  font-size: 2.5rem;
  color: var(--primary-color);
  margin-bottom: 3rem;
  text-align: center;
}

.culture-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(25rem, 1fr));
  gap: 3rem;
}

/* 文化项样式 */
.culture-item {
  background-color: #f9f9f9;
  padding: 3rem;
  border-radius: 0.5rem;
  text-align: center;
  border: 0.1rem solid rgba(0,0,0,0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.culture-item:hover {
  transform: translateY(-10px);
  box-shadow: 0 1rem 2rem rgba(0, 0, 0, 0.1);
  border-color: var(--primary-color);
}

.culture-item .icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 100px;
  background-color: var(--primary-color);
  color: #fff;
  border-radius: 50%;
  margin-bottom: 2rem;
  transition: transform 0.3s ease;
}

.culture-item:hover .icon {
  transform: scale(1.1);
}

.culture-item .icon i {
  font-size: 4rem;
}

.culture-item h3 {
  font-size: 2rem;
  color: var(--primary-color);
  margin-bottom: 1.5rem;
}

.culture-item p {
  color: var(--secondary-color);
  line-height: 1.6;
  font-size: 1.4rem;
}

/* 团队荣誉部分样式 */
.achievements {
  background-color: #fff;
  padding: 4rem 9%;
  margin-bottom: 4rem;
}

.achievements h2 {
  font-size: 2.5rem;
  color: var(--primary-color);
  margin-bottom: 3rem;
  text-align: center;
}

.achievements-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(30rem, 1fr));
  gap: 2rem;
}

/* 荣誉项样式 */
.achievement-item {
  background-color: #f9f9f9;
  padding: 2.5rem;
  border-radius: 0.5rem;
  border: 0.1rem solid rgba(0,0,0,0.1);
  position: relative;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.achievement-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 1rem 2rem rgba(0, 0, 0, 0.1);
  border-color: var(--primary-color);
}

.achievement-item h3 {
  font-size: 1.8rem;
  color: var(--primary-color);
  margin-bottom: 1rem;
  line-height: 1.3;
}

.achievement-item p {
  color: var(--secondary-color);
  line-height: 1.6;
  font-size: 1.4rem;
  margin-bottom: 1.5rem;
}

.achievement-item .year {
  display: inline-block;
  padding: 0.5rem 1rem;
  background-color: var(--primary-color);
  color: #fff;
  border-radius: 2rem;
  font-size: 1.4rem;
}

/* 响应式设计 */
@media (max-width: 991px) {
  .intro,
  .team-members,
  .team-culture,
  .achievements {
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
  
  .team-members .title span {
    font-size: 2.2rem;
  }
  
  .members-container,
  .culture-container,
  .achievements-container {
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
  
  .team-members .title span {
    font-size: 2rem;
  }
  
  .member-card,
  .culture-item,
  .achievement-item {
    padding: 1.5rem;
  }
  
  .culture-item .icon {
    width: 80px;
    height: 80px;
  }
  
  .culture-item .icon i {
    font-size: 3rem;
  }
}
</style>