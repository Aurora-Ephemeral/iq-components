<template>
  <el-calendar
    v-bind="$attrs" 
    class="i-calendar"
    ref="calendarRef"
    v-model="currDate"
    :style="{ width: width }"
  >
    <template #header="{ date }">
      <div class="i-calendar__header">
        <div class="i-calendar__header_left">
          <div style="display: flex; align-items: center">
            <el-icon style="margin-right: 4px; cursor: pointer" @click="handleChangeDate('prev-year')"><ArrowLeft /></el-icon>
            {{ date.split(" ")[0] }}
            <el-icon style="margin-left: 4px; cursor: pointer" @click="handleChangeDate('next-year')"><ArrowRight /></el-icon>
          </div>
          <div style="display: flex; align-items: center">
            <el-icon style="margin-right: 4px; cursor: pointer" @click="handleChangeDate('prev-month')"><ArrowLeft /></el-icon>
            {{ date.split(" ")[2] }}
            <el-icon style="margin-left: 4px; cursor: pointer" @click="handleChangeDate('next-month')"><ArrowRight /></el-icon>
          </div>
        </div>
        <div class="i-calendar__header_right">
          <el-button @click="handleChangeDate('today')">Back to Today</el-button>
        </div>
      </div>
    </template>
    <template #date-cell="scope">
      <slot name="date-cell" :data="scope" />
      <!-- 默认展示 -->
      <div class="i-calendar__date" @click="handleClickDate(scope.data.day)">
        {{ scope.data.day.split("-").slice(2).join("") }}
        <div class="i-calendar__mark" v-if="isShowPoint(scope.data.day)">
          
        </div>
      </div>
    </template>
  </el-calendar>
</template>
<script>
export default {
  name: 'iCalendar'
}
</script>
<script setup>
import { ElCalendar, ElButton, ElIcon } from 'element-plus'
import { ArrowLeft, ArrowRight } from '@element-plus/icons-vue'
import { getKW } from '../../utils'
import { ref, onMounted, nextTick, watch, computed, inject  } from 'vue'
import dayjs from 'dayjs'
import LangDict from './lang'
import { ConfigInjectKey } from '../iConfigProvider/context'
// set first day of week to Monday
dayjs.en.weekStart = 1

const props = defineProps({
  modelValue: {
    type: Date,
    default: () => new Date()
  },
  width: {
    type: String,
    default: "424px"
  },
  isShowPoint: {
    type: Function,
    default: () => false
  }
})

const emit = defineEmits(["update:modelValue", "clickDate"])
const currDate = ref(props.modelValue || new Date())
const calendarRef = ref(null)
const kwForFirstWeek = ref('')
const kwForToday = ref('')
const currentYear = new Date().getFullYear();
const activeYear = ref(currentYear)

const globalConfig = inject(ConfigInjectKey)
// language
const iq_t = computed(() => (key) => {
  return LangDict[globalConfig?.value?.lang || 'en'][key] || key
})
const handleChangeDate = (type) => {
  calendarRef.value.selectDate(type)
  nextTick(() => {
    emit("update:modelValue", currDate.value)
  })
}

const handleClickDate = (day) => {
  emit("clickDate", day)
}

const renderKW = async () => {
  // 清空上一次添加的KW
  unMountKW()
  const calendarDiv = document.querySelector('.i-calendar')
  const calendarHeaderParent = calendarDiv.querySelector('.el-calendar-table thead tr')
  const newTh = document.createElement('th')
  newTh.className = 'i-calendar__kw-head'
  newTh.innerHTML = iq_t.value('week')
  calendarHeaderParent.insertBefore(newTh, calendarHeaderParent.firstChild)
  const calendarRows = calendarDiv.querySelectorAll('.el-calendar-table__row')
  calendarRows.forEach((row, index) => {
    const newTd = document.createElement('td')
    newTd.className = 'i-calendar__kw-body'
    const newDiv = document.createElement('div')
    newDiv.classList.add('el-calendar-day', 'i-calendar__date', 'i-calendar__date--kw')
    // 当前年份对应的周数高亮
    if((kwForFirstWeek.value + index) == kwForToday.value && activeYear.value == currentYear) {
      newDiv.classList.add('custom-kw-current')
    }
    if(kwForFirstWeek.value) {
      newDiv.innerHTML = `W${kwForFirstWeek.value + index}`
    }
    newTd.appendChild(newDiv)
    row.insertBefore(newTd, row.firstChild)
  })
}

const unMountKW = () => {
  const header = document.querySelector('.i-calendar__kw-head')
  if(header) {
    header.remove()
  }
  const bodyList = document.querySelectorAll('.i-calendar__kw-body')
  if(bodyList) {
    bodyList.forEach(item => item.remove())
  }
}
// 获取指定日期的kw周数
const fetchKW = (date) => {
  kwForFirstWeek.value = getKW(date)
  renderKW()
}

const formateDate = (date) => {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
}

onMounted(async () => {
  const currentMonth = String(new Date().getMonth() + 1).padStart(2, '0');
  const currDay = String(new Date().getDate()).padStart(2, '0');
  // 获取今日周数
  kwForToday.value = getKW(`${currentYear}-${currentMonth}-${currDay}`)
  fetchKW(`${currentYear}-${currentMonth}-01`)
})

watch(currDate, async (newVal) => {
  const formateDateStr = formateDate(currDate.value)
  const activeMonth = String(currDate.value.getMonth() + 1).padStart(2, '0');
  activeYear.value = currDate.value.getFullYear()
  await nextTick()
  fetchKW(`${activeYear.value}-${activeMonth}-01`)
})
</script>
<style lang="scss" scoped>
.i-calendar {
  width: 424px;
  border: 1px solid #e4e7ed;
  :deep(.i-calendar__date) {
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
  }
  :deep(.el-calendar-day) {
    height: 48px;
  }
  :deep(td) {
    border: 0px;
    &:first-child {
      border: 0px;
    }
  }
  :deep(tr:first-child td) {
    border: 0px;
  }
  :deep(tbody) {
    border: 0px;
  }
  :deep(.i-calendar__date--kw) {
    color: #999;
    &:hover {
      background-color: transparent;
      cursor: default;
    }
  }
  :deep(.custom-kw-current) {
    color: #409eff;
  }
  
  :deep(.el-calendar-table__row) {
    .is-today {
      color: #409eff; 
    }
    .is-selected {
      border-radius: 50%;
    }
  }
}

.i-calendar__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  .i-calendar__header_left {
    display: flex;
    align-items: center;
  }
}
.i-calendar__mark {
  height: 4px;
  width: 4px;
  border-radius: 50%;
  background-color: #409eff;
}
</style>