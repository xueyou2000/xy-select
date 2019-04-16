import classNames from "classnames";
import React from "react";
import { OptGroupProps } from "../interface";

/**
 * Option分组
 * @description 仅仅在视觉上包容一组option, 不可嵌套
 */
export function OptGroup(props: OptGroupProps) {
    const { prefixCls = "xy-optgroup", className, style, label, children } = props;

    // 没有option时, 分组不显示
    if (!children || (children instanceof Array && children.length <= 0)) {
        return null;
    }

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
