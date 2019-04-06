import classNames from "classnames";
import React, { useContext, useEffect, useRef } from "react";
import { useMount, useUnmount } from "utils-hooks";
import { SelectContext } from "../Context";
import { OptionProps, SelectFilter, OptionConfig } from "../interface";

/**
 * 过滤option
 * @param cfg
 * @param filter
 * @param search
 * @returns 返回false则过滤, 返回true不过滤
 */
function useOptionFilter(cfg: OptionConfig, filter?: boolean | SelectFilter, search?: string) {
    if (!filter || !search) {
        return true;
    }
    if (typeof filter === "boolean") {
        const _search = search.toLowerCase();
        const value = String(cfg.value).toLowerCase();
        const label = String(cfg.label).toLowerCase();
        return value.indexOf(_search) !== -1 || label.indexOf(_search) !== -1;
    } else {
        return filter(search, cfg);
    }
}

/**
 * Option组件
 * @description 必须配合Select使用
 */
export function Option(props: OptionProps) {
    const { prefixCls = "xy-option", className, style, disabled = false, divided, children } = props;
    const content = typeof children === "string" ? children : null;
    const value = props.value || content;
    const label = props.label || content;
    const context = useContext(SelectContext);
    const classString = classNames(prefixCls, className, {
        [`${prefixCls}-checked`]: getContextChecked(),
        [`${prefixCls}-disabled`]: disabled,
        [`${prefixCls}-divided`]: divided,
        [`${prefixCls}-focus`]: context.focusValue === value,
    });
    const cfg = useRef<OptionConfig>({ value, label, disabled, filterd: false });
    const ignoreFilter = useOptionFilter(cfg.current, context.filter, context.search);
    cfg.current.filterd = !ignoreFilter;

    useMount(() => {
        context.onOptionAdd(cfg.current);
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

    // useEffect(() => {
    //     if (ignoreFilter) {
    //         context.onMarkOptionFilter(value, false);
    //     } else {
    //         context.onMarkOptionFilter(value, true);
    //     }
    // }, [ignoreFilter]);

    if (!ignoreFilter) {
        return null;
    }
    return (
        <li className={classString} style={style} title={label} data-value={value} onClick={setClick}>
            {children}
        </li>
    );
}

export default React.memo(Option);
