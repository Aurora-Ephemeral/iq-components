---
hello: world
---
# DatePicker
## Basic Usage
`iDatePicker` displays the current week number on the left side.

The default date format is `YYYY-MM-DD`. The date format can be specified using the `format` attribute, and the date value can be bound using the `v-model` attribute.

:::demo
```vue
<template>
    <i-date-picker 
        v-model="date"
    />
</template>
<script setup>
    import { ref } from 'vue'
    const date = ref('')
</script>
```
:::

## Date Range Picker

Set the type to `daterange` to select a date range. In this use case, you can quickly select a date range for a week  by clicking the specific week number on the left.

:::demo
```vue
<template>
    <i-date-picker 
        v-model="date"
        @kwClick="handleKwClick"
        type="daterange"
        startPlaceholder="please select start date"
        endPlaceholder="please select end date"
        style="width: 100%;"
    />
</template>
<script setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
const date = ref([])
const handleKwClick = (val) => {
    ElMessage.success(`selected week：${val.selectYear}-${val.selectMonth} week number: ${val.kw}`)
}
</script>
```
:::

## API
### Attributes
| Name | is Required | Description | Type | Default Value |
| :---: | :---: | :---: | :---: | :---: |
| modelValue | 是 | bind date | string | - |
| type | 否 | type of picker | <el-tooltip content="['date','daterange','datetime','datetimerange','dates']">`enum`</el-tooltip> | 'date' |

### Events
| Name | Description | Parameters |
| :---: | :---: | :---: |
| panelChange | triggers when the navigation button click. | `date: Date \| [Date, Date]` |
| change | triggers when user confirms the value or click outside | `val: typeof v-model` |
| blur | triggers when Input blurs | `void` |
| focus | triggers when Input focuses | `void` |
| calendarChange | triggers when the calendar selected date is changed. Only for range | `val: [Date, null \| Date]` |
| visibleChange | triggers when the DatePicker's dropdown appears/disappears | `visibility: boolean` |
| kwClick | triggers when click week number | `{selectYear: String, selectMonth: String, kw: String }` |

<style scoped>
  .wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>