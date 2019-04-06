export type SelectedValue = any | any[];

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
     * 内容
     */
    children: React.ReactNode;
    /**
     * 是否可视
     */
    visible: boolean;
    /**
     * scrollwrapRef
     * @description 暴露出包含滚动条的dom元素
     */
    scrollwrapRef: React.MutableRefObject<any>;
    /**
     * dropdownRef
     * @description 暴露出dropdown跟节点的dom元素
     */
    dropdownRef: React.MutableRefObject<any>;
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
     * 占位符文本
     */
    placeholder?: React.ReactNode;
    /**
     * 改变回调
     */
    onChange?: (value: SelectedValue) => void;
    /**
     * 搜索
     */
    onSearch?: Function;
}

export interface SelectContextState {
    /**
     * select选中值
     */
    value?: SelectedValue;
    /**
     * 当前焦点option
     */
    focusValue?: string | number;
    /**
     * 是否多选
     */
    multiple?: boolean;
    /**
     * option选中事件
     */
    onSelect?: (val: string | number) => void;
    /**
     * option取消选中事件
     */
    onUnSelect?: (val: string | number) => void;
    /**
     * 添加option
     */
    onOptionAdd?: (value: string | number, label: string, disabled: boolean) => void;
    /**
     * 移除option
     */
    onOptionRemove?: (value: string | number) => void;
}

export interface OptionConfig {
    /**
     * option值
     */
    value: string | number;
    /**
     * option文本
     */
    label: string;
    /**
     * 是否禁用
     */
    disabled: boolean;
}

export interface SelectInnerProps {
    /**
     * 附加类名
     */
    prefixCls?: string;
    /**
     * 内容
     */
    children?: React.ReactNode;
    /**
     * 是否可视
     */
    visible?: boolean;
    /**
     * 占位符文本
     */
    placeholder?: React.ReactNode;
    /**
     * 已经选中的OptionConfig配置集合
     */
    selectedCfg?: OptionConfig | OptionConfig[];
    /**
     * ref
     */
    ref?: React.MutableRefObject<any>;
    /**
     * tabIndex
     */
    tabIndex?: number;
    /**
     * 点击事件
     */
    onClick?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
    /**
     * 键盘事件
     */
    onKeyDown?: (event: React.KeyboardEvent<HTMLElement>) => void;
}

export interface SelectItem {
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
    /**
     * tag风格
     */
    tag?: boolean;
}
