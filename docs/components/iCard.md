---
hello: world
---
# iCard 
## Basic usage
:::demo
```vue
<template>
  <i-card title="Demo">
    <el-form :inline="true" style="padding: 16px;">
      <el-form-item label="Name"><el-input /></el-form-item>
      <el-form-item label="Age"><el-input /></el-form-item>
    </el-form>
  </i-card>
</template>
<script setup>
import iCard from '../../src/components/iCard/index.vue'
</script>
```
:::

## Right Slot
Customize the title area on the right via `titleRight` slot.

:::demo
```vue
<template>
  <i-card title="Demo">
    <template #titleRight>
      <el-button type="primary">Click Me</el-button>
    </template>
  </i-card>
</template>
<script setup>
import iCard from '../../src/components/iCard/index.vue'
</script>
```
:::
## API
### Attributes
| Name | is Required | Description | Type | Default Value |
| :---: | :---: | :---: | :---: | :---: |
| title | No | Title of Card | string | - |

### Slot
| Slot Name | Description |
| :---: | :---: |
| titleRight | title area on the right side |