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
import SelectBox from "./SelectInner/SelectBox";
import SelectBoxContent from "./SelectInner/SelectBoxContent";
import SelectSearch from "./SelectInner/SelectSearch";

export const Select = React.forwardRef((props: SelectProps, innerRef: React.MutableRefObject<any>) => {
    const { prefixCls = "xy-select", className, style, children, multiple, stretch = true, popupClassName, searchMode = false, filter, autoFocus, disabled = false, placeholder, empyPlaceholder, onSearch, tabIndex, onBlur } = props;
    if (!innerRef) {
        innerRef = useRef();
    }
    const dropdownRef = useRef();
    const [search, setSearch] = useState("");
    const [visible, setVisible, toggleVisible, align] = useVisible(innerRef, dropdownRef, disabled, stretch, `.${prefixCls}-box`);
    const [value, onSelect, onUnSelect] = useValue(props, setVisible, align);
    const [options, onOptionAdd, onOptionRemove, getOptionCfg] = useOptions(multiple);
    const [focusValue, handleKeyPress, scrollwrapRef] = useNnavigate(options, value, onSelect, setVisible);
    const classString = classNames(prefixCls, className, `${prefixCls}-${multiple ? "multiple" : "single"}`, {
        [`${prefixCls}-disabled`]: disabled,
        [`${prefixCls}-visible`]: visible,
        [`${prefixCls}-searchMode`]: searchMode,
        [`${prefixCls}-hide-item`]: search !== ""
    });
    const selectedCfg = getOptionCfg(value);
    const [empty, setEmpty] = useState(false);

    useUpdateEffect(() => {
        const _empy = options.current.filter((x) => !x.disabled && !x.filtered).length === 0 && search !== "";
        setEmpty(_empy);
    });

    function searchHandle(val: string) {
        setSearch(val);
        if (onSearch) {
            onSearch(val);
        }
    }

    return (
        <SelectContext.Provider value={{ value, filter, search, options, onOptionAdd, onOptionRemove, onSelect, focusValue, multiple, onUnSelect }}>
            <div className={classString} style={style} onBlur={onBlur} ref={innerRef}>
                <SelectBox
                    prefixCls={prefixCls}
                    autoFocus={autoFocus}
                    tabIndex={tabIndex}
                    multiple={multiple}
                    selectedCfg={selectedCfg}
                    placeholder={placeholder}
                    onClick={toggleVisible}
                    onKeyDown={handleKeyPress}
                    searchContent={searchMode && <SelectSearch prefixCls={prefixCls} visible={visible} search={search} onSearchChange={searchHandle} />}
                >
                    <SelectBoxContent prefixCls={prefixCls} selectedCfg={selectedCfg} />
                </SelectBox>
            </div>
            <Dropdown popupClassName={popupClassName} prefixCls={prefixCls} empty={empty} visible={visible} placeholder={empyPlaceholder} dropdownRef={dropdownRef} scrollwrapRef={scrollwrapRef}>
                {children}
            </Dropdown>
        </SelectContext.Provider>
    );
});

export default Select;
