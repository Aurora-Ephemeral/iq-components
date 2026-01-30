<template>
  <i-step-progress 
    :current="current"
    :steps="stepList"
    :size="100"
    stepKey="id"
  >
  </i-step-progress>
  <div style="margin-top: 20px;"></div>
  <i-step-progress 
    :current="current"
    :steps="stepList"
    :size="100"
    stepKey="id"
    type="line"
  />
</template>
<script setup>
import IStepProgress from '@/components/iStepProgress/index.vue'

const stepList = [
  {
    id: 1,
    title: '步骤1',
  },
  {
    id: 2,
    title: '步骤2',
  },
  {
    id: 3,
    title: '步骤3',
  },
  {
    id: 4,
    title: '步骤4',
  },
  {
    id: 5,
    title: '步骤5',
  },
  {
    id:6,
    title: '步骤6',
  },
  {
    id: 7,
    title: '步骤7',
  },
  {
    id: 8,
    title: '步骤8',
  },
  {
    id: 9,
    title: '步骤9',
  }
]
const current = null
</script>
<style scoped>

</style>