// 初始化用户数据
export const initUsers = () => {
  // 检查localStorage中是否已有用户数据
  let existingUsers = JSON.parse(localStorage.getItem('users') || '[]')
  
  // 预定义的用户列表
  const predefinedUsers = [
    {
      id: 1,
      username: 'admin',
      email: 'admin@qq.com',
      password: 'admin',
      isAdmin: true,
      createdAt: new Date().toISOString()
    },
    {
      id: 2,
      username: '向烁安',
      email: '18821959907@163.com',
      password: 'xsa003X',
      isAdmin: true,
      createdAt: new Date().toISOString()
    },
    {
      id: 3,
      username: '朱理婧',
      email: '18707320519@qq.com',
      password: 'zlj3065',
      isAdmin: true,
      createdAt: new Date().toISOString()
    },
    {
      id: 4,
      username: '向婷',
      email: '19313025728@qq.com',
      password: 'xt008X',
      isAdmin: false,
      createdAt: new Date().toISOString()
    },
    {
      id: 5,
      username: '宋雨昕',
      email: '17369302819@qq.com',
      password: 'syx0024',
      isAdmin: false,
      createdAt: new Date().toISOString()
    },
    {
      id: 6,
      username: '伍俊辉',
      email: '18373829281@qq.com',
      password: 'wjh0130',
      isAdmin: false,
      createdAt: new Date().toISOString()
    },
    {
      id: 7,
      username: '张志阳',
      email: '18166232505@qq.com',
      password: 'zzy0315',
      isAdmin: false,
      createdAt: new Date().toISOString()
    },
    {
      id: 8,
      username: '李神洲',
      email: '19313179395@qq.com',
      password: 'lsz0278',
      isAdmin: false,
      createdAt: new Date().toISOString()
    }
  ]
  
  // 将预定义用户添加到现有用户列表中（如果不存在）
  predefinedUsers.forEach(user => {
    if (!existingUsers.some(existingUser => existingUser.id === user.id || 
                                        existingUser.username === user.username || 
                                        existingUser.email === user.email)) {
      existingUsers.push(user)
    }
  })
  
  // 保存更新后的用户列表
  localStorage.setItem('users', JSON.stringify(existingUsers))
  
  return existingUsers
}

export default initUsers