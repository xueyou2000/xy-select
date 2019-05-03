import classNames from "classnames";
import React, { useRef } from "react";
import { usePortal, useTranstion } from "utils-hooks";
import Empty from "xy-empty";
import "xy-empty/assets/index.css";
import { useForwardRef } from "../Hooks/useForwardRef";
import { DropdownProps } from "../interface";

/**
 * Select下拉列表
 *   - 处理下拉列表弹出到body内
 *   - 处理下拉列表 打开/收起 动画
 *   - 处理下拉列表滚动条，和对应ref转发
 *   - 展示空内容占位符
 */
export function Dropdown(props: DropdownProps) {
    const { prefixCls, children, visible = false, popupClassName, placeholder, empty, dropdownRef, scrollwrapRef } = props;
    const menuRef = useRef(null);
    const [renderPortal] = usePortal(popupClassName);
    const [ref, state] = useTranstion(visible);
    const opening = state.indexOf("en") !== -1;
    const dropdownPrefixCls = `${prefixCls}-dropdown`;
    const classString = classNames(dropdownPrefixCls, `${dropdownPrefixCls}-state-${state}`, {
        [`${dropdownPrefixCls}-open`]: opening,
    });

    // 转发ref
    useForwardRef([ref, menuRef], [dropdownRef, scrollwrapRef]);

    function renderContent() {
        if (empty) {
            return <Empty description={placeholder} />;
        } else {
            return children || <Empty description={placeholder} />;
        }
    }

    return renderPortal(
        <div className={classString} ref={ref}>
            <div className={`${dropdownPrefixCls}__scrollwrap`} ref={menuRef}>
                <ul role="listbox" className={`${dropdownPrefixCls}__menu`}>
                    {renderContent()}
                </ul>
            </div>
        </div>,
    );
}

export default React.memo(Dropdown);
