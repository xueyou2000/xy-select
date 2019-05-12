export type SelectedValue = any | any[];

export type SelectFilter = (cfg: OptionConfig, search: string) => boolean;

export interface OptionProps {
    /**
     * 附加类名
     */
    prefixCls?: string;
    /**
     * 根节点的附加类名
     */
    className?: string;
    /**
     * 内联样式
     */
    style?: React.CSSProperties;
    /**
     * 是否禁用
     */
    disabled?: boolean;
    /**
     * 是否显示分割线
     */
    divided?: boolean;
    /**
     * 选中的值
     */
    value?: string | number;
    /**
     * 标签
     * @description 对自动提取得标签不满意, 或children内无法提取字符串, 则需手动指定
     */
    label?: string;
    /**
     * 附加数据
     */
    data?: any;
    /**
     * 内容
     */
    children?: React.ReactNode;
}

export interface OptGroupProps {
    /**
     * 附加类名
     */
    prefixCls?: string;
    /**
     * 根节点的附加类名
     */
    className?: string;
    /**
     * 内联样式
     */
    style?: React.CSSProperties;
    /**
     * 内容
     */
    children?: React.ReactNode;
    /**
     * 组标签
     */
    label: string;
}

export interface DropdownProps {
    /**
     * 附加类名
     */
    prefixCls?: string;
    /**
     * 根节点的附加类名
     */
    className?: string;
    /**
     * 内联样式
     */
    style?: React.CSSProperties;
    /**
     * options内容
     */
    children?: React.ReactNode;
    /**
     * 空内容, 显示占位符
     */
    empty?: boolean;
    /**
     * 空内容占位符文本
     */
    placeholder?: React.ReactNode;
    /**
     * scrollwrapRef
     * @description 暴露出包含滚动条的dom元素
     */
    scrollwrapRef?: React.MutableRefObject<any>;
}

export interface SelectProps {
    /**
     * 附加类名
     */
    prefixCls?: string;
    /**
     * 根节点的附加类名
     */
    className?: string;
    /**
     * 内联样式
     */
    style?: React.CSSProperties;
    /**
     * 内容
     */
    children?: React.ReactNode;
    /**
     * 选中值
     */
    value?: SelectedValue;
    /**
     * 默认选中值
     */
    defaultValue?: SelectedValue;
    /**
     * 是否过滤option
     */
    filter?: SelectFilter;
    /**
     * 是否焦点
     */
    autoFocus?: boolean;
    /**
     * tabIndex
     */
    tabIndex?: number;
    /**
     * 是否禁用
     */
    disabled?: boolean;
    /**
     * 是否多选
     */
    multiple?: boolean;
    /**
     * 弹出内容类名
     */
    popupClassName?: string;
    /**
     * 是否宽度与目标宽度对齐
     */
    stretch?: boolean;
    /**
     * 占位符文本
     */
    placeholder?: React.ReactNode;
    /**
     * 改变回调
     */
    onChange?: (value: SelectedValue) => void;
    /**
     * onBlur事件
     */
    onBlur?: (e: React.FocusEvent<HTMLDivElement>) => void;
    /**
     * 搜索
     */
    onSearch?: Function;
    /**
     * 内容占位符
     * @description下拉内容为空时提示文本
     */
    empyPlaceholder?: string;
    /**
     * 是否搜索模式
     */
    searchMode?: boolean;
}

export interface OptionStateContextState {
    /**
     * 当前焦点值
     */
    focusValue?: string | number;
    /**
     * 过滤option
     */
    filter?: SelectFilter;
    /**
     * 搜索值
     */
    search?: string;
}

export interface ValueContextState {
    /**
     * select选中值
     */
    value?: SelectedValue;
    /**
     * option选中事件
     */
    onSelect?: (val: string | number) => void;
    /**
     * option取消选中事件
     */
    onUnSelect?: (val: string | number) => void;
}

export interface OptionsContextState {
    /**
     * 添加option
     */
    onOptionAdd?: (cfg: OptionConfig) => void;
    /**
     * 移除option
     */
    onOptionRemove?: (value: string | number) => void;
}

export interface OptionConfig {
    /**
     * option值
     */
    value?: string | number;
    /**
     * option文本
     */
    label: string;
    /**
     * 是否禁用
     */
    disabled?: boolean;
    /**
     * 是否过滤
     */
    filtered?: boolean;
    /**
     * 附加数据
     */
    data?: any;
}

/**
 * Select选择器
 */
export interface SelectBoxProps {
    /**
     * 附加类名
     */
    prefixCls?: string;
    /**
     * 根节点的附加类名
     */
    className?: string;
    /**
     * 内联样式
     */
    style?: React.CSSProperties;
    /**
     * 是否多选
     */
    multiple?: boolean;
    /**
     * 占位符文本
     */
    placeholder?: React.ReactNode;
    /**
     * 搜索输入框节点
     */
    children?: React.ReactNode;
    /**
     * 已经选中的OptionConfig配置集合
     */
    selectedCfg?: OptionConfig | OptionConfig[];
    /**
     * 点击事件
     */
    onClick?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
    /**
     * 键盘事件
     */
    onKeyDown?: (event: React.KeyboardEvent<HTMLElement>) => void;
    /**
     * 焦点事件
     */
    onFocus?: (event: React.FocusEvent<HTMLDivElement>) => void;
    /**
     * 失去焦点事件
     */
    onBlur?: (event: React.FocusEvent<HTMLDivElement>) => void;
}

/**
 * Select选择器内容
 */
export interface SelectBoxContentProps {
    /**
     * 附加类名
     */
    prefixCls?: string;
    /**
     * 是否多选
     */
    multiple?: boolean;
    /**
     * 已经选中的OptionConfig配置集合
     */
    selectedCfg?: OptionConfig | OptionConfig[];
}

/**
 * Select搜索输入框
 */
export interface SelectBoxSearchProps {
    /**
     * 附加类名
     */
    prefixCls?: string;
    /**
     * Select下拉列表是否可视
     */
    visible?: boolean;
    /**
     * 搜索输入框离开焦点, 是否清空输入框内容
     */
    blurClear?: boolean;
    /**
     * 搜索内容
     */
    search?: string;
    /**
     * 默认搜索内容
     */
    defaultSearch?: string;
    /**
     * 搜索内容改变
     */
    onSearchChange?: (search: string) => void;
}

/**
 * Select选中项
 */
export interface SelectItemProps {
    /**
     * 附加类名
     */
    prefixCls?: string;
    /**
     * 根节点的附加类名
     */
    className?: string;
    /**
     * 内联样式
     */
    style?: React.CSSProperties;
    /**
     * 内容
     */
    children: string;
    /**
     * 值
     */
    value: string | number;
}
