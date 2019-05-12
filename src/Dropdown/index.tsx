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

    function renderContent() {
        if (empty) {
            return <Empty description={placeholder} />;
        } else {
            return children || <Empty description={placeholder} />;
        }
    }

    return (
        <div className={classString} style={style}>
            <div className={`${dropdownPrefixCls}__scrollwrap`} ref={scrollwrapRef}>
                <ul role="listbox" className={`${dropdownPrefixCls}__menu`}>
                    {renderContent()}
                </ul>
            </div>
        </div>
    );
}

export default React.memo(Dropdown);
