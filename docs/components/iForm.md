<script setup>
import { Warning } from '@element-plus/icons-vue'

</script>
<style scoped>
  button {
    border: none;
    background-color: transparent;
  }
</style>

# Form 
## Basic Usage
- `iForm` can be used for querying or submitting data. 
- The default mode is querying. In querying mode, Form displays two rows by default and other items hidden.
- the configuration of `iForm` is controlled by `formOpts`, which is a object. It includes the configuration of each form item, form layout etc. Use `v-model` to bind the data of the form.
- `colSize` prop can control the number of item in one row.
- `handleSeach` and `handleReset` events are triggered when the search button and reset button are clicked respectively.

:::demo
```vue
 <template>
  <i-form
    v-model="formData"
    :formOpts=" formConfig"
    :colSize="2"
    @handleSearch="handleSearch"
    @handleReset="handleReset"
  />
</template>
<script setup>
  import { ref } from 'vue';
  const formConfig = {
    labelWidth: '90px',
    defaultForm: {
      mtrStandardCode: '',
      mtrStandardNumber: '',
      createTime: [],
      states: '',
      priority: '',
      isPublish: false
    },
    fieldList: [
      {
        label: 'Number',
        value: 'mtrStandardNumber',
        comp: 'el-input-number',
        type: 'input',
        bind: {
          min: 0,
          max: 1000,
          precision: 2,
          controlsPosition: 'right'
        } // bind can be used to bind the attributes of the components of element-plus
      },
      {
        label: 'Time',
        value: 'createTime',
        type: 'daterange',
        comp: 'el-date-picker',
        bind: {
          format: 'YYYY-MM-DD',
          valueFormat: 'YYYY-MM-DD'
        }
      },
      {
        label: 'Published',
        value: 'isPublish',
        comp: 'el-switch',
      },
      {
        label: 'status',
        value: 'states',
        comp: 'el-select',
        type: 'select-arr',
        options: [
          { label: 'draft', value: '0' },
          { label: 'published', value: '1' },
          { label: 'updating', value: '2' }
        ],
        bind: {
          multiple: true
        }
      }
    ],
  }

  const formData = ref({
    ...formConfig.defaultForm
  })

  const handleSearch = () => {
    // search logic 
  }
  
  const handleReset = () => {
    // reset logic 
  }
</script>
```
:::

## Submit Form 
- you can set `formType = 'edit'` to switch form to submit mode.
- in submit mode, the query and reset buttons are disappeared. You can use `v-model` to bind the data of the form. The submit button should be implemented by developers themselves.
- the form can also be submitted by pressing the Enter key. In this case, the `handleSubmit` event is triggered.
:::demo
```vue
<template>
  <i-form
    v-model="formData"
    :formOpts=" formConfig"
    formType = "edit"
    :colSize="2"
    @handleSubmit="handleSubmit"
  />
  <el-button style="float: right" type="primary" @click="handleSubmit">Submit</el-button>
</template>
<script setup>
  import { ref } from 'vue';
  import { ElMessage } from 'element-plus';
  const formConfig = {
    labelWidth: '90px',
    defaultForm: {
      materialCode: '',
      materialNumber: 0,
      date: '',
      priority: ''
    },
    fieldList: [
      {
        label: 'Code', 
        value: 'mtrStandardCode', 
        comp: 'el-input', 
        type: 'input'
      },
      {
        label: 'Amount',
        value: 'mtrStandardNumber',
        comp: 'el-input-number',
        type: 'input',
        bind: {
          min: 0,
          max: 1000,
          precision: 2,
          controlsPosition: 'right'
        } 
      },
      {
        label: 'Time',
        value: 'createTime',
        type: 'daterange',
        comp: 'el-date-picker',
        bind: {
          format: 'YYYY-MM-DD',
          valueFormat: 'YYYY-MM-DD'
        }
      },
      {
        label: 'Priority',
        value: 'priority',
        comp: 'el-select',
        type: 'select-arr',
        options: [
          { label: 'high', value: '1' },
          { label: 'medium', value: '2' },
          { label: 'low', value: '3' }
        ]
      },
    ]
  }
  const formData = ref({...formConfig.defaultForm})

  const handleSubmit = () => {
    ElMessage.success('submit success')
  }
</script>
```
:::

## Select Options from API
Sometimes, the options of the select component are not static, but need to be fetched from the API. In this case, you can configure `options` attribute in `fieldList` prop as a string identifer. Then assign data retrieved from request to the coresponding array value, whose key is the same as aforementioned identifer  in `externalOptions`

:::demo
```vue
<template>
  <i-form
    v-model="formData"
    :formOpts=" formConfig"
    :colSize="2"
    @handleSearch="handleSearch"
    @handleReset="handleReset"
  />
</template>
<script setup>
  import { ref } from 'vue';
  const formConfig = {
    labelWidth: '90px',
    defaultForm: {
      materialCode: '',
      materialFirstCategory: '',
    },
    fieldList: [
      {
        label: 'Number', 
        value: 'mtrStandardCode', 
        comp: 'el-input',
        type: 'input' 
      },
      {
        label: 'Category',
        value: 'materialFirstCategory',
        comp: 'el-select',
        type: 'select-arr',
        options: 'materialFirstCategoryOpts', // configure the options attribute as a string identifer
      }
    ],
    externalOptions: {
      materialFirstCategoryOpts: [] // keep the same key as the options attribute in fieldList
    }
  }
  const formData = ref({ ...formConfig.defaultForm })
  const formOpts = ref({ ...formConfig })
  const handleSearch = () => {
    // search logic
  }
  
  const handleReset = () => {
    // reset logic
  }

  const init = () => {
    setTimeout(() => {
      // mock api response
      formOpts.value.externalOptions.materialFirstCategoryOpts = [
        { label: 'option 1', value: '1' },
        { label: 'option 2', value: '2' },
        { label: 'option 3', value: '3' }
      ]
    }, 1000)
  }
  init()
</script>
```
:::

## Validation 
- Configure `rules` attribute in `formOpts` prop to set the validation rules of the form.
- The validation rules are the same as the rules of the Element Plus form component.
- the exposed function `formValidate` can trigger the form validation and return the validation result.

:::demo
```vue
<template>
  <i-form
    v-model="formData"
    :formOpts=" formConfig"
    formType = "edit"
    ref="formRef"
    :colSize="2"
  />
  <el-button style="float: right" type="primary" @click="handleSubmit">Submit</el-button>
</template>
<script setup>
  import { ref } from 'vue';
  const formConfig = {
    labelWidth: '90px',
    defaultForm: {
      mtrStandardCode: '',
      mtrStandardName: '',
    },
    fieldList: [
      {
        label: 'Code', 
        value: 'mtrStandardCode', 
        comp: 'el-input',
        type: 'input' 
      },
      {
        label: 'Name',
        value: 'mtrStandardName',
        comp: 'el-input',
        type: 'input'
      }
    ],
    rules: {
      mtrStandardName: [
        { required: true, message: 'please input name', trigger: 'blur' }
      ],
      mtrStandardCode: [
        { required: true, message: 'please input code', trigger: 'blur' },
        { min: 1, max: 10, message: 'code length cannot exceed 10 characters', trigger: 'change' }
      ]
    }
  }

  const formData = ref({ ...formConfig.defaultForm })
  const formOpts = ref({ ...formConfig })
  const formRef = ref(null)
  const handleSubmit = async () => {
    const valid = await formRef.value.formValidate()
    if(valid) {
      ElMessage.success('thank you for your submission')
    }
  }
</script>
```
:::

## Custom Form Item
If you need to use a custom component as a form item, you can set `slotName` attribute in the item in `fieldList` prop to the name of the custom component.

:::demo
```vue
<template>
  <i-form
    v-model="formData"
    :formOpts=" formConfig"
    :colSize="1"
    @search="handleSearch"
    @reset="handleReset"
  >
    <template #haltTime>
      <div style="display: flex;">
        <div style="display: flex;">
          <el-input style="flex: 1; margin-right: 4px;" v-model="formData.haltTimeStart" />
          <span>Minute</span>
        </div>
        <span style="margin: 0 8px;"> - </span>
        <div style="display: flex;">
          <el-input style="flex: 1; margin-right: 4px;" v-model="formData.haltTimeEnd" />
          <span>Minute</span>
        </div>
      </div>
    </template>
  </i-form>
</template>
<script setup>
  import { ref } from 'vue';
  const formConfig = {
    labelWidth: '120px',
    defaultForm: {
      haltTimeStart: '',
      haltTimeEnd: '',
      productLine: ''
    },
    fieldList: [
      {
        label: 'Stop Time',
        slotName: 'haltTime' 
      },
      {
        label: 'Product Line',
        value: 'productLine',
        comp: 'el-input',
        type: 'input'
      }
    ]
  }

  const formData = ref({ ...formConfig.defaultForm })
  const formOpts = ref({ ...formConfig })
  const handleSearch = () => {
    // search logic
  }
  
  const handleReset = () => {
    // reset logic
  }
</script>
```
:::

## API
### Attributes
#### iForm
| Name | is Required | Description | Type | Default Value |
| :---: | :---: | :---: | :---: | :---: |
| className | No | css class name | string | - |
| v-model | No | data of form | Object | {} |
| formType | No | type of form (search/sumbit) | string | search |
| formOpts | 	Yes | form configuration | Object | - |
| colSize | No | 	number of items in one row, max: 6 | Number | - |

iForm is a secondary encapuslation base on Form from Element plus. For description of other properties, please refer to [Form](https://element-plus.org/en-US/component/form)

#### formOpts
| Name | is Required | Description | Type | Default Value |
| :---: | :---: | :---: | :---: | :---: |
| labelWidth | No | width of label | string | '120px' |
| defaultForm | No | default data of form | Object | {} |
| fieldList | Yes | configuration of form items | Array | - |
| size | No | size of form | string | 'default' |
| rules | No |form rules, the same as [el-form rules](https://element-plus.org/en-US/component/form#form-api) | Object | {} |
| labelPosition | No | the position of label('left'/'right'/'top'), if set 'left' or right, the labelWidth prop is also required | string | 'right' |
| externalOptions | No | dynamic options dict, it is valid when option prop in fieldList is set as a string identifier | Object | {} |

#### fieldList
| Name | is Required | Description | Type | Default Value |
| :---: | :---: | :---: | :---: | :---: |
| label | Yes | label test| string | - |
| value | Yes | key to the form data  | string | - |
| disabled | No | whether the filed is disabled or not | Booelan | false |
| type | No | type of form item <el-tooltip content="1. if comp is el-select, the option of type is `select-arr` or `select-obj` 2. in othercase, please refer api of element plus" effect="light"><el-button size="small" plain><el-icon><Warning /></el-icon></el-button></el-tooltip>  | string | '' |
| comp | Yes | component of form item(el-input, el-select, etc) | string | - |
| options | No | select option of form item, it is required when `comp` is 'el-select', 'el-checkbox-group' or 'el-radio-group' | Array/String | - |
| textShow | No | whether form item displays as plain text | Boolean | false |
| labelRender | No | whether to custmize the label or not | Boolean | false |
| placeholder | No | input hint  | string | - |
### Event
| Name | Description | Parameters |
| :---: | :---: | :---: |
| handleSearch | in query mode，trigger when query buttion is clicked | formData： Object |
| handleReset | in query mode, trigger when reset button is clicked | - |
| handleSubmit | in edit mode, triggeer when enter key is pressed | formData： Object |

### Exposes
| Name | Description | Parameters |
| :---: | :---: | :---: |
| formValidate | verify form | - |
| resetFields | reset form | - |
| clearValidate | clear form validation | - |