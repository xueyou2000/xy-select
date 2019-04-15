import { OptionConfig } from "@/interface";
import { useRef, useState, useCallback } from "react";
import { CreateNnavigateHandle, locateElement } from "utils-dom";

/**
 * 管理Select选择器的键盘导航
 * @export
 * @param {React.MutableRefObject<OptionConfig[]>} options  options配置集合
 * @param {*} value 当前选中值
 * @param {(val: any) => void} selectValue 设置选中值
 * @param {boolean} visible 是否显示下拉列表
 * @param {(vis: boolean, isAlign?: boolean) => void} setVisible    设置下拉列表是否显示
 * @returns {[any, (e: React.KeyboardEvent<HTMLElement>) => void, React.MutableRefObject<any>]}
 */
export default function useNnavigate(
    options: React.MutableRefObject<OptionConfig[]>,
    value: any,
    selectValue: (val: any) => void,
    visible: boolean,
    setVisible: (vis: boolean, isAlign?: boolean) => void
): [any, (e: React.KeyboardEvent<HTMLElement>) => void, React.MutableRefObject<any>] {
    const [focusValue, setFocusValue] = useState(value && value.length > 0 ? value[0] : value);
    const scrollwrapRef = useRef();
    const handleKeyDown = CreateNnavigateHandle({
        onEnter: () => {
            if (focusValue) {
                selectValue(focusValue);
            }
        },
        onShow: () => {
            setVisible(true, true);
        },
        onHide: () => {
            setVisible(false);
        },
        onNext: () => {
            setNextFocus(false);
        },
        onPrev: () => {
            setNextFocus();
        }
    });

    function setNextFocus(isnext = true) {
        const opts = options.current.filter((x) => !x.disabled && !x.filtered);
        let next = focusValue;
        const i = opts.findIndex((cfg) => cfg.value === focusValue);
        if (i === -1) {
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
