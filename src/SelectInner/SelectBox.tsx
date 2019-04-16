import { SelectLocal } from "../Local";
import React from "react";
import { SelectBoxProps } from "../interface";

/**
 * Select选择框
 *   - 处理键盘事件转发
 *   - 处理占位符文本
 */
export function SelectBox(props: SelectBoxProps) {
    const { prefixCls, style, selectedCfg, children, searchContent = null, multiple, onClick, onKeyDown, tabIndex = 0 } = props;
    const selectboxPrefixCls = `${prefixCls}-box`;
    const placeholder = <div className={`${selectboxPrefixCls}__placeholder`}>{props.placeholder || SelectLocal.selectBoxPlaceholder}</div>;
    const notEmpty = multiple ? selectedCfg && (selectedCfg as any).length > 0 : selectedCfg;

    return (
        <div className={selectboxPrefixCls} style={style} tabIndex={tabIndex} onClick={onClick} onKeyDown={onKeyDown}>
            <div className={`${selectboxPrefixCls}__rendered`}>
                {notEmpty ? children : placeholder}
                {searchContent}
            </div>
            <span className={`${selectboxPrefixCls}__arrow`}>
                <span>‹</span>
            </span>
        </div>
    );
}

export default React.memo(SelectBox);
