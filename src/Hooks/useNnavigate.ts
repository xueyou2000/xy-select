import { OptionConfig } from "../interface";
import { useRef, useState, useCallback, useMemo } from "react";
import { CreateNnavigateHandle, locateElement } from "utils-dom";

/**
 * 管理Select选择器的键盘导航
 */
export default function useNnavigate(
    options: React.MutableRefObject<OptionConfig[]>,
    value: any,
    selectValue: (val: any) => void,
    setVisible: (vis: boolean) => void,
    multiple: boolean,
    searchMode: boolean,
): [any, (e: React.KeyboardEvent<HTMLElement>) => void, React.MutableRefObject<any>] {
    const [focusValue, setFocusValue] = useState(multiple ? null : value && value.length > 0 ? value[0] : value);
    const scrollwrapRef = useRef(null);
    const handleKeyDown = useCallback(
        CreateNnavigateHandle({
            onEnter: (e: KeyboardEvent) => {
                if (focusValue !== undefined || focusValue !== null) {
                    selectValue(focusValue);
                }
                const selectBox = e.currentTarget as HTMLElement;
                if (selectBox && multiple) {
                    if (searchMode) {
                        selectBox.querySelector("input").focus();
                    } else {
                        selectBox.focus();
                    }
                }
            },
            onShow: () => {
                setVisible(true);
            },
            onHide: (e: KeyboardEvent) => {
                setVisible(false);
                const selectBox = e.currentTarget as HTMLElement;
                if (selectBox) {
                    selectBox.focus();
                }
            },
            onNext: () => {
                setNextFocus(false);
            },
            onPrev: () => {
                setNextFocus();
            },
        }),
        [focusValue, value],
    );

    function restoreFocus(e: KeyboardEvent) {
        const selectBox = e.currentTarget as HTMLElement;
        if (selectBox) {
            if (searchMode) {
                selectBox.querySelector("input").focus();
            } else {
                selectBox.focus();
            }
        }
    }

    function setNextFocus(isnext = true) {
        const opts = options.current.filter((x) => !x.disabled && !x.filtered);
        let next = focusValue;
        const i = opts.findIndex((cfg) => cfg.value === focusValue);
        if (i === -1 && opts.length > 0) {
            next = opts[0].value;
        } else if (isnext ? i - 1 >= 0 : i + 1 < opts.length) {
            next = isnext ? opts[i - 1].value : opts[i + 1].value;
        }
        if (next === focusValue) {
            return;
        }
        setFocusOption(next);
    }

    /**
     * 设置焦点Option
     * @param value
     */
    function setFocusOption(value: any) {
        setFocusValue(value);
        const wrap = scrollwrapRef.current as HTMLElement;
        if (!wrap) {
            return;
        }
        const option = wrap.querySelector(`[data-value="${value}"]`) as HTMLElement;
        locateElement(wrap, option);
    }

    return [focusValue, handleKeyDown, scrollwrapRef];
}
