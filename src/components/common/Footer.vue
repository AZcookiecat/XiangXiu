<template>
  <footer class="footer">
    <div class="box-container">
      <div class="box">
        <h3>快速链接</h3>
        <router-link to="/"> <i class="fas fa-arrow-right"></i> 首页home</router-link>
        <router-link to="/shop"> <i class="fas fa-arrow-right"></i> 商城shop</router-link>
        <router-link to="/cart"> <i class="fas fa-arrow-right"></i> 购物车cart</router-link>
        <router-link to="peripheral"> <i class="fas fa-arrow-right"></i> 周边periphery</router-link>
        <router-link to="/team"> <i class="fas fa-arrow-right"></i> 团队team</router-link>
        <router-link to="/blog"> <i class="fas fa-arrow-right"></i> 博客blog</router-link>
        <a href="https://map.baidu.com/poi//@12570968.17,3257050.89,11.19z?info_merge=1&ugc_type=3&ugc_ver=1&querytype=detailConInfo&searchseo=1&uid=8762a323fa3e511cae080f4f" target="_blank">
          <i class="fas fa-arrow-right"></i> 联系contact
        </a>
      </div>

      <div class="box">
        <h3>浏览链接</h3>
        <router-link to="/register"> <i class="fas fa-arrow-right"></i> 注册register</router-link>
        <router-link to="/venue-exhibition"> <i class="fas fa-arrow-right"></i> 场馆showroom</router-link>
        <router-link to="/exhibition"> <i class="fas fa-arrow-right"></i> 作品works</router-link>
        <router-link to="/collect"> <i class="fas fa-arrow-right"></i> 收藏collect</router-link>
      </div>

      <div class="box">
        <h3>联系我们</h3>
        <a href="https://map.baidu.com/poi//@12570968.17,3257050.89,11.19z?info_merge=1&ugc_type=3&ugc_ver=1&querytype=detailConInfo&searchseo=1&uid=8762a323fa3e511cae080f4f" target="_blank">
          <i class="fas fa-map-marker-alt"></i>一键查询地址：湖南省长沙市岳麓区岳麓大道湖南工商大学
        </a>
        <a href="mailto:1279047270@qq.com"> <i class="fas fa-envelope"></i>1279047270@qq.com</a>
        <a href="tel:18073427351"> <i class="fas fa-phone"></i>18073427351</a>
      </div>
    </div>
  </footer>

  <section class="credit">
    ©2025 &nbsp; 版权所有 &nbsp;&nbsp;&nbsp; 湖南工商大学 &nbsp; 元生湘缘团队
  </section>
</template>

<script setup>
import { inject, computed } from 'vue'

// 从App.vue中获取store和flash
const store = inject('store')
const flash = inject('flash')

// 检查用户是否登录的计算属性
const isLoggedIn = computed(() => {
  return store.isAuthenticated()
})

// 处理个人中心点击事件
const handleUserCenterClick = (event) => {
  event.preventDefault()
  if (!isLoggedIn.value) {
    flash('请先登录！', 'warning')
    // 这里可以调用导航栏的登录面板显示功能
    // 由于Footer组件无法直接访问Navbar组件的方法
    // 可以通过store或其他方式通知Navbar显示登录面板
    // 或者简单地导航到登录页面
    window.location.href = '/login'
  } else {
    window.location.href = '/user-center'
  }
}
</script>

<style scoped>
/* 页脚样式 - 符合project项目设计 */
.footer {
  background-color: #fff;
  padding: 4rem 9%;
  color: var(--primary-color);
  border-top: 0.1rem solid rgba(0,0,0,0.1);
}

/* 页脚容器布局 */
.box-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(25rem, 1fr));
  gap: 2rem;
}

/* 页脚内容块样式 */
.box {
  padding: 1rem 0;
}

/* 页脚标题样式 */
.box h3 {
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
  color: var(--primary-color);
  border-bottom: 0.2rem solid var(--primary-color);
  padding-bottom: 0.8rem;
  display: inline-block;
  font-weight: 600;
}

/* 页脚链接样式 */
.box a {
  display: block;
  padding: 0.8rem 0;
  color: var(--secondary-color);
  text-decoration: none;
  transition: color 0.3s ease, transform 0.3s ease;
  font-size: 1.5rem;
}

.box a:hover {
  color: var(--primary-color);
  transform: translateX(0.5rem);
}

.box a i {
  margin-right: 0.8rem;
  color: var(--primary-color);
}

/* 版权信息样式 */
.credit {
  background-color: var(--primary-color);
  color: #fff;
  text-align: center;
  padding: 1.5rem;
  font-size: 1.4rem;
  margin-top: 2rem;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .footer {
    padding: 2rem 5%;
  }
  
  .box-container {
    grid-template-columns: 1fr;
  }
  
  .box h3 {
    font-size: 1.6rem;
  }
  
  .box a {
    font-size: 1.4rem;
  }
  
  .credit {
    font-size: 1.2rem;
    padding: 1rem;
  }
}

@media (max-width: 450px) {
  .box a {
    font-size: 1.3rem;
    padding: 0.7rem 0;
  }
}
</style>