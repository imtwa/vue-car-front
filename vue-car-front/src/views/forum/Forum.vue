<template>
  <div class="forum">
    <div class="forum-header">
      <h1>论坛交流</h1>
      <el-button type="primary" @click="router.push('/forum/post')" v-if="userStore.isLoggedIn">
        发布帖子
      </el-button>
    </div>

    <el-tabs v-model="activeTab">
      <el-tab-pane label="最新帖子" name="latest">
        <div class="post-list">
          <el-card v-for="post in posts" :key="post.id" class="post-card">
            <div class="post-header">
              <el-avatar :src="post.author.avatar" size="small" />
              <span class="author">{{ post.author.username }}</span>
              <span class="time">{{ post.createTime }}</span>
            </div>
            <h3 class="post-title">{{ post.title }}</h3>
            <p class="post-content">{{ post.content }}</p>
            <div class="post-footer">
              <span>
                <el-icon><ChatLineRound /></el-icon>
                {{ post.commentCount }}
              </span>
              <span>
                <el-icon><Star /></el-icon>
                {{ post.likeCount }}
              </span>
            </div>
          </el-card>
        </div>
      </el-tab-pane>
      <el-tab-pane label="热门帖子" name="hot">
        <!-- 热门帖子内容 -->
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { ChatLineRound, Star } from '@element-plus/icons-vue'

const router = useRouter()
const userStore = useUserStore()
const activeTab = ref('latest')

const posts = ref([
  {
    id: 1,
    title: '分享我的新车体验',
    content: '最近入手了一台新车，来分享一下使用体验...',
    author: {
      username: 'user1',
      avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'
    },
    createTime: '2024-03-15',
    commentCount: 10,
    likeCount: 25
  }
  // 可以添加更多帖子
])
</script>

<style lang="scss" scoped>
.forum {
  padding: 20px;

  .forum-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }

  .post-list {
    .post-card {
      margin-bottom: 20px;
    }

    .post-header {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-bottom: 10px;

      .author {
        font-weight: bold;
      }

      .time {
        color: #909399;
        font-size: 14px;
      }
    }

    .post-title {
      margin: 10px 0;
    }

    .post-content {
      color: #606266;
      margin-bottom: 10px;
    }

    .post-footer {
      display: flex;
      gap: 20px;
      color: #909399;

      span {
        display: flex;
        align-items: center;
        gap: 5px;
      }
    }
  }
}
</style>
