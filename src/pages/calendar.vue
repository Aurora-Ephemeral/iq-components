<template>
  <i-calendar 
    v-model="date"
    :isShowPoint="isShowPoint"
  />
</template>
<script setup>
import { ref } from 'vue'
import iCalendar from '@/components/iCalendar/index.vue'

const isShowPoint = (date) => {
  // 每个月15号标注
  if(date.endsWith("15")) {
    return true
  }
  return false
}
const date = ref(new Date())
</script>