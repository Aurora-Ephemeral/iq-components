<template>
  <div class="query-card-main">
    <div class="query-card-main-head">
      <div class="query-card-main-head-left">
        <div class="title-img-box">
          <img :src="titleIcon" :alt="title">
        </div>
        <h4>{{title}}</h4>
      </div>
      <div class="query-card-main-head-right">
        <slot name="titleRight"></slot>
      </div>
    </div>
    <div class="query-card-main-body">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'i-card'
}
</script>
<script setup>
import titleIcon from './img/query-card-title-icon.png'
defineProps({
  title: {
    type: String
  }
})
</script>

<style scoped lang="scss">
.query-card-main {
  .query-card-main-head {
    width: 100%;
    height: 48px;
    background: linear-gradient(360deg, #FEFEFE 0%, #E8ECEF 100%);
    border-radius: 4px 4px 0px 0px;
    border: 1px solid #FFFFFF;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .query-card-main-head-right {
      margin-right: 16px;
    }
    .query-card-main-head-left {
      display: flex;
      align-items: center;
      margin-left: 8px;
      h4 {
        font-size: 16px;
        font-family: MicrosoftYaHei;
        color: #282F3F;
        letter-spacing: 1px;
        -webkit-text-stroke: 0px #282F3F;
        text-stroke: 0px #282F3F;
        margin-bottom: 0;
        margin-top: 0;
      }
      .title-img-box {
        width: 32px;
        height: 32px;
        overflow: hidden;
        margin-right: 0px;
        img {
          width: 100%;
        }
      }
    }
  }
  .query-card-main-body {
    background-color: #FEFEFE;
    padding-bottom: 12px;
  }
}
</style>
