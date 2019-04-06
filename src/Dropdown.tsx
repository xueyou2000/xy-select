import classNames from "classnames";
import React, { useEffect, useRef } from "react";
import { usePortal, useTranstion } from "utils-hooks";
import Empty from "xy-empty";
import "xy-empty/assets/index.css";
import { DropdownProps } from "./interface";

export function Dropdown(props: DropdownProps) {
    const { prefixCls, children, visible, placeholder = "无内容", empy, dropdownRef, scrollwrapRef } = props;
    const [renderPortal] = usePortal();
    const menuRef = useRef();
    const [ref, state] = useTranstion(visible, true);
    const opening = state.indexOf("en") !== -1;
    const dropdownPrefixCls = `${prefixCls}-dropdown`;
    const classString = classNames(dropdownPrefixCls, `${dropdownPrefixCls}-state-${state}`, {
        [`${dropdownPrefixCls}-open`]: opening,
    });

    /**
     * 暴露 dropdownRef
     */
    useEffect(() => {
        dropdownRef.current = ref.current;
    }, [ref.current]);

    /**
     * 暴露 scrollwrapRef
     */
    useEffect(() => {
        scrollwrapRef.current = menuRef.current;
    }, [menuRef.current]);

    return renderPortal(
        <div className={classString} ref={ref}>
            <div className={`${dropdownPrefixCls}__scrollwrap`}>
                <ul role="listbox" className={`${dropdownPrefixCls}__menu`} ref={menuRef}>
                    {empy || !children ? <Empty style={{ padding: "10px 0" }} description={placeholder} /> : children}
                </ul>
            </div>
        </div>,
    );
}

export default React.memo(Dropdown);
