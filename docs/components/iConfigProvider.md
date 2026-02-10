---
hello: world
---
<script setup>

import { ref, defineAsyncComponent } from 'vue'
import "../../src/assets/styles/index.scss"; // global css

const brandColor = ref('#409EFF')
const iConfigProvider = defineAsyncComponent(() => import('../../src/components/iConfigProvider/index.vue'))
</script>

# ConfigProvider 

Using iConfigProvider to configure the global configuration of the application, such as theme color, language, etc.

## Theme color configuration
IQ Components support custom theme colors, you can use the brandColor attribute to configure the theme color of the application.

:::demo
```vue
<template>
  <div>
    <el-input style="width: 50px; margin-bottom: 16px;" v-model="brandColor" type="color" placeholder="请输入主题色"></el-input>
    <i-config-provider :brand-color="brandColor">
      <el-button type="primary">Primary Button</el-button>
    </i-config-provider>
  </div>
</template>
<script setup>
import { ref } from 'vue'

const brandColor = ref('#409EFF')
</script>
```
:::

## Language configuration
TODO

## API
### Attributes
| Name | is Required | Description | Type | Default Value |
| :---: | :---: | :---: | :---: | :---: |
| brandColor | No | Brand Color | string | - |
| lang | No | Language | string | 'zh' |