# Change Log

## 1.3.3 (Tue Apr 21 2020)

-   增加`searchFilterDisabled`搜索过滤禁用

## 1.3.2 (Wed Jan 08 2020)

-   删除旧编译代码, 同名冲突

## 1.3.1 (Mon Jan 06 2020)

-   增加`renderSelectItem`属性, 自定义渲染选中元素

## 1.3.0 (Mon Dec 30 2019)

-   统一国际化实现

## 1.2.0 (Tue Nov 19 2019)

-   修复`react`与`react-dom`版本不一致导致的问题
-   测试库迁移到`@testing-library/react"`

## 1.1.1 (Thu Sep 19 2019)

-   修复禁用后，再解除禁用不能打开下拉列表

## 1.1.0 (Thu Sep 12 2019)

-   修复动态改变`Select`内容，`Option`变化后，缓存没有更新

## 1.0.9 (Thu Sep 05 2019)

-   修复`Select`内容有`false`等特殊值的情况，不认为是空集合

## 1.0.87 (Wed Sep 04 2019)

-   清除控制台打印, 优化代码警告

## 1.0.86 (Tue Jul 09 2019)

-   下拉列表 options 变动后, `SelectBox`的 label 也需要更新

## 1.0.85 (Thu May 23 2019)

-   修复`Dropdown`将`display: none`隐藏的逻辑，避免同时出现空状态和 children

## 1.0.84 (Wed May 22 2019)

-   修复当 options 集合为空数组时, 下拉列表不会使用空状态组件, 导致下拉列表无任何内容

## 1.0.83 (Tue May 21 2019)

-   修复禁用时点击能弹出下拉列表的 BUG

## 1.0.82 (Fri May 17 2019)

-   多选模式下,并且受控组件`value`为空值时会异常

## 1.0.81 (Fri May 17 2019)

-   优化样式，特别是多选并可搜索时候得样式
-   下拉列表反转时候，圆角的样式

## 1.0.8 (Mon May 13 2019)

-   更新`utils-dom`, 修复空格被阻止问题
-   改变过滤行为，隐藏 DOM 而不是移除 DOM, 否则被移除的元素接受不到`context`的更新会造成 BUG
-   同时修改单元测试

## 1.0.7 (Mon May 13 2019)

-   去掉多余的空`div`包裹层
-   修复多选项删除时动画闪动问题

## 1.0.6 (Sun May 12 2019)

-   更新依赖
-   使用`xy-trigger`重构实现

## 1.0.5 (Thu May 09 2019)

-   更换下拉列表动画

## 1.0.4 (Thu May 09 2019)

-   阻止`option`冒泡

## 1.0.3 (Sun May 05 2019)

-   更新`xy-manual-tools`, 修复编译 demo

## 1.0.2 (Fri May 03 2019)

-   更新`xy-manual-tools`

## 1.0.1 (Tue Apr 30 2019)

-   修复`tsconfig.json`导致的编译问题

## 1.0.0 (Tue Apr 30 2019)

-   修改 tsconfig.json，修复打包

## 0.0.8 (Tue Apr 30 2019)

-   从`storybook`换成`xy-manual-tools`来管理 demo
-   改进`demo`

## 0.0.7 (Fri Apr 26 2019)

-   搜索值改变后也要重新对齐

## 0.0.6 (Fri Apr 26 2019)

-   更新依赖

## 0.0.56 (Wed Apr 24 2019)

-   转发 Ref
-   修复 Option 获取 value 问题, 当 value 为空时也要判断
-   Option 的`label`, `value`更新后, context 中的状态需要同步

## 0.0.55 (Mon Apr 22 2019)

-   增加`onBlur`事件

## 0.0.54 (Sun Apr 21 2019)

-   修复第一次过度动画问题

## 0.0.53 (Fri Apr 19 2019)

-   更新`utils-dom`依赖, 修复导航上下键光标跳转问题

## 0.0.52 (Thu Apr 18 2019)

-   占位符文本左对齐

## 0.0.51 (Wed Apr 17 2019)

-   修改`OptionConfig`类型, `disabled`和`filtered`非必须

## 0.0.5 (Wed Apr 17 2019)

-   修复`OptGroup`在内部 option 全部不可用(被禁用，过滤)时, 隐藏分组

## 0.0.44 (Wed Apr 17 2019)

-   增加`popupClassName`属性
-   增加`stretch`属性

## 0.0.43 (Tue Apr 16 2019)

-   `useVisible`修复隐藏时设置焦点元素

## 0.0.42 (Tue Apr 16 2019)

-   `useOptions`导出`cacheSelectCfg`

## 0.0.41 (Tue Apr 16 2019)

-   导出`useNnavigate`

## 0.0.4 (Tue Apr 16 2019)

-   优化代码实现, 更加细的分离组件

## 0.0.31 (Mon Apr 15 2019)

-   增加缓存`optMap`, 确保选择框上有中文

## 0.0.3 (Mon Mar 25 2019)

-   基本实现

## 0.0.1 (Mon Mar 25 2019)

-   初始化项目
