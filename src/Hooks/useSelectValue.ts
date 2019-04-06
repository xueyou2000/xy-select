import { useControll, useMount } from "utils-hooks";
import { SelectedValue, SelectProps } from "@/interface";
import { useLayoutEffect } from "react";

/**
 * 管理select的value
 * @param props
 * @param setVisible
 */
export function useSelectValue(props: SelectProps, setVisible: React.Dispatch<React.SetStateAction<boolean>>, align: Function): [any, (val: string | number) => void, (val: string | number) => void] {
    const { multiple, disabled, onChange } = props;
    const [value, setValue, isControll] = useControll<SelectedValue>(props, "value", "defaultValue", multiple ? [] : null);

    // 多选模式下, 增加多个换行了, 导致select高度改变, 需要重新对齐
    useLayoutEffect(() => {
        if (multiple) {
            align();
        }
    }, [value]);

    /**
     * 处理受控组件和非受控组件
     * @param value
     */
    function setSelectedValue(value: any | any[]) {
        if (!isControll) {
            setValue(value);
        }
        if (onChange) {
            onChange(value);
        }
    }

    /**
     * option选中事件
     * @param val
     */
    function onSelect(val: string | number) {
        if (disabled) {
            return;
        }
        if (multiple) {
            const i = value.findIndex((x) => x === val);
            if (i === -1) {
                setSelectedValue([...value, val]);
            } else {
                setSelectedValue(value.filter((x) => x !== val));
            }
        } else {
            setSelectedValue(val);
            setVisible(false);
        }
    }

    /**
     * option取消选中
     * @param val
     */
    function onUnSelect(val: string | number) {
        if (disabled) {
            return;
        }
        if (multiple) {
            if (value.some((x) => x === val)) {
                setSelectedValue(value.filter((x) => x !== val));
            }
        } else {
            setSelectedValue(null);
            setVisible(false);
        }
    }

    return [value, onSelect, onUnSelect];
}
