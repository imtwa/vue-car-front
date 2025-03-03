<template>
  <div class="forum-post">
    <h1>发布帖子</h1>
    <el-form :model="form" label-width="80px">
      <el-form-item label="标题">
        <el-input v-model="form.title" placeholder="请输入标题" />
      </el-form-item>
      <el-form-item label="内容">
        <el-input v-model="form.content" type="textarea" rows="6" placeholder="请输入内容" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitPost">发布</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { ElMessage } from 'element-plus'

const form = reactive({
  title: '',
  content: ''
})

const submitPost = () => {
  // TODO: 实现发帖逻辑
  ElMessage.success('发布成功！')
}
</script>

<style lang="scss" scoped>
.forum-post {
  max-width: 800px;
  margin: 20px auto;
  padding: 20px;

  h1 {
    margin-bottom: 20px;
  }
}
</style>
