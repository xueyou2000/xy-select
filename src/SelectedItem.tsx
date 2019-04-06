import classNames from "classnames";
import React, { useContext } from "react";
import { SelectContext } from "./Context";
import { SelectItem } from "./interface";

export function SelectedItem(props: SelectItem) {
    const { className, style, children, value, tag } = props;
    const context = useContext(SelectContext);
    const prefixCls = `${props.prefixCls}-item`;
    const classString = classNames(`${prefixCls}-item`, className, {
        [`${prefixCls}-tag`]: tag
    });

    function removeHandle(e: React.MouseEvent<HTMLSpanElement, MouseEvent>) {
        context.onUnSelect(value);
        e.stopPropagation();
    }

    if (tag) {
        return (
            <li className={classString} style={style}>
                <div className={`${prefixCls}__content`}>{children}</div>
                <span className={`${prefixCls}__remove`} onClick={removeHandle}>
                    x
                </span>
            </li>
        );
    } else {
        return (
            <div className={classString} style={style}>
                {children}
            </div>
        );
    }
}

export default React.memo(SelectedItem);
