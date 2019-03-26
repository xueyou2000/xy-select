import classNames from "classnames";
import React, { useContext, useEffect } from "react";
import { SelectInnerProps } from "./interface";
import { SelectContext } from "./Context";
import { usePortal, useTranstion } from "utils-hooks";

/**
 * 自定义实现是否显示右侧箭头, 多选, 等
 * @param props
 */
export function SelectInner(props: SelectInnerProps) {
    const { prefixCls = "xy-select-inner", selectedCfg, visible, placeholder = "请选择", ref } = props;
    const context = useContext(SelectContext);

    function renderPlaceholder() {
        return <div className={`${prefixCls}__placeholder`}>{placeholder}</div>;
    }

    function renderMultiple() {
        // TODO 以后用 SelectedItem 代替
        if (selectedCfg && selectedCfg instanceof Array) {
            return selectedCfg.map((x) => <span key={x.value}>{x.label}</span>);
        } else {
            return renderPlaceholder();
        }
    }

    function renderSingle() {
        // TODO 以后用 SelectedItem 代替
        if (!selectedCfg || selectedCfg instanceof Array) {
            return renderPlaceholder();
        } else {
            return <span key={selectedCfg.value}>{selectedCfg.label}</span>;
        }
    }

    return (
        <div className={prefixCls} ref={ref}>
            <div className={`${prefixCls}__rendered`}>{context.multiple ? renderMultiple() : renderSingle()}</div>
            <span className={`${prefixCls}__arrow`}>
                <span>‹</span>
            </span>
        </div>
    );
}

export default React.memo(SelectInner);
