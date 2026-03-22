import { defineConfig } from 'vitepress'
import { demoblockPlugin, demoblockVitePlugin } from 'vitepress-theme-demoblock'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "IQ Components",
  description: "A UI library based on element-plus",
  lang: 'en-US',
  head: [
    ['link', { rel: 'icon', href: '/logo.jpg' }]
  ],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: '/logo.jpg',
    nav: [
      { text: 'Home', link: '/' },
      // { text: 'Guide', link: '/guide/quick-start' },
      { text: 'Components', link: '/components/iCard' },
    ],

    sidebar: {
      '/guide':[{
        text: '说明',
        items: [
          { text: 'Quick Start', link: '/guide/quick-start' },
          { text: 'Update Log', link: '/guide/changelog'},
        ]
      }],
      '/components/': [
        { text: 'Card', link: '/components/iCard' },
        { text: 'Collapse', link: '/components/iCollapse' },
        { text: 'ConfigProvider', link: '/components/iConfigProvider' },
        { text: 'Dialog', link: '/components/iDialog' },
        { text: 'Drawer', link: '/components/iDrawer' },
        { text: 'Form', link: '/components/iForm' },
        { text: 'Layout', link: '/components/iLayout' },
        { text: 'StepProgress', link: '/components/iStepProgress' },
        { text: 'Table', link: '/components/iTable' },
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ],
  },
  markdown: {
    config: (md) => {
      md.use(demoblockPlugin)
    }
  },
  vite: {
    resolve: {
      alias: {
        '@': '/src'
      }
    },
    plugins: [demoblockVitePlugin()]
  }
})
