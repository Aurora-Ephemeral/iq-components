---
hello: world
---
# Layout
## Basic usage
In ERP system development, the most common layout is divided into two parts: query area and content area. The query area is used to filter data, and the content area is used to display data. iLayout is used to implement this layout. Developers only need to concern the content of these two areas and do not need to worry about the layout styling.

:::demo
```vue
<template>
  <i-layout class="main_wrapper">
    <template #query>
      <div class="query_area">Query Area</div>
    </template>
    <template #content>
      <div class="content_area">Content Area</div>
    </template>
  </i-layout>
</template>
<style scoped>
  .main_wrapper {
    height: 500px;
    background-color: #f0f0f0;
    padding: 16px;
  }
  .query_area {
    height: 100px;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .content_area {
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  }
</style>
```
:::

## change background color
You can change the background color of the layout by setting the `color` attribute.
:::demo
```vue
<template>
  <i-layout class="main_wrapper" color="#8eabff">
    <template #query>
      <div class="query_area">Query Area</div>
    </template>
    <template #content>
      <div class="content_area">Content Area</div>
    </template>
  </i-layout>
</template>
<style scoped>
  .main_wrapper {
    height: 500px;
    background-color: #f0f0f0;
    padding: 16px;
  }
  .query_area {
    height: 100px;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .content_area {
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  }
</style>
```
:::

## Switch Tabs
if you need to switch multiple components in one page, you can use the `tabs` slot to implement the switch.

:::demo
```vue
<template #component>
  <i-layout class="main_wrapper">
    <template #tabs>
      <el-tabs v-model="activeName" style="padding: 0 8px;">
        <el-tab-pane label="Tab1" name="first"></el-tab-pane>
        <el-tab-pane label="Tab2" name="second"></el-tab-pane>
      </el-tabs>
    </template>
    <template #query>
      <div v-if="activeName === 'first'" class="query_area">Query Area 1</div>
      <div v-else class="query_area">Query Area 2</div>
    </template>
    <template #content>
      <div v-if="activeName === 'first'" class="content_area">Content Area 1</div>
      <div v-else class="content_area">Content Area 2</div>
    </template>
  </i-layout>
</template>
<style scoped>
  .main_wrapper {
    height: 500px;
    background-color: #f0f0f0;
    padding: 16px;
  }
  .query_area {
    height: 100px;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .content_area {
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  }
</style>
<script setup>
import { ref } from 'vue'

const activeName = ref('first')
</script>
```
:::

## API
### Attributes
| Name | is Required | Description | Type | Default Value |
| :---: | :---: | :---: | :---: | :---: |
| color | no | background color  | string | #fff |

### Slot
| Slot Name | Description |
| :---: | :---: |
| tabs |  tab area |
| query | query area |
| content | content area  |

