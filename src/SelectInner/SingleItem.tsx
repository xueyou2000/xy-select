import classNames from "classnames";
import React from "react";
import { SelectItemProps } from "../interface";

/**
 * Select选项项 - 单选时
 */
export function SingleItem(props: SelectItemProps) {
    const { className, style, children } = props;
    const prefixCls = `${props.prefixCls}-item`;
    const classString = classNames(`${prefixCls}`, className);

    return (
        <div className={classString} style={style}>
            {children}
        </div>
    );
}
export default React.memo(SingleItem);
