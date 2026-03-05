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

## Row Selection 

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