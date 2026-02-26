---
hello: world
---
# Step Progress

## Baisc Usage
`iStepProgress` differs from progress bar components of [Element Plus](https://element-plus.org/en-US/component/progress) that the later displays only numerical progress, while `iStepProgress` displays step progress, such as workflow steps or task status.

You can customize the text of the step progress by using the `text` slot.

`size` controls the diameter of the outer circle of the circular progress bar, `strokeWidth` controls the width of the circular progress bar, and `gap` controls the spacing between the circular progress bars.

:::demo

```vue
<template>
  <i-step-progress 
    :current="currentStep"
    :steps="stepList"
    :size="100"
    stepKey="id"
    style="display: flex; justify-content: center;"
  >
    <template #text>
      <span style="font-size: 10px;">In Progress</span>
    </template>
  </i-step-progress>
</template>
<script setup>
  import { ref } from 'vue'
  const stepList = [
    {
      id: 1,
      title: 'Draft',
    },
    {
      id: 2,
      title: 'Pending',
    },
    {
      id: 3,
      title: 'Feedback',
    },
    {
      id: 4,
      title: 'Outline Pending',
    },
    {
      id: 5,
      title: 'In Progress',
    },
    {
      id:6,
      title: 'Report Pending',
    },
    {
      id: 7,
      title: 'Report Audit',
    },
    {
      id: 8,
      title: 'Completed',
    }
  ]

  const currentStep = ref(5)
</script>
```
:::

## Rectangle Progress Bar
The default shape of `iStepProgress` is a circle. Yon can change it to a rectangle by setting the `type` attribute to 'line'. In this case, you can set the size of the progress bar by setting the `height` and `width` attributes.

:::demo
```vue
<template>
  <i-step-progress 
    :current="currentStep"
    :steps="stepList"
    :height="20"
    :width="20"
    stepKey="id"
    type="line"
    style="display: flex; justify-content: center;"
  >
  <template #text>
      In Progress
    </template>
  </i-step-progress>
</template>
<script setup>
  import { ref } from 'vue'
  const stepList = [
    {
      id: 1,
      title: 'Draft',
    },
    {
      id: 2,
      title: 'Pending',
    },
    {
      id: 3,
      title: 'Feedback',
    },
    {
      id: 4,
      title: 'Outline Pending',
    },
    {
      id: 5,
      title: 'In Progress',
    },
    {
      id:6,
      title: 'Report Pending',
    },
    {
      id: 7,
      title: 'Report Audit',
    },
    {
      id: 8,
      title: 'Completed',
    }
  ]

  const currentStep = ref(5)
</script>
```
:::

## Theme Color
set `color` attribute to change the theme color of the progress bar.

:::demo  
```vue
<template>
  <i-step-progress 
    :current="currentStep"
    :steps="stepList"
    :size="100"
    stepKey="id"
    color="#409eff"
    style="display: flex; justify-content: center;"
  >
    <template #text>
      <span style="font-size: 10px;">In Progress</span>
    </template>
  </i-step-progress>
  <div style="margin-top: 20px;"></div>
  <i-step-progress 
    :current="currentStep"
    :steps="stepList"
    :height="20"
    :width="20"
    stepKey="id"
    type="line"
    color="#409eff"
    style="display: flex; justify-content: center;"
  >
    <template #text>
      In Progress
    </template>
  </i-step-progress>
</template>
<script setup>
  import { ref } from 'vue'
  const stepList = [
    {
      id: 1,
      title: 'Draft',
    },
    {
      id: 2,
      title: 'Pending',
    },
    {
      id: 3,
      title: 'Feedback',
    },
    {
      id: 4,
      title: 'Outline Pending',
    },
    {
      id: 5,
      title: 'In Progress',
    },
    {
      id:6,
      title: 'Report Pending',
    },
    {
      id: 7,
      title: 'Report Audit',
    },
    {
      id: 8,
      title: 'Completed',
    }
  ]

  const currentStep = ref(5)
</script>
```
:::

## API

### Attributes
| Name | is Required | Description | Type | Default Value |
| :---: | :---: | :---: | :---: | :---: |
| current | No | current step | Number, String, Object  | 0 |
| steps | No | whole step list | Array | Number | 1 |
| type | No | shape of progress bar | String | 'circle' |
| strokeWidth | No | width of progressbar, valid only when `type='circle'` | Number | 20 |
| size | No | diameter of outer circle， valid only when `type='circle'` | Number | 100 |
| gap | No | gap of two progress bars | Number | 20 |
| stepKey | No | key name of step，valid only when `steps` attribute is Array of Object and `current` is an object | string | 'id' |
| width | No | width of progress bar, valid only when `type='line'` | Number | 10 |
| height | No | height of progress bar, valid only when `type='line'` | Number | 30 |
| color | No | theme color | string | var(--el-color-success) |

### Slot
| Slot Name | Description |
| :---: | :---: |
| text | text of current step |