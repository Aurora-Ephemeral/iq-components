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
In `columns` attribute, set `slotName` attribute for a column, and then customize the content of that column through slots.

:::demo
```vue
<template>
    <i-table
      ref="tableRef"
      :tableData="data"
      :columns="columns"
      :pagination="pagination"
      :total="pagination.total"
      rowKey="id"
    >
      <template #sex="{row}">
        <el-tag :type="row.sex === '男' ? 'success' : 'danger'">{{row.sex}}</el-tag>
      </template>
      <template #operation="{row, $index}">
        <el-button type="primary" link @click="handleView(row)">View</el-button>
      </template>
    </i-table>
  </template>
  <script setup>
    import { ref, reactive } from 'vue'
    import { ElMessage } from 'element-plus'
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
      },
      {
        label: 'Operation',
        prop: 'operation',
        width: 100,
        fixed: 'right',
        slotName: 'operation'
      }
    ]
    
    const pagination = {
      pageNum: 1, 
      pageSize: 10,
      pageSizeOptions: [10, 20, 30, 50, 100],
      total: data.length
    }

    const handleView = (row) => {
      ElMessage.success(`Viewing user: ${row.name}`)
    }
  </script>
```
:::
## Inline Editing
- iTable has built-in inline editing functionality. To enable inline editing, set the `__lineEdit` field in the table data to control which rows can be edited. When using inline editing, it is necessary to configure the `rowKey` field as the unique identifier for each row.

- The `inlineEditType` property can be set to specify the editing type. Currently, four types are supported: `number`, `select`, `date`, and `input`. The default type is `input`. When `inlineEditType` is set to `select`, the `inlineEditOptions` property must be set to specify the dropdown options.

- The input type is implemented by element-plus components. If you need to pass other properties to element-plus components when editing inline, you can configure the `inlineEditProps` property.

- Columns with custom content cannot automatically enable inline editing mode and need to be developed by themselves.

- <span style="color: red">Note: Columns with chained access (a.b.c) cannot use inline editing mode. Otherwise, the data cannot be updated correctly.</span>

:::demo
```vue
<template>
  <i-table 
    :tableData="data"
    :columns="columns"
    :pagination="pagination"
    :total="pagination.total"
    rowKey="id"
  >
    <template #header-left>
      <el-button type="primary" @click="handleAdd">Add</el-button>
    </template>
    <template #operation="{row, $index}">
      <div v-if="row.__inlineEdit">
        <el-button type="primary" link @click="handleSave(row)">Save</el-button>
        <el-button type="danger" link @click="handleCancel(row)">Cancel</el-button>
      </div>
      <div v-else>
        <el-button type="primary" link @click="handleEdit(row)">Edit</el-button>
      </div>
    </template>
  </i-table>
</template>
<script setup>
  import { reactive, ref } from 'vue'
  const isEdit = ref(false)
  let cachedRow
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
        __selectionDisabled: true
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
        width: 120,
        showSort: true,
        showFilter: true,
      },
      {
        label: 'Age',
        prop: 'age',
        width: 120,
        showSort: true,
        showFilter: true,
        filterType: 'number',
        inlineEditType: "number"
      },
      {
        label: 'Gender',
        prop: 'sex',
        width: 120,
        showSort: true,
        showFilter: true,
        inlineEditType: "select",
        inlineEditOptions: [
          { label: 'Male', value: 'Male' },
          { label: 'Female', value: 'Female' }
      ]
      },
      {
        label: 'Birth Date',
        prop: 'birth',
        width: 140,
        showSort: true,
        showFilter: true,
        inlineEditType: "date"
      },
      {
        label: 'Province',
        prop: 'province',
        width: 120,
        showSort: true,
        showFilter: true,
      },
      {
        label: 'Operation',
        prop: 'operation',
        slotName: 'operation',
        width: 140,
        fixed: 'right',
        align: 'center'
      }
    ]

    const pagination = {
      pageNum: 1, 
      pageSize: 10,
      pageSizeOptions: [10, 20, 30, 50, 100],
      total: data.length
    }
    
    const handleEdit = (row) => {
      isEdit.value = true
      row.__inlineEdit = true
      cachedRow = JSON.parse(JSON.stringify(row))
    }

    const handleSave = (row) => {
      row.__inlineEdit = false
      isEdit.value = false
      console.log('save', row)
    }

    const handleCancel = (row) => {
      isEdit.value = false
      if(row.__newLine) {
        data.splice(data.indexOf(row), 1)
      }
      Object.assign(row, cachedRow)
      row.__inlineEdit  = false
    }

    const handleAdd = () => {
      isEdit.value = true
      const tempId = Date.now()
      data.push({
        name: '',
        age: '',
        sex: '',
        province: '',
        city: '',
        street: '',
        number: '',
        birth: '',
        __newLine: true,
        __inlineEdit: true,
        id: tempId
      })
    }
</script>
```
:::
## Sorting and Filtering
### Sorting
The `showSort: true` attribute in the column configuration can enable the sorting function for this column. After enabling, a pair of up and down arrows will appear after the column title. Clicking one of them will trigger the sorting event, and this arrow will be highlighted. Clicking the highlighted arrow again will cancel the sorting. The sorting implementation is front-end sorting and does not require calling the back-end interface.

### Filtering
- The `showFilter: true` attribute in the column configuration can enable the filtering function for this column. After enabling, a filter icon will appear after the column title. Clicking the icon will pop up a window. By default, the window contains an input box. After entering the content to be filtered, the filter event will be triggered automatically. The filtering implementation is front-end filtering and does not require calling the back-end interface.
- The default component type of the filter is input box. Optional values include `select`, `date`, `daterange`, and `number` selectors. The component type can be set through the `filterType` attribute. When using the `select` type, you need to set the `filterOptions` attribute to specify the drop-down options. When using `daterange`, you can configure the date format through the `filterFormat` attribute, which defaults to `YYYY-MM-DD`.

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

## Expand Rows
set `showExpandCol = true` to expand and collapse the table. After expanding, the expanded content can be displayed. The expanded content can be customized through the `expand` slot.

:::demo
```vue
<template>
  <i-table 
    :tableData="data"
    :columns="columns"
    :pagination="pagination"
    :total="pagination.total"
    showExpandCol
  >
    <template #expand="{row}">
      <h5>Detailed Addredd</h5>
      <div>Province：{{ row.province }}</div>
      <div>City：{{ row.city }}</div>
      <div>Address： {{ row.street }} {{ row.number }}</div>
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
## Drag and Sort
set `dragSort` attribute to true to enable row drag and sort. After dragging and sorting, the `dragSortChange` event will be triggered, returning the new data list and old and new index values

<em style="color: red">The default row drag and sort only changes the ui display order and does not change the original data order. Therefore, when using drag and sort, you must update the original data to the sorted data in the dragSortChange callback event to ensure that other functions of the table work normally</em>

:::demo
```vue
<template>
    <i-table
      :tableData="data"
      :columns="columns"
      :pagination="pagination"
      :total="pagination.total"
      dragSort
      @dragSortChange="handleDragSortChange"
    >
    </i-table>
  </template>
  <script setup>
    import { ref } from 'vue'
    import {ElMessage} from 'element-plus'
    const data = ref([
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
        width: 100
      },
      {
        label: 'Age',
        prop: 'age',
        width: 100
      },
      {
        label: 'Gender',
        prop: 'sex',
        width: 100
      },
      {
        label: 'Birth Date',
        prop: 'birth',
        width: 140
      },
      {
        label: 'Province',
        prop: 'province',
        width: 120
      }
    ]
    const pagination = {
      pageNum: 1, 
      pageSize: 10,
      pageSizeOptions: [10, 20, 30, 50, 100],
      total: data.value.length
    }
    const handleDragSortChange = (params) => {
      data.value = params.newTableData
      ElMessage.success(`Drag sort, move row ${params.sourceIndex + 1} to ${params.targetIndex + 1}`)
    }
  </script>
```
:::
## Pagination
if you want to enable pagination, configure the `pagination, total` attributes, which are objects containing the following properties:
  - `pageNum`：Current page number
  - `pageSize`：Number of items per page
  - `pageSizes`：Number of items per page drop-down options
  - `total`：Total number of data items
The `paginationChange` event can be used to monitor pagination changes, which is triggered when the pagination button or number of items per page is selected

:::demo
```vue
<template>
  <i-table 
    :tableData="displayData"
    :columns="columns"
    :pagination="pagination"
    :total="pagination.total"
    @paginationChange="handlePageChange"
  >
  </i-table>
</template>
<script setup>
  import { ref, reactive } from 'vue'
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
      "birth": "1990-11-30"
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
    },
    {
      "id": 6,
      "name": "Wei Zhang",
      "age": 22,
      "sex": "Male",
      "province": "Shanghai",
      "city": "Shanghai",
      "street": "Pudong New Area",
      "number": "888",
      "birth": "2004-03-12"
    },
    {
      "id": 7,
      "name": "Fang Chen",
      "age": 27,
      "sex": "Female",
      "province": "Guangdong",
      "city": "Guangzhou",
      "street": "Tianhe District",
      "number": "120",
      "birth": "1999-07-05"
    },
    {
      "id": 8,
      "name": "Jun Wang",
      "age": 31,
      "sex": "Male",
      "province": "Zhejiang",
      "city": "Hangzhou",
      "street": "Xihu District",
      "number": "45",
      "birth": "1995-11-20"
    },
    {
      "id": 9,
      "name": "Ying Huang",
      "age": 24,
      "sex": "Female",
      "province": "Sichuan",
      "city": "Chengdu",
      "street": "Wuhou District",
      "number": "302",
      "birth": "2002-01-18"
    },
    {
      "id": 10,
      "name": "Qiang Sun",
      "age": 40,
      "sex": "Male",
      "province": "Jiangsu",
      "city": "Nanjing",
      "street": "Xuanwu District",
      "number": "18",
      "birth": "1986-09-30"
    },
    {
      "id": 11,
      "name": "Na Wu",
      "age": 29,
      "sex": "Female",
      "province": "Hubei",
      "city": "Wuhan",
      "street": "Wuchang District",
      "number": "606",
      "birth": "1997-04-25"
    },
    {
      "id": 12,
      "name": "Bo Yang",
      "age": 33,
      "sex": "Male",
      "province": "Shaanxi",
      "city": "Xi'an",
      "street": "Yanta District",
      "number": "99",
      "birth": "1993-12-03"
    },
    {
      "id": 13,
      "name": "Lili Zhou",
      "age": 26,
      "sex": "Female",
      "province": "Fujian",
      "city": "Xiamen",
      "street": "Siming District",
      "number": "211",
      "birth": "2000-06-14"
    },
    {
      "id": 14,
      "name": "Hao Guo",
      "age": 38,
      "sex": "Male",
      "province": "Shandong",
      "city": "Qingdao",
      "street": "Shinan District",
      "number": "704",
      "birth": "1988-02-28"
    },
    {
      "id": 15,
      "name": "Jie Ma",
      "age": 21,
      "sex": "Male",
      "province": "Peking",
      "city": "Peking",
      "street": "Xicheng District",
      "number": "12",
      "birth": "2005-10-10"
    }
  ])

  const displayData = ref(data.slice(0, 10)) 
  
  const columns = [
    {
      label: 'Name',
      prop: 'name',
      width: 100
    },
    {
      label: 'Age',
      prop: 'age',
      width: 100
    },
    {
      label: 'Gender',
      prop: 'sex',
      width: 100
    },
    {
      label: 'Birth Date',
      prop: 'birth',
      width: 140
    },
    {
      label: 'Province',
      prop: 'province',
      width: 120
    }
  ]
  
  const pagination = {
    pageNum: 1, 
    pageSize: 10,
    pageSizeOptions: [10, 20, 30, 50, 100],
    total: data.length
  }
  
  const handlePageChange = ({pageNum, pageSize}) => {
    displayData.value = data.slice((pageNum - 1) * pageSize, pageNum * pageSize)
  }
</script>
```
:::


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

## API
### Attributes
#### Table
| Name | is Required | Description | Type | Default Value Description | 
| :---: | :---: | :---: | :---: | :---: |
| tableData | Yes | data of table | Array | - |
| columns | Yes | configuration of columns | Array<[ColDef](#ColDef)> | - |
| pagination | No | configuration of pagination | [PagiDef](#PagiDef) | - |
| toolButton | No | setting of tool buttons on the top-right of table | Array/Boolean | false |
| selectionMode | No | selection mode('single'/'multiple') | String |none |
| indexConfig | No | configuration of index column | Object | `{display: true, mode: 'continuous'}` |
| rowKey | No | unique identifier of each row | String | - |
| showExpandCol | No | whether show expand icon column | Boolean | false |

<a id="ColDef"></a>
#### ColDef
| Name | is Required | Description | Type | Default Value Description | 
| :---: | :---: | :---: | :---: | :---: |
| label | Yes | name of column | String | - |
| prop | Yes | attribute name in data to display  | String | - |
| width | No | width of column | Number | - |
| showSort | No | whether enable sort function | Boolean | false |
| showFilter | No | whether enable filter function | Boolean | false |
| filterType | No | type of filter | String | 'input' |
| filterOptions | No | filter options, only valid if `filterType` is `select` | Array | `[]` |
| inlineEditType | No | cell input type when in editing mode | String | 'input' |
| inlineEditOptions | No | options of cell input, only valid if `inlineEditType` is `select` | Array | `[]` |
<a id="PagiDef"></a>
#### PagiDef
| Name | is Required | Description | Type | Default Value Description | 
| :---: | :---: | :---: | :---: | :---: |
| pageNum | No | current page number | Number | - |
| pageSize | No | item count of each page | Number | - |
| pageSizes | No | options of item count per page | Array | - |
| total | No | total amount of items | Number | 0 |


`iTable` is a secondary encapusulation of the `Table` component of `element plus`. For more configuration, please refer to [Table](https://element-plus.org/en-US/component/table.html)

### Event
| Name | Description | Parameters |
| :---: | :---: | :---: |
| paginationChange | triggers when pageNum or pageSize changes | `{pageNum, pageSize}` |
| selectionChange | triggers when one row is selected | `Array<Row>` |
| refresh | triggers when refresh button is clicked | - |
| export | triggers when export buttion is clicked | - |

### Table Slot
| Slot Name | Description |
| :---: | :---: |
| header-left | top-left area above table  |
| header-right | top-right area above table |
| expand | expanded content of each row |
| index | content of index cell |

### Expose
| Name | Type | Description |
| :---: | :---: | :---: |
| selectedRows | attr | selected rows |
| toggleRowSelection | method | toggle the selection status of rows |
| clearSelection | method | clear current selected rows |