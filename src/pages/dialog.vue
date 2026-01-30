<template>
  <div>
    <el-button type="primary" @click="dialogVisible = true">click me</el-button>
    <i-dialog
      v-model="dialogVisible"
      title="I am dialog!"
    >

    </i-dialog>
  </div>
  
</template>
<script setup>
import iDialog from '@/components/iDialog/index.vue'
import { ref } from 'vue'
const dialogVisible = ref(false)
</script>
<style lang="scss" scoped>

</style>