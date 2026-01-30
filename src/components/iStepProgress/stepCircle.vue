<template>
  <circle 
    class="i-progress-circle-path" 
    :r="radius" 
    :cx="size / 2" 
    :cy="size / 2" 
    :stroke-width="strokeWidth" 
    opacity="1" 
    :style="computedStyle"
  >
    <title>{{ text }}</title>
  </circle>
</template>
<script setup>
import { computed } from 'vue'
const props = defineProps({
  radius: {
    type: Number,
    default: 50
  },
  size: {
    type: Number,
    default: 100
  },
  strokeWidth: {
    type: Number,
    default: 20
  },
  index: {
    type: Number,
    default: 0
  },
  stepLength: {
    type: Number,
    required: true
  },
  perimeter: {
    type: Number,
    required: true
  },
  total: {
    type: Number,
    required: true
  },
  currentIndex: {
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

const rotateDeg = computed(() => {
  return -90 + (360 / props.total ) * props.index
})

const strokeColor = computed(() => {
  const cmp = props.index - props.currentIndex
  if (cmp < 0) {
    return props.primaryColor ? props.primaryColor : `var(--el-color-success)`
  } else {
    return "var(--el-color-info-light-5)"
  }
})

const computedStyle = computed(() => ({
  "strokeDasharray": `${props.perimeter} ${props.perimeter}`,
  "transform": `rotate(${rotateDeg.value}deg)`,
  "transformOrigin": `${props.size / 2}px ${props.size / 2}px`,
  "transition": "stroke-dashoffset, stroke-dasharray, stroke, stroke-width 0.3s, opacity",
  "fillOpacity": 0,
  "strokeDashoffset": `${props.perimeter - props.stepLength}`,
  "stroke": `${strokeColor.value}`
}))

const text = computed(() => {
  return props.data?.title || ''
})
</script>
<style scoped>
.i-progress-circle-path {
  padding: 16px;
  
}
.i-progress-circle-path:hover {
  cursor: pointer;
  opacity: 0.8;
}
</style>