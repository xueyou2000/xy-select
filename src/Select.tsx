import classNames from "classnames";
import React, { useCallback, useLayoutEffect, useRef, useState } from "react";
import { TriggerAction, useUpdateEffect } from "utils-hooks";
import Trigger from "xy-trigger";
import { OptionsContext, ValueContext, OptionStateContext } from "./Context";
import Dropdown from "./Dropdown";
import useOptions from "./Hooks/useOptions";
import useValue from "./Hooks/useValue";
import useVisible from "./Hooks/useVisible";
import { SelectProps } from "./interface";
import SelectBox from "./SelectInner/SelectBox";
import SelectSearch from "./SelectInner/SelectSearch";
import useNnavigate from "./Hooks/useNnavigate";

const ACTION: TriggerAction[] = ["click"];
const POPUPALIGN = { overflow: { adjust: false, flip: true } };

export const Select = React.forwardRef((props: SelectProps, innerRef: React.MutableRefObject<any>) => {
    const { prefixCls = "xy-select", className, style, children, multiple, stretch = true, popupClassName, searchMode = false, filter, disabled = false, placeholder, empyPlaceholder, onBlur } = props;
    if (!innerRef) {
        innerRef = useRef(null);
    }
    let align = useRef<Function>(null);
    const [visible, setVisible] = useVisible(innerRef);
    const [value, onSelect, onUnSelect, search, searchHandle] = useValue(props, setVisible, align);
    const [options, optionsContextRef, getOptionCfg] = useOptions(multiple);
    const [focusValue, handleKeyPress, scrollwrapRef] = useNnavigate(options, value, onSelect, setVisible, searchMode, multiple);
    const classString = classNames(prefixCls, className, `${prefixCls}-${multiple ? "multiple" : "single"}`, {
        [`${prefixCls}-disabled`]: disabled,
        [`${prefixCls}-visible`]: visible,
        [`${prefixCls}-searchMode`]: searchMode,
        [`${prefixCls}-hide-item`]: search !== "",
        [`${prefixCls}-has-value`]: multiple ? value && value.length > 0 : !!value
    });
    const selectedCfg = getOptionCfg(value);
    const [empty, setEmpty] = useState(false);

    useUpdateEffect(() => {
        const _empty = options.current.filter((x) => !x.disabled && !x.filtered).length === 0 && search !== "";
        setEmpty(_empty);
    });

    // 搜索改变后也要重新对齐
    useLayoutEffect(() => {
        if (align.current) {
            align.current(false);
        }
    }, [search]);

    function renderDropdown() {
        return (
            <OptionStateContext.Provider value={{ focusValue, filter, search }}>
                <OptionsContext.Provider value={optionsContextRef.current}>
                    <Dropdown prefixCls={prefixCls} empty={empty} placeholder={empyPlaceholder} scrollwrapRef={scrollwrapRef}>
                        {children}
                    </Dropdown>
                </OptionsContext.Provider>{" "}
            </OptionStateContext.Provider>
        );
    }

    return (
        <ValueContext.Provider value={{ value, onSelect, onUnSelect }}>
            <Trigger prefixCls={`${prefixCls}-transition`} visible={visible} onChange={setVisible} alignRef={align} action={ACTION} popupAlign={POPUPALIGN} popupClassName={popupClassName} stretch={stretch} popup={renderDropdown()}>
                <div className={classString} style={style}>
                    <SelectBox multiple={multiple} selectedCfg={selectedCfg} placeholder={placeholder} onKeyDown={handleKeyPress} onBlur={onBlur} ref={innerRef}>
                        {searchMode && <SelectSearch prefixCls={prefixCls} visible={visible} search={search} onSearchChange={searchHandle} />}
                    </SelectBox>
                </div>
            </Trigger>
        </ValueContext.Provider>
    );
});

export default Select;
