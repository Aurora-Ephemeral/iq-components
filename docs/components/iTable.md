---
hello: world
---
# Table 

## Basic Usage

`iTable` is with white background, and has three areas, which are the top operation area, the middle table area, and the bottom pagination area. The top operation area and the bottom pagination area can be empty.

The content in left of top operation area can be fully customized through slot, and the right side has default functions of exporting table data, refreshing data and customizing columns. The default export function is implemented in front-end, developers can also implement it by themselves. refresh function should call API, developers need to implement it by themselves.

Columns can be configured with sorting and filtering functions, which are implemented locally in front-end, and no need to call API again.

`iTable` supports nested data display, and can display nested data according to the chained attribute access rule, such as a.b.c.

:::demo
```vue
<template>
    <i-table
        :tableData="data"
        :columns="columns"
        :pagination="pagination"
        :total="pagination.total"
    >
    </i-table>
</template>
<script setup>
    import { reactive } from 'vue'
    const data = reactive([
      {
        id: 1,
        name: 'San Zhang',
        age: 20,
        sex: 'Male',
        province: 'Peking',
        city: 'Peking',
        street: 'Chaoyang District',
        number: '100',
        birth: '1990-01-01',
      },
      {
            "id": 2,
            "name": "Si Li",
            "age": 25,
            "sex": "Female",
            "province": "Peking",
            "city": "Peking",
            "street": "Haidian District",
            "number": "205",
            "birth": "1995-05-15",
        },
        {
            "id": 3,
            "name": "Wu Wang",
            "age": 30,
            "sex": "Male",
            "province": "Tianjin",
            "city": "Tianjin",
            "street": "Binhai New Area",
            "number": "308",
            "birth": "1990-11-30",
            "__selectionDisabled": false
        },
        {
            "id": 4,
            "name": "Ming Zhao",
            "age": 28,
            "sex": "Female",
            "province": "Hebei",
            "city": "Shijiazhuang",
            "street": "Chang'an District",
            "number": "150",
            "birth": "1992-08-22",
            "__selectionDisabled": true
        },
        {
            "id": 5,
            "name": "Lei Liu",
            "age": 35,
            "sex": "Male",
            "province": "Peking",
            "city": "Peking",
            "street": "Fengtai District",
            "number": "501",
            "birth": "1985-12-10",
            "__selectionDisabled": false
        }
    ])
    const columns = [
      {
        label: 'Name',
        prop: 'name',
        width: 100,
        showFilter: true,
        showSort: true
      },
      {
        label: 'Age',
        prop: 'age',
        width: 100,
        showFilter: true,
        showSort: true,
        filterType: 'number',
      },
      {
        label: 'Gender',
        prop: 'sex',
        width: 100,
        showFilter: true,
        showSort: true,
        filterType: 'select',
        filterOptions: [
            { label: 'Male', value: 'Male' },
            { label: 'Female', value: 'Female' }
        ]
      },
      {
        label: 'Birth Date',
        prop: 'birth',
        width: 140,
        showFilter: true,
        showSort: true,
      },
      {
        label: 'Province',
        prop: 'province',
        width: 120,
        showFilter: true,
        showSort: true,
      }
    ]
    const pagination = {
      pageNum: 1, 
      pageSize: 10,
      pageSizeOptions: [10, 20, 30, 50, 100],
      total: data.length
    }
</script>
```
:::

## Customize Top Operation Area

Customize the content on the left side of the top operation area through `header-left` slot 

Customize the content on the right side of the top operation area through `header-right` slot

:::demo
```vue
<template>
    <i-table
      :tableData="data"
      :columns="columns"
      :pagination="pagination"
      :total="pagination.total"
    >
      <template #header-left>
        <el-button type="primary" @click="handleAdd">Add New</el-button>
      </template>
      <template #header-right>
        <el-tag>Total Working Hours：1100</el-tag>
      </template>
    </i-table>
</template>
<script setup>
    import { reactive } from 'vue'
    import { ElMessage } from 'element-plus'
    const data = reactive([
      {
        id: 1,
        name: 'San Zhang',
        age: 20,
        sex: 'Male',
        province: 'Peking',
        city: 'Peking',
        street: 'Chaoyang District',
        number: '100',
        birth: '1990-01-01',
      },
      {
            "id": 2,
            "name": "Si Li",
            "age": 25,
            "sex": "Female",
            "province": "Peking",
            "city": "Peking",
            "street": "Haidian District",
            "number": "205",
            "birth": "1995-05-15",
        },
        {
            "id": 3,
            "name": "Wu Wang",
            "age": 30,
            "sex": "Male",
            "province": "Tianjin",
            "city": "Tianjin",
            "street": "Binhai New Area",
            "number": "308",
            "birth": "1990-11-30",
            "__selectionDisabled": false
        },
        {
            "id": 4,
            "name": "Ming Zhao",
            "age": 28,
            "sex": "Female",
            "province": "Hebei",
            "city": "Shijiazhuang",
            "street": "Chang'an District",
            "number": "150",
            "birth": "1992-08-22",
            "__selectionDisabled": true
        },
        {
            "id": 5,
            "name": "Lei Liu",
            "age": 35,
            "sex": "Male",
            "province": "Peking",
            "city": "Peking",
            "street": "Fengtai District",
            "number": "501",
            "birth": "1985-12-10",
            "__selectionDisabled": false
        }
    ])
    const columns = [
      {
        label: 'Name',
        prop: 'name',
        width: 100,
        showFilter: true,
        showSort: true
      },
      {
        label: 'Age',
        prop: 'age',
        width: 100,
        showFilter: true,
        showSort: true,
        filterType: 'number',
      },
      {
        label: 'Gender',
        prop: 'sex',
        width: 100,
        showFilter: true,
        showSort: true,
        filterType: 'select',
        filterOptions: [
            { label: 'Male', value: 'Male' },
            { label: 'Female', value: 'Female' }
        ]
      },
      {
        label: 'Birth Date',
        prop: 'birth',
        width: 140,
        showFilter: true,
        showSort: true,
      },
      {
        label: 'Province',
        prop: 'province',
        width: 120,
        showFilter: true,
        showSort: true,
      }
    ]
    const pagination = {
      pageNum: 1, 
      pageSize: 10,
      pageSizeOptions: [10, 20, 30, 50, 100],
      total: data.length
    }
    const handleAdd = () => {
        ElMessage.success('Click Add New Button!')
    }
</script>
```
:::

## Tool Buttons on the Right Side of Top Operation Area

The `toolButton` attribute can selectively enable the function buttons on the right side of the top operation area by configuring it. The configuration format is `['refresh', 'download', 'setting']`, respectively corresponding to the refresh, export, and column definition functions. The default is to enable all.

### Enable Export Function

In order to enable the export function, the `toolButton` attribute contains the `download` field. The export callback event is triggered by binding the `export` event in the `v-on` of the custom export event. If no custom export event is bound, the default export is the data currently displayed in the table.

### Enable Refresh Function

In order to enable the refresh function, the `toolButton` attribute contains the `refresh` field. The refresh callback event is triggered by binding the `refresh` event in the `v-on` of the custom refresh event.

### Enable Column Definition Function 

the column definition function is enabled by the `toolButton` attribute containing the `setting` field. It contains column sorting and fixing functions.

:::demo
```vue
<template>
    <i-table 
      :tableData="data"
      :columns="columns"
      :pagination="pagination"
      :total="pagination.total"
      @export="handleExport"
      @refresh="handleRefresh"
      :toolButton="['refresh', 'download']"
    >
    </i-table>
</template>
<script setup>
    import { reactive } from 'vue'
    import { ElMessage } from 'element-plus'
    const data = reactive([
      {
        id: 1,
        name: 'San Zhang',
        age: 20,
        sex: 'Male',
        province: 'Peking',
        city: 'Peking',
        street: 'Chaoyang District',
        number: '100',
        birth: '1990-01-01',
      },
      {
            "id": 2,
            "name": "Si Li",
            "age": 25,
            "sex": "Female",
            "province": "Peking",
            "city": "Peking",
            "street": "Haidian District",
            "number": "205",
            "birth": "1995-05-15",
        },
        {
            "id": 3,
            "name": "Wu Wang",
            "age": 30,
            "sex": "Male",
            "province": "Tianjin",
            "city": "Tianjin",
            "street": "Binhai New Area",
            "number": "308",
            "birth": "1990-11-30",
            "__selectionDisabled": false
        },
        {
            "id": 4,
            "name": "Ming Zhao",
            "age": 28,
            "sex": "Female",
            "province": "Hebei",
            "city": "Shijiazhuang",
            "street": "Chang'an District",
            "number": "150",
            "birth": "1992-08-22",
            "__selectionDisabled": true
        },
        {
            "id": 5,
            "name": "Lei Liu",
            "age": 35,
            "sex": "Male",
            "province": "Peking",
            "city": "Peking",
            "street": "Fengtai District",
            "number": "501",
            "birth": "1985-12-10",
            "__selectionDisabled": false
        }
    ])
    const columns = [
      {
        label: 'Name',
        prop: 'name',
        width: 100,
        showFilter: true,
        showSort: true
      },
      {
        label: 'Age',
        prop: 'age',
        width: 100,
        showFilter: true,
        showSort: true,
        filterType: 'number',
      },
      {
        label: 'Gender',
        prop: 'sex',
        width: 100,
        showFilter: true,
        showSort: true,
        filterType: 'select',
        filterOptions: [
            { label: 'Male', value: 'Male' },
            { label: 'Female', value: 'Female' }
        ]
      },
      {
        label: 'Birth Date',
        prop: 'birth',
        width: 140,
        showFilter: true,
        showSort: true,
      },
      {
        label: 'Province',
        prop: 'province',
        width: 120,
        showFilter: true,
        showSort: true,
      }
    ]
    const pagination = {
      pageNum: 1, 
      pageSize: 10,
      pageSizeOptions: [10, 20, 30, 50, 100],
      total: data.length
    }

    const handleExport = () => {
        ElMessage.success('Exporting data')
    }
    const handleRefresh = () => {
        ElMessage.success('Refreshing data')
    }
</script>
```
:::

## Index Column
- `indexConfig` controls the visibilty of the index column, the default value is `{ display: true, mode: 'continuous', width: 100 }`, where `mode` can be set to `discrete` to make the index column non-continuous after pagination.

- The `index` slot can be used to customize the index column.

:::demo
```vue
  <template>
    <i-table 
      :tableData="data"
      :columns="columns"
      :pagination="pagination"
      :total="pagination.total"
    >
      <template #index="{$index}">
        <el-tag>{{ `No.${$index+1}` }}</el-tag>
      </template>
    </i-table>
  </template>
  <script setup>
    import { reactive } from 'vue'
    const data = reactive([
      {
        id: 1,
        name: 'San Zhang',
        age: 20,
        sex: 'Male',
        province: 'Peking',
        city: 'Peking',
        street: 'Chaoyang District',
        number: '100',
        birth: '1990-01-01',
      },
      {
            "id": 2,
            "name": "Si Li",
            "age": 25,
            "sex": "Female",
            "province": "Peking",
            "city": "Peking",
            "street": "Haidian District",
            "number": "205",
            "birth": "1995-05-15",
        },
        {
            "id": 3,
            "name": "Wu Wang",
            "age": 30,
            "sex": "Male",
            "province": "Tianjin",
            "city": "Tianjin",
            "street": "Binhai New Area",
            "number": "308",
            "birth": "1990-11-30",
            "__selectionDisabled": false
        },
        {
            "id": 4,
            "name": "Ming Zhao",
            "age": 28,
            "sex": "Female",
            "province": "Hebei",
            "city": "Shijiazhuang",
            "street": "Chang'an District",
            "number": "150",
            "birth": "1992-08-22",
            "__selectionDisabled": true
        },
        {
            "id": 5,
            "name": "Lei Liu",
            "age": 35,
            "sex": "Male",
            "province": "Peking",
            "city": "Peking",
            "street": "Fengtai District",
            "number": "501",
            "birth": "1985-12-10",
            "__selectionDisabled": false
        }
    ])
    const columns = [
      {
        label: 'Name',
        prop: 'name',
        width: 100,
        showFilter: true,
        showSort: true
      },
      {
        label: 'Age',
        prop: 'age',
        width: 100,
        showFilter: true,
        showSort: true,
        filterType: 'number',
      },
      {
        label: 'Gender',
        prop: 'sex',
        width: 100,
        showFilter: true,
        showSort: true,
        filterType: 'select',
        filterOptions: [
            { label: 'Male', value: 'Male' },
            { label: 'Female', value: 'Female' }
        ]
      },
      {
        label: 'Birth Date',
        prop: 'birth',
        width: 140,
        showFilter: true,
        showSort: true,
      },
      {
        label: 'Province',
        prop: 'province',
        width: 120,
        showFilter: true,
        showSort: true,
      }
    ]

    const pagination = {
      pageNum: 1, 
      pageSize: 10,
      pageSizeOptions: [10, 20, 30, 50, 100],
      total: data.length
    }
  </script>
```
:::
## Row Selection 
- `rowKey` should be set to a unique identifier for each row, when the row selection function is enabled.

- The `selectable` field can be used to disable the selection of a row. The `selectable` field is a function that returns `true/false` to control whether a row can be selected.

### Multiple Selection
Configure `selectionMode = 'multiple'` to enable multiple selection. When multiple selection is enabled, the function button for displaying selected data will appear in the upper right corner of the table.

### Single Selection
Configure `selectionMode = 'single'` to enable single selection.

### Default Selected Rows
Call the `toggleRowSelection` method of the table ref object to set the initial default selected rows. You can pass the second parameter as `true/false` to control whether the row is selected or not.

### Get Selected Data
You can get the current selected data by the `selectedRows` attribute of the table ref object. You can bind the `selectionChange` event to get the current selected data when the row selection status changes.

:::demo
```vue
<template>
    <div>
      <el-switch 
        v-model="selectionMode" 
        active-text="Single"
        active-value="single"
        inactive-value="multiple" 
        inactive-text="Multiple"  
      >
      </el-switch>
      <i-table
        ref="tableRef"
        :tableData="data"
        :columns="columns"
        :pagination="pagination"
        :total="pagination.total"
        :selectionMode="selectionMode"
        :selectable="checkSelectable"
        @selectionChange="handleSelectionChange"
        rowKey="id"
      >
        <template #header-left>
          <el-button type="primary" @click="handleConfirm">Submit</el-button>
        </template>
      </i-table>
    </div>
  </template>
  <script setup>
    import { ref, reactive } from 'vue'
    import { ElMessage } from 'element-plus'
    const selectionMode = ref('single')
    const tableRef = ref(null)
    const data = reactive([
      {
        id: 1,
        name: 'San Zhang',
        age: 20,
        sex: 'Male',
        province: 'Peking',
        city: 'Peking',
        street: 'Chaoyang District',
        number: '100',
        birth: '1990-01-01',
      },
      {
            id: 2,
            "name": "Si Li",
            "age": 25,
            "sex": "Female",
            "province": "Peking",
            "city": "Peking",
            "street": "Haidian District",
            "number": "205",
            "birth": "1995-05-15",
        },
        {
            "id": 3,
            "name": "Wu Wang",
            "age": 30,
            "sex": "Male",
            "province": "Tianjin",
            "city": "Tianjin",
            "street": "Binhai New Area",
            "number": "308",
            "birth": "1990-11-30",
        },
        {
            "id": 4,
            "name": "Ming Zhao",
            "age": 28,
            "sex": "Female",
            "province": "Hebei",
            "city": "Shijiazhuang",
            "street": "Chang'an District",
            "number": "150",
            "birth": "1992-08-22",
        },
        {
            "id": 5,
            "name": "Lei Liu",
            "age": 35,
            "sex": "Male",
            "province": "Peking",
            "city": "Peking",
            "street": "Fengtai District",
            "number": "501",
            "birth": "1985-12-10",
        }
    ])
    const columns = [
      {
        label: 'Name',
        prop: 'name',
        width: 100,
        showFilter: true,
        showSort: true
      },
      {
        label: 'Age',
        prop: 'age',
        width: 100,
        showFilter: true,
        showSort: true,
        filterType: 'number',
      },
      {
        label: 'Gender',
        prop: 'sex',
        width: 100,
        showFilter: true,
        showSort: true,
        filterType: 'select',
        filterOptions: [
            { label: 'Male', value: 'Male' },
            { label: 'Female', value: 'Female' }
        ]
      },
      {
        label: 'Birth Date',
        prop: 'birth',
        width: 140,
        showFilter: true,
        showSort: true,
      },
      {
        label: 'Province',
        prop: 'province',
        width: 120,
        showFilter: true,
        showSort: true,
      }
    ]

    const pagination = {
      pageNum: 1, 
      pageSize: 10,
      pageSizeOptions: [10, 20, 30, 50, 100],
      total: data.length
    }
    const checkSelectable = (row, index) => {
      // set first row not selectable
      if(index === 0) {
        return false
      }
      return true
    }

    const handleSelectionChange = (val) => {
      ElMessage.success(`The selected user names are：${val.map(item=>item.name).join(',')}`)
    }

    const handleConfirm =() => {
      // 从ref中 获取所有选中行数据
      const selectedRows = tableRef.value.selectedRows
      if(selectedRows.length === 0) {
        ElMessage.warning('Please select at least one row')
        return
      }
      ElMessage.success(`The selected user names are：${selectedRows.map(item=>item.name).join(',')}`)
    }
  </script>
```
:::


## Custmized Content

## Inline Editing

## Sorting and Filtering

## Expand Rows

## Drag and Sort

## Pagination



<style lang="scss" scoped>
:deep(.el-table table) {
  margin: 0;
  display: table;
  overflow-x: visible;
  border-collapse: collapse;
}

:deep(.el-pagination ul) {
  padding-left: 0px;
}
</style>