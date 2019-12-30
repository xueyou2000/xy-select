import classNames from "classnames";
import React from "react";
import { SelectBoxProps } from "../interface";
import SelectBoxContent from "./SelectBoxContent";
import { getLocal } from "../local";

/**
 * Select选择框
 *   - 处理键盘事件转发
 *   - 处理占位符文本
 */
export const SelectBox = React.forwardRef((props: SelectBoxProps, ref: React.MutableRefObject<any>) => {
    const { prefixCls = "xy-select-box", className, style, selectedCfg, children, multiple, onClick, onKeyDown, onFocus, onBlur, placeholder = getLocal().Select.placeholder } = props;
    const classString = classNames(prefixCls, className, {
        [`${prefixCls}-multiple`]: multiple,
    });

    const _placeholder = <div className={`${prefixCls}__placeholder`}>{placeholder}</div>;
    const notEmpty = multiple ? selectedCfg && (selectedCfg as any).length > 0 : selectedCfg;

    return (
        <div className={classString} style={style} onClick={onClick} onKeyDown={onKeyDown} tabIndex={0} onFocus={onFocus} onBlur={onBlur} ref={ref}>
            <div className={`${prefixCls}__rendered`}>
                {notEmpty ? <SelectBoxContent multiple={multiple} selectedCfg={selectedCfg} /> : _placeholder}
                {children}
            </div>
            <span className={`${prefixCls}__arrow`}>
                <span>‹</span>
            </span>
        </div>
    );
});

export default React.memo(SelectBox);
