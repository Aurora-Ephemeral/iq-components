# Changelog
## 🌈 v0.0.19 <span class="latest">Latest</span>
### 🎉 Enhancements
- Added exact match and fuzzy match options for column filtering in `iTable` component
- Added press Enter to search in `iForm` components
### 🐞 Bug Fixes
- Fixed title and icon misalignment in `iCard` component
## 🌈 v0.0.18
### 🚀 New Features
- Added `iConfigProvider` component

## 🌈 v0.0.17
### 🚧 Refactor
- Refactored `iDatePicker` component to fix errors caused by Element Plus version dependency changes
## 🌈 v0.0.16

### 🎉 Enhancements
- Added row drag-and-drop sorting to `iTable` component

## 🌈 v0.0.15
### 🚀 New Features
- Added `iLayout` component
### 🎉 Enhancements
- Added number and daterange types for column filtering in `iTable`
- Added ellipsis for single-line text overflow in `iTable`
### 🐞 Bug Fixes
- Fixed column overflow display issue in `iTable` when column names are too long
## 🌈 v0.0.14
### 🚧 Refactor
- Refactored `iCalendar` component to reduce bundle size

## 🌈 v0.0.13
### 🎉 Enhancements
- Added single-line ellipsis to selected data dialog in `iTable`

## 🌈 v0.0.12
### 🎉 Enhancements
- Added expandable column feature to `iTable`

## 🌈 v0.0.11
### 🚀 New Features
- Added `iStepProgress` components
### 🎉 Enhancements
- Added showFooter prop to `iDialog` to optionally hide the footer action area

## 🌈 v0.0.10
### 🐞 Bug Fixes
- Fixed pagination parameters not taking effect in `iTable` component


## 🌈 v0.0.9
### 🐞 Bug Fixes
- Fixed drag-and-drop sorting not working in `iTable`

## 🌈 v0.0.8
### 🚀 New Features
- Added drag-and-drop sorting to `iTable`
### 🐞 Bug Fixes
- Fixed `iTable` pagination component triggering multiple requests

## 🌈 v0.0.7
### 🎉 Enhancements
- `iTable` component now supports a.b.c format for parameter passing
- Further optimized component style pollution on host applications


## 🌈 v0.0.6
### 🎉 Enhancements
- Added multi language function
- Added default button text parameter to `iDialog` component

## 🌈 v0.0.5
### 🐞 Bug Fixes
- Fixed component styles polluting host application styles
### 🎉 Enhancements
- Decoupled `iTable` component from host application: baseUrl parameter is no longer required


## 🌈 v0.0.4

### 🚀 New Features
- Added collapsible card component `iCollapse`


## 🌈 v0.0.3
### 🎉 Enhancements
- Fixed form component validation messages being truncated in `iForm`

## 🌈 v0.0.2
### 🎉 Enhancements
 - `iTable` component slots now support all default slot attributes from Element Plus

## 🌈 v0.0.1
- add `iDialog`, `iDrawer`,  `iForm`, `iTable` Components

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