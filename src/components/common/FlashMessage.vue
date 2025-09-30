<template>
  <div :class="['flash-message', type]">
    {{ message }}
  </div>
</template>

<script setup>
const props = defineProps({
  message: {
    type: String,
    required: true
  },
  type: {
    type: String,
    default: 'success',
    validator: (value) => ['success', 'error', 'info', 'warning'].includes(value)
  }
})
</script>

<style scoped>
/* 提示框样式 - 符合project项目设计 */
.flash-message {
  position: fixed;
  top: 80px;
  right: -30px;
  transform: none;
  background-color: var(--error-color);
  color: #fff;
  padding: 1.2rem 2rem;
  border-radius: 0.5rem;
  z-index: 1000;
  box-shadow: 0 0.5rem 1rem rgba(0,0,0,0.1);
  animation: fadeIn 0.3s ease-out;
  display: flex;
  align-items: center;
  gap: 1rem;
  max-width: 90%;
  width: auto;
  max-width: 400px;
}

/* 不同类型的提示框样式 */
.flash-message.success {
  background-color: #4caf50;
}

.flash-message.error {
  background-color: var(--error-color);
}

.flash-message.info {
  background-color: var(--primary-color);
}

.flash-message.warning {
  background-color: var(--warning-color);
  color: var(--primary-color);
}

/* 动画效果 */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translate(20px, -20px);
  }
  to {
    opacity: 1;
    transform: translate(0, 0);
  }
}

/* 响应式设计 */
@media (max-width: 768px) {
  .flash-message {
    padding: 1rem 2rem;
    font-size: 1.4rem;
  }
}
</style>