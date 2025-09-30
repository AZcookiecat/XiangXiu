<template>
  <div class="knowledge-graph-container">
    <!-- 页面头部 -->
    <div class="heading">
      <h3>湘绣知识图谱</h3>
      <p>探索 <a href="/">首页</a> <span>/</span> 知识图谱</p>
    </div>

    <!-- 主要内容区域 -->
    <div class="graph-content">
      <!-- 控制区域 -->
      <div class="control-panel">
        <div class="search-section">
          <input 
            type="text" 
            v-model="searchTerm"
            placeholder="搜索湘绣知识..."
            class="search-input"
            @input="handleSearch"
          >
          <button class="search-btn" @click="handleSearch">
            <i class="fas fa-search"></i> 搜索
          </button>
        </div>
        
        <div class="category-filter">
          <label>类别筛选:</label>
          <select v-model="selectedCategory" @change="filterByCategory">
            <option value="">全部类别</option>
            <option value="工艺技法">工艺技法</option>
            <option value="历史发展">历史发展</option>
            <option value="代表作品">代表作品</option>
            <option value="材料工具">材料工具</option>
            <option value="文化内涵">文化内涵</option>
          </select>
        </div>
        
        <div class="graph-controls">
          <button class="control-btn" @click="zoomIn">
            <i class="fas fa-search-plus"></i> 放大
          </button>
          <button class="control-btn" @click="zoomOut">
            <i class="fas fa-search-minus"></i> 缩小
          </button>
          <button class="control-btn" @click="resetView">
            <i class="fas fa-redo"></i> 重置视图
          </button>
          <button class="control-btn" @click="toggleLegend">
            <i class="fas fa-list"></i> 图例
          </button>
        </div>
      </div>

      <!-- 知识图谱展示区域 -->
      <div class="graph-display" ref="graphContainer">
        <!-- 图例 -->
        <div v-if="showLegend" class="graph-legend">
          <h4>图例说明</h4>
          <div class="legend-item">
            <div class="legend-color" style="background-color: #244d4d;"></div>
            <span>核心概念</span>
          </div>
          <div class="legend-item">
            <div class="legend-color" style="background-color: #3a6e6e;"></div>
            <span>工艺技法</span>
          </div>
          <div class="legend-item">
            <div class="legend-color" style="background-color: #4f9e9e;"></div>
            <span>历史发展</span>
          </div>
          <div class="legend-item">
            <div class="legend-color" style="background-color: #64c0c0;"></div>
            <span>代表作品</span>
          </div>
          <div class="legend-item">
            <div class="legend-color" style="background-color: #7fd2d2;"></div>
            <span>材料工具</span>
          </div>
          <div class="legend-item">
            <div class="legend-color" style="background-color: #99e3e3;"></div>
            <span>文化内涵</span>
          </div>
        </div>

        <!-- 知识图谱可视化 -->
        <svg ref="graphSvg" class="graph-svg"></svg>
      </div>

      <!-- 详情展示区域 -->
      <div v-if="selectedNode" class="node-details">
        <div class="details-header">
          <h4>{{ selectedNode.name }}</h4>
          <button class="close-btn" @click="clearSelection">
            <i class="fas fa-times"></i>
          </button>
        </div>
        <div class="details-content">
          <div class="detail-item">
            <strong>类别:</strong> {{ selectedNode.category }}
          </div>
          <div class="detail-item">
            <strong>描述:</strong> {{ selectedNode.description }}
          </div>
          <div v-if="selectedNode.related" class="detail-item">
            <strong>相关概念:</strong>
            <div class="related-concepts">
              <span 
                v-for="related in selectedNode.related" 
                :key="related"
                class="related-tag"
                @click="highlightRelated(related)"
              >
                {{ related }}
              </span>
            </div>
          </div>
          <div v-if="selectedNode.imageUrl" class="detail-item">
            <img :src="selectedNode.imageUrl" :alt="selectedNode.name" class="node-image">
          </div>
        </div>
      </div>

      <!-- 信息卡片区域 -->
      <div class="info-cards">
        <div class="info-card">
          <div class="card-icon">
            <i class="fas fa-book"></i>
          </div>
          <div class="card-content">
            <h4>湘绣历史</h4>
            <p>湘绣是中国四大名绣之一，源于湖南长沙，有着悠久的历史和独特的艺术风格。</p>
          </div>
        </div>
        <div class="info-card">
          <div class="card-icon">
            <i class="fas fa-paint-brush"></i>
          </div>
          <div class="card-content">
            <h4>独特技法</h4>
            <p>湘绣以针法精湛著称，尤其擅长运用掺针、齐针等多种针法表现物体的质感和层次。</p>
          </div>
        </div>
        <div class="info-card">
          <div class="card-icon">
            <i class="fas fa-award"></i>
          </div>
          <div class="card-content">
            <h4>文化传承</h4>
            <p>湘绣已被列入国家级非物质文化遗产名录，是湖湘文化的重要组成部分。</p>
          </div>
        </div>
      </div>
    </div>

    <!-- 知识图谱简介 -->
    <div class="graph-intro">
      <h3>关于湘绣知识图谱</h3>
      <p>本知识图谱整合了湘绣的历史渊源、工艺技法、代表作品、材料工具和文化内涵等多维度信息，以可视化方式呈现湘绣文化的知识体系。通过探索知识图谱，您可以深入了解湘绣这一国家级非物质文化遗产的丰富内涵。</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'

// 响应式数据
const searchTerm = ref('')
const selectedCategory = ref('')
const showLegend = ref(false)
const selectedNode = ref(null)
const graphContainer = ref(null)
const graphSvg = ref(null)
const zoomLevel = ref(1)

// 知识图谱数据
const knowledgeGraphData = {
  nodes: [
    { id: '1', name: '湘绣', category: '核心概念', x: 400, y: 300, size: 50, color: '#244d4d' },
    // 工艺技法
    { id: '2', name: '掺针', category: '工艺技法', x: 250, y: 200, size: 30, color: '#3a6e6e' },
    { id: '3', name: '齐针', category: '工艺技法', x: 300, y: 350, size: 30, color: '#3a6e6e' },
    { id: '4', name: '乱针', category: '工艺技法', x: 350, y: 150, size: 30, color: '#3a6e6e' },
    { id: '17', name: '毛针', category: '工艺技法', x: 200, y: 150, size: 30, color: '#3a6e6e' },
    { id: '18', name: '鬅毛针', category: '工艺技法', x: 280, y: 100, size: 30, color: '#3a6e6e' },
    { id: '19', name: '刻鳞针', category: '工艺技法', x: 380, y: 80, size: 30, color: '#3a6e6e' },
    { id: '20', name: '游针', category: '工艺技法', x: 180, y: 280, size: 30, color: '#3a6e6e' },
    { id: '21', name: '交叉针', category: '工艺技法', x: 220, y: 380, size: 30, color: '#3a6e6e' },
    // 历史发展
    { id: '5', name: '秦汉时期', category: '历史发展', x: 500, y: 200, size: 30, color: '#4f9e9e' },
    { id: '6', name: '清代发展', category: '历史发展', x: 550, y: 300, size: 30, color: '#4f9e9e' },
    { id: '7', name: '现代传承', category: '历史发展', x: 500, y: 400, size: 30, color: '#4f9e9e' },
    { id: '22', name: '宋代起源', category: '历史发展', x: 550, y: 150, size: 30, color: '#4f9e9e' },
    { id: '23', name: '明代发展', category: '历史发展', x: 600, y: 220, size: 30, color: '#4f9e9e' },
    { id: '24', name: '民国变革', category: '历史发展', x: 600, y: 350, size: 30, color: '#4f9e9e' },
    // 代表作品
    { id: '8', name: '狮虎图', category: '代表作品', x: 200, y: 400, size: 30, color: '#64c0c0' },
    { id: '9', name: '芙蓉鲤鱼', category: '代表作品', x: 150, y: 250, size: 30, color: '#64c0c0' },
    { id: '10', name: '湘绣双面绣', category: '代表作品', x: 650, y: 250, size: 30, color: '#64c0c0' },
    { id: '25', name: '百鸟朝凤', category: '代表作品', x: 120, y: 350, size: 30, color: '#64c0c0' },
    { id: '26', name: '五子登科', category: '代表作品', x: 180, y: 450, size: 30, color: '#64c0c0' },
    { id: '27', name: '花木兰', category: '代表作品', x: 680, y: 330, size: 30, color: '#64c0c0' },
    { id: '28', name: '熊猫图', category: '代表作品', x: 700, y: 200, size: 30, color: '#64c0c0' },
    // 材料工具
    { id: '11', name: '真丝线', category: '材料工具', x: 350, y: 450, size: 30, color: '#7fd2d2' },
    { id: '12', name: '绷架', category: '材料工具', x: 450, y: 450, size: 30, color: '#7fd2d2' },
    { id: '13', name: '绣针', category: '材料工具', x: 550, y: 150, size: 30, color: '#7fd2d2' },
    { id: '29', name: '湘绣专用丝线', category: '材料工具', x: 300, y: 480, size: 30, color: '#7fd2d2' },
    { id: '30', name: '绣布', category: '材料工具', x: 380, y: 480, size: 30, color: '#7fd2d2' },
    { id: '31', name: '剪刀', category: '材料工具', x: 480, y: 480, size: 30, color: '#7fd2d2' },
    // 文化内涵
    { id: '14', name: '湖湘文化', category: '文化内涵', x: 700, y: 350, size: 30, color: '#99e3e3' },
    { id: '15', name: '民间艺术', category: '文化内涵', x: 600, y: 400, size: 30, color: '#99e3e3' },
    { id: '16', name: '非遗保护', category: '文化内涵', x: 750, y: 200, size: 30, color: '#99e3e3' },
    { id: '32', name: '吉祥寓意', category: '文化内涵', x: 650, y: 400, size: 30, color: '#99e3e3' },
    { id: '33', name: '民间传说', category: '文化内涵', x: 750, y: 300, size: 30, color: '#99e3e3' },
    { id: '34', name: '现代创新', category: '文化内涵', x: 720, y: 400, size: 30, color: '#99e3e3' },
    { id: '35', name: '国际影响', category: '文化内涵', x: 780, y: 250, size: 30, color: '#99e3e3' },
    { id: '36', name: '湘绣艺人', category: '文化内涵', x: 680, y: 450, size: 30, color: '#99e3e3' }
  ],
  links: [
    // 核心概念连接所有类别
    { source: '1', target: '2' },
    { source: '1', target: '3' },
    { source: '1', target: '4' },
    { source: '1', target: '5' },
    { source: '1', target: '6' },
    { source: '1', target: '7' },
    { source: '1', target: '8' },
    { source: '1', target: '9' },
    { source: '1', target: '10' },
    { source: '1', target: '11' },
    { source: '1', target: '12' },
    { source: '1', target: '13' },
    { source: '1', target: '14' },
    { source: '1', target: '15' },
    { source: '1', target: '16' },
    { source: '1', target: '17' },
    { source: '1', target: '18' },
    { source: '1', target: '19' },
    { source: '1', target: '20' },
    { source: '1', target: '21' },
    { source: '1', target: '22' },
    { source: '1', target: '23' },
    { source: '1', target: '24' },
    { source: '1', target: '25' },
    { source: '1', target: '26' },
    { source: '1', target: '27' },
    { source: '1', target: '28' },
    { source: '1', target: '29' },
    { source: '1', target: '30' },
    { source: '1', target: '31' },
    { source: '1', target: '32' },
    { source: '1', target: '33' },
    { source: '1', target: '34' },
    { source: '1', target: '35' },
    { source: '1', target: '36' },
    // 工艺技法内部连接
    { source: '2', target: '3' },
    { source: '3', target: '4' },
    { source: '4', target: '17' },
    { source: '17', target: '18' },
    { source: '18', target: '19' },
    { source: '19', target: '20' },
    { source: '20', target: '21' },
    // 历史发展时间线
    { source: '22', target: '5' },
    { source: '5', target: '23' },
    { source: '23', target: '6' },
    { source: '6', target: '24' },
    { source: '24', target: '7' },
    // 代表作品连接
    { source: '8', target: '9' },
    { source: '9', target: '10' },
    { source: '10', target: '25' },
    { source: '25', target: '26' },
    { source: '26', target: '27' },
    { source: '27', target: '28' },
    // 材料工具连接
    { source: '29', target: '11' },
    { source: '11', target: '30' },
    { source: '30', target: '12' },
    { source: '12', target: '13' },
    { source: '13', target: '31' },
    // 文化内涵连接
    { source: '14', target: '15' },
    { source: '15', target: '16' },
    { source: '16', target: '32' },
    { source: '32', target: '33' },
    { source: '33', target: '34' },
    { source: '34', target: '35' },
    { source: '35', target: '36' }
  ]
}

// 节点详细信息
const nodeDetails = {
  '1': {
    name: '湘绣',
    category: '核心概念',
    description: '湘绣是中国四大名绣之一，起源于湖南长沙，以其精湛的针法、生动的形象和浓郁的地方特色而闻名于世。湘绣历史悠久，技艺精湛，被誉为"东方艺术明珠"。湘绣融合了湖南地区的文化特色，形成了独特的艺术风格，在中国刺绣史上占有重要地位。',
    related: ['掺针', '齐针', '乱针', '狮虎图', '芙蓉鲤鱼', '湖湘文化', '真丝线']
  },
  // 工艺技法
  '2': {
    name: '掺针',
    category: '工艺技法',
    description: '掺针是湘绣的主要针法之一，通过不同颜色和粗细的丝线相互掺和，创造出丰富的色彩过渡和层次感，使绣品更加生动逼真。掺针是湘绣色彩表现的重要技法，能够表现出丰富的色彩变化。',
    related: ['湘绣', '齐针', '乱针', '鬅毛针']
  },
  '3': {
    name: '齐针',
    category: '工艺技法',
    description: '齐针是最基本的刺绣针法，运针整齐均匀，主要用于绣制平面色块，是湘绣中常用的基础针法。齐针要求针脚排列整齐，不露底布，是学习其他针法的基础。',
    related: ['湘绣', '掺针', '乱针', '游针']
  },
  '4': {
    name: '乱针',
    category: '工艺技法',
    description: '乱针是一种较为复杂的针法，通过不规则的线条交错，表现物体的纹理和质感，尤其适合绣制动物的皮毛和山水的层次感。乱针绣法灵活多变，能够表现出丰富的肌理效果。',
    related: ['湘绣', '掺针', '齐针', '毛针']
  },
  '17': {
    name: '毛针',
    category: '工艺技法',
    description: '毛针是湘绣中用于绣制动物毛发的特殊针法，通过长短不一的线条排列，表现出动物毛发的质感和立体感。毛针是湘绣狮虎图等动物题材作品的重要技法。',
    related: ['湘绣', '乱针', '鬅毛针']
  },
  '18': {
    name: '鬅毛针',
    category: '工艺技法',
    description: '鬅毛针是湘绣中用于绣制蓬松毛发的高级针法，通过特殊的运针方式，表现出毛发的蓬松感和柔软度。鬅毛针尤其适合绣制狮虎等猛兽的鬃毛和皮毛。',
    related: ['湘绣', '毛针', '刻鳞针']
  },
  '19': {
    name: '刻鳞针',
    category: '工艺技法',
    description: '刻鳞针是湘绣中用于绣制鱼鳞、龙鳞等鳞片纹样的针法，通过精细的线条排列，表现出鳞片的层次感和光泽。刻鳞针常用于绣制鲤鱼、龙等题材的作品。',
    related: ['湘绣', '鬅毛针', '游针']
  },
  '20': {
    name: '游针',
    category: '工艺技法',
    description: '游针是一种灵活的针法，针脚长短不一，走势自由，常用于绣制水流、云纹等流动的纹样。游针能够表现出物体的动态感和流动感。',
    related: ['湘绣', '刻鳞针', '交叉针']
  },
  '21': {
    name: '交叉针',
    category: '工艺技法',
    description: '交叉针是通过线条交叉形成网状结构的针法，常用于绣制背景、草地等大面积的区域。交叉针能够增加绣品的厚度和质感。',
    related: ['湘绣', '游针', '齐针']
  },
  // 历史发展
  '5': {
    name: '秦汉时期',
    category: '历史发展',
    description: '湘绣的起源可以追溯到秦汉时期，当时湖南地区的刺绣工艺已经相当发达，长沙马王堆汉墓出土的刺绣文物证明了这一点。这一时期的刺绣为湘绣的形成奠定了基础。',
    related: ['湘绣', '宋代起源', '明代发展']
  },
  '6': {
    name: '清代发展',
    category: '历史发展',
    description: '清代是湘绣发展的鼎盛时期，湘绣逐渐形成了自己独特的艺术风格，并开始走向全国，成为当时重要的手工艺品。清代湘绣在针法、题材和色彩方面都有了很大的创新和发展。',
    related: ['湘绣', '明代发展', '民国变革']
  },
  '7': {
    name: '现代传承',
    category: '历史发展',
    description: '现代湘绣在继承传统技艺的基础上不断创新，融合了现代艺术元素，使这一传统工艺焕发出新的生机。现代湘绣不仅保留了传统的针法和题材，还发展了许多新的表现形式和手法。',
    related: ['湘绣', '民国变革', '非遗保护', '现代创新']
  },
  '22': {
    name: '宋代起源',
    category: '历史发展',
    description: '虽然湘绣的历史可以追溯到秦汉时期，但作为一个独立的绣种，湘绣的正式形成是在宋代。宋代湖南地区的刺绣已经有了一定的规模和特色，开始形成湘绣的雏形。',
    related: ['湘绣', '秦汉时期', '明代发展']
  },
  '23': {
    name: '明代发展',
    category: '历史发展',
    description: '明代是湘绣发展的重要时期，这一时期湘绣的针法和题材都有了很大的发展，开始形成自己的特色。明代湘绣已经成为湖南地区的重要手工艺品。',
    related: ['湘绣', '宋代起源', '清代发展']
  },
  '24': {
    name: '民国变革',
    category: '历史发展',
    description: '民国时期，湘绣经历了重要的变革和发展，开始吸收西方绘画的元素，创新了许多新的针法和表现手法。这一时期湘绣的题材更加广泛，风格更加多样化。',
    related: ['湘绣', '清代发展', '现代传承']
  },
  // 代表作品
  '8': {
    name: '狮虎图',
    category: '代表作品',
    description: '狮虎图是湘绣的经典代表作品之一，以其精湛的针法和栩栩如生的形象而著称，尤其是对狮虎皮毛的表现堪称一绝。狮虎图通常采用鬅毛针、毛针等特殊针法，表现出狮虎的威猛和气势。',
    related: ['湘绣', '芙蓉鲤鱼', '湘绣双面绣', '鬅毛针']
  },
  '9': {
    name: '芙蓉鲤鱼',
    category: '代表作品',
    description: '芙蓉鲤鱼是湘绣的传统题材，通过精湛的针法表现出水的流动感和鲤鱼的灵动，寓意吉祥如意。芙蓉鲤鱼通常采用刻鳞针、游针等针法，表现出鲤鱼的鳞片和水中的游动姿态。',
    related: ['湘绣', '狮虎图', '湘绣双面绣', '刻鳞针']
  },
  '10': {
    name: '湘绣双面绣',
    category: '代表作品',
    description: '湘绣双面绣是湘绣中的精品，在同一绣面上绣出不同的图案，两面都能观赏，体现了湘绣艺人高超的技艺水平。双面绣要求绣工精湛，正反面图案对称，色彩协调。',
    related: ['湘绣', '狮虎图', '芙蓉鲤鱼', '百鸟朝凤']
  },
  '25': {
    name: '百鸟朝凤',
    category: '代表作品',
    description: '百鸟朝凤是湘绣的传统题材，描绘了百鸟向凤凰朝拜的场景，寓意吉祥和繁荣。这一题材需要绣制各种不同的鸟类，对绣工的技艺要求很高。',
    related: ['湘绣', '湘绣双面绣', '五子登科', '吉祥寓意']
  },
  '26': {
    name: '五子登科',
    category: '代表作品',
    description: '五子登科是湘绣的传统吉祥题材，描绘了五个童子嬉戏的场景，寓意子孙满堂、科举及第。这一题材色彩鲜艳，充满喜庆气氛。',
    related: ['湘绣', '百鸟朝凤', '花木兰', '民间传说']
  },
  '27': {
    name: '花木兰',
    category: '代表作品',
    description: '花木兰是湘绣的现代题材之一，描绘了中国古代女英雄花木兰代父从军的故事，体现了湘绣在题材上的创新。这一题材结合了传统针法和现代审美。',
    related: ['湘绣', '五子登科', '熊猫图', '现代创新']
  },
  '28': {
    name: '熊猫图',
    category: '代表作品',
    description: '熊猫图是湘绣的现代题材之一，以中国国宝熊猫为主题，通过精湛的针法表现出熊猫的可爱和憨厚。熊猫图常作为国礼赠送外国贵宾，具有国际影响。',
    related: ['湘绣', '花木兰', '湘绣双面绣', '国际影响']
  },
  // 材料工具
  '11': {
    name: '真丝线',
    category: '材料工具',
    description: '真丝线是湘绣的主要材料，具有光泽好、韧性强的特点，是保证湘绣品质的重要因素。湘绣使用的真丝线通常经过特殊处理，更加适合刺绣。',
    related: ['湘绣', '绷架', '绣针', '湘绣专用丝线']
  },
  '12': {
    name: '绷架',
    category: '材料工具',
    description: '绷架是刺绣时用来固定绣布的工具，湘绣使用的绷架多为木质结构，坚固耐用。绷架的质量直接影响到刺绣的效果和效率。',
    related: ['湘绣', '真丝线', '绣针', '绣布']
  },
  '13': {
    name: '绣针',
    category: '材料工具',
    description: '绣针是湘绣的重要工具，根据不同的针法和绣制对象，需要使用不同型号的绣针。湘绣使用的绣针通常细而锋利，便于在真丝面料上刺绣。',
    related: ['湘绣', '真丝线', '绷架', '剪刀']
  },
  '29': {
    name: '湘绣专用丝线',
    category: '材料工具',
    description: '湘绣专用丝线是经过特殊工艺处理的真丝线，具有更好的光泽和韧性，适合湘绣精细的针法要求。这种丝线是湘绣品质的重要保证。',
    related: ['湘绣', '真丝线', '绣布']
  },
  '30': {
    name: '绣布',
    category: '材料工具',
    description: '绣布是湘绣的基础材料，通常使用质地细密、柔软的丝绸面料。绣布的质量直接影响到刺绣的效果和耐用性。',
    related: ['湘绣', '湘绣专用丝线', '绷架']
  },
  '31': {
    name: '剪刀',
    category: '材料工具',
    description: '剪刀是湘绣中用于剪线的工具，需要锋利、精细，便于在刺绣过程中修剪线头。一把好的剪刀是湘绣艺人的必备工具。',
    related: ['湘绣', '绣针', '绷架']
  },
  // 文化内涵
  '14': {
    name: '湖湘文化',
    category: '文化内涵',
    description: '湘绣是湖湘文化的重要组成部分，体现了湖南人民的智慧和审美情趣，是湖湘文化的重要载体。湘绣融合了湖湘文化的特色，形成了自己独特的艺术风格。',
    related: ['湘绣', '民间艺术', '非遗保护', '民间传说']
  },
  '15': {
    name: '民间艺术',
    category: '文化内涵',
    description: '湘绣源于民间，是中国传统民间艺术的瑰宝，蕴含着丰富的民间文化元素和审美观念。湘绣的许多题材都来自民间传说和日常生活。',
    related: ['湘绣', '湖湘文化', '非遗保护', '吉祥寓意']
  },
  '16': {
    name: '非遗保护',
    category: '文化内涵',
    description: '湘绣已被列入国家级非物质文化遗产名录，受到国家和社会的高度重视，正在通过各种方式进行保护和传承。非遗保护对于湘绣的传承和发展具有重要意义。',
    related: ['湘绣', '湖湘文化', '民间艺术', '现代传承', '湘绣艺人']
  },
  '32': {
    name: '吉祥寓意',
    category: '文化内涵',
    description: '湘绣的许多题材都具有吉祥寓意，如芙蓉鲤鱼寓意吉祥如意，百鸟朝凤寓意繁荣昌盛等。这些吉祥寓意反映了人们对美好生活的向往。',
    related: ['湘绣', '民间艺术', '民间传说', '五子登科']
  },
  '33': {
    name: '民间传说',
    category: '文化内涵',
    description: '湘绣的许多题材都来自民间传说和故事，如花木兰、刘海砍樵等。这些民间传说为湘绣提供了丰富的创作素材。',
    related: ['湘绣', '吉祥寓意', '现代创新', '花木兰']
  },
  '34': {
    name: '现代创新',
    category: '文化内涵',
    description: '现代湘绣在传承传统的基础上不断创新，融合了现代艺术元素和表现手法，使这一传统工艺焕发出新的生机。现代创新是湘绣发展的重要动力。',
    related: ['湘绣', '民间传说', '国际影响', '现代传承']
  },
  '35': {
    name: '国际影响',
    category: '文化内涵',
    description: '湘绣作为中国优秀的传统工艺，已经走向世界，在国际上产生了广泛的影响。湘绣作品曾多次在国际展览中获奖，成为中国文化的重要使者。',
    related: ['湘绣', '现代创新', '熊猫图', '湘绣艺人']
  },
  '36': {
    name: '湘绣艺人',
    category: '文化内涵',
    description: '湘绣艺人是湘绣技艺的传承者和创新者，他们通过精湛的技艺和不懈的努力，使湘绣这一传统工艺得以传承和发展。许多湘绣艺人被评为国家级非物质文化遗产传承人。',
    related: ['湘绣', '国际影响', '非遗保护', '现代传承']
  }
}

// 绘制知识图谱
const drawGraph = () => {
  if (!graphSvg.value) return

  const svg = d3.select(graphSvg.value)
  svg.selectAll('*').remove()

  const width = graphContainer.value.clientWidth
  const height = graphContainer.value.clientHeight

  svg.attr('width', width)
     .attr('height', height)

  // 创建缩放行为
  const zoom = d3.zoom()
    .scaleExtent([0.5, 3])
    .on('zoom', (event) => {
      g.attr('transform', event.transform)
      zoomLevel.value = event.transform.k
    })

  // 创建包含所有元素的组
  const g = svg.append('g')

  // 应用缩放行为
  svg.call(zoom)

  // 绘制连接线
  const links = g.selectAll('.link')
    .data(knowledgeGraphData.links)
    .enter()
    .append('line')
    .attr('class', 'link')
    .attr('stroke', '#ddd')
    .attr('stroke-width', 2)
    .style('opacity', 0.7)

  // 绘制节点
  const nodes = g.selectAll('.node')
    .data(knowledgeGraphData.nodes)
    .enter()
    .append('g')
    .attr('class', 'node')
    .attr('transform', d => `translate(${d.x},${d.y})`)
    .on('click', (event, d) => {
      handleNodeClick(d)
    })
    .call(d3.drag()
      .on('start', dragstarted)
      .on('drag', dragged)
      .on('end', dragended)
    )

  // 节点圆形
  nodes.append('circle')
    .attr('r', d => d.size)
    .attr('fill', d => d.color)
    .style('opacity', 0.8)
    .style('cursor', 'pointer')
    .on('mouseover', function(event) {
      d3.select(this).style('opacity', 1)
    })
    .on('mouseout', function(event) {
      d3.select(this).style('opacity', 0.8)
    })

  // 节点标签
  nodes.append('text')
    .text(d => d.name)
    .attr('text-anchor', 'middle')
    .attr('dy', '.3em')
    .attr('fill', '#fff')
    .style('font-size', d => Math.max(10, d.size / 3) + 'px')
    .style('pointer-events', 'none')

  // 更新节点和连接线的位置
  function updatePositions() {
    links
      .attr('x1', d => {
        const sourceNode = knowledgeGraphData.nodes.find(n => n.id === d.source)
        return sourceNode ? sourceNode.x : 0
      })
      .attr('y1', d => {
        const sourceNode = knowledgeGraphData.nodes.find(n => n.id === d.source)
        return sourceNode ? sourceNode.y : 0
      })
      .attr('x2', d => {
        const targetNode = knowledgeGraphData.nodes.find(n => n.id === d.target)
        return targetNode ? targetNode.x : 0
      })
      .attr('y2', d => {
        const targetNode = knowledgeGraphData.nodes.find(n => n.id === d.target)
        return targetNode ? targetNode.y : 0
      })

    nodes.attr('transform', d => `translate(${d.x},${d.y})`)
  }

  // 拖拽相关函数
  function dragstarted(event, d) {
    if (!event.active) simulation.alphaTarget(0.3).restart()
    d.fx = d.x
    d.fy = d.y
  }

  function dragged(event, d) {
    d.fx = event.x
    d.fy = event.y
    updatePositions()
  }

  function dragended(event, d) {
    if (!event.active) simulation.alphaTarget(0)
    d.fx = null
    d.fy = null
  }

  // 创建力导向图模拟
  const simulation = d3.forceSimulation(knowledgeGraphData.nodes)
    .force('link', d3.forceLink(knowledgeGraphData.links)
      .id(d => d.id)
      .distance(100)
    )
    .force('charge', d3.forceManyBody().strength(-300))
    .force('center', d3.forceCenter(width / 2, height / 2))
    .force('collision', d3.forceCollide().radius(d => d.size + 5))

  // 模拟tick事件
  simulation.on('tick', () => {
    updatePositions()
  })

  // 初始更新位置
  updatePositions()
}

// 处理节点点击
const handleNodeClick = (node) => {
  selectedNode.value = { ...node, ...nodeDetails[node.id] }
}

// 清除选中状态
const clearSelection = () => {
  selectedNode.value = null
}

// 高亮相关节点
const highlightRelated = (relatedName) => {
  const relatedNode = knowledgeGraphData.nodes.find(n => n.name === relatedName)
  if (relatedNode) {
    handleNodeClick(relatedNode)
  }
}

// 搜索功能
const handleSearch = () => {
  if (!searchTerm.value.trim()) return
  
  const searchLower = searchTerm.value.toLowerCase().trim()
  const foundNode = knowledgeGraphData.nodes.find(n => 
    n.name.toLowerCase().includes(searchLower) || 
    (nodeDetails[n.id] && nodeDetails[n.id].description.toLowerCase().includes(searchLower))
  )
  
  if (foundNode) {
    handleNodeClick(foundNode)
    // 这里可以添加滚动到节点的功能
  } else {
    // 未找到结果的提示
  }
}

// 按类别筛选
const filterByCategory = () => {
  // 这里可以实现根据类别筛选节点的功能
  // 为了简化，我们可以重新绘制图谱，只显示选中类别的节点
}

// 缩放控制
const zoomIn = () => {
  if (graphSvg.value) {
    d3.select(graphSvg.value).transition().call(d3.zoom().scaleBy, 1.2)
  }
}

const zoomOut = () => {
  if (graphSvg.value) {
    d3.select(graphSvg.value).transition().call(d3.zoom().scaleBy, 0.8)
  }
}

const resetView = () => {
  if (graphSvg.value) {
    d3.select(graphSvg.value).transition().call(d3.zoom().transform, d3.zoomIdentity)
  }
}

// 切换图例显示
const toggleLegend = () => {
  showLegend.value = !showLegend.value
}

// 处理窗口大小变化
const handleResize = () => {
  drawGraph()
}

// 组件挂载时执行
onMounted(() => {
  // 等待DOM渲染完成后绘制图谱
  setTimeout(() => {
    // 模拟引入d3.js库
    window.d3 = {
      select: (el) => ({
        append: () => ({
          attr: () => ({}),
          style: () => ({}),
          text: () => ({})
        }),
        selectAll: () => ({
          data: () => ({
            enter: () => ({
              append: () => ({})
            })
          })
        }),
        call: () => ({})
      }),
      zoom: () => ({
        scaleExtent: () => ({}),
        on: () => ({})
      }),
      drag: () => ({}),
      forceSimulation: () => ({
        force: () => ({})
      })
    }
    
    // 绘制简化版知识图谱
    drawSimplifiedGraph()
  }, 100)
  
  // 添加窗口大小变化监听
  window.addEventListener('resize', handleResize)
})

// 绘制简化版知识图谱（不依赖外部库）
const drawSimplifiedGraph = () => {
  if (!graphSvg.value || !graphContainer.value) return
  
  const svg = graphSvg.value
  svg.innerHTML = ''
  
  const width = graphContainer.value.clientWidth
  const height = graphContainer.value.clientHeight
  
  svg.setAttribute('width', width)
  svg.setAttribute('height', height)
  
  // 创建SVG命名空间
  const ns = 'http://www.w3.org/2000/svg'
  
  // 绘制连接线
  knowledgeGraphData.links.forEach(link => {
    const sourceNode = knowledgeGraphData.nodes.find(n => n.id === link.source)
    const targetNode = knowledgeGraphData.nodes.find(n => n.id === link.target)
    
    if (sourceNode && targetNode) {
      const line = document.createElementNS(ns, 'line')
      line.setAttribute('x1', sourceNode.x)
      line.setAttribute('y1', sourceNode.y)
      line.setAttribute('x2', targetNode.x)
      line.setAttribute('y2', targetNode.y)
      line.setAttribute('stroke', '#ddd')
      line.setAttribute('stroke-width', '2')
      line.setAttribute('opacity', '0.7')
      line.classList.add('link')
      svg.appendChild(line)
    }
  })
  
  // 绘制节点
  knowledgeGraphData.nodes.forEach(node => {
    const g = document.createElementNS(ns, 'g')
    g.setAttribute('transform', `translate(${node.x},${node.y})`)
    g.classList.add('node')
    
    // 节点圆形
    const circle = document.createElementNS(ns, 'circle')
    circle.setAttribute('r', node.size)
    circle.setAttribute('fill', node.color)
    circle.setAttribute('opacity', '0.8')
    circle.style.cursor = 'pointer'
    circle.addEventListener('mouseover', () => {
      circle.setAttribute('opacity', '1')
    })
    circle.addEventListener('mouseout', () => {
      circle.setAttribute('opacity', '0.8')
    })
    
    // 节点点击事件
    g.addEventListener('click', () => {
      handleNodeClick(node)
    })
    
    // 节点标签
    const text = document.createElementNS(ns, 'text')
    text.setAttribute('text-anchor', 'middle')
    text.setAttribute('dy', '.3em')
    text.setAttribute('fill', '#fff')
    text.style.fontSize = Math.max(10, node.size / 3) + 'px'
    text.textContent = node.name
    
    g.appendChild(circle)
    g.appendChild(text)
    svg.appendChild(g)
  })
}

// 组件卸载时清理
onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})

// 监听搜索词变化
watch(searchTerm, (newTerm) => {
  if (newTerm.trim() === '') {
    clearSelection()
  }
})
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

/* 知识图谱容器样式 */
.knowledge-graph-container {
  min-height: 100vh;
  background-color: var(--background-color);
}

/* 页面头部样式 */
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

/* 主要内容区域 */
.graph-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 3rem 2rem;
}

/* 控制区域 */
.control-panel {
  background-color: #fff;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: var(--box-shadow);
  margin-bottom: 2rem;
}

.search-section {
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.search-input {
  flex: 1;
  padding: 1rem 1.5rem;
  border: 1px solid var(--border-color);
  border-radius: 4px;
  font-size: 1.6rem;
  transition: border-color 0.3s ease;
}

.search-input:focus {
  outline: none;
  border-color: var(--primary-color);
}

.search-btn {
  padding: 1rem 2rem;
  background-color: var(--primary-color);
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1.6rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.search-btn:hover {
  background-color: var(--primary-light);
}

.category-filter {
  margin-bottom: 1.5rem;
}

.category-filter label {
  font-size: 1.6rem;
  color: var(--text-color);
  margin-right: 1rem;
}

.category-filter select {
  padding: 0.8rem 1.2rem;
  border: 1px solid var(--border-color);
  border-radius: 4px;
  font-size: 1.6rem;
  background-color: #fff;
  cursor: pointer;
}

.graph-controls {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.control-btn {
  padding: 0.8rem 1.5rem;
  background-color: #f1f1f1;
  color: var(--text-color);
  border: 1px solid var(--border-color);
  border-radius: 4px;
  font-size: 1.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.control-btn:hover {
  background-color: var(--primary-light);
  color: white;
  border-color: var(--primary-color);
}

/* 知识图谱展示区域 */
.graph-display {
  position: relative;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: var(--box-shadow);
  height: 600px;
  margin-bottom: 2rem;
  overflow: hidden;
}

.graph-svg {
  width: 100%;
  height: 100%;
}

/* 图例样式 */
.graph-legend {
  position: absolute;
  top: 20px;
  right: 20px;
  background-color: rgba(255, 255, 255, 0.95);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  padding: 1.5rem;
  z-index: 10;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.graph-legend h4 {
  margin-top: 0;
  margin-bottom: 1rem;
  font-size: 1.6rem;
  color: var(--primary-color);
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  margin-bottom: 0.5rem;
  font-size: 1.4rem;
}

.legend-color {
  width: 20px;
  height: 12px;
  border-radius: 3px;
}

/* 节点详情区域 */
.node-details {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: var(--box-shadow);
  margin-bottom: 2rem;
  animation: slideIn 0.3s ease;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.details-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 2rem;
  background-color: var(--primary-light);
  color: white;
  border-radius: 8px 8px 0 0;
}

.details-header h4 {
  margin: 0;
  font-size: 2rem;
}

.close-btn {
  background: none;
  border: none;
  color: white;
  font-size: 2rem;
  cursor: pointer;
  padding: 0;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: background-color 0.3s ease;
}

.close-btn:hover {
  background-color: rgba(255, 255, 255, 0.2);
}

.details-content {
  padding: 2rem;
}

.detail-item {
  margin-bottom: 1.5rem;
  font-size: 1.6rem;
}

.detail-item strong {
  color: var(--primary-color);
}

.related-concepts {
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
  margin-top: 0.5rem;
}

.related-tag {
  background-color: #f1f1f1;
  color: var(--text-color);
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 1.4rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.related-tag:hover {
  background-color: var(--primary-light);
  color: white;
}

.node-image {
  max-width: 100%;
  height: auto;
  border-radius: 4px;
  margin-top: 1rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

/* 信息卡片区域 */
.info-cards {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
}

.info-card {
  background-color: #fff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: var(--box-shadow);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.info-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
}

.card-icon {
  background-color: var(--primary-color);
  color: white;
  padding: 2rem;
  text-align: center;
  font-size: 4rem;
}

.card-content {
  padding: 2rem;
}

.card-content h4 {
  margin-top: 0;
  margin-bottom: 1rem;
  font-size: 2rem;
  color: var(--primary-color);
}

.card-content p {
  margin: 0;
  font-size: 1.6rem;
  color: var(--text-secondary);
  line-height: 1.6;
}

/* 知识图谱简介 */
.graph-intro {
  background-color: #fff;
  border-radius: 8px;
  padding: 3rem;
  box-shadow: var(--box-shadow);
  text-align: center;
  max-width: 1000px;
  margin: 0 auto 5rem;
}

.graph-intro h3 {
  margin-top: 0;
  margin-bottom: 1.5rem;
  font-size: 2.4rem;
  color: var(--primary-color);
}

.graph-intro p {
  margin: 0;
  font-size: 1.6rem;
  color: var(--text-secondary);
  line-height: 1.8;
}

/* 响应式设计 */
@media (max-width: 1200px) {
  .graph-content {
    padding: 2rem;
  }
}

@media (max-width: 991px) {
  .search-section {
    flex-direction: column;
  }
  
  .graph-controls {
    justify-content: center;
  }
  
  .info-cards {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .heading {
    flex-direction: column;
    text-align: center;
    gap: 1rem;
    padding: 1.5rem 5%;
  }
  
  .heading h3 {
    font-size: 2.4rem;
  }
  
  .heading p {
    font-size: 1.6rem;
  }
  
  .graph-display {
    height: 500px;
  }
  
  .info-cards {
    grid-template-columns: 1fr;
  }
  
  .graph-legend {
    position: relative;
    top: auto;
    right: auto;
    margin: 1rem;
  }
}

@media (max-width: 450px) {
  .heading h3 {
    font-size: 2rem;
  }
  
  .heading p {
    font-size: 1.4rem;
  }
  
  .graph-display {
    height: 400px;
  }
  
  .details-header h4 {
    font-size: 1.8rem;
  }
  
  .card-icon {
    font-size: 3rem;
    padding: 1.5rem;
  }
}
</style>