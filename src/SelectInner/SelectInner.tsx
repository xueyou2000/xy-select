import React, { useContext, useEffect, useRef } from "react";
import { SelectContext } from "../Context";
import { SelectInnerProps } from "../interface";
import SelectedItem from "./SelectedItem";

export function SelectInner(props: SelectInnerProps) {
    const { prefixCls, selectedCfg, onClick, onKeyDown, visible, tabIndex = 0, filter, autoFocus, placeholder = "请选择", onChangeSearch } = props;
    const innerprefixCls = `${prefixCls}-inner`;
    const context = useContext(SelectContext);
    const inputRef = useRef();

    function searchChangeHandle(e: React.ChangeEvent<HTMLInputElement>) {
        if (onChangeSearch) {
            onChangeSearch(e.target.value);
        }
    }

    function renderSearch() {
        if (!filter) {
            return null;
        }
        return (
            <div className={`${prefixCls}-search--inline`}>
                <div className={`${prefixCls}-search__wrap`}>
                    <input ref={inputRef} className={`${prefixCls}-search__field`} autoComplete="off" type="text" onChange={searchChangeHandle} />
                </div>
            </div>
        );
    }

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
        let inner = null;
        if (!selectedCfg || selectedCfg instanceof Array) {
            inner = renderPlaceholder();
        } else {
            inner = (
                <SelectedItem prefixCls={prefixCls} key={selectedCfg.value} value={selectedCfg.value}>
                    {selectedCfg.label}
                </SelectedItem>
            );
        }

        return (
            <React.Fragment>
                {inner}
                {renderSearch()}
            </React.Fragment>
        );
    }

    function mount(element: HTMLElement) {
        if (element && autoFocus) {
            element.focus();
        }
    }

    useEffect(() => {
        const input = inputRef.current as HTMLInputElement;
        if (!input) {
            return;
        }
        if (visible) {
            input.focus();
        } else {
            input.value = "";
        }
    }, [visible]);

    return (
        <div className={innerprefixCls} ref={mount} tabIndex={tabIndex} onClick={onClick} onKeyDown={onKeyDown}>
            <div className={`${innerprefixCls}__rendered`}>{context.multiple ? renderMultiple() : renderSingle()}</div>
            <span className={`${innerprefixCls}__arrow`}>
                <span>‹</span>
            </span>
        </div>
    );
}

export default React.memo(SelectInner);
