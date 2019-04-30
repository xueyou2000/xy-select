import { SelectedValue, SelectProps } from "../interface";
import { useLayoutEffect } from "react";
import { useControll } from "utils-hooks";

type UseValueReturn = [any, (val: string | number) => void, (val: string | number) => void];

/**
 * 管理select选中的值
 * @param props select的属性
 * @param setVisible    设置可视状态
 * @param align   对齐函数
 */
export default function useValue(props: SelectProps, setVisible: (v: boolean, isAlign?: boolean) => void, align: Function): UseValueReturn {
    const { multiple, disabled, onChange } = props;
    const [value, setValue, isControll] = useControll<SelectedValue>(props, "value", "defaultValue", multiple ? [] : null);

    // Tips: 多选模式下, Select选择器高度随所选值动态改变, 需要重新对齐
    useLayoutEffect(() => {
        if (multiple) {
            align();
        }
    }, [value]);

    /**
     * 处理受控组件和非受控组件
     * @param value
     */
    function setSelectedValue(value: SelectedValue) {
        if (!isControll) {
            setValue(value);
        }
        if (onChange) {
            onChange(value);
        }
    }

    /**
     * 选中值
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
     * 取消选中值
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
