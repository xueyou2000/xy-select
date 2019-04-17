import classNames from "classnames";
import React, { useContext, useState, useRef } from "react";
import { OptGroupProps, OptionConfig } from "../interface";
import { SelectContext } from "../Context";
import { useMount, useUpdateEffect } from "utils-hooks";

/**
 * Option分组
 * @description 仅仅在视觉上包容一组option, 不可嵌套
 */
export function OptGroup(props: OptGroupProps) {
    const { prefixCls = "xy-optgroup", className, style, label, children } = props;
    // 代理 SelectContext.onOptionAdd, SelectContext.onOptionRemove 维护自己分组内部options集合
    const context = useContext(SelectContext);
    const options = useRef<OptionConfig[]>([]);
    // 是否此分组内的option都不可用(被禁用或过滤)
    const [empty, setEmpty] = useState(false);
    useUpdateEffect(() => {
        const _empy = options.current.filter((x) => !x.disabled && !x.filtered).length === 0;
        setEmpty(_empy);
    });

    function onOptionAdd(cfg: OptionConfig) {
        if (!options.current.some((x) => x.value === cfg.value)) {
            options.current.push(cfg);
        }
        if (context.onOptionAdd) {
            context.onOptionAdd(cfg);
        }
    }

    function onOptionRemove(value: string | number) {
        options.current = options.current.filter((cfg) => cfg.value !== value);
        if (context.onOptionRemove) {
            context.onOptionRemove(value);
        }
    }

    // 没有option时, 分组不显示
    if (!children || (children instanceof Array && children.length <= 0)) {
        return null;
    }

    return (
        <li className={classNames(prefixCls, className)} style={Object.assign({}, style, { display: empty ? "none" : "block" })}>
            <p title={label} className={`${prefixCls}__title`}>
                {label}
            </p>
            <SelectContext.Provider value={{ ...context, onOptionAdd, onOptionRemove }}>
                <ul className={`${prefixCls}__list`}>{children}</ul>
            </SelectContext.Provider>
        </li>
    );
}

export default React.memo(OptGroup);
