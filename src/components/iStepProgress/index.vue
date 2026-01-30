<template>
  <div class="i-step-progress">
    <div class="i-step-progress-circle" v-if="type === 'circle'" :style="{width: `${size}px`, height: `${size}px`}">
      <svg :style="{width: `${size}px`, height: `${size}px`, zIndex: 10}">
        <stepCircle
          v-for="(item, index) in stepList" 
          :radius="radius"
          :size="size"
          :stroke-width="strokeWidth"
          :index="index"
          :stepLength="stepLength"
          :perimeter="perimeter"
          :total="stepsNum"
          :currentIndex="currentIndex"
          :data="item"
          :primaryColor="color"
        />
      </svg>
      <div class="i-step-progress-circle-text">
        <slot name="text" :current="current">
          <span v-if="currentIndex < stepsNum ">{{ `${currentIndex}/${stepsNum}`}}</span>
          <span v-else>
            <el-icon :size="20" color="#67C23A">
              <Select />
            </el-icon>
          </span>
        </slot>
      </div>
    </div>
    <div class="i-progress-line" v-else="type === 'line'">
      <stepSquare 
        v-for="(item, index) in stepList"
        :style="{marginRight: `${gap}px`}"
        :width="width"
        :height="height"
        :index="index"
        :total="stepsNum"
        :currentIndex="currentIndex"
        :data="item"
        :primaryColor="color"
      />
      <div class="i-step-progress-square-text">
        <slot name="text" :current="current">
          <span v-if="currentIndex < stepsNum ">{{ `${currentIndex}/${stepsNum}`}}</span>
          <span v-else>
            <el-icon :size="16" color="#67C23A">
              <Select />
            </el-icon>
          </span>
        </slot>
      </div>
    </div>
  </div>
</template>
<script setup>
import { computed } from 'vue'
import stepCircle from './stepCircle.vue'
import stepSquare from './stepSquare.vue'
import { Select } from '@element-plus/icons-vue'

const props = defineProps({
  current: {
    type: [Number, Object],
    default: 0
  },
  steps: {
    type: [Array, Number],
    default: 1
  },
  type: {
    type: String,
    default: 'circle' // circle, line, dashboard
  },
  strokeWidth: {
    type: Number,
    default: 20
  },
  size: {
    type: Number,
    default: 100
  },
  gap: {
    type: Number,
    default: 4
  },
  stepKey: {
    type: String,
    default: 'id'
  },
  width: {
    type: Number,
    default: 10
  },
  height: {
    type: Number,
    default: 30
  },
  color: {
    default: 'var(--el-color-success)',
    type: String
  }
})
const radius = computed(() => props.size / 2 - props.strokeWidth / 2)
const perimeter = computed(() => 2 * Math.PI * radius.value)
const stepsNum = computed(() => {
  if (typeof props.steps === 'number') {
    return props.steps
  } else if (Array.isArray(props.steps)) {
    return props.steps.length
  }
  return 1
})
const stepList = computed(() => {
  if (Array.isArray(props.steps)) {
    return props.steps
  } else {
    return new Array(props.steps).fill(0)
  }
})
// compute each step's length 
const stepLength = computed(() => (perimeter.value - props.gap * stepsNum.value) / stepsNum.value)

const currentIndex = computed(() => {
  if(!props.current) {
    return stepsNum.value
  }
  if (typeof props.current === 'number') {
    return props.current
  } else if (typeof props.current === 'object') {
    const index = props.steps.findIndex(item => item[props.stepKey] === props.current[props.stepKey])
    return index
  }
  return stepsNum.value
})
</script>
<script>
export default {
  name: 'i-step-progress'
}
</script>
<style scoped>
.i-step-progress-circle {
  position: relative;
}
.i-step-progress-circle-text {
  position: absolute;
  top: 50%;
  left: 0;
  width: 100%;
  text-align: center;
  transform: translateY(-50%);
  font-size: 16px;
  font-weight: 600;
  z-index: 1;
}
.i-progress-line{
  display: flex;
  align-items: center;
}
.i-step-progress-square-text {
  margin-left: 4px;
  font-weight: 600
}
</style>