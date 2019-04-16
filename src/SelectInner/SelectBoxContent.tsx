import { SelectContext } from "../Context";
import React, { useContext } from "react";
import { OptionConfig, SelectBoxContentProps } from "../interface";
import MultipleItem from "./MultipleItem";
import SingleItem from "./SingleItem";

export function SelectBoxContent(props: SelectBoxContentProps): any {
    const { prefixCls, selectedCfg } = props;
    const context = useContext(SelectContext);

    if (context.multiple) {
        const cfgs = selectedCfg as OptionConfig[];
        return (
            cfgs && (
                <ul>
                    {cfgs.map((cfg) => (
                        <MultipleItem prefixCls={prefixCls} value={cfg.value} key={cfg.value}>
                            {cfg.label}
                        </MultipleItem>
                    ))}
                </ul>
            )
        );
    } else {
        const cfg = selectedCfg as OptionConfig;
        return (
            selectedCfg && (
                <SingleItem prefixCls={prefixCls} value={cfg.value}>
                    {cfg.label}
                </SingleItem>
            )
        );
    }
}

export default React.memo(SelectBoxContent);
