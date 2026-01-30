<template>
  <div class="i-step-square" :style="computedStyle" :title="text">
  </div>
</template>
<script setup>
import { computed } from 'vue'
const props = defineProps({
  width: {
    type: Number,
    default: 10
  },
  height: {
    type: Number,
    default: 10
  },
  currentIndex: {
    type: Number,
    required: true
  },
  total: {
    type: Number,
    required: true
  },
  index: {
    type: Number,
    required: true
  },
  data: {
    type: Object,
    default: () => ({})
  },
  primaryColor: {
    type: String
  }
})

const computedColor = computed(() => {
  const cmp = props.index - props.currentIndex
  if (cmp < 0) {
    return props.primaryColor ? props.primaryColor : `var(--el-color-success)`
  } else {
    return "var(--el-color-info-light-5)"
  }
})

const computedStyle = computed(() => {
  return {
    width: `${props.width}px`,
    height: `${props.height}px`,
    backgroundColor: `${computedColor.value}`
  }
})

const text = computed(() => {
  return props.data?.title || ''
})
</script>
<style scoped>
.i-step-square:hover {
  cursor: pointer;
}
</style>