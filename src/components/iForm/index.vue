<template>
  <div :class="{editForm: props.formType !== 'search'}">
    <el-form
      class="t-form"
      ref="formRef"
      :class="className"
      :model="formData"
      :rules="props.formOpts.rules"
      :size="props.formOpts.size || 'default'"
      :label-width="props.formOpts.labelWidth || '120px'"
      :label-position="props.formOpts.labelPosition || 'right'"
      @submit.prevent
      @keyup.enter.native="() => onSearch(formRef)"
      v-bind="$attrs"
    >
      <template v-for="(item, index) in formList" :key="index">
        <el-form-item
          v-if="!item.hidden"
          :prop="item.value"
          :label="item.label"
          :style="getChildWidth(item)"
          :rules="item.rules"
        >
          <template #label>
            <slot v-if="item.labelRender" v-bind="item" />
            <span v-else>{{ item.label }} </span>
          </template>
          <!-- 自定义输入框插槽 -->
          <template v-if="item.slotName">
            <slot :name="item.slotName" :disabled="item.disabled" v-bind="{ value: item.value }"></slot>
          </template>
          <!-- 纯文本展示 -->
          <template v-else-if="item.textShow">
            <span class="text_show">
              {{ item.textValue || formData[item.value] }}
            </span>
          </template>
          <!-- 自定义组件 -->
          <template v-else-if="item.customComp">
            <!-- 右侧弹出抽屉组件 -->
            <component
              v-if="item.showDrawer"
              :is="item.comp"
              v-model="formData[item.value]"
              :disabled="item.disabled"
              :type="item.type"
              :eventType="item.eventType"
              :placeholder="item.placeholder || getPlaceholder(item)"
              :style="{width: item.width||'100%', lineHeight: '100%'}"
              @myhandleSubmit="item.selectChange"
              @showDrawerBefore="item.showDrawerBefore"
              @setRowCheck="item.setRowCheck"
              v-bind="typeof item.bind === 'function' ? item.bind(item) : item.bind"
              v-on="cEvent(item)"
            />
            <!-- 其他组件 -->
            <component 
              v-else
              :is="item.comp"
              :placeholder="item.placeholder || getPlaceholder(item)"
              :disabled="item.disabled"
              :style="{width: item.width||'100%', lineHeight: '100%'}"
              clearable
              filterable
              v-bind="typeof item.bind === 'function' ? item.bind(item) : item.bind"
              v-on="cEvent(item)"
            />
          </template>
          <!-- element plus 嵌套组件：el-select， el-checkbox-group, el-radio-group -->
          <template v-else-if="['el-select', 'el-checkbox-group', 'el-radio-group'].includes(item.comp)">
            <component
              :is="item.comp"
              v-model="formData[item.value]"
              :placeholder="item.placeholder || getPlaceholder(item)"
              :disabled="item.disabled"
              clearable
              filterable
              :style="{ width: item.width || '100%' }"
              @change="handleChangeEvent(item.event, formData[item.value], item)"
              v-bind="typeof item.bind === 'function' ? item.bind(item) : item.bind"
              v-on="cEvent(item)"
            >
              <component
                :is="childCompResolver(item.comp)"
                v-for="(opt, index) in getOptionList(item.options)"
                :key="index"
                :label="opt.label"
                :value="optValueResolver(item, opt)"
              />
            </component>
          </template>
          <!-- element plus 其他类型：el-date-picker el-input.. -->
          <template v-else>
            <component
             :is="item.comp"
             v-model="formData[item.value]"
             :type="item.type"
             :placeholder="item.placeholder || getPlaceholder(item)"
             :disabled="item.disabled"
             :style="{ width: item.width || '100%' }"
             clearable
             filterable
             @change="handleChangeEvent(item.event, formData[item.value], item)"
             v-bind="typeof item.bind === 'function' ? item.bind(item) : item.bind"
             v-on="cEvent(item)"
            />
          </template>
        </el-form-item>
      </template>
      <el-form-item
        v-if="props.formType === 'search'"
        class="search-btn"
        :style="getBtnWidth(formList.length)"
        label=""
      >
        <el-button type="primary" @click="onSearch(formRef)">{{iq_t('query')}}</el-button>
        <el-button @click="onReset">{{iq_t('reset')}}</el-button>
        <el-tooltip
          v-if="showExpandBtn"
          effect="light"
          placement="bottom-start"
          :content="expand ? iq_t('expand') : iq_t('collapse')"
        >
          <el-button @click="expandBtn">
            <el-icon :style="`transform:rotate(${!expand ? '90deg':'270deg'});`"
              >
              <DArrowRight />
            </el-icon>
          </el-button>
        </el-tooltip>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'i-form',
  components: {
    ElInput,
    ElSelect,
    ElOption,
    ElDatePicker,
    ElCheckbox,
    ElCheckboxGroup,
    ElRadio,
    ElRadioGroup,
    ElForm,
    ElFormItem,
    ElButton,
    ElTooltip,
    ElIcon,
    ElInputNumber,
    ElSwitch
  }
}
</script>

<script setup>
import { ref, watch, computed, inject } from 'vue'
import { ElForm, ElFormItem, ElButton, ElSwitch, ElTooltip, ElIcon, ElInput, ElInputNumber, ElSelect, ElOption, ElDatePicker, ElCheckbox, ElCheckboxGroup, ElRadio, ElRadioGroup } from 'element-plus'
import { DArrowRight } from '@element-plus/icons-vue'
import { ConfigInjectKey } from '../iConfigProvider/context'
import LangDict from './lang'
import _ from 'lodash'

const props = defineProps({
  // 绑定表单数据
  modelValue: {
    type: Object,
    default: () => ({})
  },
  // form类名
  className: {
    type: String
  },
  // form类型：search 查询表单 edit 编辑表单
  formType: {
    type: String,
    default: 'search'
  },
  /** 表单配置项说明
   * defaultForm object 表单初始化数据
   * size: 表单大小
   * rules object 验证规则
   * fieldList Array 表单渲染数据
   * labelWidth  String label宽度
   */
   formOpts: {
    type: Object,
    required: true,
  },
  // 一行显示几个输入项;最大值6
  colSize: {
    type: Number,
    default: 6,
    validator: (val) => val > 0 && val <= 6
  }
})

const emits = defineEmits(['handleSearch', 'handleReset', 'handleSubmit', 'handleChangeEvent', 'update:modelValue'])

const globalConfig = inject(ConfigInjectKey)
console.log(globalConfig, 'globalConfig')

// 表单项
const formData = computed({
  get(){
    return props.modelValue
  },
  set(){
    emits('update:modelValue', formData.value)
  }
})
// language
const iq_t = computed(() => (key) => {
  return LangDict[globalConfig?.value?.lang || 'en'][key] || key
})
const formList = ref([])
const formRef = ref(null)

// 表单是否展开，默认为false：只展示前两行
const expand = ref(false)

const showExpandBtn = computed(() => {
  return props.formOpts.fieldList.length > props.colSize * 2
})

// 初始化表单
const init = () => {
  const fieldListCopy = _.cloneDeep(props.formOpts.fieldList)
  // 查询表单默认只展示前两行
  if(props.formType === 'search') {
    const twoRowsNum = props.colSize * 2
    fieldListCopy.forEach((item, idx) => {
      if(idx > twoRowsNum - 1) {
        item.hidden = true
      }
    })
  }

  formList.value = fieldListCopy
}

// 提交表单
const onSearch = (formEl) => {
  if(!formEl) return 
  formEl.validate(valid => {
    if(!valid) {
      return 
    }
    props.formType === 'query' ? emits('handleSearch', formData.value) : emits('handleSubmit', formData.value)
  })
}
// 重置表单
const onReset = (formEl) => {
  Object.keys(formData.value).forEach(key=>{
    switch(typeof formData.value[key])
    {
      case 'string':
        formData.value[key] = ''
        break
      case 'number':
        formData.value[key] = ''
        break
      case 'boolean':
        formData.value[key] = false
        break
      case 'object':
        formData.value[key] = Array.isArray(formData.value[key]) ? [] : {}
        break
      default:
        formData.value[key] = ''
    }
  })
  emits('handleReset')
}

const handleChangeEvent =(type, val, item) => {
  // 去除前后空格
  if (
    item.isTrim &&
    item.comp.includes('el-input') &&
    item.type !== 'password' &&
    item.type !== 'inputNumber'
  ) {
    formData.value[item.value] = formData.value[item.value].trim()
  }
  emits('handleChangeEvent', type, val)
}

// 展开/收起表单
const expandBtn = () => {
  expand.value = !expand.value
  if (expand.value) {
    formList.value.forEach(item => {
      item.hidden = false
    })
  } else {
    const twoRowsNum = props.colSize * 2
    formList.value.forEach((item, idx) => {
      if(idx > twoRowsNum - 1) {
        item.hidden = true
      }
    })
  }
}

// 注册其他监听事件
const cEvent = computed(() => {
  return ({ eventHandler, comp }) => {
    let event = { ...eventHandler }
    let changeEvent = {}
    Object.keys(event).forEach((v) => {
      changeEvent[v] = (e, ids) => {
        if (comp === 't-search') {
          event[v] && event[v](e, ids)
        } else {
          if ((typeof e === 'number' && e === 0) || e) {
            event[v] && event[v](e, props.formOpts)
          } else {
            event[v] && event[v](props.formOpts)
          }
        }
      }
    })
    return { ...changeEvent }
  }
})


// label与输入框的布局方式
const getChildWidth = (item) => {
  if (props.formOpts.labelPosition === 'top') {
    return `flex: 0 1 calc((${
      100 / (item.widthSize || props.colSize)
    }% - 10px));margin-right:10px;`
  } else {
    return `flex: 0 1 ${100 / (item.widthSize || props.colSize)}%;`
  }
}

// 查询，重置按钮的布局方式
const getBtnWidth = (itemNum) => {
  const remain = itemNum % props.colSize
  return `flex: ${parseInt(props.colSize - remain)}`
}

// placeholder的显示
const getPlaceholder = (row) => {
  let placeholder
  if (row.comp && typeof row.comp == 'string') {
    if (row.comp.includes('input')) {
      placeholder = iq_t.value('placeholder_input') + row.label
    } else if (row.comp.includes('select') || row.comp.includes('date')) {
      placeholder = iq_t.value('placeholder_select') + row.label
    } else {
      placeholder = row.label
    }
  }
  return placeholder
}


/**
 * 获取子组件名称
 * @param {*} comp 父组件名称
 */
const childCompResolver = (comp) => {
  switch(comp) {
    case 'el-select': 
      return 'el-option'
    case 'el-radio-group':
      return 'el-radio'
    case 'el-checkbox-group':
      return 'el-checkbox'
    default:
      return ''
  }
}

/**
 * 获取备选项列表
 * @param {Array} list 备选项列表名称
 */
const getOptionList = (opts) => {
  // 如果选项是字符串，则获取配置项的中外部选项列表
  if(typeof opts === 'string') {
    return props.formOpts.externalOptions[opts] || []
  }
  // 如果选项是数组，则直接返回
  return Array.isArray(opts) ? opts : []
}

/**
 * 获取选项绑定值
 * @param {*} item 表单项
 * @param {*} opt 选项
 */
const optValueResolver = (item, opt) => {
  // el select 绑定值
  if(item.comp === 'el-select') {
    // 如果value需要绑定object
    if(item.type === 'select-obj') {
      return opt
    } else {
      return opt.value
    }
  } else {
    return opt.value
  }
}

const formValidate = () => {
  return new Promise((resolve, reject) => {
    formRef.value.validate(valid => {
      if(valid) {
        resolve(valid)
      } else {
        reject(valid)
      }
    })
  })
}

const clearValidate = () => {
  formRef.value.clearValidate()
}

const resetFields = () => {
  formRef.value.resetFields()
}

init()

defineExpose({ formValidate, clearValidate, resetFields })
</script>

<style lang="scss" scoped>
.editForm{
  width: 100%;
  height: 100%;
  background: #fff;
  position: relative;
  .edit-footer{
    background: #fff;
    border-top: 1px solid #d9d9d9;
    bottom: 0;
    justify-content: flex-end;
    left: 0;
    padding: 10px 15px;
    position: absolute;
    right: 0;
    text-align: right;
    z-index: 9;
  }
}

.t-form {
  padding: 12px;
  display: flex;
  flex-wrap: wrap;
  background-color: #fff;
  .el-form-item {
    align-items: center;
    .el-form-item__content {
      .el-input,
      .el-select,
      .el-date-editor,
      .el-textarea {
        width: 100%;
      }

      .el-input-number {
        .el-input {
          width: inherit;
        }
      }
    }
    
  }
  .search-btn{
    :deep(.el-form-item__content){
      justify-content: flex-end;
    }
  }

  // 左对齐
  .asterisk-left {
    .el-form-item__label {
      margin-left: 5px;
    }
  }

  .t-margin-top-5 {
    margin-top: calc(5px);
  }

  .el-input-number {
    .el-input {
      .el-input__inner {
        text-align: left;
      }
    }
  }

  .render_label {
    .el-form-item__label {
      display: flex;
      align-items: center;
      justify-content: flex-end;

      &::before {
        margin-top: 1px;
      }
    }
  }

  // 左对齐
  .render_laber_position_left {
    .el-form-item__label {
      justify-content: flex-start;
    }
  }

  // 顶部对齐
  &.el-form--label-top {
    .render_label {
      .el-form-item__label {
        justify-content: flex-start;
      }
    }
  }

  .label_render {
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }

  .text_show {
    color: var(--el-text-color-primary);
  }

  .slot_label {
    // margin-bottom: 0 !important;
    .el-form-item__content {
      // margin-left: 0 !important;
      label {
        min-width: 108px;
        color: var(--el-text-color-primary);
        text-align: right;
        margin-right: 12px;
      }
    }
  }

  .flex-box {
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
  }

  .flex-ver {
    align-items: center;
    justify-content: center;
  }

  .footer_btn {
    width: 100%;
    display: flex;
    bottom:0;
  }
  
}
</style>