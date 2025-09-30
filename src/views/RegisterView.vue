<template>
  <div class="register-container">
    <section class="heading">
      <h3>用户注册</h3>
      <p> <router-link to="/">首页</router-link> / <span>注册</span> </p>
    </section>

    <div class="register-form-container">
      <form @submit.prevent="register">
        <div class="form-group">
          <label for="username">用户名</label>
          <input type="text" id="username" v-model="formData.username" placeholder="请输入用户名" required>
          <div v-if="errors.username" class="error-message">{{ errors.username }}</div>
        </div>
        
        <div class="form-group">
          <label for="email">邮箱</label>
          <input type="email" id="email" v-model="formData.email" placeholder="请输入邮箱" required>
          <div v-if="errors.email" class="error-message">{{ errors.email }}</div>
        </div>
        
        <div class="form-group">
          <label for="password">密码</label>
          <input type="password" id="password" v-model="formData.password" placeholder="请输入密码" required>
          <div v-if="errors.password" class="error-message">{{ errors.password }}</div>
        </div>
        
        <div class="form-group">
          <label for="confirmPassword">确认密码</label>
          <input type="password" id="confirmPassword" v-model="formData.confirmPassword" placeholder="请再次输入密码" required>
          <div v-if="errors.confirmPassword" class="error-message">{{ errors.confirmPassword }}</div>
        </div>
        
        <div class="form-group">
          <button type="submit" class="register-btn" :disabled="isSubmitting">注册</button>
        </div>
        
        <div class="login-link">
          <p>已有账号？<router-link to="/login">立即登录</router-link></p>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, inject } from 'vue'
import { useRouter } from 'vue-router'

const flash = inject('flash')
const store = inject('store')
const router = useRouter()

// 状态管理
const formData = ref({
  username: '',
  email: '',
  password: '',
  confirmPassword: ''
})

const errors = ref({})
const isSubmitting = ref(false)

// 方法
const validateForm = () => {
  const newErrors = {}
  
  // 用户名验证
  if (!formData.value.username.trim()) {
    newErrors.username = '用户名不能为空'
  } else if (formData.value.username.length < 3) {
    newErrors.username = '用户名至少3个字符'
  }
  
  // 邮箱验证
  if (!formData.value.email.trim()) {
    newErrors.email = '邮箱不能为空'
  } else if (!/\S+@\S+\.\S+/.test(formData.value.email)) {
    newErrors.email = '请输入有效的邮箱地址'
  }
  
  // 密码验证
  if (!formData.value.password) {
    newErrors.password = '密码不能为空'
  } else if (formData.value.password.length < 6) {
    newErrors.password = '密码至少6个字符'
  }
  
  // 确认密码验证
  if (!formData.value.confirmPassword) {
    newErrors.confirmPassword = '请确认密码'
  } else if (formData.value.confirmPassword !== formData.value.password) {
    newErrors.confirmPassword = '两次输入的密码不一致'
  }
  
  errors.value = newErrors
  return Object.keys(newErrors).length === 0
}

const register = async () => {
  if (!validateForm()) {
    return
  }
  
  isSubmitting.value = true
  
  try {
    // 在实际应用中，这里会调用API进行注册
    // 由于没有后端，我们使用模拟数据和localStorage
    const existingUsers = JSON.parse(localStorage.getItem('users') || '[]')
    
    // 检查用户名或邮箱是否已存在
    if (existingUsers.some(user => user.username === formData.value.username)) {
      errors.value.username = '用户名已存在'
      return
    }
    
    if (existingUsers.some(user => user.email === formData.value.email)) {
      errors.value.email = '邮箱已被注册'
      return
    }
    
    // 创建新用户
    const newUser = {
      id: Date.now(),
      username: formData.value.username,
      email: formData.value.email,
      password: formData.value.password, // 在实际应用中应该加密存储
      createdAt: new Date().toISOString()
    }
    
    // 保存用户数据
    existingUsers.push(newUser)
    localStorage.setItem('users', JSON.stringify(existingUsers))
    
    // 自动登录新用户
    store.setUser(newUser)
    
    flash('注册成功!')
    
    // 跳转到首页或用户中心
    router.push('/')
  } catch (error) {
    flash('注册失败，请稍后重试!', 'error')
    console.error('注册失败:', error)
  } finally {
    isSubmitting.value = false
  }
}
</script>

<style scoped>
.register-container {
  padding: 2rem;
  max-width: 800px;
  margin: 0 auto;
  margin-top: 100px; /* 为固定的导航栏留出空间 */
}

.heading {
  text-align: center;
  margin-bottom: 3rem;
}

.heading h3 {
  font-size: 2.5rem;
  color: var(--primary-color, #244d4d);
  margin-bottom: 1rem;
  font-weight: 600;
}

.heading p {
  font-size: 1.2rem;
  color: #666;
}

.heading p a {
  color: var(--primary-color, #244d4d);
  text-decoration: none;
  transition: color 0.3s ease;
}

.heading p a:hover {
  color: var(--primary-dark, #1a3737);
  text-decoration: underline;
}

.register-form-container {
  background-color: #fff;
  padding: 2.5rem;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.register-form-container:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.12);
}

.register-form-container form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-group label {
  font-size: 1.1rem;
  color: #333;
  font-weight: 600;
}

.form-group input {
  padding: 1rem 1.2rem;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 1rem;
  outline: none;
  transition: all 0.3s ease;
  background-color: #fafafa;
}

.form-group input:focus {
  border-color: var(--primary-color, #244d4d);
  background-color: #fff;
  box-shadow: 0 0 0 3px rgba(36, 77, 77, 0.1);
}

.form-group input::placeholder {
  color: #999;
}

.error-message {
  color: #e74c3c;
  font-size: 0.9rem;
  margin-top: 0.25rem;
}

.register-btn {
  background-color: var(--primary-color, #244d4d);
  color: white;
  border: none;
  padding: 1rem 1.5rem;
  font-size: 1.2rem;
  font-weight: 600;
  cursor: pointer;
  border-radius: 8px;
  transition: all 0.3s ease;
  margin-top: 1rem;
  position: relative;
  overflow: hidden;
}

.register-btn:hover:not(:disabled) {
  background-color: var(--primary-dark, #1a3737);
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(36, 77, 77, 0.3);
}

.register-btn:disabled {
  background-color: #ccc;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

/* 按钮悬停效果增强 */
.register-btn::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  transform: translate(-50%, -50%);
  transition: width 0.6s ease, height 0.6s ease;
}

.register-btn:hover::before {
  width: 300px;
  height: 300px;
}

.login-link {
  text-align: center;
  margin-top: 2rem;
}

.login-link p {
  color: #666;
  font-size: 1rem;
}

.login-link a {
  color: var(--primary-color, #244d4d);
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
}

.login-link a:hover {
  color: var(--primary-dark, #1a3737);
  text-decoration: underline;
}

/* 响应式设计 */
@media (max-width: 1200px) {
  .register-container {
    max-width: 700px;
  }
}

@media (max-width: 991px) {
  .register-container {
    max-width: 600px;
  }
  
  .heading h3 {
    font-size: 2.2rem;
  }
}

@media (max-width: 768px) {
  .register-container {
    padding: 1.5rem;
    margin-top: 80px;
  }
  
  .heading {
    margin-bottom: 2rem;
  }
  
  .heading h3 {
    font-size: 2rem;
  }
  
  .register-form-container {
    padding: 2rem;
  }
  
  .form-group input {
    padding: 0.9rem 1rem;
  }
  
  .register-btn {
    padding: 0.9rem 1.2rem;
    font-size: 1.1rem;
  }
}

@media (max-width: 450px) {
  .register-container {
    padding: 1rem;
  }
  
  .heading h3 {
    font-size: 1.8rem;
  }
  
  .register-form-container {
    padding: 1.5rem;
  }
  
  .form-group input {
    padding: 0.8rem;
  }
  
  .register-btn {
    padding: 0.8rem;
    font-size: 1rem;
  }
}
</style>