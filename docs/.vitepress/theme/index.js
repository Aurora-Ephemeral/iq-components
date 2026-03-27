import DefaultTheme from 'vitepress/theme'
import 'vitepress-theme-demoblock/dist/theme/styles/index.css'
import Demo from "vitepress-theme-demoblock/dist/client/components/Demo.vue";
import DemoBlock from "vitepress-theme-demoblock/dist/client/components/DemoBlock.vue";
import 'element-plus/dist/index.css'
import elementPlus from 'element-plus';
import "../../../src/assets/styles/index.scss"; 
import iCollapse from '../../../src/components/iCollapse/index.vue'
import iCard from '../../../src/components/iCard/index.vue'
import iConfigProvider from '../../../src/components/iConfigProvider/index.vue'
import iDialog from '../../../src/components/iDialog/index.vue'
import iDrawer from '../../../src/components/iDrawer/index.vue'
import iLayout from '../../../src/components/iLayout/index.vue'
import iForm from '../../../src/components/iForm/index.vue'
import iStepProgress from '../../../src/components/iStepProgress/index.vue'
import iTable from '../../../src/components/iTableNext/index.vue'
import iCalendar from '../../../src/components/iCalendar/index.vue'
import iDatePicker from '../../../src/components/iDatePicker/index.vue'

export default {
  ...DefaultTheme,
  enhanceApp(ctx) {
    DefaultTheme.enhanceApp(ctx)
    ctx.app.component('Demo', Demo)
    ctx.app.component('DemoBlock', DemoBlock)
    ctx.app.component('iCalendar', iCalendar)
    ctx.app.component('iCollapse', iCollapse)
    ctx.app.component('iCard', iCard)
    ctx.app.component('iConfigProvider', iConfigProvider)
    ctx.app.component('iDialog', iDialog)
    ctx.app.component('iDrawer', iDrawer)
    ctx.app.component('iLayout', iLayout)
    ctx.app.component('iForm', iForm)
    ctx.app.component('iStepProgress', iStepProgress)
    ctx.app.component('iTable', iTable)
    ctx.app.component('iDatePicker', iDatePicker)
    ctx.app.use(elementPlus)
  }
}