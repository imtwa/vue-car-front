<template>
  <div class="home">
    <div class="home-content">
      <div class="hero-section">
        <h1>欢迎来到3D汽车展示平台</h1>
        <p class="subtitle">体验前所未有的虚拟汽车展示体验</p>
      </div>

      <div class="features">
        <el-row :gutter="40">
          <el-col :span="8">
            <div class="feature-card">
              <el-icon :size="50" color="#409EFF"><View /></el-icon>
              <h3>3D展示</h3>
              <p>
                通过先进的3D技术，360°全方位展示各类汽车型号，让您足不出户即可感受真实车型的每个细节。
              </p>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="feature-card">
              <el-icon :size="50" color="#409EFF"><Camera /></el-icon>
              <h3>AR体验</h3>
              <p>创新的增强现实技术，让您能够在真实环境中预览汽车效果，带来身临其境的互动体验。</p>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="feature-card">
              <el-icon :size="50" color="#409EFF"><ChatDotRound /></el-icon>
              <h3>社区交流</h3>
              <p>加入我们的汽车爱好者社区，分享您的用车体验，获取最新的汽车资讯和专业建议。</p>
            </div>
          </el-col>
        </el-row>
      </div>

      <div class="cta-section">
        <h2>开启您的虚拟汽车之旅</h2>
        <p>立即体验我们的创新功能，探索心仪的车型</p>
        <div class="cta-buttons">
          <el-button type="primary" size="large" @click="router.push('/brands')">
            浏览车型
          </el-button>
          <el-button size="large" @click="router.push('/ar')"> AR体验 </el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { View, Camera, ChatDotRound } from '@element-plus/icons-vue'

const router = useRouter()
</script>

<style lang="scss" scoped>
.home {
  min-height: 100vh;
  margin: 0 auto;
  background-image: url('@/assets/images/car-bg.jpg');
  background-size: cover;
  background-position: center;
  .home-content {
    text-align: center;

    .hero-section {
      padding: 60px 20px;
      position: relative;

      &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.5);
        z-index: 1;
      }

      h1 {
        position: relative;
        z-index: 2;
        font-size: 2.5rem;
        color: #ffffff;
        margin-bottom: 20px;
        text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
      }

      .subtitle {
        position: relative;
        z-index: 2;
        font-size: 1.2rem;
        color: #e0e0e0;
        margin-bottom: 30px;
      }
    }

    .features {
      margin-bottom: 60px;
      position: relative;
      z-index: 2;
      // background: rgba(255, 255, 255, 0.5);
      padding: 40px 60px;

      .feature-card {
        padding: 30px;
        text-align: center;
        background: rgba(255, 255, 255, 0.7);
        border-radius: 8px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
        transition: transform 0.3s;

        &:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.2);
        }

        h3 {
          margin: 20px 0;
          color: #303133;
        }

        p {
          color: #606266;
          line-height: 1.6;
        }

        .el-icon {
          color: #00d1b2;
        }
      }
    }

    .cta-section {
      padding: 60px 20px;
      position: relative;

      &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.6);
        z-index: 1;
      }

      h2 {
        position: relative;
        z-index: 2;
        font-size: 2rem;
        color: #ffffff;
        margin-bottom: 20px;
        text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
      }

      p {
        position: relative;
        z-index: 2;
        color: #e0e0e0;
        margin-bottom: 30px;
      }

      .cta-buttons {
        position: relative;
        z-index: 2;
        display: flex;
        gap: 20px;
        justify-content: center;

        .el-button {
          padding: 15px 30px;
          &.el-button--primary {
            background: #00d1b2;
            border-color: #00d1b2;
            &:hover {
              background: #00bfa5;
              border-color: #00bfa5;
            }
          }
        }
      }
    }
  }
}
</style>
