<script setup>
import Test from '@/pages/Test.vue'
import iConfigProvider from '@/components/iConfigProvider/index.vue'

</script>

<template>
  <i-config-provider tokenKey="iqap_user_token">
    <Test />
  </i-config-provider>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>