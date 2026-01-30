<template>
  <div class="i-layout__wrapper">
    <div class="i-layout__tabs">
      <slot name="tabs"></slot>
    </div>
    <div class="i-layout__query">
      <slot name="query"></slot>
    </div>
    <div class="i-layout__content">
      <slot name="content"></slot>
    </div>
    <slot></slot>
  </div>
</template>
<script setup>
const props = defineProps({
  color: {
    type: String,
    default: '#fff'
  }
})
</script>
<script>
export default {
  name: 'iLayout'
}
</script>
<style lang="scss" scoped>
.i-layout__wrapper {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  .i-layout__query {
    background-color: v-bind('props.color');
  }
  .i-layout__content {
    background-color: v-bind('props.color');
    flex: 1;
    overflow: hidden;
    margin-top: 16px;
  }
  .i-layout__tabs {
    background-color: v-bind('props.color');
  }
}
</style>