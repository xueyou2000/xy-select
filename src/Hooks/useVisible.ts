import { useState } from "react";
import { SelectProps } from "../interface";

type UseVisibleReturn = [boolean, (v: boolean, event?: MouseEvent) => void];

/**
 * 管理Select下拉列表的可视与对齐
 * @param innerRef  select选择框
 */
export default function useVisible(innerRef: React.MutableRefObject<any>, disabledRef: React.MutableRefObject<boolean>): UseVisibleReturn {
    const [visible, setVisible] = useState(false);

    function changeVisible(v: boolean, event?: MouseEvent) {
        if (disabledRef.current) {
            return;
        }
        const element = innerRef.current as HTMLElement;
        const target = event && (event.target as HTMLElement);

        if (target && element) {
            const closeTags = element.querySelectorAll(".xy-select-item__remove") as NodeListOf<HTMLElement>;
            const isClose = [].some.call(closeTags, (tag: HTMLElement) => tag === target || tag.contains(target));
            if (!isClose) {
                setVisible(v);
            }
        } else {
            setVisible(v);
        }
    }

    return [visible, changeVisible];
}
