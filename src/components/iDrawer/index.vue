<template>
  <div>
    <el-drawer
      :close-on-click-modal="false"
      v-model="drawerDisplay"
      :size="mySize"
      :show-close="false"
      v-bind="$attrs"
    >
      <template #header>
        <div class="customer-drawer-head">
          <div class="customer-drawer-head-title">{{ title }}</div>
          <div>
            <span class="drawer-head-icon" @click="fullScreen">
              <el-icon><FullScreen /></el-icon>
            </span>
            <span class="drawer-head-icon" @click="drawerClose">
              <el-icon><Close /></el-icon>
            </span>
          </div>
        </div>
      </template>
      <template #default>
        <div class="body-main">
          <slot></slot>
        </div>
      </template>
      <template #footer v-if="footerShow">
        <slot name="footer"></slot>
      </template>
    </el-drawer>
  </div>
</template>

<script>
export default {
  name: 'iDrawer'
}
</script>

<script setup>
import { ElIcon, ElDrawer } from 'element-plus';
import { Close, FullScreen } from '@element-plus/icons-vue';
import { watch, ref, computed } from "vue";

const emit = defineEmits(["drawerClose", "update:modelValue"]);
const props = defineProps({
  title: {
    type: String,
  },
  modelValue: {
    type: Boolean,
    default: false,
  },
  size: {
    type: [String, Number],
    default: 1088,
  },
  footerShow: {
    type: Boolean,
    default: false,
  }
});
const mySize = ref();
watch(
  () => props.size,
  (n) => {
    mySize.value = n;
  },
  {
    immediate: true,
  }
);
const drawerDisplay = computed({
  get() {
    return props.modelValue
  },
  set(newVal) {
    emit("update:modelValue", newVal);
  }
});

const drawerClose = () => {
  emit("drawerClose");
};

const fullScreen = () => {
  if (mySize.value !== "100%") {
    mySize.value = "100%";
  } else {
    mySize.value = props.size;
  }
};
</script>

<style scoped lang="scss">
.body-main {
  width: 100%;
  height: 100%;
}
:deep(.el-drawer__header) {
  padding: 0;
  margin-bottom: 0;

  .customer-drawer-head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 44px;
    padding-left: 16px;
    padding-right: 16px;

    .customer-drawer-head-title {
      font-size: 16px;
      font-family: MicrosoftYaHei-Bold, MicrosoftYaHei;
      font-weight: bold;
      color: #222d3c;
      line-height: 20px;
    }

    .drawer-head-icon {
      cursor: pointer;
      font-size: 18px;
      margin-left: 8px;
      &:hover {
        color: #1890ff;
      }
    }
  }
}

:deep(.el-drawer__body) {
  padding: 0 !important;
  background-color: #f0f2f5;
  overflow: auto !important;
}

:deep(.el-drawer__footer) {
  padding: 0;
  height: 48px;
  line-height: 48px;
  padding-right: 16px;
}
</style>
