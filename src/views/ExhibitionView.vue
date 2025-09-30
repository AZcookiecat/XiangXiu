<template>
  <div class="exhibition-container">
    <section class="heading">
      <h3>数字化作品欣赏</h3>
      <p> <router-link to="/">首页</router-link> / <span>数字化作品</span> </p>
    </section>

    <!-- 轮播图区域 -->
    <section class="carousel-section">
      <div class="carousel-container" ref="carouselRef" @mouseenter="stopCarousel" @mouseleave="startCarousel">
        <!-- 轮播图片 -->
        <div class="carousel-slides">
          <div 
            v-for="(slide, index) in carouselSlides" 
            :key="slide.id"
            :class="['carousel-slide', { active: currentSlide === index }]"
            :style="{ transform: `translateX(-${currentSlide * 100}%)` }"
          >
            <img :src="slide.imageUrl" :alt="slide.title">
            <div class="carousel-caption">
              <h3>{{ slide.title }}</h3>
              <p>{{ slide.description }}</p>
            </div>
          </div>
        </div>
        
        <!-- 切换箭头 -->
        <button class="carousel-arrow left-arrow" @click="prevSlide">&lt;</button>
        <button class="carousel-arrow right-arrow" @click="nextSlide">&gt;</button>
        
        <!-- 轮播指示器 -->
        <div class="carousel-indicators">
          <button 
            v-for="(slide, index) in carouselSlides" 
            :key="slide.id"
            :class="['indicator', { active: currentSlide === index }]"
            @click="goToSlide(index)"
          ></button>
        </div>
      </div>
    </section>

    <!-- 分类筛选区域 -->
    <section class="filter-section">
      <div class="filter-controls">
        <button 
          v-for="category in categories" 
          :key="category.id"
          :class="['category-btn', { active: selectedCategory === category.id }]"
          @click="selectCategory(category.id)"
        >
          {{ category.name }}
        </button>
      </div>
    </section>


    <!-- 数字化作品展示区域 -->
    <section class="digital-works-section">
      <h2 class="section-title">精选数字化作品</h2>
      <div class="works-grid">
        <div 
          v-for="work in filteredWorks" 
          :key="work.id" 
          class="work-card"
          @click="viewWorkDetails(work)"
        >
          <div class="work-image-container">
            <img :src="work.image" :alt="work.title">
            <div class="work-overlay">
              <span class="view-details">点击查看详情</span>
            </div>
          </div>
          <div class="work-info">
            <h4>{{ work.title }}</h4>
            <p class="artist">{{ work.artist }}</p>
            <p class="category">{{ getCategoryName(work.categoryId) }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 作品详情弹窗 -->
    <div v-if="showWorkDetails" class="modal-overlay" @click="closeWorkDetails">
      <div class="modal-content" @click.stop>
        <button class="close-btn" @click="closeWorkDetails">&times;</button>
        <div class="modal-body">
          <div class="work-detail-image">
            <img :src="selectedWork.image" :alt="selectedWork.title">
          </div>
          <div class="work-detail-info">
            <h3>{{ selectedWork.title }}</h3>
            <p class="artist">{{ selectedWork.artist }}</p>
            <p class="category">{{ getCategoryName(selectedWork.categoryId) }}</p>
            <p class="description">{{ selectedWork.description }}</p>
            <div class="work-meta">
              <span>创作年份：{{ selectedWork.year }}</span>
              <span>工艺技法：{{ selectedWork.technique }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, inject, onMounted, onUnmounted } from 'vue'

const flash = inject('flash')

// 轮播图数据和状态
const carouselRef = ref(null)
const currentSlide = ref(0)
let carouselInterval = null
const slideDelay = 2000 // 鼠标移走后2秒继续轮播
const autoPlayInterval = 5000 // 自动播放间隔

const carouselSlides = [
  {
    id: 1,
    title: '湘绣精品展示',
    description: '传承千年的刺绣艺术瑰宝',
    imageUrl: '/static/pictures/微信图片_20241210130516.jpg'
  },
  {
    id: 2,
    title: '传统文化魅力',
    description: '湘绣工艺的精湛与创新',
    imageUrl: '/static/pictures/微信图片_20241210142845.jpg'
  },
  {
    id: 3,
    title: '非遗传承',
    description: '保护和发扬优秀传统文化',
    imageUrl: '/static/pictures/微信图片_20241210142858.jpg'
  },
  {
    id: 4,
    title: '匠心之作',
    description: '每一件作品都是匠心独运',
    imageUrl: '/static/pictures/微信图片_20241210142905.jpg'
  },
  {
    id: 5,
    title: '文化瑰宝',
    description: '中华文化的璀璨明珠',
    imageUrl: '/static/pictures/微信图片_20241210142912.jpg'
  }
]

// 轮播控制方法
const nextSlide = () => {
  currentSlide.value = (currentSlide.value + 1) % carouselSlides.length
}

const prevSlide = () => {
  currentSlide.value = (currentSlide.value - 1 + carouselSlides.length) % carouselSlides.length
}

const goToSlide = (index) => {
  currentSlide.value = index
}

// 自动轮播控制
const startCarousel = () => {
  if (carouselInterval) clearInterval(carouselInterval)
  
  // 鼠标移走后2秒继续轮播
  setTimeout(() => {
    carouselInterval = setInterval(nextSlide, autoPlayInterval)
  }, slideDelay)
}

const stopCarousel = () => {
  if (carouselInterval) {
    clearInterval(carouselInterval)
    carouselInterval = null
  }
}

// 生命周期
onMounted(() => {
  // 启动自动轮播
  startCarousel()
})

onUnmounted(() => {
  // 清理定时器
  if (carouselInterval) {
    clearInterval(carouselInterval)
  }
})

// 数据
const categories = [
  { id: 0, name: '全部作品' },
  { id: 1, name: '花鸟鱼虫' },
  { id: 2, name: '人物肖像' },
  { id: 3, name: '山水风景' },
  { id: 4, name: '民俗文化' },
  { id: 5, name: '现代艺术' }
]

const works = [
  {
    id: 1,
    title: '北极熊',
    artist: '李绣娘',
    categoryId: 1,
    image: 'https://pic1.imgdb.cn/item/67fe2d5688c538a9b5d1b564.jpg',
    description: '这幅湘绣作品以北极熊为主题，通过精湛的刺绣技艺展现了北极的神秘与生机。作品采用了多种针法，色彩鲜艳而不失典雅。',
    year: '2022',
    technique: '掺针、平针、齐针'
  },
  {
    id: 2,
    title: '月夜虎影',
    artist: '张一针',
    categoryId: 1,
    image: 'https://pic1.imgdb.cn/item/67fe2d5688c538a9b5d1b563.jpg',
    description: '作品描绘了老虎在月光下的身影，展现了动物的力量与神秘。画面层次分明，远近景色错落有致。',
    year: '2021',
    technique: '乱针、滚针、打籽针'
  },
  {
    id: 3,
    title: '金鱼',
    artist: '王绣艺',
    categoryId: 1,
    image: 'https://pic1.imgdb.cn/item/67fe2d5688c538a9b5d1b562.jpg',
    description: '这幅作品以金鱼为主题，金鱼姿态优雅，栩栩如生。作品采用了精细的劈线工艺，鱼鳞的层次感和质感表现得淋漓尽致。',
    year: '2023',
    technique: '掺针、施针、网针'
  },
  {
    id: 4,
    title: '虎头',
    artist: '刘绣云',
    categoryId: 1,
    image: 'https://pic1.imgdb.cn/item/67fe2d5688c538a9b5d1b565.jpg',
    description: '作品细致描绘了老虎的头部特写，表情生动，毛发细节精致。通过湘绣特有的表现力，展现了动物的神韵。',
    year: '2022',
    technique: '滚针、乱针、齐针'
  },
  {
    id: 5,
    title: '雄狮',
    artist: '陈绣山',
    categoryId: 1,
    image: 'https://pic1.imgdb.cn/item/67fe2d5688c538a9b5d1b560.jpg',
    description: '这幅作品以雄狮为主题，展现了草原之王的威严与力量。色彩热烈而富有张力，针法多变。',
    year: '2023',
    technique: '乱针、套针、网针'
  },
  {
    id: 6,
    title: '亲昵',
    artist: '李绣娘',
    categoryId: 1,
    image: 'https://pic1.imgdb.cn/item/67fe2d5688c538a9b5d1b561.jpg',
    description: '这是一幅表现动物之间亲密关系的湘绣作品，构图温馨，色彩和谐。作品注重情感表达和细节的表现力。',
    year: '2021',
    technique: '平针、掺针、施针'
  },
  {
    id: 7,
    title: '白虎头',
    artist: '李绣娘',
    categoryId: 1,
    image: 'https://pic1.imgdb.cn/item/67fe2d5f88c538a9b5d1b569.jpg',
    description: '这幅作品以白虎头部为主题，通过特殊的白色丝线展现白虎的独特魅力。针法精细，毛发质感逼真。',
    year: '2022',
    technique: '掺针、平针、齐针'
  },
  {
    id: 8,
    title: '饮水虎',
    artist: '张一针',
    categoryId: 1,
    image: 'https://pic1.imgdb.cn/item/67fe2d5f88c538a9b5d1b56a.jpg',
    description: '作品描绘了老虎饮水的场景，展现了动物的自然姿态和环境的和谐。画面层次分明，色彩自然。',
    year: '2021',
    technique: '乱针、滚针、打籽针'
  },
  {
    id: 9,
    title: '沙皮狗',
    artist: '王绣艺',
    categoryId: 1,
    image: 'https://pic1.imgdb.cn/item/67fe2d5f88c538a9b5d1b56b.jpg',
    description: '这幅作品以沙皮狗为主题，通过特殊的针法表现出沙皮狗独特的皮肤质感。细节处理精细，形态逼真。',
    year: '2023',
    technique: '掺针、施针、网针'
  },
  {
    id: 10,
    title: '纸画绣 几维鸟',
    artist: '刘绣云',
    categoryId: 1,
    image: 'https://pic1.imgdb.cn/item/67fe2d5f88c538a9b5d1b56e.jpg',
    description: '作品采用纸画绣技法表现几维鸟的形象，结合了传统绘画与刺绣艺术，风格独特。',
    year: '2022',
    technique: '滚针、乱针、齐针'
  },
  {
    id: 11,
    title: '雪归',
    artist: '陈绣山',
    categoryId: 3,
    image: 'https://pic1.imgdb.cn/item/67fe2d5f88c538a9b5d1b56c.jpg',
    description: '这幅作品以雪景为主题，展现了冬日的宁静与美丽。色彩淡雅，意境深远。',
    year: '2023',
    technique: '乱针、套针、网针'
  },
  {
    id: 12,
    title: '望月',
    artist: '李绣娘',
    categoryId: 3,
    image: 'https://pic1.imgdb.cn/item/67fe2d5f88c538a9b5d1b56d.jpg',
    description: '这是一幅表现月夜景色的湘绣作品，以简约的构图和淡雅的色彩表现出月光下的意境之美。',
    year: '2021',
    technique: '平针、掺针、施针'
  },
  {
    id: 13,
    title: '布什总统全家福',
    artist: '李绣娘',
    categoryId: 2,
    image: 'https://pic1.imgdb.cn/item/67fe2d6e88c538a9b5d1b570.jpg',
    description: '这幅作品是布什总统全家福的湘绣版本，人物肖像生动逼真，服饰细节精致。',
    year: '2022',
    technique: '掺针、平针、齐针'
  },
  {
    id: 14,
    title: '邓小平绣像',
    artist: '张一针',
    categoryId: 2,
    image: 'https://pic1.imgdb.cn/item/67fe2d6f88c538a9b5d1b571.jpg',
    description: '作品细致描绘了邓小平同志的肖像，表情生动，细节精致。通过湘绣特有的表现力，展现了人物的精神风貌。',
    year: '2021',
    technique: '乱针、滚针、打籽针'
  },
  {
    id: 15,
    title: '童趣',
    artist: '王绣艺',
    categoryId: 2,
    image: 'https://pic1.imgdb.cn/item/67fe2d6f88c538a9b5d1b572.jpg',
    description: '这幅作品以儿童玩耍为主题，展现了童年的纯真与快乐。色彩明亮活泼，构图生动有趣。',
    year: '2023',
    technique: '掺针、施针、网针'
  },
  {
    id: 16,
    title: '亚特兰大市长肖像',
    artist: '刘绣云',
    categoryId: 2,
    image: 'https://pic1.imgdb.cn/item/67fe2d6f88c538a9b5d1b573.jpg',
    description: '作品描绘了亚特兰大市长的肖像，表情自然，服饰得体。通过精细的刺绣工艺，展现了肖像的真实感。',
    year: '2022',
    technique: '滚针、乱针、齐针'
  },
  {
    id: 17,
    title: '李仪徽研磨掺针绣连环画绣',
    artist: '陈绣山',
    categoryId: 4,
    image: 'https://pic1.imgdb.cn/item/67fe2d6f88c538a9b5d1b574.jpg',
    description: '这幅作品采用传统研磨掺针绣技法表现连环画内容，结合了传统工艺与现代内容表现方式。',
    year: '2023',
    technique: '乱针、套针、网针'
  },
  {
    id: 18,
    title: '毛泽东在陕北',
    artist: '李绣娘',
    categoryId: 2,
    image: 'https://pic1.imgdb.cn/item/67fe2d7888c538a9b5d1b576.jpg',
    description: '这幅作品描绘了毛泽东同志在陕北时期的形象，展现了革命领袖的风采。历史意义重大，艺术价值高。',
    year: '2022',
    technique: '掺针、平针、齐针'
  },
  {
    id: 19,
    title: '菡萏潇湘',
    artist: '张一针',
    categoryId: 1,
    image: 'https://pic1.imgdb.cn/item/67fe2d7888c538a9b5d1b578.jpg',
    description: '作品以荷花为主题，展现了荷花的娇艳与高洁。色彩清新淡雅，构图优美。',
    year: '2021',
    technique: '乱针、滚针、打籽针'
  },
  {
    id: 20,
    title: '荷香熠熠',
    artist: '王绣艺',
    categoryId: 1,
    image: 'https://pic1.imgdb.cn/item/67fe2d7a88c538a9b5d1b57b.jpg',
    description: '这幅作品以荷叶和荷花为主题，通过精湛的刺绣技艺展现了荷花的香气四溢和荷叶的生机。',
    year: '2023',
    technique: '掺针、施针、网针'
  },
  {
    id: 21,
    title: '秾芳图',
    artist: '刘绣云',
    categoryId: 1,
    image: 'https://pic1.imgdb.cn/item/67fe2d7988c538a9b5d1b57a.jpg',
    description: '作品根据宋代名画《秾芳图》改编，展现了盛开的花朵和繁茂的枝叶。构图饱满，色彩艳丽。',
    year: '2022',
    technique: '滚针、乱针、齐针'
  },
  {
    id: 22,
    title: '马蹄莲',
    artist: '陈绣山',
    categoryId: 1,
    image: 'https://pic1.imgdb.cn/item/67fe2d7988c538a9b5d1b579.jpg',
    description: '这幅作品以马蹄莲为主题，通过简约的构图和洁白的色彩表现出马蒂莲的高雅与纯洁。',
    year: '2023',
    technique: '乱针、套针、网针'
  },
  {
    id: 23,
    title: '黄底锦缎麒麟花卉帐檐',
    artist: '李绣娘',
    categoryId: 4,
    image: 'https://pic1.imgdb.cn/item/67fe2d8488c538a9b5d1b594.jpg',
    description: '这幅作品是传统帐檐装饰，以黄色锦缎为底，绣有麒麟和花卉图案，展现了传统工艺的精湛。',
    year: '2022',
    technique: '掺针、平针、齐针'
  },
  {
    id: 24,
    title: '套针绣 牡丹',
    artist: '张一针',
    categoryId: 1,
    image: 'https://pic1.imgdb.cn/item/67fe2d8388c538a9b5d1b593.jpg',
    description: '作品采用套针绣技法表现牡丹花，花瓣层次分明，色彩过渡自然，展现了套针绣的独特魅力。',
    year: '2021',
    technique: '乱针、滚针、打籽针'
  },
  {
    id: 25,
    title: '掺针绣 牡丹',
    artist: '王绣艺',
    categoryId: 1,
    image: 'https://pic1.imgdb.cn/item/67fe2d8488c538a9b5d1b595.jpg',
    description: '这幅作品采用掺针绣技法表现牡丹花，色彩鲜艳，花瓣质感逼真，展现了掺针绣的精湛技艺。',
    year: '2023',
    technique: '掺针、施针、网针'
  },
  {
    id: 26,
    title: '明净清幽幽',
    artist: '刘绣云',
    categoryId: 3,
    image: 'https://pic1.imgdb.cn/item/67ff693088c538a9b5d35ee6.jpg',
    description: '作品描绘了宁静的山水景色，展现了大自然的宁静与美丽。构图简洁，意境深远。',
    year: '2022',
    technique: '滚针、乱针、齐针'
  },
  {
    id: 27,
    title: '馨香月影清',
    artist: '陈绣山',
    categoryId: 1,
    image: 'https://pic1.imgdb.cn/item/67fe2d8888c538a9b5d1b59d.jpg',
    description: '这幅作品以月夜下的花卉为主题，通过淡雅的色彩表现出月光下花朵的朦胧美感。',
    year: '2023',
    technique: '乱针、套针、网针'
  },
  {
    id: 28,
    title: '百花争妍',
    artist: '李绣娘',
    categoryId: 1,
    image: 'https://pic1.imgdb.cn/item/67fe2d8788c538a9b5d1b599.jpg',
    description: '作品描绘了各种盛开的花朵，争奇斗艳，色彩缤纷。展现了大自然的生机勃勃。',
    year: '2022',
    technique: '掺针、平针、齐针'
  },
  {
    id: 29,
    title: '冬雪北国',
    artist: '张一针',
    categoryId: 3,
    image: 'https://pic1.imgdb.cn/item/67fe2d9888c538a9b5d1b5a2.jpg',
    description: '作品描绘了北方冬季的雪景，银装素裹，一片洁白。展现了冬季的宁静与美丽。',
    year: '2021',
    technique: '乱针、滚针、打籽针'
  },
  {
    id: 30,
    title: '枫红爱晚',
    artist: '王绣艺',
    categoryId: 3,
    image: 'https://pic1.imgdb.cn/item/67fe2d9988c538a9b5d1b5a3.jpg',
    description: '这幅作品描绘了秋天枫叶红遍的景色，色彩艳丽，构图优美。展现了秋天的热烈与美丽。',
    year: '2023',
    technique: '掺针、施针、网针'
  },
  {
    id: 31,
    title: '幽谷清亭图',
    artist: '刘绣云',
    categoryId: 3,
    image: 'https://pic1.imgdb.cn/item/67fe2d9b88c538a9b5d1b5a5.jpg',
    description: '作品描绘了山谷中的小亭，周围环境清幽，展现了中国传统山水画的意境。',
    year: '2022',
    technique: '滚针、乱针、齐针'
  },
  {
    id: 32,
    title: '唐寅山水',
    artist: '陈绣山',
    categoryId: 3,
    image: 'https://pic1.imgdb.cn/item/67fe2d9d88c538a9b5d1b5a7.jpg',
    description: '这幅作品根据明代画家唐寅的山水画改编，展现了传统文人画的意境和韵味。',
    year: '2023',
    technique: '乱针、套针、网针'
  },
  {
    id: 33,
    title: '李云青的山水图',
    artist: '李绣娘',
    categoryId: 3,
    image: 'https://pic1.imgdb.cn/item/67fe2db388c538a9b5d1b5b4.jpg',
    description: '作品根据当代画家李云青的山水画创作，展现了现代山水画的特色和魅力。',
    year: '2022',
    technique: '掺针、平针、齐针'
  },
  {
    id: 34,
    title: '湘西风情',
    artist: '张一针',
    categoryId: 4,
    image: 'https://pic1.imgdb.cn/item/67fe2db888c538a9b5d1b5bf.jpg',
    description: '作品描绘了湘西地区的风土人情，展现了少数民族的生活和文化特色。',
    year: '2021',
    technique: '乱针、滚针、打籽针'
  },
  {
    id: 35,
    title: '油画白桦林',
    artist: '王绣艺',
    categoryId: 3,
    image: 'https://pic1.imgdb.cn/item/67fe2d9988c538a9b5d1b5a4.jpg',
    description: '这幅作品以油画风格表现白桦林，色彩鲜明，层次丰富，展现了中西艺术的融合。',
    year: '2023',
    technique: '掺针、施针、网针'
  },
  {
    id: 36,
    title: '山水条屏',
    artist: '刘绣云',
    categoryId: 3,
    image: 'https://pic1.imgdb.cn/item/67fe2d9d88c538a9b5d1b5a6.jpg',
    description: '作品以条屏形式展现山水画，构图连贯，意境深远，展现了传统绘画的艺术魅力。',
    year: '2022',
    technique: '滚针、乱针、齐针'
  },
  {
    id: 37,
    title: '墨色山水四页屏',
    artist: '陈绣山',
    categoryId: 3,
    image: 'https://pic1.imgdb.cn/item/67fe2db988c538a9b5d1b5c0.jpg',
    description: '这幅作品以四页屏形式展现水墨山水画，黑白对比鲜明，意境深远。',
    year: '2023',
    technique: '乱针、套针、网针'
  },
  {
    id: 38,
    title: '韶山全景',
    artist: '李绣娘',
    categoryId: 3,
    image: 'https://pic1.imgdb.cn/item/67fe2db988c538a9b5d1b5c1.jpg',
    description: '作品描绘了韶山的全景，展现了革命圣地的壮丽景色和历史意义。',
    year: '2022',
    technique: '掺针、平针、齐针'
  },
  {
    id: 39,
    title: '瑶族挑花围裙 哪吒闹海',
    artist: '张一针',
    categoryId: 4,
    image: 'https://pic1.imgdb.cn/item/67fe2db788c538a9b5d1b5b7.jpg',
    description: '作品以瑶族挑花工艺表现哪吒闹海的传统故事，结合了少数民族工艺与汉族文化。',
    year: '2021',
    technique: '乱针、滚针、打籽针'
  },
  {
    id: 40,
    title: '华主席鼓励我们绣韶山',
    artist: '王绣艺',
    categoryId: 4,
    image: 'https://pic1.imgdb.cn/item/67fe2db988c538a9b5d1b5c2.jpg',
    description: '这幅作品记录了华主席鼓励绣工们绣制韶山的历史场景，具有重要的历史意义。',
    year: '2023',
    technique: '掺针、施针、网针'
  },
  {
    id: 41,
    title: '桃源刺绣红呢地 “诸葛亮七擒孟获”堂彩',
    artist: '刘绣云',
    categoryId: 4,
    image: 'https://pic1.imgdb.cn/item/67fe2dd188c538a9b5d1b5d5.jpg',
    description: '作品以桃源刺绣工艺在红呢地上表现"诸葛亮七擒孟获"的历史故事，工艺精湛，色彩艳丽。',
    year: '2022',
    technique: '滚针、乱针、齐针'
  },
  {
    id: 42,
    title: '壁画 羞女情',
    artist: '陈绣山',
    categoryId: 5,
    image: 'https://pic1.imgdb.cn/item/67fe2dd788c538a9b5d1b5de.jpg',
    description: '这幅作品以壁画形式表现现代艺术主题，风格独特，表现力强，展现了湘绣的现代创新。',
    year: '2023',
    technique: '乱针、套针、网针'
  },
  {
    id: 43,
    title: '香港精品展签名',
    artist: '李绣娘',
    categoryId: 4,
    image: 'https://pic1.imgdb.cn/item/67fe2dd588c538a9b5d1b5d8.jpg',
    description: '作品记录了香港精品展上的签名场景，具有重要的纪念意义和历史价值。',
    year: '2022',
    technique: '掺针、平针、齐针'
  },
  {
    id: 44,
    title: '人物故事绣片',
    artist: '张一针',
    categoryId: 4,
    image: 'https://pic1.imgdb.cn/item/67fe2dd688c538a9b5d1b5dd.jpg',
    description: '作品以绣片形式表现传统人物故事，构图精美，色彩鲜艳，展现了传统工艺的魅力。',
    year: '2021',
    technique: '乱针、滚针、打籽针'
  },
  {
    id: 45,
    title: '婴戏图6页屏风',
    artist: '王绣艺',
    categoryId: 4,
    image: 'https://pic1.imgdb.cn/item/67fe2dd188c538a9b5d1b5d6.jpg',
    description: '这幅作品以六页屏风形式表现儿童玩耍的场景，构图生动有趣，色彩明亮活泼。',
    year: '2023',
    technique: '掺针、施针、网针'
  },
  {
    id: 46,
    title: '壁挂 太阳和人',
    artist: '刘绣云',
    categoryId: 5,
    image: 'https://pic1.imgdb.cn/item/67ff6afb88c538a9b5d365f2.jpg',
    description: '作品以现代壁挂形式表现"太阳和人"的抽象主题，风格前卫，色彩鲜明。',
    year: '2022',
    technique: '滚针、乱针、齐针'
  },
  {
    id: 47,
    title: '毛主席去安源',
    artist: '陈绣山',
    categoryId: 2,
    image: 'https://pic1.imgdb.cn/item/67ff6b1388c538a9b5d36649.jpg',
    description: '这幅作品根据油画《毛主席去安源》改编，展现了毛主席青年时期的革命形象，具有重要的历史意义。',
    year: '2023',
    technique: '乱针、套针、网针'
  },
  {
    id: 48,
    title: '韩熙载夜宴图',
    artist: '李绣娘',
    categoryId: 4,
    image: 'https://pic1.imgdb.cn/item/67ff6b3388c538a9b5d366bb.jpg',
    description: '作品根据五代画家顾闳中的《韩熙载夜宴图》改编，展现了古代贵族的夜宴场景，人物众多，细节丰富。',
    year: '2022',
    technique: '掺针、平针、齐针'
  }
]

// 状态
const selectedCategory = ref(0)
const showWorkDetails = ref(false)
const selectedWork = ref(null)
const filteredWorks = ref(works)

// 方法
const selectCategory = (categoryId) => {
  selectedCategory.value = categoryId
  if (categoryId === 0) {
    filteredWorks.value = works
  } else {
    filteredWorks.value = works.filter(work => work.categoryId === categoryId)
  }
}

const getCategoryName = (categoryId) => {
  const category = categories.find(cat => cat.id === categoryId)
  return category ? category.name : ''
}

const viewWorkDetails = (work) => {
  selectedWork.value = work
  showWorkDetails.value = true
}

const closeWorkDetails = () => {
  showWorkDetails.value = false
  selectedWork.value = null
}

const viewExhibitionDetails = (exhibitionId) => {
  flash(`即将查看展览${exhibitionId}的详情！`)
}
</script>

<style scoped>
/* 展厅容器样式 - 符合project项目设计 */
.exhibition-container {
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

/* 筛选区域样式 */
.filter-section {
  background-color: #fff;
  padding: 2rem 9%;
  border-bottom: 0.1rem solid var(--primary-light);
  display: flex;
  justify-content: center;
  align-items: center;
}

.filter-controls {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  max-width: 1000px;
  width: 100%;
}

.category-btn {
  padding: 0.8rem 1.6rem;
  border: 0.1rem solid var(--primary-light);
  background-color: #fff;
  color: var(--primary-color);
  border-radius: 5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 1.5rem;
  font-weight: 500;
}

.category-btn:hover {
  background-color: var(--primary-light);
  color: var(--primary-color);
}

.category-btn.active {
  background-color: var(--primary-color);
  color: #fff;
  border-color: var(--primary-color);
}

/* 数字化作品区域样式 */
.digital-works-section {
  padding: 5rem 9%;
  background-color: #fff;
}

.section-title {
  font-size: 2.8rem;
  color: var(--primary-color);
  text-align: center;
  margin-bottom: 4rem;
  position: relative;
  padding-bottom: 1.5rem;
}

.section-title::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 10rem;
  height: 0.4rem;
  background-color: var(--primary-color);
  border-radius: 0.5rem;
}

.works-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(30rem, 1fr));
  gap: 3rem;
}

.work-card {
  background-color: #fff;
  border-radius: 0.5rem;
  overflow: hidden;
  box-shadow: 0 0.5rem 1.5rem rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  cursor: pointer;
  border: 0.1rem solid var(--primary-light);
}

.work-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 1rem 3rem rgba(0, 0, 0, 0.1);
}

.work-image-container {
  position: relative;
  overflow: hidden;
  height: 250px;
}

.work-image-container img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.work-card:hover .work-image-container img {
  transform: scale(1.05);
}

.work-overlay {
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

.work-card:hover .work-overlay {
  opacity: 1;
}

.view-details {
  color: #fff;
  font-size: 1.6rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1rem;
}

.work-info {
  padding: 2rem;
}

.work-info h4 {
  font-size: 1.8rem;
  color: var(--primary-color);
  margin-bottom: 0.5rem;
}

.work-info .artist {
  font-size: 1.4rem;
  color: var(--secondary-color);
  margin-bottom: 0.5rem;
}

.work-info .category {
  font-size: 1.3rem;
  color: var(--primary-light);
  background-color: #f8f9fa;
  display: inline-block;
  padding: 0.3rem 0.8rem;
  border-radius: 5rem;
  margin-top: 0.5rem;
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
  background-color: #fff;
  border-radius: 0.5rem;
  max-width: 900px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
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
  color: #fff;
}

.modal-body {
  display: flex;
  flex-direction: row;
}

.work-detail-image {
  width: 50%;
}

.work-detail-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.work-detail-info {
  padding: 3rem;
  width: 50%;
}

.work-detail-info h3 {
  font-size: 2.4rem;
  color: var(--primary-color);
  margin-bottom: 1rem;
}

.work-detail-info .artist {
  font-size: 1.6rem;
  color: var(--secondary-color);
  margin-bottom: 1rem;
}

.work-detail-info .category {
  font-size: 1.4rem;
  color: var(--primary-light);
  background-color: #f8f9fa;
  display: inline-block;
  padding: 0.5rem 1rem;
  border-radius: 5rem;
  margin-bottom: 2rem;
}

.work-detail-info .description {
  font-size: 1.5rem;
  line-height: 1.8;
  color: var(--secondary-color);
  margin-bottom: 2rem;
}

.work-meta {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.work-meta span {
  font-size: 1.4rem;
  color: var(--secondary-color);
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

/* 轮播图样式 */
.carousel-section {
  width: 100%;
  margin: 2rem 0;
  overflow: hidden;
}

.carousel-container {
  position: relative;
  width: 100%;
  height: 500px;
  background-color: #f8f9fa;
  overflow: hidden;
}

.carousel-slides {
  display: flex;
  width: 100%;
  height: 100%;
  transition: transform 0.5s ease-in-out;
}

.carousel-slide {
  min-width: 100%;
  height: 100%;
  position: relative;
}

.carousel-slide img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.carousel-caption {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.7), transparent);
  color: white;
  padding: 3rem;
  text-align: left;
}

.carousel-caption h3 {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.carousel-caption p {
  font-size: 1.6rem;
  opacity: 0.9;
}

/* 轮播箭头样式 */
.carousel-arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: rgba(255, 255, 255, 0.3);
  color: white;
  border: none;
  width: 5rem;
  height: 5rem;
  font-size: 2.5rem;
  cursor: pointer;
  border-radius: 50%;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
}

.carousel-arrow:hover {
  background-color: rgba(255, 255, 255, 0.8);
  color: var(--primary-color);
  transform: translateY(-50%) scale(1.1);
}

.left-arrow {
  left: 2rem;
}

.right-arrow {
  right: 2rem;
}

/* 轮播指示器样式 */
.carousel-indicators {
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 1rem;
  z-index: 10;
}

.indicator {
  width: 1.2rem;
  height: 1.2rem;
  border-radius: 50%;
  border: 2px solid rgba(255, 255, 255, 0.5);
  background-color: rgba(255, 255, 255, 0.3);
  cursor: pointer;
  transition: all 0.3s ease;
}

.indicator:hover,
.indicator.active {
  background-color: var(--primary-color);
  border-color: var(--primary-color);
  transform: scale(1.2);
}

/* 展览内容样式 */
.exhibition-content {
  display: flex;
  flex-direction: column;
  gap: 4rem;
  padding: 5rem 9%;
  background-color: #fff;
}

/* 展览项样式 */
.exhibition-item {
  display: flex;
  gap: 3rem;
  background-color: #fff;
  border-radius: 0.5rem;
  overflow: hidden;
  box-shadow: 0 0.5rem 1.5rem rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  border: 0.1rem solid var(--primary-light);
  position: relative;
  overflow: hidden;
}

.exhibition-item::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 0.5rem;
  height: 100%;
  background-color: var(--primary-color);
}

.exhibition-item:hover {
  transform: translateY(-10px);
  box-shadow: 0 1rem 3rem rgba(0, 0, 0, 0.1);
}

.exhibition-item.reverse {
  flex-direction: row-reverse;
}

/* 展览图片样式 */
.exhibition-item img {
  width: 40%;
  height: 350px;
  object-fit: cover;
  border-radius: 0 0.5rem 0.5rem 0;
  transition: transform 0.5s ease;
}

.exhibition-item.reverse img {
  border-radius: 0.5rem 0 0 0.5rem;
}

.exhibition-item:hover img {
  transform: scale(1.05);
}

/* 展览信息样式 */
.exhibition-info {
  flex: 1;
  padding: 3rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.exhibition-info h4 {
  font-size: 2.4rem;
  color: var(--primary-color);
  margin-bottom: 1.5rem;
  position: relative;
  padding-bottom: 1rem;
}

.exhibition-info h4::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 8rem;
  height: 0.3rem;
  background-color: var(--primary-light);
  border-radius: 0.5rem;
}

.exhibition-info p {
  font-size: 1.6rem;
  color: var(--secondary-color);
  line-height: 1.8;
  margin-bottom: 1.2rem;
  padding-left: 0.5rem;
  border-left: 0.2rem solid var(--primary-lighter);
}

/* 详情按钮样式 */
.exhibition-info .details-btn {
  align-self: flex-start;
  background-color: var(--primary-color);
  color: white;
  border: none;
  padding: 1.2rem 2rem;
  font-size: 1.6rem;
  cursor: pointer;
  border-radius: 0.5rem;
  transition: all 0.3s ease;
  margin-top: 2rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1rem;
  display: flex;
  align-items: center;
  gap: 1rem;
}

.exhibition-info .details-btn:hover {
  background-color: var(--primary-light);
  transform: translateY(-3px);
  box-shadow: 0 0.5rem 1.5rem rgba(36, 77, 77, 0.2);
}

.exhibition-info .details-btn i {
  font-size: 1.4rem;
  transition: transform 0.3s ease;
}

.exhibition-info .details-btn:hover i {
  transform: translateX(0.5rem);
}

/* 响应式设计 - 大屏幕 */
@media (max-width: 1200px) {
  .carousel-container {
    height: 400px;
  }
  
  .carousel-caption h3 {
    font-size: 2.5rem;
  }
  
  .carousel-caption p {
    font-size: 1.4rem;
  }
  
  .exhibition-content {
    padding: 4rem 5%;
    gap: 3rem;
  }
  
  .heading {
    padding: 2rem 5%;
  }
  
  .exhibition-item {
    gap: 2rem;
  }
  
  .exhibition-info {
    padding: 2.5rem;
  }
  
  .filter-section {
    padding: 2rem 5%;
  }
  
  .digital-works-section {
    padding: 4rem 5%;
  }
  
  .works-grid {
    gap: 2.5rem;
  }
}

/* 响应式设计 - 平板 */
@media (max-width: 991px) {
  .carousel-container {
    height: 350px;
  }
  
  .carousel-caption {
    padding: 2rem;
  }
  
  .carousel-caption h3 {
    font-size: 2rem;
  }
  
  .carousel-caption p {
    font-size: 1.3rem;
  }
  
  .carousel-arrow {
    width: 4rem;
    height: 4rem;
    font-size: 2rem;
  }
  
  .left-arrow {
    left: 1rem;
  }
  
  .right-arrow {
    right: 1rem;
  }
  
  .exhibition-item,
  .exhibition-item.reverse {
    flex-direction: column;
  }
  
  .exhibition-item img {
    width: 100%;
    height: 280px;
    border-radius: 0.5rem 0.5rem 0 0;
  }
  
  .exhibition-item.reverse img {
    border-radius: 0.5rem 0.5rem 0 0;
  }
  
  .exhibition-info {
    padding: 2.5rem;
  }
  
  .works-grid {
    grid-template-columns: repeat(auto-fill, minmax(25rem, 1fr));
    gap: 2rem;
  }
  
  .modal-body {
    flex-direction: column;
  }
  
  .work-detail-image {
    width: 100%;
    height: 300px;
  }
  
  .work-detail-info {
    width: 100%;
    padding: 2.5rem;
  }
}

/* 响应式设计 - 手机 */
@media (max-width: 768px) {
  .carousel-container {
    height: 280px;
  }
  
  .carousel-caption {
    padding: 1.5rem;
  }
  
  .carousel-caption h3 {
    font-size: 1.8rem;
  }
  
  .carousel-caption p {
    display: none; /* 在手机上隐藏描述，节省空间 */
  }
  
  .carousel-arrow {
    width: 3.5rem;
    height: 3.5rem;
    font-size: 1.8rem;
  }
  
  .indicator {
    width: 1rem;
    height: 1rem;
  }
  
  .heading h3 {
    font-size: 2.4rem;
  }
  
  .heading p {
    font-size: 1.6rem;
  }
  
  .exhibition-content {
    padding: 2rem;
    gap: 2rem;
  }
  
  .filter-section {
    padding: 1.5rem 2rem;
  }
  
  .category-btn {
    padding: 0.6rem 1.2rem;
    font-size: 1.4rem;
  }
  
  .digital-works-section {
    padding: 3rem 2rem;
  }
  
  .section-title {
    font-size: 2.4rem;
    margin-bottom: 3rem;
  }
  
  .works-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  
  .exhibition-item {
    gap: 0;
  }
  
  .exhibition-item img {
    height: 220px;
  }
  
  .exhibition-info {
    padding: 2rem;
  }
  
  .exhibition-info h4 {
    font-size: 2rem;
  }
  
  .exhibition-info p {
    font-size: 1.4rem;
  }
  
  .exhibition-info .details-btn {
    align-self: center;
    width: 100%;
    text-align: center;
    justify-content: center;
    padding: 1rem 1.5rem;
    font-size: 1.5rem;
  }
  
  .work-detail-info {
    padding: 2rem;
  }
  
  .work-detail-info h3 {
    font-size: 2rem;
  }
  
  .work-detail-info .description {
    font-size: 1.4rem;
  }
  
  .modal-overlay {
    padding: 1rem;
  }
}

/* 响应式设计 - 小手机 */
@media (max-width: 450px) {
  .carousel-container {
    height: 220px;
  }
  
  .carousel-caption {
    padding: 1rem;
  }
  
  .carousel-caption h3 {
    font-size: 1.6rem;
  }
  
  .carousel-arrow {
    width: 3rem;
    height: 3rem;
    font-size: 1.6rem;
  }
  
  .left-arrow {
    left: 0.5rem;
  }
  
  .right-arrow {
    right: 0.5rem;
  }
  
  .indicator {
    width: 0.8rem;
    height: 0.8rem;
  }
  
  .carousel-indicators {
    gap: 0.6rem;
  }
  
  .heading h3 {
    font-size: 2rem;
  }
  
  .heading p {
    font-size: 1.4rem;
  }
  
  .exhibition-content {
    padding: 1.5rem;
  }
  
  .filter-section {
    padding: 1rem 1.5rem;
  }
  
  .filter-controls {
    gap: 0.8rem;
  }
  
  .category-btn {
    padding: 0.5rem 1rem;
    font-size: 1.3rem;
  }
  
  .digital-works-section {
    padding: 2rem 1.5rem;
  }
  
  .section-title {
    font-size: 2rem;
    margin-bottom: 2rem;
  }
  
  .section-title::after {
    width: 8rem;
    height: 0.3rem;
  }
  
  .exhibition-item img {
    height: 180px;
  }
  
  .exhibition-info {
    padding: 1.5rem;
  }
  
  .exhibition-info h4 {
    font-size: 1.8rem;
  }
  
  .exhibition-info p {
    font-size: 1.3rem;
  }
  
  .exhibition-info .details-btn {
    padding: 0.8rem;
    font-size: 1.4rem;
  }
  
  .work-image-container {
    height: 200px;
  }
  
  .work-info {
    padding: 1.5rem;
  }
  
  .work-info h4 {
    font-size: 1.6rem;
  }
  
  .work-detail-image {
    height: 200px;
  }
  
  .work-detail-info {
    padding: 1.5rem;
  }
  
  .work-detail-info h3 {
    font-size: 1.8rem;
  }
  
  .close-btn {
    font-size: 2rem;
    width: 3.5rem;
    height: 3.5rem;
  }
}
</style>