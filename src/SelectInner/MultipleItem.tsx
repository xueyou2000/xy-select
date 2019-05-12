import classNames from "classnames";
import React, { useContext, useEffect, useState } from "react";
import { EXITED, useTranstion } from "utils-hooks";
import { ValueContext } from "../Context";
import { SelectItemProps } from "../interface";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export function MultipleItem(props: SelectItemProps) {
    const { className, style, children, value } = props;
    const [destroy, setDestroy] = useState(false);
    const [ref, state] = useTranstion(!destroy);
    const closeing = destroy ? state.indexOf("ex") !== -1 : false;
    const context = useContext(ValueContext);
    const prefixCls = `${props.prefixCls}-item`;
    const classString = classNames(`${prefixCls}`, className, {
        [`${prefixCls}-tag`]: true,
        [`${prefixCls}-out`]: closeing,
    });

    useEffect(() => {
        if (destroy && state === EXITED && context) {
            context.onUnSelect(value);
        }
    }, [state]);

    function removeHandle(e: React.MouseEvent<HTMLSpanElement, MouseEvent>) {
        setDestroy(true);
    }

    return (
        <li className={classString} style={style} ref={ref}>
            <div className={`${prefixCls}__content`}>{children}</div>
            <span className={`${prefixCls}__remove`} data-close="on" onClick={removeHandle}>
                <FontAwesomeIcon icon={faTimes} />
            </span>
        </li>
    );
}

export default React.memo(MultipleItem);
