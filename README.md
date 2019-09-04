| ![IE](https://github.com/alrra/browser-logos/blob/master/src/edge/edge_48x48.png?raw=true) | ![Chrome](https://github.com/alrra/browser-logos/blob/master/src/chrome/chrome_48x48.png?raw=true) | ![Firefox](https://github.com/alrra/browser-logos/blob/master/src/firefox/firefox_48x48.png?raw=true) | ![Opera](https://github.com/alrra/browser-logos/blob/master/src/opera/opera_48x48.png?raw=true) | ![Safari](https://github.com/alrra/browser-logos/blob/master/src/safari/safari_48x48.png?raw=true) |
| ------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| IE 10+ ✔                                                                                   | Chrome 31.0+ ✔                                                                                     | Firefox 31.0+ ✔                                                                                       | Opera 30.0+ ✔                                                                                   | Safari 7.0+ ✔                                                                                      |

![NPM version](http://img.shields.io/npm/v/xy-select.svg?style=flat-square)
![node version](https://img.shields.io/badge/node.js-%3E=_0.10-green.svg?style=flat-square)
![npm download](https://img.shields.io/npm/dm/xy-select.svg?style=flat-square)

[![xy-select](https://nodei.co/npm/xy-select.png)](https://npmjs.org/package/xy-select)

# xy-select

下拉列表组件。

## 特性

-   [x] 支持多选
-   [x] Option 支持深度嵌套和自定义
-   [x] option 支持过滤, select 可以搜索
-   [x] 支持方向键上下导航，并且跳过禁用的。

## 安装

```bash
# yarn
yarn add xy-select
```

## 使用例子

```tsx
import React from "react";
import ReactDOM from "react-dom";
import { Select, OptGroup, Option } from "xy-select";
ReactDOM.render(
    <Select>
        <OptGroup label="编程语言">
            <Option value="C">C</Option>
            <Option value="C++">C++</Option>
            <Option value="Object-C">Object-C</Option>
            <Option value="JavaScript">JavaScript</Option>
            <Option value="C#">C#</Option>
            <Option value="VB">VB</Option>
            <Option value="GO">GO</Option>
        </OptGroup>
    </Select>,
    container,
);
```

## 何时使用

-   弹出一个下拉菜单给用户选择操作，用于代替原生的选择器，或者需要一个更优雅的多选器时。
-   当选项少时（少于 5 项），建议直接将选项平铺，使用 Radio 是更好的选择。

## API

### Select

| 属性            | 说明                                                         | 类型                                           | 默认值   |
| --------------- | ------------------------------------------------------------ | ---------------------------------------------- | -------- |
| value           | 选中值                                                       | any/any[]                                      | 无       |
| defaultValue    | 默认选中值                                                   | any/any[]                                      | 无       |
| filter          | 是否过滤 option, 提供过滤函数则过滤                          | (cfg: OptionConfig, search: string) => boolean | 无       |
| autoFocus       | 是否焦点                                                     | boolean                                        | false    |
| disabled        | 是否禁用                                                     | boolean                                        | false    |
| multiple        | 是否多选                                                     | boolean                                        | false    |
| searchMode      | 是否搜索模式, 启用搜索模式点击下拉列表会显示输入框, 进行搜索 | boolean                                        | false    |
| popupClassName  | 弹出内容类名                                                 | string                                         | 无       |
| stretch         | 弹出框是否宽度与 Select 宽度对齐                             | boolean                                        | true     |
| placeholder     | 占位符文本                                                   | React.ReactNode                                | "请选择" |
| onChange        | 下拉列表选中值改变回调                                       | (value: any) => void                           | 无       |
| onBlur          | onBlur 事件                                                  | (e: React.FocusEvent<HTMLDivElement>) => void  | 无       |
| onSearch        | 搜索事件, 此事件自带节流函数                                 | (search: string) => void                       | 无       |
| empyPlaceholder | 空内容占位符, 内容为空时提示文本                             | string                                         | 无       |

### OptGroup

| 属性     | 说明               | 类型            | 默认值 |
| -------- | ------------------ | --------------- | ------ |
| label    | 标签组名           | string          | 无     |
| children | 标签组内的 options | React.ReactNode | 无     |

### Option

| 属性     | 说明                                                                       | 类型            | 默认值 |
| -------- | -------------------------------------------------------------------------- | --------------- | ------ |
| label    | 标签名, 对自动提取得标签不满意, 或 children 内无法提取字符串, 则需手动指定 | string          | 无     |
| value    | 选中的值                                                                   | string/number   | 无     |
| children | 内容                                                                       | React.ReactNode | 无     |
| disabled | 是否禁用                                                                   | boolean         | false  |
| divided  | 是否显示分割线                                                             | boolean         | false  |

## 开发

```sh
yarn run start
```

## 例子

http://localhost:6006

## 测试

```
yarn run test
```

## 开源许可

xy-select is released under the MIT license.
