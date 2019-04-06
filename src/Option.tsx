import classNames from "classnames";
import React, { useContext } from "react";
import { useMount, useUnmount } from "utils-hooks";
import { SelectContext } from "./Context";
import { OptionProps } from "./interface";

/**
 * Option组件
 * @description 必须配合Select使用
 */
export function Option(props: OptionProps) {
    const { prefixCls = "xy-option", className, style, disabled = false, divided, children } = props;
    const content = typeof children === "string" ? children : null;
    const value = content || props.value;
    const label = props.label || content;
    const context = useContext(SelectContext);
    const classString = classNames(prefixCls, className, {
        [`${prefixCls}-checked`]: getContextChecked(),
        [`${prefixCls}-disabled`]: disabled,
        [`${prefixCls}-divided`]: divided,
        [`${prefixCls}-focus`]: context.focusValue === value,
    });

    useMount(() => {
        context.onOptionAdd(value, label, disabled);
    });

    useUnmount(() => {
        context.onOptionRemove(value);
    });

    function getContextChecked() {
        if (context.value) {
            return context.value instanceof Array ? context.value.some((x) => x === value) : context.value === value;
        } else {
            return false;
        }
    }

    function setClick() {
        if (!disabled) {
            context.onSelect(value);
        }
    }

    return (
        <li className={classString} style={style} title={label} data-value={value} onClick={setClick}>
            {children}
        </li>
    );
}

export default React.memo(Option);
