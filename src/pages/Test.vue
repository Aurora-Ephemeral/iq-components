<script setup>
import { shallowRef, onMounted  } from "vue";

const currentComponent = shallowRef(null)

const handleUrlChange = (url) => {
  getComp()
}

const getComp = () => {
  const fullPath = window.location.href;
  const comp = fullPath.split('#')[1];
  console.log('find comp', comp)
  loadComp(comp)
}

const loadComp = (comp) => {
  import(`./${comp}.vue`).then((module) => {
    currentComponent.value = module.default
  }).catch((error) => {
    console.error(error)
    currentComponent.value = null
  })
}


window.onhashchange = handleUrlChange

getComp()
</script>

<template>
  <div style="padding: 20px;" class="test-comp">
    <component :is="currentComponent" />
  </div>
</template>

<style scoped>
.test-comp {
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  width: 1000px;
  margin: 20px auto;
}
</style>
