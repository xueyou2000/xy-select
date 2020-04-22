import classNames from "classnames";
import React, { useLayoutEffect, useRef, useState } from "react";
import { TriggerAction, useUpdateEffect } from "utils-hooks";
import Trigger from "xy-trigger";
import { OptionsContext, OptionStateContext, ValueContext } from "./Context";
import Dropdown from "./Dropdown";
import useNnavigate from "./Hooks/useNnavigate";
import useOptions from "./Hooks/useOptions";
import useValue from "./Hooks/useValue";
import useVisible from "./Hooks/useVisible";
import { SelectProps } from "./interface";
import SelectBox from "./SelectInner/SelectBox";
import SelectSearch from "./SelectInner/SelectSearch";

const ACTION: TriggerAction[] = ["click"];
const POPUPALIGN = { overflow: { adjust: false, flip: true } };

export const Select = React.forwardRef((props: SelectProps, innerRef: React.MutableRefObject<any>) => {
    const {
        prefixCls = "xy-select",
        className,
        style,
        children,
        multiple,
        stretch = true,
        popupClassName,
        searchMode = false,
        filter,
        disabled = false,
        placeholder,
        empyPlaceholder,
        onBlur,
        renderSelectItem,
        searchFilterDisabled = false,
    } = props;
    if (!innerRef) {
        innerRef = useRef(null);
    }
    let align = useRef<Function>(null);
    // 由于 Trigger 的实现是用监听原生dom, 所以触发事件后, 事件处理函数所处的prop都是原来的
    const disabledRef = useRef(disabled);
    disabledRef.current = disabled;
    const [visible, setVisible] = useVisible(innerRef, disabledRef);
    const [value, onSelect, onUnSelect, search, searchHandle] = useValue(props, setVisible, align);
    const [options, optionsContextRef, getOptionCfg] = useOptions(multiple, children);
    const [focusValue, handleKeyPress, scrollwrapRef] = useNnavigate(options, value, onSelect, setVisible, searchMode, multiple);
    const classString = classNames(prefixCls, className, `${prefixCls}-${multiple ? "multiple" : "single"}`, {
        [`${prefixCls}-disabled`]: disabled,
        [`${prefixCls}-visible`]: visible,
        [`${prefixCls}-searchMode`]: searchMode,
        [`${prefixCls}-hide-item`]: search !== "" && searchFilterDisabled === false,
        [`${prefixCls}-has-value`]: multiple ? value && value.length > 0 : !!value,
    });
    const selectedCfg = getOptionCfg(value);
    const [empty, setEmpty] = useState(false);

    useUpdateEffect(() => {
        let _empty = options.current.filter((x) => !x.disabled && !x.filtered).length === 0 && search !== "" && searchFilterDisabled === false;
        if (!searchMode && options.current.length === 0) {
            _empty = true;
        }
        setEmpty(_empty);
    });

    // TODO: #1 上一次没有合适的 label 中文显示， 当childer的options改变后, 如果有合适的，就强制更新

    // 搜索改变后也要重新对齐
    useLayoutEffect(() => {
        if (align.current) {
            align.current(false);
        }
    }, [search]);

    function renderDropdown() {
        return (
            <OptionStateContext.Provider value={{ focusValue, filter, search, searchFilterDisabled }}>
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
                    <SelectBox multiple={multiple} selectedCfg={selectedCfg} placeholder={placeholder} onKeyDown={handleKeyPress} onBlur={onBlur} ref={innerRef} renderSelectItem={renderSelectItem}>
                        {searchMode && <SelectSearch prefixCls={prefixCls} visible={visible} search={search} onSearchChange={searchHandle} />}
                    </SelectBox>
                </div>
            </Trigger>
        </ValueContext.Provider>
    );
});

export default Select;
