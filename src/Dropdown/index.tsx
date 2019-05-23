import classNames from "classnames";
import React from "react";
import Empty from "xy-empty";
import "xy-empty/assets/index.css";
import { DropdownProps } from "../interface";

/**
 * Select下拉列表
 *   - 处理下拉列表滚动条，和对应ref转发
 *   - 展示空内容占位符
 */
export function Dropdown(props: DropdownProps) {
    const { prefixCls = "xy-select", className, style, children, placeholder, empty, scrollwrapRef } = props;
    const dropdownPrefixCls = `${prefixCls}-dropdown`;
    const classString = classNames(dropdownPrefixCls, className);

    return (
        <div className={classString} style={style}>
            <div className={`${dropdownPrefixCls}__scrollwrap`} ref={scrollwrapRef}>
                <ul role="listbox" className={`${dropdownPrefixCls}__menu`}>
                    {<div style={{ display: empty || !children || React.Children.count(children) === 0 ? "none" : null }}>{children}</div>}
                    {(empty || (!children || React.Children.count(children) === 0)) && <Empty description={placeholder} />}
                </ul>
            </div>
        </div>
    );
}

export default React.memo(Dropdown);
