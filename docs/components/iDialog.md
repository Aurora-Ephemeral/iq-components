---
hello: world
---
# Dialog

## Basic usage

Set `v-model` to control the visibility of the dialog. It needs to be a `Boolean` value.

The dialog consists of a title, a body and a footer. The body allows you to insert any content, while the footer contains the default confirm&cancel buttons.

:::demo
```vue
<template>
  <el-button type="primary" @click="visible = true">Show Dialog</el-button>
  <i-dialog v-model="visible" title="Show Dialog" confirmText="Submit" cancelText="Cancel">
    This is the content
  </i-dialog>
</template>
<script setup>
  import { ref } from 'vue';
  const visible = ref(false)
</script>
```
:::


## Customize footer
You can customize the footer by using the slot named `footer`.

:::demo
```vue
<template>
  <el-button type="primary" @click="visible = true">Show Dialog</el-button>
  <i-dialog v-model="visible" title="I am Title" confirmText="Submit" cancelText="Cancel">
    This is the content
    <template #footer>
      <el-button @click="visible = false">Reject</el-button>
      <el-button type="primary" @click="visible = false">Approve</el-button>
    </template>
  </i-dialog>
</template>
<script setup>
  import { ref } from 'vue';
  const visible = ref(false)
</script>
```
:::

## Submit button loading
you can use `submit-loading` to control the loading state of the submit button to prevent repeated submissions.

:::demo
```vue
<template>
  <el-button type="primary" @click="visible = true">Show Dialog</el-button>
  <i-dialog 
    v-model="visible" 
    title="Submit Button Loading" 
    :submit-loading="submitLoading" 
    @confirm="handleConfirm"
    confirmText="Submit" 
    cancelText="Cancel"
  >
    Click the submit button to trigger the loading state
  </i-dialog>
</template>
<script setup>
  import { ElMessage } from 'element-plus'
  import { ref } from 'vue';
  const visible = ref(false)
  const submitLoading = ref(false)
  const handleConfirm = () => {
    submitLoading.value = true 
    // mock request api time
    setTimeout(() => {
      submitLoading.value = false
      visible.value = false
      ElMessage.success('submit success')
    }, 3000)
  }
</script>
```
:::

## API
### Attributes

| Name | is Required | Type | Default Value Description | Description |
| ---- | ---- | ---- | ---- | ---- |
| modelValue | No | boolean | false | visibility of Dialog |
| title | No | string | - | the title of dialog |
| width | No | string/number | 30% | width of dialog |
| submitLoading | No | boolean | false | loading state of confirm button |

iDialog is a secondary encapuslation base on Dialog from Element plus. For description of other properties, please refer to [Dialog](https://element-plus.org/en-US/component/dialog.html)
### Event
| Name | Description | Parameters |
| :---: | :---: | :---: |
| confirm | triggers when confirm button is clicked | - |
| cancel | triggers when cancel button is clicked | - |

### Slot
| Slot Name | Description |
| :---: | :---: |
| - | content of body |
| footer | content of footer |

