import React, { useEffect, useRef, useCallback } from "react";
import { useControll } from "utils-hooks";
import { SelectBoxSearchProps } from "../interface";

export function SelectSearch(props: SelectBoxSearchProps) {
    const { prefixCls = "xy-select", visible, blurClear = true, search, onSearchChange } = props;
    const inputRef = useRef(null);

    useEffect(() => {
        const input = inputRef.current as HTMLInputElement;
        if (!input) {
            return;
        }
        if (visible && input) {
            input.focus();
        } else {
            if (blurClear) {
                setValue("");
            }
        }
    }, [visible]);

    function setValue(value: string) {
        if (onSearchChange) {
            onSearchChange(value);
        }
    }

    const changeHandle = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
    }, []);

    return (
        <div className={`${prefixCls}-search--inline`}>
            <div className={`${prefixCls}-search__wrap`}>
                <input type="text" disabled={!visible} autoComplete="off" className={`${prefixCls}-search__field`} ref={inputRef} value={search} onChange={changeHandle} />
            </div>
        </div>
    );
}

export default React.memo(SelectSearch);
