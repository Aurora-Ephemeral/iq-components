<template>
  <div class="i-table-next">
    <div class="i-table-header">
      <div class="i-table-header-left">
        <slot name="header-left"></slot>
      </div>
      <div class="i-table-header-right">
        <slot name="header-right"></slot>
        <div v-if="toolButton" class="default-button-wrapper">
          <el-tooltip v-if="toolButton === true || toolButton.includes('refresh')" :content="iq_t('refresh')" effect="light">
            <el-icon @click="handleRefreshData"><RefreshRight /></el-icon>
          </el-tooltip>
          <el-tooltip :content="iq_t('export')" effect="light" v-if="toolButton === true || toolButton.includes('download')">
            <el-icon @click="handleExport"><Download /></el-icon>
          </el-tooltip>
          <el-tooltip :content="iq_t('selected')" v-if="selectionMode !== 'none'" effect="light">
            <el-icon @click="handleOpenSelectionModal"><Check /></el-icon>
          </el-tooltip>
          <el-tooltip :content="iq_t('colDef')" effect="light" v-if="toolButton === true || toolButton.includes('setting')">
            <el-icon ref="setupBtnRef"><Setting /></el-icon>
          </el-tooltip>
        </div>
      </div>
    </div>
    <div style="flex: 1; overflow: hidden">
      <el-table
        v-bind="$attrs"
        ref="tableRef"
        :data="displayTableData"
        style="width: 100%"
        height="100%"
        :row-key="rowKey"
        @selection-change="handleSelectionChange"
        border
        :class="{ 'i-table-next__drag_sort': dragSort }"
      >
        <!--拖拽排序-->
        <template v-if="dragSort">
          <el-table-column width="50" fixed="left" align="center" >
            <template #default="scope">
              <el-icon style="margin-left: 4px; cursor: move; transform: rotate(90deg)" @click="handleDragSort(scope.row, scope.$index)">
                <More />
              </el-icon>
            </template>
          </el-table-column>
        </template>
        <!-- 自定义列 -->
        <!-- 行选择列 -->
        <template v-if="selectionMode !== 'none'">
          <el-table-column
            v-if="selectionMode === 'multiple'"
            type="selection"
            reserve-selection
            :selectable="(row, index) => selectable(row, index)"
            align="center"
            fixed="left"
            width="60"
          />
          <el-table-column 
            v-else
            align="center"
            fixed="left"
            width="60"
          >
            <template #default="{ row, $index }">
              <el-radio 
                v-model="selectedRowKey" 
                :label="row[rowKey]" 
                :disabled="!selectable(row, $index)"
                @click="handleSingleSelection(row)"
              >{{ '' }}</el-radio>
            </template>
          </el-table-column>
        </template>
        <!-- 扩展列 -->
        <template v-if="showExpandCol">
          <el-table-column type="expand" fixed="left" width="50">
            <template #default="props">
              <slot name="expand" v-bind="props"></slot>
            </template>
          </el-table-column>
        </template>
        <!-- 序号列 -->
        <template v-if="indexConfig.display">
          <el-table-column
            type="index"
            align="center"
            fixed="left"
            width="80"
            :label="iq_t('index')"
          >
            <template #default="scope">
              <slot name="index" v-bind="scope">
                {{ getIndex(scope.$index) }}
              </slot>
            </template>
          </el-table-column>
        </template>
        <!-- 数据展示 -->
        <el-table-column 
          v-for="(item, index) in displayColumns" 
          :key="`${item.prop}-${index}`"
          show-overflow-tooltip
          v-bind="item"
        >
          <template #header="{row, column}">
            <span class="i-table-column-header" :style="{'justifyContent': item.align || 'left'}">
              <span>{{ item.label }}</span>
              <!-- 排序 -->
              <div class="i-table-column-header-sort" v-if="item.showSort">
                <div style="display: flex; flex-direction: column; align-items: center">
                  <el-icon 
                    class="i-table-column-header-sort-icon"
                    :class="{'i-table-column-header-icon-active': tableSearchForm.sortBy === column.property && tableSearchForm.sortMode === 'asc'}" 
                    style="margin-bottom: -6px; margin-top: -3px;"
                    @click="handleSortChange(column.property, 'asc')"
                  >
                    <CaretTop />
                  </el-icon>
                  <el-icon 
                    class="i-table-column-header-sort-icon"
                    :class="{'i-table-column-header-icon-active': tableSearchForm.sortBy === column.property && tableSearchForm.sortMode === 'desc'}"
                    @click="handleSortChange(column.property, 'desc')"
                  >
                    <CaretBottom />
                  </el-icon>
                </div>
              </div>
              <!-- 筛选 -->
              <div class="i-table-column-header-filter" v-if="item.showFilter">
                <el-popover trigger="click" :width="item.popoverWidth || 200">
                  <template #reference>
                    <el-icon 
                      class="i-table-column-header-filter-icon" 
                      
                    >
                      <Filter />
                    </el-icon>
                  </template>
                  <el-date-picker 
                    v-if="item.filterType === 'date'"
                    v-model="tableSearchForm.filter[column.property]"
                    format="YYYY-MM-DD"
                    value-format="YYYY-MM-DD"
                    
                  />
                  <el-date-picker 
                    v-else-if="item.filterType === 'daterange'"
                    v-model="tableSearchForm.filter[column.property]"
                    :format="item.filterDateFormat || 'YYYY-MM-DD'"
                    :value-format="item.filterDateFormat || 'YYYY-MM-DD'"
                    :start-placeholder="iq_t('startDate')"
                    :end-placeholder="iq_t('endDate')"
                    :teleported="false"
                    type="daterange"
                  />
                  <el-select
                    v-else-if="item.filterType === 'select'"
                    multiple
                    collapse-tags
                    v-model="tableSearchForm.filter[column.property]"
                    :placeholder="`${iq_t('placeholder_select')}${item.label}`"
                  >
                    <el-option 
                      v-for="option in item.filterOptions" 
                      :key="option.value" 
                      :label="option.label" 
                      :value="option.value" 
                    />
                  </el-select>
                  <div v-else-if="item.filterType === 'number'" class="i-table__number-filter_group">
                    <div class="i-table__number-filter_group-item">
                      <span> {{ '>' }} </span>
                      <el-input-number v-model="tableSearchForm.filter[column.property].gt" :placeholder="iq_t('greater')" :controls="false" />
                    </div>
                    <div class="i-table__number-filter_group-item">
                      <span> {{ '<' }} </span>
                      <el-input-number v-model="tableSearchForm.filter[column.property].lt" :placeholder="iq_t('smaller')" :controls="false"/>
                    </div>
                    <div class="i-table__number-filter_group-item">
                      <span> = </span>
                      <el-input-number v-model="tableSearchForm.filter[column.property].eq" :placeholder="iq_t('equal')" :controls="false"/>
                    </div>
                    <div class="i-table__number-filter_group-item">
                      <span> != </span>
                      <el-input-number v-model="tableSearchForm.filter[column.property].ne" :placeholder="iq_t('notEqual')" :controls="false"/>
                    </div>
                  </div>
                  <el-input 
                    v-else 
                    v-model="tableSearchForm.filter[column.property]"
                    :placeholder="`${iq_t('placeholder_input')}${item.label}`"
                    clearable 
                  >
                    <template #prefix>
                      <el-icon>
                        <Search />
                      </el-icon>
                    </template>
                  </el-input>
                  <!-- <div class="i-table-divider" />
                  <div style="display: flex; justify-content: flex-end">
                    <el-button size="small" link @click="handleClearFilter">重置</el-button>
                    <el-button type="primary" size="small" link @click="handleFilter()">搜索</el-button>
                  </div> -->
                </el-popover>
              </div>
            </span>
          </template>
          <template #default="scope">
            <slot :name="item.slotName" v-bind="scope" v-if="item.slotName">
              <!-- 兜底展示逻辑 -->
             {{ getPropertyValue(scope.row, scope.column.property) }} 
            </slot>
            <div v-else>
              <div v-if="scope.row['__inlineEdit'] === true && item.disableEdit !== true">
                <el-select 
                  v-if="item.inlineEditType === 'select'"
                  v-model="scope.row[scope.column.property]"
                  :placeholder="`${iq_t('placeholder_select')}${item.label}`"
                  clearable
                  style="width: 100%;"
                  v-bind="typeof item.inlineEditProps === 'function' ? item.inlineEditProps(scope.row) : item.inlineEditProps"
                >
                  <el-option
                    v-for="option in item.inlineEditOptions"
                    :key="option.value"
                    :label="option.label"
                    :value="option.value"
                  />
                </el-select>
                <el-date-picker 
                  v-else-if="item.inlineEditType === 'date'"
                  v-model="scope.row[scope.column.property]"
                  value-format="YYYY-MM-DD"
                  format="YYYY-MM-DD"
                  type="date"
                  style="width: 100%;"
                  :placeholder="`${iq_t('placeholder_select')}${item.label}`"
                  v-bind="typeof item.inlineEditProps === 'function' ? item.inlineEditProps(scope.row) : item.inlineEditProps"
                />
                <el-input-number 
                  v-else-if="item.inlineEditType === 'number'"
                  v-model="scope.row[scope.column.property]"
                  :placeholder="`${iq_t('placeholder_input')}${item.label}`"
                  controls-position="right"
                  style="width: 100%;"
                  v-bind="typeof item.inlineEditProps === 'function' ? item.inlineEditProps(scope.row) : item.inlineEditProps"
                />
                <el-input 
                  v-else
                  v-model="scope.row[scope.column.property]"
                  :placeholder="`${iq_t('placeholder_input')}${item.label}`"
                  v-bind="typeof item.inlineEditProps === 'function' ? item.inlineEditProps(scope.row) : item.inlineEditProps"
                />
              </div>
              <div class="i_table__cell" v-else>
                {{ getPropertyValue(scope.row, scope.column.property) }} 
              </div>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="i-pagination-wrapper" v-if="pagination">
      <div class="i-pagination-info">
        <el-icon color="#409eff"><InfoFilled /></el-icon>
        <span>{{`${iq_t('total')} ${total} ${iq_t('item')}` }}</span>
        <span v-if="selectionMode !== 'none'">{{ `${iq_t('selected')} ${selectedRows.length} ${iq_t('item')}`  }}</span>
        <el-button v-if="selectedRows.length > 0" link type="primary" @click="handleClearSelections">{{  iq_t('clear') }}</el-button>
      </div>
      <div style="display: flex; align-items: center; justify-content: flex-end">
        <el-pagination 
          v-model:current-page="currentPage"
          :page-sizes="pagination.pageSizeOptions"
          v-model:page-size="pageSize"
          :total="total"
          layout="prev, pager, next"
          background
          @current-change="handleCurrentChange"
          @size-change="handlePageSizeChange"
        />
        <el-select 
          v-model="pageSize"
          style="margin-left: 8px; width: 80px;"
          @change="handlePageSizeChange"
        >
          <el-option v-for="size in pagination.pageSizeOptions" :key="size" :value="size">
            {{ `${size}/${iq_t('page')}` }}
          </el-option>
        </el-select>
      </div>
    </div>
    <el-popover 
      ref="setupPopoverRef"
      :virtual-ref="setupBtnRef"
      trigger="click"
      virtual-triggering
      style="width: fit-content;"
    >
      <div class="i-table-column-setup">
        <div class="i-table-column-setup-fixed-left">
          <draggable 
            v-model="fixedLeftColumns"
            item-key="prop"
            handle=".i-table-drag-icon"
          >
            <template #item="{element, index}">
              <li>
                <div style="display: flex; align-items: center; flex: 1; overflow: hidden">
                  <el-checkbox v-model="element.isShow">
                  </el-checkbox>
                  <el-icon style="margin-left: 4px; cursor: move; transform: rotate(90deg)" class="i-table-drag-icon"><More /> </el-icon>
                  <span class="overflow-tooltip" style="margin-left: 4px">{{ element.label }}</span>
                </div>
                <el-icon style="margin-left: 4px; cursor: pointer" @click="handleCancelFixed(element, index, 'left')"> <CircleClose /></el-icon>
              </li>
            </template>
          </draggable>
          <transition-group name="i-table-column-setup-item" tag="ul">
            
          </transition-group>
        </div>
        <div class="i-table-divider" />
        <div class="i-table-column-setup-item">
          <draggable 
            v-model="normalColumns"
            item-key="prop"
            handle=".i-table-drag-icon"
          >
            <template #item="{element, index}">
              <li>
                <div style="display: flex; align-items: center; flex: 1; overflow: hidden">
                  <el-checkbox v-model="element.isShow">
                  </el-checkbox>
                  <el-icon style="margin-left: 4px; cursor: move; transform: rotate(90deg)" class="i-table-drag-icon"><More /> </el-icon>
                  <span class="overflow-tooltip" style="margin-left: 4px">{{ element.label }}</span>
                </div>
                <div>
                  <el-icon title="固定左侧" style="cursor: pointer; transform: rotate(90deg)" @click="handleFixLeft(element, index)"> <Download /></el-icon>
                  <el-icon title="固定右侧" style="cursor: pointer; transform: rotate(-90deg)" @click="handleFixRight(element, index)"> <Download /></el-icon>
                </div>
              </li>
            </template>
          </draggable>
        </div>
        <div class="i-table-divider" />
        <div class="i-table-column-setup-fixed-right">
          <draggable 
            v-model="fixedRightColumns"
            item-key="prop"
            handle=".i-table-drag-icon"
          >
            <template #item="{element, index}">
              <li>
                <div style="display: flex; align-items: center; flex: 1; overflow: hidden">
                  <el-checkbox v-model="element.isShow">
                  </el-checkbox>
                  <el-icon class="i-table-drag-icon" style="margin-left: 4px; cursor: move; transform: rotate(90deg)"><More /> </el-icon>
                  <span class="overflow-tooltip" style="margin-left: 4px">{{ element.label }}</span>
                </div>
                <el-icon style="margin-left: 4px; cursor: pointer" @click="handleCancelFixed(element, index, 'right')"> <CircleClose /></el-icon>
              </li>
            </template>
          </draggable>
        </div>
      </div>
    </el-popover>
    <el-dialog
      title="已选数据"
      v-model="showCart"
      width="960px"
    >
      <el-table
        :data="selectedRows"
      >
        <el-table-column type="index" label="序号" width="80" />
        <el-table-column v-for="column in displayDataColumns" :key="column.prop" :prop="column.prop" :label="column.label" show-overflow-tooltip />
        <el-table-column label="操作" width="80" fixed="right" >
          <template #default="{row, index}">
            <el-button type="danger" link @click="handleClearSelectedRow(index)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>
<script setup>
import { Download, Setting, RefreshRight, Check, InfoFilled, CaretTop, CaretBottom, Filter, Search, CircleClose,More } from "@element-plus/icons-vue";
import { computed, ref, watchEffect, nextTick, reactive, watch, useAttrs, onMounted, inject } from "vue";
import draggable from 'vuedraggable'
import { ElTable, ElTableColumn, ElButton, ElPopover, ElCheckbox, ElDialog, ElIcon, ElSelect, ElOption, ElInput } from "element-plus";
import * as XLSX from 'xlsx';
import LangDict from './lang'
import { ConfigInjectKey } from '../iConfigProvider/context'

const props = defineProps({
  // 表格数据
  tableData: {
    type: Array,
    default: () => []
  },
  columns: {
    type: Array,
    default: () => []
  },
  loading: {
    type: Boolean,
    default: false
  },
  pagination: {
    type: Object
  },
  total: {
    type: Number,
    default: 0
  },
  toolButton: {
    type: [Boolean, Array],
    default: true
  },
  requestApi: {
    type: Function  
  },
  selectionMode: {
    type: String,
    default: 'none' // none | single | multiple
  },
  selectable: {
    type: Function,
    default: () => true 
  },
  indexConfig: {
    type: Object,
    default: () => ({display: true, mode: 'continuous'})
  },
  rowKey: {
    type: String
  },
  showExpandCol: {
    type: Boolean,
    default: false
  },
  dragSort: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['paginationChange', 'selectionChange', 'dragSortChange', 'refresh'])

const globalConfig = inject(ConfigInjectKey)

const currentPage = ref(props.pagination?.pageNum || 1)

const attrs = useAttrs()
watch(
  () => props.pagination?.pageNum,
  (newVal) => {
    currentPage.value = newVal
  }
)
const pageSize = ref(props.pagination?.pageSize || 10)
watch(
  () => props.pagination?.pageSize,
  (newVal) => {
    pageSize.value = newVal
  }
)

const displayTableData = ref([])
const displayColumns = ref([])
const setupBtnRef = ref(null)
const setupPopoverRef = ref(null)
const selectedRows = ref([])
const selectedRowKey = ref('')
const tableSearchForm = reactive({
  sortBy: '',
  sortMode: '',
  filter: {},
})
const tableRef = ref(null)
const fixedLeftColumns = ref([])
const fixedRightColumns = ref([])
const normalColumns = ref([])
// language
const iq_t = computed(() => (key) => {
  return LangDict[globalConfig?.value?.lang || 'en'][key] || key
})
const displayDataColumns = computed(() => {
  return displayColumns.value.filter(item => !item.slotName)
})
const showCart = ref(false)
const handleRefreshData = () => {
  emit('refresh')
}

const handleExport = () => {
  // 用户传入的onExport方法
  if(attrs['onExport']) {
    attrs['onExport'](tableSearchForm)
    return 
  }
  // 默认导出
  const header = displayColumns.value.filter(item => item.noExport !== true)
  const toExportTableData = displayTableData.value.map(item => {
    // TODO: 处理插槽中转义的数据
    return header.map(col => item[col.prop] || '')
  })
  const excelData = [header.map(item => item.label), ...toExportTableData]
  const ws = XLSX.utils.aoa_to_sheet(excelData)
  const wb = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(wb, ws, 'Sheet1')
  XLSX.writeFile(wb, 'tableData.xlsx')
}

// 打开已选弹窗
const handleOpenSelectionModal = () => {
  showCart.value = true
}
// 清除选中数据
const handleClearSelectedRow = (index) => {
  const removeSelectedRow = selectedRows.value.splice(index, 1)[0]
  tableRef.value.toggleRowSelection(removeSelectedRow, false)
  emit('selectionChange', selectedRows.value)
}

// 页码改变
const handleCurrentChange = (val) => {
  emit('paginationChange', {pageNum: val, pageSize: pageSize.value})
}
// 每页条数改变
const handlePageSizeChange = (val) => {
  emit('paginationChange', {pageNum: currentPage.value, pageSize: val})
}
// 展示序号
const getIndex = (rowIndex) => {
  // 如果序号配置为连续
  if(props.indexConfig.mode === 'continuous' && props.pagination) {
    return rowIndex + 1 + ((props.pagination?.pageNum || 1) - 1) * (props.pagination?.pageSize || 10)
  } else {
    return rowIndex + 1
  }
}
// 行多选
const handleSelectionChange = (val) => {
  selectedRows.value = val
  emit('selectionChange', val)
}
// 行单选
const handleSingleSelection = (row) => {
  if(row.__selectionDisabled) {
    return
  }
  handleSelectionChange([row])
}
// 清空选中行
const handleClearSelections = () => {
  tableRef.value.clearSelection()
  selectedRows.value = []
  selectedRowKey.value = ''
  emit('selectionChange', [])
}
// 排序
const handleSortChange = (prop, mode) => {
  // 重复点击视为取消
  if(tableSearchForm.sortBy === prop && tableSearchForm.sortMode === mode) {
    tableSearchForm.sortBy = ''
    tableSearchForm.sortMode = ''
  } else {
    tableSearchForm.sortBy = prop
    tableSearchForm.sortMode = mode
  }
  // 如果传入自定义排序函数，则执行自定义方法
  if(attrs['onSortChange']) {
    attrs['onSortChange']({orderByColumn: tableSearchForm.sortBy, isAsc: tableSearchForm.sortMode}) 
  }
}
// 筛选
const handleFilterChange = (prop, value) => {
  tableSearchForm.filter[prop] = value
}
// 清空筛选
const handleClearFilter = (prop) => {
  delete tableSearchForm.filter[prop]
}
// 取消固定
const handleCancelFixed = (column, index, type) => {
  delete column.fixed 
  if(type === 'left') {
    const moveItem = fixedLeftColumns.value.splice(index, 1)
    normalColumns.value.unshift(moveItem[0])
  } else {
    const moveItem = fixedRightColumns.value.splice(index, 1)
    normalColumns.value.push(moveItem[0])
  }
}
// 列添加属性
const handleFixLeft = (column, index) => {
  column.fixed = 'left'
  const moveItem = normalColumns.value.splice(index, 1)
  fixedLeftColumns.value.push(moveItem[0])
}
const handleFixRight = (column, index) => {
  column.fixed = 'right'
  const moveItem = normalColumns.value.splice(index, 1)
  fixedRightColumns.value.unshift(moveItem[0])
}
// 链式访问
const getPropertyValue = (row, prop) => {
  if(typeof prop !== 'string') return "";
  try {
    const data = prop.split('.').reduce((item, key) => item[key], row);
    return data
  } catch(e) {
    console.error(e)
    return ""
  }
}

// 筛选，排序，分页导致表格数据变化 重新渲染
watchEffect(() => {
  displayTableData.value = []
  // 如果存在筛选条件, 则对表格数据进行筛选
  let formateData = [...props.tableData]
  if(Object.keys(tableSearchForm.filter).length > 0) {
    formateData = props.tableData.filter(row => {
      return Object.entries(tableSearchForm.filter).every(([key, value]) => {
        if(!value || value === '' || Array.isArray(value) && value.length === 0 || typeof value === 'object' && Reflect.ownKeys(value).length === 0) return true
        const tableValue = getPropertyValue(row, key) 
        if(value instanceof Array) {
          // 如果筛选值是数组，则筛选类型可能是日期范围或者选择多选
          const filterType = props.columns.find(col => col.prop === key)?.filterType
          // 如果筛选条件为日期范围
          if(filterType === 'daterange' && value.length === 2) {
            const [start, end] = value
            return new Date(tableValue) >= new Date(start) && new Date(tableValue) <= new Date(end)
          } 
          return value.includes(tableValue)
        } else if (typeof value === 'string') {
          if(typeof tableValue === 'string') {
            const filterMode = props.columns.find(col => col.prop === key)?.filterMode || 'in'
            return filterMode === 'in' ? tableValue?.includes(value) : tableValue == value
          } else if (typeof tableValue === 'number') {
            return tableValue === Number(value)
          }
          return tableValue === value
        } else if (typeof value === 'object') {
          // 如果筛选值是对象，则筛选类型可能是数字范围
          let flag = true 
          if(value.gt || value.gt === 0) {
            flag &&= tableValue > value.gt
          }
          if(value.lt || value.lt === 0) {
            flag &&= tableValue < value.lt
          }
          if(value.eq || value.eq === 0) {
            flag &&= tableValue === value.eq
          }
          if(value.ne || value.ne === 0) {
            flag &&= tableValue !== value.ne
          }
          return flag
        } else {
          return tableValue === value
        }
      })
    })
  }
  // 如果存在排序条件且没有自定义排序函数, 则对表格数据进行排序
  if(tableSearchForm.sortBy && !attrs['onSortChange']) {
    formateData = formateData.sort((a, b) => {
      const aValue = getPropertyValue(a, tableSearchForm.sortBy)
      const bValue = getPropertyValue(b, tableSearchForm.sortBy)
      if(typeof aValue === 'string') {
        return tableSearchForm.sortMode === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue)
      } else {
        return tableSearchForm.sortMode === 'asc' ? aValue - bValue : bValue - aValue
      }
    })
  }
  nextTick(() => {
    displayTableData.value = formateData
  })
})

watch(displayTableData, newVal => {
  if(props.dragSort) {
    // 如果dragSort为true，则将表格每行draggable 设为 true
    nextTick(() => {
      const allTableRows = document.querySelectorAll('.i-table-next__drag_sort .el-table__row')
      allTableRows.forEach(row => {
        row.setAttribute('draggable', true)
        row.style.cursor = 'move'
      })
    })
  }
}) 

// 列排序，列筛选，固定左右侧导致column变化 重新渲染
watchEffect(() => {
  // displayTableColumns.value = 
  const sortedColumns = [...fixedLeftColumns.value, ...normalColumns.value, ...fixedRightColumns.value]
  //筛选出需要显示的列
  displayColumns.value = sortedColumns.filter(column => {
    return column.isShow
  })
})

// 监听传入列数据变化
watch(() => props.columns, (newVal) => {
  if(!newVal) return
  const filteredColumns = newVal.filter(col => !col.hidden).map(col => {
    col.isShow = true
    return col
  })
  fixedLeftColumns.value = filteredColumns.filter(column => column.fixed === 'left')
  fixedRightColumns.value = filteredColumns.filter(column => column.fixed === 'right')
  normalColumns.value = filteredColumns.filter(column => !column.fixed)
  // 初始化筛选数据
  filteredColumns.forEach(column => {
    if(column.showFilter) {
      switch(column.filterType) {
        case 'daterange':
          tableSearchForm.filter[column.prop] = []
          break;
        case 'select':
          tableSearchForm.filter[column.prop] = []
          break;
        case 'number':
          tableSearchForm.filter[column.prop] = {}
          break;
        default:
          tableSearchForm.filter[column.prop] = ''
      }
    }
  })
}, { deep: true, immediate: true })

onMounted(() => {
  if(props.dragSort) {
    const tbodyDom = document.querySelector('.i-table-next__drag_sort .el-table__body tbody')
    let source
    let sourceIndex
    let targetIndex
    tbodyDom.addEventListener('dragstart', (e) => {
      source = e.target
      sourceIndex = Array.from(tbodyDom.children).indexOf(source)
      setTimeout(() => {
        e.target.classList.add('dragging')
      }, 0);
    })
    tbodyDom.addEventListener('dragover', (e) => {
      const target = e.target.closest('tr[draggable="true"]');
      if(!source || !target || e.target === tbodyDom || e.target === source) return
      
      const currTargetIndex = Array.from(tbodyDom.children).indexOf(target)
      const currSourceIndex = Array.from(tbodyDom.children).indexOf(source)
      // drag into the target element after source element
      if(currTargetIndex > currSourceIndex ) {
        tbodyDom.insertBefore(target, source)
        targetIndex = currTargetIndex
      } else if ( currSourceIndex > currTargetIndex ) {
        // drag into the target element before source element
        tbodyDom.insertBefore(source, target)
        targetIndex = currTargetIndex
      }
    })
    tbodyDom.addEventListener('dragend', (e) => {
      e.target.classList.remove('dragging')
      // 将拖拽数据插入到指定位置
      if(sourceIndex !== null && targetIndex !== null) {
        // 如果源序号和新序号相等，则不进行任何操作
        if(sourceIndex === targetIndex) return
        const newTableData = JSON.parse(JSON.stringify(props.tableData))
        const toInsertData = newTableData.splice(sourceIndex, 1)[0]
        if(targetIndex > sourceIndex) {
          newTableData.splice(targetIndex, 0, toInsertData)
          
        } else if (targetIndex < sourceIndex) {
          newTableData.splice(targetIndex, 0, toInsertData)
        } 
        emit('dragSortChange', { sourceIndex, targetIndex, newTableData })
      }
      source = null
      targetIndex = null
      sourceIndex = null
    })
  }
})

// 对外暴露方法-选择某些行
const toggleRowSelection = (row, selected) => {
  tableRef.value.toggleRowSelection(row, selected)
}

// 对外暴露方法-清空选中行
const clearSelection = () => {
  tableRef.value.clearSelection()
}

defineExpose({
  selectedRows,
  toggleRowSelection,
  clearSelection
})
</script>

<script>
export default {
  name: 'i-table',
}
</script>
<style lang="scss" scoped>
.i-table-next {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background: #fff;
  padding: 16px;
  .i-table-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 8px;
  }
  .i-table-header-right {
    display: flex;
    align-items: center;
    .default-button-wrapper {
      i + i {
        margin-left: 8px;
      }
      i {
        cursor: pointer;
      }
    }
  }
  .i-pagination-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 8px;
    :deep(.el-select .el-input) {
      height: 32px;
    }
  }
  .i-pagination-info {
    font-size: 14px;
    border: 1px solid #dcdfe6;
    padding: 4px 8px;
    display: flex;
    align-items: center;
    letter-spacing: 1px;
    span {
      margin-left: 4px;
    }
  }
  .i-table-column-header {
    display: flex;
    align-items: center;
  }
  .i-table-column-header-sort-icon,
  .i-table-column-header-filter-icon {
    cursor: pointer;
    margin-left: 2px;
  }
  .i-table-column-header-icon-active {
    color: #409eff;
  }
}
.i-table-divider {
  margin: 8px 0px;
  border-top: 1px solid #dcdfe6;
}
.i-table-column-setup {
  .overflow-tooltip {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  ul {
    list-style: none;
    padding: 0;
  }
  li {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 24px;
  }
}
.i-table-column-setup-item-enter-active,
.i-table-column-setup-item-leave-active {
  transition: all 0.5s;
}
.i-table__number-filter_group-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  & > span {
    width: 18px;
  }
  & + & {
    margin-top: 4px;
  }
}

.i_table__cell {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.i-table-drag-icon {
  margin-left: 4px; 
  cursor: move; 
  transform: rotate(90deg)
}

:deep(.el-table__row.dragging) {
  background: #f5f7fa;
  color: transparent;
}
</style>