import { SelectLocal } from "../Local";
import classNames from "classnames";
import React from "react";
import { SelectBoxProps } from "../interface";
import SelectBoxContent from "./SelectBoxContent";

/**
 * Select选择框
 *   - 处理键盘事件转发
 *   - 处理占位符文本
 */
export function SelectBox(props: SelectBoxProps) {
    const { prefixCls = "xy-select-box", className, style, selectedCfg, children, multiple, onClick, onKeyDown, onFocus, onBlur } = props;
    const classString = classNames(prefixCls, className, {
        [`${prefixCls}-multiple`]: multiple,
    });

    const placeholder = <div className={`${prefixCls}__placeholder`}>{props.placeholder || SelectLocal.selectBoxPlaceholder}</div>;
    const notEmpty = multiple ? selectedCfg && (selectedCfg as any).length > 0 : selectedCfg;

    return (
        <div className={classString} style={style} onClick={onClick} onKeyDown={onKeyDown} tabIndex={0} onFocus={onFocus} onBlur={onBlur}>
            <div className={`${prefixCls}__rendered`}>
                {notEmpty ? <SelectBoxContent multiple={multiple} selectedCfg={selectedCfg} /> : placeholder}
                {children}
            </div>
            <span className={`${prefixCls}__arrow`}>
                <span>‹</span>
            </span>
        </div>
    );
}

export default React.memo(SelectBox);
