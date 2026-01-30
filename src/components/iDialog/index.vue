<template>
  <div class="myDialog">
    <el-dialog
      v-bind="$attrs"
      v-model="dialogVisible"
      :title="props.title"
      :width="props.width"
      :close-on-click-modal="false"
      @close="handleCancel"
    >
      <div class="dialog-main">
        <slot></slot>
      </div>
      <template #footer v-if="showFooter">
        <div class="dialog-footer">
          <slot name="footer">
            <!--默认展示内容-->
            <el-button class="btn" @click="handleCancel">{{ props.cancelText }}</el-button>
            <el-button class="btn" type="primary" @click="handleConfirm" :loading="submitLoading">{{ props.confirmText }}</el-button>
          </slot>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { ElDialog, ElButton } from 'element-plus'
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: true
  },
  title: {
    type: String,
    default: ''
  },
  width: {
    type: String || Number,
    default: '30%'
  },
  submitLoading: {
    type: Boolean,
    default: false
  },
  confirmText: {
    type: String,
    default: '确定'
  },
  cancelText: {
    type: String,
    default: '取消'
  },
  showFooter: {
    type: Boolean,
    default: true
  }
})

const emits = defineEmits(['update:modelValue', 'confirm', 'cancel'])

const dialogVisible = computed({
  get: () => props.modelValue,
  set: (val) => emits('update:modelValue', val)
})

// 确定按钮事件
const handleConfirm = () => {
  emits('confirm')
}
// 取消按钮事件
const handleCancel = () => {
  emits('cancel')
  emits('update:modelValue', false)
}
</script>

<script>
export default {
  name: 'i-dialog'
}
</script>

<style lang="scss" scoped>
.myDialog {
  color: red;
  :deep(.el-dialog__header) {
    margin-right: 0;
    background-color: #F0F2F5;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 0 0 16px;
    height: 44px;
  }
  :deep(.el-dialog__headerbtn) {
    position: static;
    width: 44px;
    height: 44px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  :deep(.el-dialog__title) {
    font-size: 18px;
    font-family: MicrosoftYaHei;
    font-weight: bold;
    color: #1F2631;
  }
  :deep(.el-dialog__footer) {
    padding: 0
  }

  .dialog-main {
    width: 100%;
  }

  .dialog-footer {
    display: flex;
    justify-content: flex-end;
    padding: 10px 20px 10px 20px;
    border-top: 1px solid #E6E6E6;
    .btn{
      border-radius: 4px;
      height: 32px;
      width: 60px;
    }
  }
}
</style>