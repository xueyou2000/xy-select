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
     * 是否选中
     */
    checked?: boolean;
    /**
     * 是否禁用
     */
    disabled?: boolean;
    /**
     * 是否显示分割线
     */
    divided?: boolean;
    /**
     * 鼠标悬浮提示
     */
    title?: string;
    /**
     * 选中得值
     */
    value?: string | number;
    /**
     * 是否焦点
     */
    focus?: boolean;
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
    children?: React.ReactNode;
    /**
     * 是否可视
     */
    visible?: boolean;
    /**
     * ref
     */
    getDropdownRef?: (ref: React.MutableRefObject<any>) => void;
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
     * option点击事件
     */
    onSelect?: Function;
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
}
