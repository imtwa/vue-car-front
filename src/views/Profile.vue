<template>
  <div class="profile">
    <h1>个人中心</h1>
    <el-card class="profile-card">
      <div class="user-info">
        <el-avatar :size="100" :src="userStore.userInfo.avatar" />
        <div class="info-details">
          <h2>{{ userStore.userInfo.username }}</h2>
          <!-- 可以添加更多用户信息 -->
        </div>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()
</script>

<style lang="scss" scoped>
.profile {
  padding: 20px;

  .profile-card {
    max-width: 800px;
    margin: 20px auto;
  }

  .user-info {
    display: flex;
    align-items: center;
    gap: 20px;
  }

  .info-details {
    h2 {
      margin: 0;
      color: #303133;
    }
  }
}
</style>
