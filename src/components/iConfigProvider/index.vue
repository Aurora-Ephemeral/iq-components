<template>
  <div class="i-config-provider">
    <slot></slot>
  </div>
</template>
<script setup>
import { provide, computed, onMounted, watch } from 'vue'
import { ConfigInjectKey } from './context'
import { generatePrimaryColors } from './utils'
import { setTokenKeyName } from '../../utils'
const props = defineProps({
  lang: {
    type: String,
    default: 'en'
  },
  theme: {
    type: String,
    default: 'light'
  },
  brandColor: {
    type: String,
    default: ''
  },
  tokenKey: {
    type: String,
    default: 'iqap_user_token'
  }
})

const changePrimaryColor = () => {
  //  没有设定系统颜色 随宿主系统设定颜色走
  if(!props.brandColor) return
  const root = document?.documentElement
  const colorPallette = generatePrimaryColors(props.brandColor)
  root.style.setProperty('--el-color-primary', props.brandColor)
  Object.keys(colorPallette).forEach((key) => {
    root.style.setProperty(`--el-color-${key}`, colorPallette[key])
  })
}

const changeTokenKey = () => {
  setTokenKeyName(props.tokenKey)
}


const mergedConfig = computed(() => {
  return {
    lang: props.lang,
    theme: props.theme,
    brandColor: props.brandColor
  }
})

onMounted(() => {
  changePrimaryColor()
})
changeTokenKey()

provide(ConfigInjectKey, mergedConfig)

watch(() => props.brandColor, () => {
  changePrimaryColor()
})

watch(() => props.tokenKey, () => {
  changeTokenKey()
})
</script>
<script>
export default {
  name: 'i-config-provider'
}
</script>
<style scoped>
.i-config-provider {
  height: 100%;
  width: 100%;
}
</style>
