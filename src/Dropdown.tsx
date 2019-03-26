import classNames from "classnames";
import React, { useContext, useEffect } from "react";
import { DropdownProps } from "./interface";
import { SelectContext } from "./Context";
import { usePortal, useTranstion, useMount } from "utils-hooks";

/**
 * 不该由Dropdown自己获取option, 由上级select传入
 * @param props
 */

/**
 * SelectDropdown
 * 处理元素Portal到外部
 * 处理显示, 隐藏动画状态
 */

export function Dropdown(props: DropdownProps) {
    const { prefixCls = "xy-select-dropdown", children, visible, getDropdownRef } = props;
    const [renderPortal] = usePortal();
    const [ref, state] = useTranstion(visible, true);
    const opening = state.indexOf("en") !== -1;
    const classString = classNames(prefixCls, `${prefixCls}-state-${state}`, {
        [`${prefixCls}-open`]: opening
    });

    useEffect(() => {
        if (getDropdownRef) {
            getDropdownRef(ref);
        }
    }, [ref.current]);

    return renderPortal(
        <div className={classString} ref={ref}>
            <div className={`${prefixCls}__scrollwrap`}>
                <ul role="listbox" className={`${prefixCls}__menu`}>
                    {children}
                </ul>
            </div>
        </div>
    );
}

export default React.memo(Dropdown);
