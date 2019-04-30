import { useState } from "react";
import { alignElement } from "utils-dom";
import { useOutsideClick } from "utils-hooks";

type UseVisibleReturn = [boolean, (v: boolean, isAlign?: boolean) => void, () => void, Function];

/**
 * 管理Select下拉列表的可视与对齐
 * @param innerRef  select选择框
 * @param dropdownRef   select下拉列表
 * @param disabled  是否禁用
 * @param blurClassSelector 关闭时需要设置焦点的选择器
 */
export default function useVisible(innerRef: React.MutableRefObject<any>, dropdownRef: React.MutableRefObject<any>, disabled: boolean, stretch: boolean, blurClassSelector?: string): UseVisibleReturn {
    const [visible, setVisible] = useState(false);

    function align() {
        const element = innerRef.current as HTMLElement;
        const dropdown = dropdownRef.current as HTMLElement;
        if (!element || !dropdown || disabled) {
            return;
        }

        if (stretch) {
            dropdown.style.width = element.clientWidth + "px";
        }
        dropdown.style.height = null;
        alignElement(dropdown, innerRef.current, {
            points: ["tl", "bl"],
            offset: [0, 5],
            overflow: { flip: true, adjust: false }
        });
    }

    function setSelectVisible(visible: boolean, isAlign?: boolean) {
        const element = innerRef.current as HTMLElement;
        if (disabled) {
            return;
        }
        if (visible) {
            if (isAlign) {
                align();
            }
            setVisible(true);
        } else {
            setVisible(false);
            if (element && blurClassSelector) {
                const selectInner = element.querySelector(blurClassSelector) as HTMLElement;
                if (selectInner) {
                    selectInner.focus();
                }
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
    useOutsideClick(
        [innerRef.current, dropdownRef.current],
        () => {
            if (visible) {
                setVisible(false);
            }
        },
        [visible]
    );

    return [visible, setSelectVisible, showVisible, align];
}
