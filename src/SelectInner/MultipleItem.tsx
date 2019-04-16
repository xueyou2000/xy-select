import classNames from "classnames";
import React, { useContext } from "react";
import { SelectContext } from "../Context";
import { SelectItemProps } from "../interface";

export function MultipleItem(props: SelectItemProps) {
    const { className, style, children, value } = props;
    const context = useContext(SelectContext);
    const prefixCls = `${props.prefixCls}-item`;
    const classString = classNames(`${prefixCls}`, className, {
        [`${prefixCls}-tag`]: true
    });

    function removeHandle(e: React.MouseEvent<HTMLSpanElement, MouseEvent>) {
        const li = (e.target as HTMLElement).parentNode as HTMLElement;
        li.classList.add(`${prefixCls}-out`);
        e.stopPropagation();

        setTimeout(() => {
            context.onUnSelect(value);
        }, 300);
    }

    return (
        <li className={classString} style={style}>
            <div className={`${prefixCls}__content`}>{children}</div>
            <span className={`${prefixCls}__remove`} onClick={removeHandle}>
                x
            </span>
        </li>
    );
}

export default React.memo(MultipleItem);
