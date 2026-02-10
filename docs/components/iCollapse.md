---
hello: world
---

# Collapse
## Basic usage
:::demo
```vue
<template>
  <i-collapse
    title="Introduction to Nuxt.js"
  >
    Nuxt is a free and open-source framework with an intuitive and extendable  way to create type-safe, performant and production-grade full-stack web applications and websites with Vue.js.
  </i-collapse>
</template>
```
:::

## Customized Title
The `title` slot can be used to customize the title of the panel.

:::demo
```vue
<template>
  <i-collapse
    title="Introduction to Nuxt.js"
  >
    <template #title>
      <span style="font-weight: bold;">Introduction to Nuxt.js</span>
      <a style="margin-left: 8px;" href="https://nuxt.com/docs/getting-started/introduction">click to learn more</a>
    </template>
    Nuxt is a free and open-source framework with an intuitive and extendable  way to create type-safe, performant and production-grade full-stack web applications and websites with Vue.js.
  </i-collapse>
</template>
```
:::

## Expand or Collapse panel by default
The `isCollapse` attribute can be used to expand or collapse the panel by default.
:::demo
```vue
<template>
  <i-collapse
    title="Introduction to Nuxt.js"
    :isCollapse="true"
  >
    Nuxt is a free and open-source framework with an intuitive and extendable  way to create type-safe, performant and production-grade full-stack web applications and websites with Vue.js.
  </i-collapse>
</template>
```
:::

## API
### Attributes
| Name | is Required | Description | Type | Default Value |
| :---: | :---: | :---: | :---: | :---: |
| title | No | title of panel | string | - |
| isCollapse | No | Expand by default? | boolean | false |
| showCollapse | No | Show expand/collapse arrow? | boolean | false |

### Slots
| Slot Name | Description |
| :---: | :---: |
| title | slot of title |