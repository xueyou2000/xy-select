import React, { useEffect, useRef } from "react";
import { useControll } from "utils-hooks";
import { SelectBoxSearchProps } from "../interface";

export function SelectSearch(props: SelectBoxSearchProps) {
    const { prefixCls, visible, blurClear = true, onSearchChange } = props;
    const [search, setSearch, isControll] = useControll(props, "search", "defaultSearch");
    const inputRef = useRef();

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
        if (!isControll) {
            setSearch(value);
        }
        if (onSearchChange) {
            onSearchChange(value);
        }
    }

    function changeHandle(event: React.ChangeEvent<HTMLInputElement>) {
        setValue(event.target.value);
    }

    return (
        <div className={`${prefixCls}-search--inline`}>
            <div className={`${prefixCls}-search__wrap`}>
                <input type="text" autoComplete="off" className={`${prefixCls}-search__field`} ref={inputRef} value={search} onChange={changeHandle} />
            </div>
        </div>
    );
}

export default React.memo(SelectSearch);
