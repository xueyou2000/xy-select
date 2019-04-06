import React, { useContext } from "react";
import { SelectContext } from "./Context";
import { SelectInnerProps } from "./interface";
import SelectedItem from "./SelectedItem";
import { useMount } from "utils-hooks";

export function SelectInner(props: SelectInnerProps) {
    const { prefixCls, selectedCfg, onClick, onKeyDown: onKeyPress, tabIndex = 0, placeholder = "请选择", ref } = props;
    const innerprefixCls = `${prefixCls}-inner`;
    const context = useContext(SelectContext);

    function renderPlaceholder() {
        return <div className={`${innerprefixCls}__placeholder`}>{placeholder}</div>;
    }

    function renderMultiple() {
        if (selectedCfg && selectedCfg instanceof Array) {
            return (
                <ul>
                    {selectedCfg.map((x) => (
                        <SelectedItem prefixCls={prefixCls} key={x.value} value={x.value} tag={true}>
                            {x.label}
                        </SelectedItem>
                    ))}
                </ul>
            );
        } else {
            return renderPlaceholder();
        }
    }

    function renderSingle() {
        if (!selectedCfg || selectedCfg instanceof Array) {
            return renderPlaceholder();
        } else {
            return (
                <SelectedItem prefixCls={prefixCls} key={selectedCfg.value} value={selectedCfg.value}>
                    {selectedCfg.label}
                </SelectedItem>
            );
        }
    }

    return (
        <div className={innerprefixCls} ref={ref} tabIndex={tabIndex} onClick={onClick} onKeyDown={onKeyPress}>
            <div className={`${innerprefixCls}__rendered`}>{context.multiple ? renderMultiple() : renderSingle()}</div>
            <span className={`${innerprefixCls}__arrow`}>
                <span>‹</span>
            </span>
        </div>
    );
}

export default React.memo(SelectInner);
