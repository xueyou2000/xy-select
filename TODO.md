```tsx
<select>
  <selectInner>
  	<placeholder />
  	<ul>
  		<SelectedItem/>
  		<SelectedItem/>
  		<SelectedItem/>
  	</ul>
  	<SelectSearch />
  </selectInner>
</select>

<SelectDropdown>
	<OptGroup>
	</OptGroup>
	<OptGroup>
	</OptGroup>
</SelectDropdown>
```

# todo list

-   实现`SelectedItem` - 可关闭
-   实现`OptGroup`
-   实现下拉列表空内容的占位符展示
-   键盘控制, 焦点空格打开, Esc 关闭, 回车确定, 方向键导航, 导航元素设置父窗口的滚动条
-   `selectInner`支持多选, 单选, 可搜索的样式
-   `select` 禁用样式
-   带搜索框, 进行过滤
