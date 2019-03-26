import classNames from "classnames";
import React, { useContext, useEffect } from "react";
import { OptionProps } from "./interface";
import { SelectContext } from "./Context";
import { useMount, useUnmount } from "utils-hooks";

/**
 * 此元素不能单独使用, 必须在Select内部
 * @param props
 */
export function Option(props: OptionProps) {
    const { prefixCls = "xy-option", className, style, checked, disabled = false, divided, children, title } = props;
    const content = typeof children === "string" ? children : null;
    const contentValue = typeof content === "string" ? content : null;
    const value = props.value || contentValue;
    const label = props.label || contentValue;
    const context = useContext(SelectContext);
    const classString = classNames(prefixCls, className, {
        [`${prefixCls}-checked`]: getContextChecked(),
        [`${prefixCls}-disabled`]: disabled,
        [`${prefixCls}-divided`]: divided,
        [`${prefixCls}-focus`]: context.focusValue === value
    });

    useMount(() => {
        if (!context) {
            return;
        }
        context.onOptionAdd(value, label, disabled);
    });

    useUnmount(() => {
        if (!context) {
            return;
        }
        context.onOptionRemove(value);
    });

    function getContextChecked() {
        if (context && context.value) {
            return context.value instanceof Array ? context.value.some((x) => x === value) : context.value === value;
        } else {
            return checked;
        }
    }

    function setClick() {
        if (!disabled && context) {
            context.onSelect(value);
        }
    }

    function handleKeyPress(event: React.KeyboardEvent<HTMLElement>) {
        if (event.keyCode === 13) {
            setClick();
        }
    }

    return (
        <li className={classString} style={style} title={title} data-label={label} onClick={setClick} onKeyPress={handleKeyPress}>
            <span className={`${prefixCls}-content`}>{children}</span>
        </li>
    );
}

export default React.memo(Option);
