import classNames from "classnames";
import React, { useContext, useEffect, useState, useRef } from "react";
import { SelectProps, SelectedValue, OptionConfig } from "./interface";
import { SelectContext } from "./Context";
import { useControll } from "utils-hooks";
import Dropdown from "./Dropdown";
import SelectInner from "./SelectInner";
import { alignElement } from "utils-dom";

export function useOutsideClick(elements, cb, deps = []) {
    useEffect(function() {
        var outsideClickHandle = (event) => {
            if (
                !elements.some((ele) => {
                    return ele && (ele === event.target || ele.contains(event.target));
                })
            ) {
                cb(event);
            }
        };
        document.addEventListener("click", outsideClickHandle, true);
        return function() {
            return document.removeEventListener("click", outsideClickHandle, true);
        };
    });
}

/**
 * 封装点击 SelectInner 打开Dropdown, 点击空白收起
 */
function useTrigger(): [React.MutableRefObject<any>, (ref: React.MutableRefObject<any>) => void, boolean, React.Dispatch<React.SetStateAction<boolean>>] {
    const [visible, setVisible] = useState(false);
    let [dropdown, setDropdown] = useState();
    const ref = useRef();

    function getDropdownRef(ref: React.MutableRefObject<any>) {
        setDropdown(ref.current);
    }

    // 点击空白处则收起
    useOutsideClick([ref.current, dropdown], () => {
        setVisible(false);
    });

    useEffect(() => {
        const element = ref.current as HTMLElement;
        if (!element) {
            return;
        }

        function handleClick() {
            if (visible) {
                setVisible(false);
            } else {
                dropdown.style.width = element.clientWidth + "px";
                alignElement(dropdown, ref.current, {
                    points: ["tl", "bl"],
                    offset: [0, 4],
                    overflow: { adjustX: false, adjustY: true }
                });
                setVisible(true);
            }
        }

        element.addEventListener("click", handleClick);
        return () => element.removeEventListener("click", handleClick);
    });

    return [ref, getDropdownRef, visible, setVisible];
}

export function Select(props: SelectProps) {
    const { prefixCls = "xy-select", className, style, children, multiple, disabled = false, placeholder, tabIndex = 0, onChange } = props;
    const [value, setValue] = useControll<SelectedValue>(props, "value", "defaultValue", multiple ? [] : null);

    const [focusValue, setFocusValue] = useState(value && value.length > 0 ? value[0] : value);
    const [innerRef, getDropdownRef, visible, setVisible] = useTrigger();
    const classString = classNames(prefixCls, className, `${prefixCls}-${multiple ? "multiple" : "single"}`, {
        [`${prefixCls}-disabled`]: disabled,
        [`${prefixCls}-visible`]: visible
    });
    const options = useRef<OptionConfig[]>([]);

    function onOptionAdd(value: string | number, label: string, disabled: boolean) {
        options.current.push({ value, label, disabled });
    }
    function onOptionRemove(value: string | number) {
        options.current = options.current.filter((cfg) => cfg.value !== value);
    }
    function onSelect(val: string | number) {
        if (multiple) {
            const i = (value as any[]).findIndex((x) => x === val);
            if (i === -1) {
                value.push(val);
                setValue([...value, val]);
            } else {
                setValue(value.filter((x) => x !== val));
            }
        } else {
            setValue(val);
            setVisible(false);
        }
    }
    function getSelectedCfg(): OptionConfig | OptionConfig[] {
        if (multiple) {
            return options.current.filter((x) => value.some((v) => v === x.value));
        } else {
            return options.current.find((x) => x.value === value);
        }
    }

    // TODO: 由 Select 控制 Dropdown 的显示隐藏, Dropdown在显示时对齐
    // TODO: Select 监听键盘方向, 来导航设置 focusValue 焦点元素

    return (
        <SelectContext.Provider value={{ value, onOptionAdd, onOptionRemove, onSelect, focusValue, multiple }}>
            <div className={classString} style={style} ref={innerRef} tabIndex={tabIndex}>
                <SelectInner selectedCfg={getSelectedCfg()} placeholder={placeholder} />
            </div>
            <Dropdown visible={visible} getDropdownRef={getDropdownRef}>
                {children}
            </Dropdown>
        </SelectContext.Provider>
    );
}

export default React.memo(Select);
