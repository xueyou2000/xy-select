import classNames from "classnames";
import React from "react";
import { OptGroupProps } from "./interface";

/**
 * Option组
 * @description 再视觉上包容一组option, 不可嵌套
 */
export function OptGroup(props: OptGroupProps) {
    const { prefixCls = "xy-optgroup", className, style, label, children } = props;

    return (
        <li className={classNames(prefixCls, className)} style={style}>
            <p title={label} className={`${prefixCls}__title`}>
                {label}
            </p>
            <ul className={`${prefixCls}__list`}>{children}</ul>
        </li>
    );
}

export default React.memo(OptGroup);
