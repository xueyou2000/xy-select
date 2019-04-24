import classNames from "classnames";
import React, { useContext, useRef } from "react";
import { useMount, useUnmount } from "utils-hooks";
import { SelectContext } from "../Context";
import { OptionConfig, OptionProps, SelectFilter } from "../interface";

/**
 * 判断是否过滤
 * @param cfg   option配置
 * @param filter    是否过滤/过滤函数
 * @param search    当前搜索内容
 * @returns 返回true则过滤, 返回false不过滤
 */
function useHasFiltered(cfg: OptionConfig, filter?: SelectFilter, search?: string) {
    if (search) {
        const _search = search.toLowerCase();
        const value = String(cfg.value).toLowerCase();
        const label = String(cfg.label).toLowerCase();
        return value.indexOf(_search) === -1 && label.indexOf(_search) === -1;
    } else if (filter) {
        return filter(cfg, search);
    }
}

/**
 * Option组件
 * @description 必须配合SelectContext使用
 */
export function Option(props: OptionProps) {
    const { prefixCls = "xy-option", className, style, disabled = false, divided, children } = props;
    const content = typeof children === "string" ? children : null;
    const value = "value" in props ? props.value : content;
    const label = props.label || content;
    const context = useContext(SelectContext);
    const classString = classNames(prefixCls, className, {
        [`${prefixCls}-checked`]: getContextChecked(),
        [`${prefixCls}-disabled`]: disabled,
        [`${prefixCls}-divided`]: divided,
        [`${prefixCls}-focus`]: context.focusValue === value
    });
    const cfg = useRef<OptionConfig>({ value, label, disabled, filtered: false });
    const filtered = useHasFiltered(cfg.current, context.filter, context.search);
    // Option更新后, 也要更新这些值
    cfg.current.filtered = filtered;
    cfg.current.label = label;
    cfg.current.value = value;

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

    if (filtered) {
        return null;
    }
    return (
        <li className={classString} style={style} title={label} data-value={value} onClick={setClick}>
            {children}
        </li>
    );
}

export default React.memo(Option);
