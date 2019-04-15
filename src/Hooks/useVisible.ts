import { useState } from "react";
import { alignElement } from "utils-dom";
import { useOutsideClick } from "utils-hooks";

type UseVisibleReturn = [boolean, (v: boolean, isAlign?: boolean) => void, () => void, Function];

/**
 * 管理Select下拉列表的可视与对齐
 * @param innerRef  select选择框
 * @param dropdownRef   select下拉列表
 * @param disabled  是否禁用
 */
export default function useVisible(innerRef: React.MutableRefObject<any>, dropdownRef: React.MutableRefObject<any>, disabled: boolean, setSearch: (val: string) => void): UseVisibleReturn {
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
            offset: [0, 5],
            overflow: { flip: true, adjust: false }
        });
    }

    function setSelectVisible(visible: boolean, isAlign?: boolean) {
        const element = innerRef.current as HTMLElement;
        if (visible) {
            if (isAlign) {
                align();
            }
            setVisible(true);
        } else {
            setVisible(false);
            setSearch("");
            if (element) {
                const selectInner = element.querySelector(".xy-select-inner") as HTMLElement;
                selectInner.focus();
            }
        }
    }

    function toggleVisible() {
        setSelectVisible(!visible, true);
    }

    function showVisible() {
        setSelectVisible(true, true);
    }

    // 点击空白处则收起
    useOutsideClick([innerRef.current, dropdownRef.current], () => {
        setVisible(false);
        // TODO AutpComplete 点击空白处， 搜索不应该为空
        setSearch("");
    });

    return [visible, setSelectVisible, showVisible, align];
}