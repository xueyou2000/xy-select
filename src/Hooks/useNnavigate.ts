import { OptionConfig } from "@/interface";
import { useState, useRef, useEffect, useLayoutEffect } from "react";

export interface NnavigateConfig {
    onEnter?: Function;
    onShow?: Function;
    onHide?: Function;
    onPrev?: Function;
    onNext?: Function;
}

/**
 * 定位元素
 * @description 将元素定位到wrap可视区域中
 * @param wrap 含有溢出滚动条的容器
 * @param element 元素
 */
export function locateElement(wrap: HTMLElement, element: HTMLElement) {
    if (!wrap || !element) {
        return;
    }
    wrap.scrollTop = element.offsetTop - wrap.clientHeight / 2;
}

/**
 * 键盘导航
 * @param scrollwrapRef 含有溢出滚动条的容器
 * @param config 回调配置
 */
export function useNnavigate(config: NnavigateConfig) {
    function handleKeyDown(e: React.KeyboardEvent<HTMLElement>) {
        switch (e.keyCode) {
            // Enter
            case 13:
                if (config.onEnter) {
                    config.onEnter();
                }
                break;
            // Space
            case 32:
                if (config.onShow) {
                    config.onShow();
                }
                break;
            // 上方向
            case 38:
                if (config.onPrev) {
                    config.onPrev();
                }
                break;
            // 下方向
            case 40:
                if (config.onNext) {
                    config.onNext();
                }
                break;
            // 取消
            case 27:
                if (config.onHide) {
                    config.onHide();
                }
                break;
        }
    }

    return handleKeyDown;
}

export function useSelectNnavigate(
    options: React.MutableRefObject<OptionConfig[]>,
    value: any,
    selectValue: (val: any) => void,
    visible: boolean,
    setVisible: (vis: boolean, isAlign?: boolean) => void
): [any, (e: React.KeyboardEvent<HTMLElement>) => void, React.MutableRefObject<any>] {
    const [focusValue, setFocusValue] = useState(value && value.length > 0 ? value[0] : value);
    const scrollwrapRef = useRef();
    const handleKeyDown = useNnavigate({
        onEnter: () => {
            // 设置当前 focusValue 去选中
            if (focusValue) {
                selectValue(focusValue);
            }
        },
        onShow: () => {
            if (!visible) {
                setVisible(true, true);
            }
        },
        onHide: () => {
            if (visible) {
                setVisible(false);
            }
        },
        onNext: () => {
            const opts = options.current.filter((x) => !x.disabled);
            let next = focusValue;
            const i = opts.findIndex((cfg) => cfg.value === focusValue);
            if (i === -1) {
                next = opts[0].value;
            } else if (i + 1 < opts.length) {
                next = opts[i + 1].value;
            }
            if (next === focusValue) {
                return;
            }

            setFocusValue(next);
            setFocusOption(next);
        },
        onPrev: () => {
            const opts = options.current.filter((x) => !x.disabled);
            let next = focusValue;
            const i = opts.findIndex((cfg) => cfg.value === focusValue);
            if (i === -1) {
                next = opts[0].value;
            } else if (i - 1 >= 0) {
                next = opts[i - 1].value;
            }
            if (next === focusValue) {
                return;
            }
            setFocusValue(next);
            setFocusOption(next);
        }
    });

    function setFocusOption(value: any) {
        const wrap = scrollwrapRef.current as HTMLElement;
        if (!wrap) {
            return;
        }
        const option = wrap.querySelector(`[data-value="${value}"]`) as HTMLElement;
        locateElement(wrap, option);
    }

    return [focusValue, handleKeyDown, scrollwrapRef];
}
