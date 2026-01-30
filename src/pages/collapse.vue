<template>
  <div>
    <i-collapse
    >
      <template #title>
        自定义标题
        <el-button>查看</el-button>
      </template>
      这是内容
    </i-collapse>
  </div>
</template>
<script setup>
import iCollapse from '@/components/iCollapse/index.vue'
</script>