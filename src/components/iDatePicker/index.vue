<template>
  <el-date-picker 
    v-model="bindDate"
    ref="datePickerRef"
    value-format="YYYY-MM-DD"
    format="YYYY-MM-DD"
    v-bind="$attrs"
    @visible-change="handleVisibleChange"
    @panel-change="handlePanelChange"
    @blur="() => emit('blur')"
    @focus="() => emit('focus')"
    @change="(val) => emit('change', val)"
    @calendar-change="(val) => emit('calendarChange', val)"
    class="i-date-picker"
  >
  </el-date-picker>
</template>
<script>
export default {
  name: 'iDatePicker'
}
</script>
<script setup>
import { ref, onMounted, computed, nextTick, getCurrentInstance, useAttrs, inject } from "vue";
import { ElLoading, ElDatePicker } from "element-plus";
import moment from "moment";
import { getKW } from '../../utils'
import dayjs from 'dayjs'
import LangDict from './lang'
import { ConfigInjectKey } from '../iConfigProvider/context'

dayjs.en.weekStart = 1
const validType = ['date', 'daterange', 'datetimerange', 'dates', 'datetime']
let firstFetch = true 

const props = defineProps({
  modelValue: {
    required: true
  }
})
const attrs = useAttrs()
const datePickerRef = ref(null)
const emit = defineEmits([
  'update:modelValue',
  'kwClick',
  "panelChange",
  "change",
  "blur",
  "focus",
  "calendarChange",
  "visibleChange",
])

const globalConfig = inject(ConfigInjectKey)
// language
const iq_t = computed(() => (key) => {
  return LangDict[globalConfig?.value?.lang || 'en'][key] || key
})

const bindDate = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value)
  }
})
const isRangeType = computed(() => {
  const type = attrs.type
  return type === 'daterange' || type === 'datetimerange'
})

const kwClickable = computed(() => {
  const type = attrs.type
  return ['daterange', 'datetimerange'].includes(type)
})

const handleVisibleChange = async (val) => {
  emit('visibleChange', val)
  if(!val) return 
  const type = attrs.type
  if(type && !validType.includes(type)) return 
  await nextTick()
  // range picker 
  if(isRangeType.value && Array.isArray(bindDate.value)) {
    let startYear
    let startMonth
    let endYear
    let endMonth
    // no select date means show default date 
    if(!bindDate.value.length) {
      startYear = moment().format('YYYY')
      startMonth = moment().format('MM')
      endYear = +startMonth == 12 ? moment().add(1, 'year').format('YYYY') : startYear
      endMonth = +startMonth == 12 ? 1 : moment().add(1, 'month').format('MM')
    } else {
      const [start, end] = bindDate.value
      startYear = moment(start).format('YYYY')
      startMonth = moment(start).format('MM')
      endYear = startMonth == 12 ?  moment(start).add(1, 'year').format('YYYY') : startYear
      endMonth = startMonth == 12 ? 1 : moment(start).add(1, 'month').format('MM')
    }
    const p1 =  fetchKW(`${startYear}-${startMonth}-01`)
    const p2 =  fetchKW(`${endYear}-${endMonth}-01`)
    Promise.all([p1, p2]).then(res => {
      const startKW = res[0] || ''
      const endKW = res[1] || ''
      renderKW({startKW, endKW}, {startYear, startMonth, endYear, endMonth})
    })
  } else if(!isRangeType.value && !Array.isArray(bindDate.value)) {
    const startYear = bindDate.value ? moment(bindDate.value).format('YYYY') : moment().format('YYYY')
    const startMonth = bindDate.value ? moment(bindDate.value).format('MM') : moment().format('MM')
    const date = `${startYear}-${startMonth}-01`
    const res = await fetchKW(date)
    const startKW = res
    renderKW({startKW}, { startYear, startMonth })
  }
  
}

const handlePanelChange = (date) => {
  emit('panelChange', date)
  if(Array.isArray(date) && isRangeType.value) {
    const [start, end] = date
    const startYear = moment(start).format('YYYY')
    const startMonth = moment(start).format('MM')
    const endYear = moment(end).format('YYYY')
    const endMonth = moment(end).format('MM')
    const p1 =  fetchKW(`${startYear}-${startMonth}-01`)
    const p2 =  fetchKW(`${endYear}-${endMonth}-01`)
    Promise.all([p1, p2]).then(res => {
      const startKW = res[0] || ''
      const endKW = res[1] || ''
      renderKW({startKW, endKW}, {startYear, startMonth, endYear, endMonth})
    })
  } else {
    const startYear = moment(date).format('YYYY')
    const startMonth = moment(date).format('MM')
    const finalDate = `${startYear}-${startMonth}-01`
    fetchKW(finalDate).then(res => {
      const startKW = res
      renderKW({startKW}, { startYear, startMonth })
    })
  }
}

const fetchKW = async (date) => {
  try {
    const data = getKW(date)
    return Promise.resolve(data)
  } catch(err) {
    console.error(err)
    return Promise.reject(err)
  } 
}

const renderKW = (kw, yearMonth) => {
  // get panel dom
  const allPopperDoms = document.querySelectorAll('.el-popper')
  
  const panelDom = Array.from(allPopperDoms).find(dom => {
    const hasDisplayNone = dom.style.display === 'none'
    const hasPanelClass = dom.querySelector('.el-picker-panel') !== null
    return !hasDisplayNone && hasPanelClass
  })
  if(!panelDom) return
  // clear old dom first 
  unMountKW(panelDom)
  const dateTableArr = panelDom.querySelectorAll('.el-date-table')
  let trArr = []
  if(dateTableArr.length) {
    dateTableArr.forEach(dateTable => {
      const tr = dateTable.querySelectorAll('tr')
      trArr.push(...tr)
    })
  }
  if(!trArr.length) return
  let groupIdx = 0
  let weekIdx = 0 
  trArr.forEach(tr =>  {
    // no class name means it is a header row 
    if(!tr.className) {
      const headerTh = document.createElement('th')
      headerTh.innerText = iq_t.value('week')
      headerTh.className = 'i-date-picker__kw-header'
      headerTh.style.width = '43px'
      tr.prepend(headerTh)
      // clear week and group count for calculating calendar week
      weekIdx = 0
      groupIdx++
    } else {
      const newTd = document.createElement('span')
      const currWeekNum = groupIdx == 1 ? kw.startKW + weekIdx : kw.endKW + weekIdx
      newTd.innerText = `W${currWeekNum}`
      newTd.className = 'i-date-picker__kw-column'
      if(kwClickable.value) {
        newTd.classList.add('clickable')
        let selectYear = groupIdx == 1 ? yearMonth.startYear : yearMonth.endYear
        let selectMonth = groupIdx == 1 ? yearMonth.startMonth : yearMonth.endMonth
        const firstDayDomOfRow = tr.querySelector('td:first-child')
        const firstDayOfRow = firstDayDomOfRow.querySelector('span')?.innerText
        // if click first row but first day is bigger than 7, then it belongs to previous month
        if(weekIdx == 0 && +firstDayOfRow > 7) {
          selectMonth = +selectMonth == 1 ? 12 : +selectMonth - 1
          selectYear = +selectMonth == 1 ? +selectYear - 1 : selectYear
        }
        newTd.addEventListener('click', () => {
          handleClickKW(selectYear, selectMonth, firstDayOfRow, currWeekNum)
        })
      }
      tr.prepend(newTd)
      weekIdx++
    }
  })
  
}

const handleClickKW = (selectYear, selectMonth, firstDayOfRow, kw) => {
  const valueFormat = attrs.valueFormat || 'YYYY-MM-DD'
  const startDate = moment(`${selectYear}-${selectMonth}-${firstDayOfRow}`).format(valueFormat)
  const endDate = moment(startDate).add(6, 'days').format(valueFormat)
  bindDate.value = [startDate, endDate]
  datePickerRef.value?.handleClose()
  emit('kwClick', {selectYear, selectMonth, kw})
  
}

const unMountKW = (panelDom) => {
  const header = panelDom.querySelectorAll('.i-date-picker__kw-header')
  header.forEach(item => {
    item.remove()
  })
  // clear week column
  const kwColumn = panelDom.querySelectorAll('.i-date-picker__kw-column')
  kwColumn.forEach(item => {
    item.remove()
  })
}
</script>
<style lang="scss">
.i-date-picker__kw-column {
  color: #ccc;
  display: flex;
  height: 100%;
  width: 36px;
  align-items: center;
  justify-content: center;
  padding: 4px 0px;
  &.clickable:hover{
    color: #409eff;
    cursor: pointer;
  }
  
}
.el-date-picker {
  width: fit-content;
}    

.el-date-range-picker {
  width: 656px;
}
</style>