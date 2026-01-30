import components from './index.vue'

components.install = Vue => {
  Vue.component(components.name, components)
}

export default components