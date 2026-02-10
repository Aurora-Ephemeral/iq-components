---
hello: world
---
# Drawer

## Basic usage

:::demo
```vue
<template>
  <el-button type="primary" @click="visible = true">open</el-button>
  <i-drawer title="I am title" v-model="visible" @drawerClose="handleClose">
    This is the content
  </i-drawer>
</template>
<script setup>
import { ref } from 'vue';
const visible = ref(false)
const handleClose = () => {
  visible.value = false
}
</script>
```
:::

## customize footer

You can show or hide footer by configuring `footerShow` attribute, and you can customize the content of footer by `footer` slot. footer is hidden by default.

:::demo
```vue
<template>
  <el-button type="primary" @click="visible = true">open</el-button>
  <i-drawer title="I am title" v-model="visible" @drawerClose="handleClose" :footerShow="true">
    This is the content
    <template #footer>
      <el-button type="primary" @click="handleConfirm">Confirm</el-button>
      <el-button @click="handleClose">Cancel</el-button>
    </template>
  </i-drawer>
</template>
<script setup>
  import { ref } from 'vue';
  import { ElMessage } from 'element-plus';
  const visible = ref(false)
  const handleClose = () => {
    visible.value = false
  }
  const handleConfirm = () => {
    ElMessage.success('confirm')
    handleClose()
  }
</script>
```
:::

## API
### Attribute
| Name | is Required | Description | Type | Default Value |
| :---: | :---: | :---: | :---: | :---: |
| title | No | title of drawer | string | - |
| v-model | No | visiblity of drawer | Boolean | false |
| size | No | width of drawer | Number/String | 1088 |
| footerShow | No | whether show footer | Boolean | true |

iDrawer is a secondary encapuslation base on Drawer from Element plus. For description of other properties, please refer to [Drawer](https://element-plus.org/zh-CN/component/drawer.html)

### Event
| Name | Description | Parameters |
| :---: | :---: | :---: |
| drawerClose | trigger when close icon is clicked | - |

### Slot
| Slot Name | Description |
| :---: | :---: |
| - | content of body |
| footer | content of footer |

