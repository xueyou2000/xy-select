import classNames from "classnames";
import React, { useContext, useRef, useCallback } from "react";
import { useMount, useUnmount } from "utils-hooks";
import { OptionsContext, OptionStateContext, ValueContext } from "../Context";
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
    const { prefixCls = "xy-option", className, style, disabled = false, divided, data, children } = props;
    const content = typeof children === "string" ? children : null;
    const value = "value" in props ? props.value : content;
    const label = props.label || content;
    const optionsContext = useContext(OptionsContext);
    const stateContext = useContext(OptionStateContext);
    const valueContext = useContext(ValueContext);
    const classString = classNames(prefixCls, className, {
        [`${prefixCls}-checked`]: getContextChecked(),
        [`${prefixCls}-disabled`]: disabled,
        [`${prefixCls}-divided`]: divided,
        [`${prefixCls}-focus`]: stateContext && stateContext.focusValue === value,
    });
    const cfg = useRef<OptionConfig>({ value, label, disabled, filtered: false });
    const filtered = stateContext ? useHasFiltered(cfg.current, stateContext.filter, stateContext.search) : false;
    // Option更新后, 也要更新这些值
    cfg.current.filtered = filtered;
    cfg.current.label = label;
    cfg.current.value = value;
    cfg.current.data = data;

    useMount(() => {
        if (optionsContext) {
            optionsContext.onOptionAdd(cfg.current);
        }
    });

    useUnmount(() => {
        if (optionsContext) {
            optionsContext.onOptionRemove(value);
        }
    });

    function getContextChecked() {
        if (valueContext && valueContext.value) {
            return valueContext.value instanceof Array ? valueContext.value.some((x) => x === value) : valueContext.value === value;
        } else {
            return false;
        }
    }

    function clickHandle(e: React.MouseEvent<HTMLElement>) {
        if (!disabled && valueContext) {
            valueContext.onSelect(value);
        }
        e.stopPropagation();
    }

    if (filtered) {
        return null;
    }
    return (
        <li className={classString} style={style} title={label} data-value={value} onClick={clickHandle}>
            {children}
        </li>
    );
}

export default React.memo(Option);
