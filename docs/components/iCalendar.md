---
hello: world
---
# Calendar
## Basic usage
Pass `isShowPoint` attribute to set whether to display the marker, isShowPoint type is Function, the parameter is the date of the day, return true to display the marker. Example

`clickDate` will be triggered when the date is clicked, and the parameter is the date of the day.
:::demo
```vue
<template>
    <div style="width: 100%; display: flex; justify-content: center;">
        <i-calendar 
            v-model="currentDate"
            :isShowPoint="isShowPoint"
            @clickDate="handleClickDate"
        />
    </div>
</template>
<script setup>
    import { ref } from 'vue'
    import {ElMessage} from 'element-plus'
    const currentDate = ref(new Date())
    const isShowPoint = (date) => {
    // set mark to 15th of each month
    if(date.endsWith("15")) {
        return true
    }
    return false
    }

    const handleClickDate = (date) => {
        ElMessage.success(`You clicked ${date}`)
    }
</script>
```
:::

## API 
### Attributes
| Name | is Required | Description | Type | Default Value Description |
| ---- | ---- | ---- | ---- | ---- |
| modelValue | Yes | bind date | Date | - |
| isShowPoint | No | whether to show mark for each date, it needs to be assigned with a function. input is the date, and output is a boolean value | Function | () => false |
| width | No | width of calendar | String | '424px' |

### Event
| Name | Description | Parameters |
| :---: | :---: | :---: |
| clickDate | triggers when date in calendar is clicked | - |

iCalendar is a secondary encapuslation base on Element Plus's ElCalendar component.  For description of other properties, please refer to [Calendar](https://element-plus.org/en-US/component/calendar)

<style lang="scss" scoped>
:deep(.el-calendar__body) table {
  display: table;
  margin: 0;
}

:deep(.el-calendar-table)  {
  tr{
    border-top: none;
    background-color: #fff;
  }
}

:deep(.el-calendar-table) {
  th {
    background-color: #fff;
    text-align: center;
  }
  
}

:deep(.el-calendar-table) th, :deep(.el-calendar-table) td {
  border: none;
  padding: 0;
}

:deep(.el-calendar-table) tr:nth-child(2n) {
  background-color: #fff;
}
</style>