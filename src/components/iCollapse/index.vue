<template>
  <div class="i-collapse" ref="elRef">
    <div class="i-collapse__title">
      <div class="left">
        <slot name="title">
          {{ title }}
        </slot>
      </div>
      <div v-if="showCollapse" class="right">
        <el-icon class="i-collapse__icon">
          <ArrowUp v-if="collapse" @click="handleExpand" />
          <ArrowDown v-else @click="handleCollapse" />
        </el-icon>
      </div>
    </div>
    <div class="i-collapse__content">
      <slot />
    </div>
  </div>
</template>
<script>
export default {
  name: 'i-collapse'
}
</script>
<script setup>
import { ArrowDown, ArrowUp } from '@element-plus/icons-vue'
import { getCurrentInstance, ref, watch, onMounted } from 'vue';
import { ElIcon } from 'element-plus'

const props = defineProps({
  title: {
    type: String,
    default: '标题'
  },
  showCollapse: {
    type: Boolean,
    default: true
  },
  isCollapse: {
    type: Boolean,
    default: false
  }
})

const collapse = ref(props.isCollapse)
const instance = getCurrentInstance()
const elRef = ref(null)
const compId = ref('')
const handleExpand = () => {
  collapse.value = false
  const card = document.querySelector(`#${compId.value}`)
  card.style.transition = 'none'
  card.style.height = 'auto'
  const height = card.offsetHeight
  const elTitle = document.querySelector(`#${compId.value} .i-collapse__title`)
  const titleHeight = elTitle.offsetHeight
  card.style.height = `${titleHeight + 24}px`
  const cardHeight = card.offsetHeight // 强制回流
  card.style.transition = 'height 0.5s linear 0s'
  card.style.height = height + 'px'
}

const handleCollapse = () => {
  collapse.value = true
  const card = document.querySelector(`#${compId.value}`)
  card.style.height = card.offsetHeight + 'px'
  card.style.transition = 'height 0.5s linear 0s'
  // 收缩至标题高度
  const elTitle = document.querySelector(`#${compId.value} .i-collapse__title`)
  const titleHeight = elTitle.offsetHeight
  card.style.height = `${titleHeight + 24}px`
  card.style.overflowY = 'hidden'
}

watch(() => props.isCollapse, (val) => {
  collapse.value = val
}, { immediate: true })

onMounted(() => {
  if(instance && elRef) {
    const { uid } = instance
    compId.value = `i-collapse-${uid}`
    elRef.value.setAttribute('id', compId.value)
  }

  // 如果当前collapse为true，则直接收起
  if(collapse.value) {
    handleCollapse()
  }
})

</script>
<style lang="scss" scoped>
.i-collapse {
  background-color: #fff;
  padding: 16px;
}

.i-collapse__title {
  font-size: 14px;
  margin-bottom: 8px;
  padding-left: 16px;
  margin-left: -16px;
  border-left: 4px solid #1890ff;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.i-collapse__icon {
  cursor: pointer;
  margin-right: 8px;
}
</style>