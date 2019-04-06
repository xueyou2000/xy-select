import classNames from "classnames";
import React, { useRef } from "react";
import { SelectContext } from "./Context";
import Dropdown from "./Dropdown";
import { useSelectNnavigate } from "./Hooks/useNnavigate";
import { useOptionCollect } from "./Hooks/useOptionCollect";
import { useSelectVisible } from "./Hooks/useSelectVisible";
import { useSelectValue } from "./Hooks/useSelectValue";
import { SelectProps } from "./interface";
import SelectInner from "./SelectInner";

export function Select(props: SelectProps) {
    const { prefixCls = "xy-select", className, style, children, multiple, disabled = false, placeholder, tabIndex } = props;
    const innerRef = useRef();
    const dropdownRef = useRef();
    const [visible, setVisible, selectInnerClickHandle, align] = useSelectVisible(innerRef, dropdownRef, disabled);
    const [value, onSelect, onUnSelect] = useSelectValue(props, setVisible, align);
    const [options, onOptionAdd, onOptionRemove, selectedCfg] = useOptionCollect(value, multiple);
    const [focusValue, handleKeyPress, scrollwrapRef] = useSelectNnavigate(options, value, onSelect, visible, setVisible);
    const classString = classNames(prefixCls, className, `${prefixCls}-${multiple ? "multiple" : "single"}`, {
        [`${prefixCls}-disabled`]: disabled,
        [`${prefixCls}-visible`]: visible
    });

    return (
        <SelectContext.Provider value={{ value, onOptionAdd, onOptionRemove, onSelect, focusValue, multiple, onUnSelect }}>
            <div className={classString} style={style} ref={innerRef}>
                <SelectInner prefixCls={prefixCls} selectedCfg={selectedCfg} placeholder={placeholder} onClick={selectInnerClickHandle} onKeyDown={handleKeyPress} tabIndex={tabIndex} />
            </div>
            <Dropdown prefixCls={prefixCls} visible={visible} dropdownRef={dropdownRef} scrollwrapRef={scrollwrapRef}>
                {children}
            </Dropdown>
        </SelectContext.Provider>
    );
}

export default React.memo(Select);
