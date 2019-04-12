import classNames from "classnames";
import React, { useRef, useState } from "react";
import { useUpdateEffect } from "utils-hooks";
import { SelectContext } from "./Context";
import Dropdown from "./Dropdown";
import useNnavigate from "./Hooks/useNnavigate";
import useOptions from "./Hooks/useOptions";
import useValue from "./Hooks/useValue";
import useVisible from "./Hooks/useVisible";
import { SelectProps } from "./interface";
import SelectInner from "./SelectInner/SelectInner";

export function Select(props: SelectProps) {
    const { prefixCls = "xy-select", className, style, children, multiple, custInput, searchMode = false, filter, autoFocus, disabled = false, placeholder, empyPlaceholder, onSearch, tabIndex } = props;
    const innerRef = useRef();
    const dropdownRef = useRef();
    const [search, setSearch] = useState("");
    const [visible, setVisible, toggleVisible, align] = useVisible(innerRef, dropdownRef, disabled, setSearch);
    const [value, onSelect, onUnSelect] = useValue(props, setVisible, align);
    const [options, onOptionAdd, onOptionRemove, getOptionCfg] = useOptions(multiple);
    const [focusValue, handleKeyPress, scrollwrapRef] = useNnavigate(options, value, onSelect, visible, setVisible);
    const classString = classNames(prefixCls, className, `${prefixCls}-${multiple ? "multiple" : "single"}`, {
        [`${prefixCls}-disabled`]: disabled,
        [`${prefixCls}-visible`]: visible,
        [`${prefixCls}-filter`]: !!filter,
        [`${prefixCls}-searchMode`]: searchMode,
        [`${prefixCls}-hide-item`]: search !== ""
    });
    const [empy, setEmpy] = useState(false);

    useUpdateEffect(() => {
        const _empy = options.current.filter((x) => !x.disabled && !x.filterd).length === 0 && search !== "";
        setEmpy(_empy);
    });

    function searchHandle(val: string) {
        setSearch(val);
        if (onSearch) {
            onSearch(val);
        }
    }

    return (
        <SelectContext.Provider value={{ value, filter, search, onOptionAdd, onOptionRemove, onSelect, focusValue, multiple, onUnSelect }}>
            <div className={classString} style={style} ref={innerRef}>
                <SelectInner
                    visible={visible}
                    custInput={custInput}
                    searchMode={searchMode}
                    prefixCls={prefixCls}
                    selectedCfg={getOptionCfg(value)}
                    placeholder={placeholder}
                    onClick={toggleVisible}
                    onKeyDown={handleKeyPress}
                    tabIndex={tabIndex}
                    autoFocus={autoFocus}
                    onChangeSearch={searchHandle}
                />
            </div>
            <Dropdown prefixCls={prefixCls} empy={empy} visible={visible} placeholder={empyPlaceholder} dropdownRef={dropdownRef} scrollwrapRef={scrollwrapRef}>
                {children}
            </Dropdown>
        </SelectContext.Provider>
    );
}

export default React.memo(Select);
