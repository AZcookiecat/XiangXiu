<script setup>
import { ref, onMounted, provide } from 'vue'
import { RouterView } from 'vue-router'
import Navbar from './components/common/Navbar.vue'
import Footer from './components/common/Footer.vue'
import FlashMessage from './components/common/FlashMessage.vue'

// 从main.js中获取store
import store from './main.js'

const showAlert = ref(false)
const alertMessage = ref('')
const alertType = ref('success') // 可以是 'success', 'error', 'info' 等

// 监听路由变化，显示提示信息
import { useRouter } from 'vue-router'
const router = useRouter()

// 模拟Flask的flash消息系统
const flash = (message, type = 'success') => {
  alertMessage.value = message
  alertType.value = type
  showAlert.value = true
  setTimeout(() => {
    showAlert.value = false
  }, 2000)
}

// 提供flash函数给所有子组件
provide('flash', flash)

// 提供store给所有子组件
provide('store', store)

// 从URL参数中提取消息
onMounted(() => {
  const urlParams = new URLSearchParams(window.location.search)
  const message = urlParams.get('message')
  if (message) {
    flash(decodeURIComponent(message))
  }
})
</script>

<template>
  <div class="app background-test">
    <Navbar />
    <div class="alert" v-if="showAlert">
      <FlashMessage :message="alertMessage" :type="alertType" />
    </div>
    <main>
      <RouterView />
    </main>
    <Footer />
  </div>
</template>

<style>
/* 全局CSS变量定义 - project项目设计风格 */
:root {
  /* 主色调 - 深青色系 */
  --primary-color: #244d4d;
  --primary-light: #3a6e6e;
  --primary-dark: #1a3636;
  --primary-lighter: rgba(36, 77, 77, 0.1);
  
  /* 辅助色 */
  --secondary-color: #333;
  --secondary-light: #666;
  
  /* 警告色 */
  --warning-color: #f39c12;
  
  /* 错误色 */
  --error-color: #e74c3c;
  
  /* 成功色 */
  --success-color: #27ae60;
  
  /* 信息色 */
  --info-color: #3498db;
  
  /* 背景色 */
  --background-color: #f9f9f9;
  --card-background: #fff;
  
  /* 文本颜色 */
  --text-primary: #333;
  --text-secondary: #666;
  --text-light: #999;
  
  /* 边框色 */
  --border-color: #e0e0e0;
  --border-light: #f0f0f0;
  
  /* 阴影 */
  --shadow-sm: 0 0.1rem 0.2rem rgba(0, 0, 0, 0.05);
  --shadow-md: 0 0.3rem 0.6rem rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 0.5rem 1.5rem rgba(0, 0, 0, 0.15);
  --shadow-xl: 0 1rem 3rem rgba(0, 0, 0, 0.2);
  
  /* 圆角 */
  --radius-sm: 0.3rem;
  --radius-md: 0.5rem;
  --radius-lg: 0.8rem;
  --radius-xl: 1rem;
  
  /* 间距 */
  --spacing-xs: 0.5rem;
  --spacing-sm: 1rem;
  --spacing-md: 1.5rem;
  --spacing-lg: 2rem;
  --spacing-xl: 3rem;
  --spacing-xxl: 5rem;
  
  /* 过渡动画 */
  --transition-fast: 0.2s ease;
  --transition-normal: 0.3s ease;
  --transition-slow: 0.5s ease;
}

/* 全局重置和基础样式 */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  font-size: 62.5%; /* 1rem = 10px */
  scroll-behavior: smooth;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: var(--background-color);
  color: var(--text-primary);
  line-height: 1.6;
}

/* 按钮基础样式 */
button {
  font-family: inherit;
  cursor: pointer;
  outline: none;
  border: none;
  transition: all var(--transition-normal);
}

/* 输入框基础样式 */
input, textarea {
  font-family: inherit;
  outline: none;
  transition: all var(--transition-normal);
}

/* 链接基础样式 */
a {
  text-decoration: none;
  color: inherit;
  transition: all var(--transition-normal);
}

/* 列表样式重置 */
ul, ol {
  list-style: none;
}

/* 图片样式 */
img {
  max-width: 100%;
  height: auto;
  display: block;
}

/* 选择文本样式 */
::selection {
  background-color: var(--primary-light);
  color: #fff;
}

/* 滚动条样式 */
::-webkit-scrollbar {
  width: 0.8rem;
}

::-webkit-scrollbar-track {
  background: var(--border-light);
}

::-webkit-scrollbar-thumb {
  background: var(--primary-light);
  border-radius: var(--radius-md);
}

::-webkit-scrollbar-thumb:hover {
  background: var(--primary-color);
}

/* 打印样式 */
@media print {
  .no-print {
    display: none !important;
  }
}
</style>

<style scoped>
.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

main {
  flex: 1;
  min-height: 80vh;
  padding: 2rem 0;
}

.alert {
  position: fixed;
  top: 100px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1000;
  width: 90%;
  max-width: 600px;
}
</style>
