---
hello: world
---
# Card 
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