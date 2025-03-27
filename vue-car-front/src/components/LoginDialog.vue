<template>
  <el-dialog v-model="dialogVisible" title="登录" width="400px" :close-on-click-modal="false">
    <el-form
      ref="formRef"
      :model="form"
      :rules="rules"
      label-width="80px"
      @submit.prevent="handleSubmit"
    >
      <el-form-item label="用户名" prop="username">
        <el-input v-model="form.username" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="form.password" type="password" show-password />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleSubmit" :loading="loading">登录</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import { useUserStore } from '@/stores/user'
import { ElMessage } from 'element-plus'

const props = defineProps({
  modelValue: Boolean
})

const emit = defineEmits(['update:modelValue', 'login-success'])

const userStore = useUserStore()
const loading = ref(false)
const formRef = ref(null)

const dialogVisible = computed({
  get: () => props.modelValue,
  set: value => emit('update:modelValue', value)
})

const form = reactive({
  username: '',
  password: ''
})

const rules = {
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
}

const handleSubmit = async () => {
  if (!formRef.value) return

  await formRef.value.validate(async valid => {
    if (valid) {
      loading.value = true
      try {
        const success = await userStore.login(form.username, form.password)
        if (success) {
          ElMessage.success('登录成功')
          dialogVisible.value = false
          emit('login-success')
        } else {
          ElMessage.error('登录失败')
        }
      } finally {
        loading.value = false
      }
    }
  })
}
</script>
