<template>
  <div>
    <i-date-picker 
      v-model="date"
      type="date"
    />
    <i-date-picker 
      v-model="date2"
      type="daterange"
    />
  </div>
</template>
<script setup>
import iDatePicker from '@/components/iDatePicker/index.vue'
import { ref } from 'vue'

const date = ref('')
const date2 = ref([])
</script>