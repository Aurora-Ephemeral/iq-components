<template>
  <el-switch 
    v-model="selectionMode" 
    active-text="单选"
    active-value="single"
    inactive-value="multiple" 
    inactive-text="多选"  
  />
  <div style="height: 400px;">
    <i-table-next
      :tableData="data"
      :columns="columns"
      :pagination="pagination"
      :total="20"
      :selectionMode="selectionMode"
      @paginationChange="handlePageChange"
      rowKey="id"
      :onExpandChange="handleExpandChange"
      :selectable="checkSelectable"
      showExpandCol
      dragSort
      @refresh="handleRefresh"
      @export="handleExport"
      @dragSortChange="handleSortChange"
    >
      <template #header-left>
        <el-button type="primary" @click="handleAdd">新建</el-button>
      </template>
      <template #header-right>
        <el-tag>总计工时： 11000</el-tag>
      </template>
      <template #expand="{ row }">
        <div>{{ row.name }}的详细信息</div>
      </template>
      <template #operation="{ row }">
        <div v-if="row.__inlineEdit">
          <el-button type="primary" link @click="handleSave(row)">保存</el-button>
          <el-button type="danger" link @click="handleCancel(row)">取消</el-button>
        </div>
        <div v-else>
          <el-button type="primary" link @click="handleEdit(row)">编辑</el-button>
          <el-button type="danger" link>删除</el-button>
        </div>
      </template>
    </i-table-next>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import iTableNext from '@/components/iTableNext/index.vue'
import { ElMessage } from 'element-plus'

const isEdit = ref(false)
const selectionMode = ref('single')
const data = ref([
  {
    id: 1,
    name: '张三张三张三张三张三张三张三张三',
    age: 20,
    sex: '男',
    province: '北京市',
    city: '北京市',
    street: '朝阳区',
    number: '100号',
    birth: '1990-01-01',
    __selectionDisabled: true
  },
  {
    id: 2,
    name: '李四',
    age: 18,
    sex: '男',
    province: '上海市',
    city: '上海市',
    street: '浦东新区',
    number: '200号',
    birth: '1995-01-01'
  },
  {
    id: 3,
    name: '王五',
    age: 22,
    sex: '女',
    province: '广东省',
    city: '深圳市',
    street: '南山区',
    number: '300号',
    birth: '1993-01-01'
  },
  {
    id: 4,
    name: '赵六',
    age: 25,
    sex: '男',
    province: '浙江省',
    city: '杭州市',
    street: '西湖区',
    number: '400号',
    birth: '1992-01-01'
  },
  {
    id: 5,
    name: '钱七',
    age: 30,
    sex: '女',
    province: '江苏省',
    city: '南京市',
    street: '玄武区',
    number: '500号',
    birth: '1991-01-01'
  }
])

const columns = [
  {
    label: '姓名',
    prop: 'name',
    width: 100,
    showSort: true,
    showFilter: true,
    filterMode: 'equal',
  },
  {
    label: '年龄',
    prop: 'age',
    width: 100,
    showSort: true,
    showFilter: true,
    inlineEditType: "number",
    filterType: 'number',
    popoverWidth: 100
  },
  {
    label: '性别',
    prop: 'sex',
    width: 100,
    showSort: true,
    showFilter: true,
    inlineEditType: "select",
    inlineEditOptions: [
      {
        label: '男',
        value: '男'
      },
      {
        label: '女',
        value: '女'
      }
    ]
  },
  {
    label: '出生日期',
    prop: 'birth',
    width: 160,
    showSort: true,
    showFilter: true,
    inlineEditType: "date",
    filterType: 'daterange',
    popoverWidth: 400
  },
  {
    label: '省份',
    prop: 'province',
    width: 200,
    showSort: true,
    showFilter: true,
  },
  {
    label: '城市',
    prop: 'city',
    width: 200,
    showSort: true,
    showFilter: true,
  },
  {
    label: '街道',
    prop: 'street',
    width: 200,
    showSort: true,
    showFilter: true,
  },
  {
    label: '操作',
    prop: 'operation',
    slotName: 'operation',
    width: 160,
    fixed: 'right',
    align: 'center',
    noExport: true
  }
]

const pagination = {
  pageNum: 1, 
  pageSize: 10,
  pageSizes: [10, 20, 30, 40, 50, 100],
  total: data.length
}
let cachedRow
const handleEdit = (row) => {
  row.__inlineEdit = true 
  isEdit.value = true
  cachedRow = JSON.parse(JSON.stringify(row))
}

const handleSave = (row) => {
  row.__inlineEdit = false
  isEdit.value = false
}

const handleCancel = (row) => {
  isEdit.value = false
  Object.assign(row, cachedRow)
  row.__inlineEdit = false
}

const handleAdd = () => {
  isEdit.value = true
  data.value.push({
    name: '',
    age: '',
    sex: '',
    province: '',
    city: '',
    street: '',
    number: '',
    birth: '',
    __inlineEdit: true
  })
}

const handleExport = (params) => {
  ElMessage.success('触发导出接口, 参数：' + JSON.stringify(params))
}

const handleRefresh = () => {
  ElMessage.success('触发刷新接口')
}

const handlePageChange = (page) => {
  console.log(page)
}

const handleExpandChange = (row, expanded) => {
  console.log(row, expanded)
}

const checkSelectable = (row, index) => {
  if(index === 0) {
    return false
  }
  return true
}

const handleSortChange = (params) => {
  console.log('触发排序接口, 参数：', params)
  data.value = params.newTableData
}
</script>
<style scoped>

</style>