import { useState } from "react";
import { alignElement } from "utils-dom";
import { useOutsideClick, useMount } from "utils-hooks";

type useTriggerReturn = [boolean, (v: boolean, isAlign?: boolean) => void, () => void, Function];

export function useSelectVisible(innerRef: React.MutableRefObject<any>, dropdownRef: React.MutableRefObject<any>, disabled: boolean): useTriggerReturn {
    const [visible, setVisible] = useState(false);

    function align() {
        const element = innerRef.current as HTMLElement;
        const dropdown = dropdownRef.current as HTMLElement;
        if (!element || !dropdown || disabled) {
            return;
        }

        dropdown.style.width = element.clientWidth + "px";
        alignElement(dropdown, innerRef.current, {
            points: ["tl", "bl"],
            offset: [0, 4],
            overflow: { adjustX: false, adjustY: true }
        });
    }

    function setSelectVisible(visible: boolean, isAlign?: boolean) {
        if (visible) {
            if (isAlign) {
                align();
            }
            setVisible(true);
        } else {
            setVisible(false);
        }
    }

    function selectInnerClickHandle() {
        setSelectVisible(!visible, true);
    }

    // 点击空白处则收起
    useOutsideClick([innerRef.current, dropdownRef.current], () => {
        setVisible(false);
    });

    return [visible, setSelectVisible, selectInnerClickHandle, align];
}
