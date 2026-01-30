# 更新日志
## 🌈 v0.0.38 <span class="latest">Latest</span>
### 🎉 优化
- `iTableNext`组件列筛选功能增加精确匹配和模糊匹配选项
- `iConfigForm` `iForm`组件增加回车搜索功能
### 🐞 修复
- 修复`iCard`组件标题与图标未对齐问题
## 🌈 v0.0.36
### 🚀 新增
- 新增`iConfigProvider`组件
### 🎉 优化
- `iSelectVehicle`增加按照id模糊搜索功能
## 🌈 v0.0.34
### 🚀 新增
- 新增`iSelectDept`组件
### 🎉 优化
- `iConfigForm`增加iConfigSelect配置项
## 🌈 v0.0.33 
### 🚧 重构
- 重构`iDatePicker`组件，修复组件对element plus 版本依赖变化产生的报错
## 🌈 v0.0.32 

### 🎉 优化
- `iTableNext`组件增加行拖拽排序功能
- `iConfigSelect` 组件增加最大选项显示数量及附加查询条件字段

## 🌈 v0.0.31 

### 🚀 新增
- 新增iLayout组件
### 🎉 优化
- iSelect系组件（iSelectPerson, iSelectPart, iSelectVehicleModel, iSelectMaterialGroup, iConfigSelect）增加筛选结果搜索关键字匹配高亮
- iTableNext 组件列筛选增加number和daterange类型
- iTableNext 单行省略增加省略号
### 🐞 修复
- 修复iTableNext组件在列明过长时，行定义列超出显示问题
## 🌈 v0.0.30 
### 🚧 重构
- 重构iCalendar组件，减少打包体积

## 🌈 v0.0.29 
### 🚀 新增
- 新增iConfigForm组件

### 🎉 优化
- iTableNext组件已选数据弹框增加单行省略 

## 🌈 v0.0.28

### 🎉 优化
- iTableNext增加扩展列功能
## 🌈 v0.0.27
### 🚀 新增
- 增加 iTableNext, iStepProgress 组件
### 🎉 优化
- iDialog 增加showFooter字段，可不展示底部操作区
## 🌈 v0.0.26
### 🎉 优化
- 增加组件按需引入功能
## 🌈 v0.0.25
### 🐞 修复
- 修复iTable组件分页参数不生效问题
## 🌈 v0.0.24
### 🐞 修复
- 修复iSelectPerson绑定数据为String类型不回显的问题 

## 🌈 v0.0.23
### 🐞 修复
- 修复iTable拖拽排序不生效的问题 

## 🌈 v0.0.22
### 🚀 新增
- iTable增加拖拽排序功能
### 🐞 修复
- 修复iTable分页组件触发多次请求bug

## 🌈 v0.0.21 
### 🎉 优化
- iTable组件支持a.b.c格式传参
- 进一步优化组件样式污染应用系统问题

### 🐞 修复
- 修复iSelectVehicleModel组件在多选下change回调不可用

## 🌈 v0.0.20 

### 🎉 优化
- iTable组件增加国际化
- iDialog组件添加默认按钮button文本参数

## 🌈 v0.0.19 

### bug修复
- 修复iConfigSelect iCollapse无法引用问题

### 🎉 优化
- iConfigSelect 组件宽度默认100%
## 🌈 v0.0.16

### 🐞 修复
- 修复组件样式对引用系统污染的问题 
### 🎉 优化
- iTable组件与应用系统解耦：不再需要传递baseUrl参数
## 🌈 v0.0.14 
### 🎉 优化
- select person 组件增加科室信息展示
## 🌈 v0.0.13 

### 🚀 新增
- 新增收缩卡片组件 iCollapse
- 新增配置下拉选择组件 iConfigSelect

### 🎉 优化
- select person 组件回显改为域账号

### 🐞 修复
- 修复下拉模式下 select person组件无法回显域账号问题
## 🌈 v0.0.12 

### 🎉 优化
- 优化form组件校验提示信息显示不全问题
## 🌈 v0.0.11 
### 🎉 优化
 - table组件插槽支持element-plus的默认插槽的全部属性
### 🐞 修复
 - select person，select vehicle等选择组件修复disabled为true时，仍然可以点击的问题

## 🌈 v0.0.10
### 🚀 新增
 - select person 组件新增下拉选择框交互模式，支持多选

## 🌈 v0.0.9
### 🚀 新增
  - 新增选择材料组组件 select material group
<style>
.latest {
  color: #42b983;
  font-weight: bold;
  border: 1px solid #42b983;
  padding: 4px 12px;
  border-radius: 18px;
  font-size: 16px;
}
</style>