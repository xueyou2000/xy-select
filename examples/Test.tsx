import React, { useCallback, useRef, useState } from "react";
import { Option, OptGroup, Dropdown, OptionsContext, OptionStateContext, ValueContext } from "../src";
import { OptionConfig, OptionsContextState } from "../src/interface";
import "./index.scss";

import Trigger from "xy-trigger";
import "xy-trigger/assets/index.css";
import { TriggerAction } from "utils-hooks";
const ACTION: TriggerAction[] = ["click"];
const POPUPALIGN = { overflow: { adjust: false, flip: true } };
const Content2 = React.memo(() => {
    return (
        <Dropdown>
            <OptGroup label="汽水">
                <Option value="kl">可乐</Option>
                <Option value="ylm">优乐美</Option>
                <Option label="自定义" value="customer">
                    <span style={{ float: "left" }}>自定义项</span>
                    <span style={{ float: "right", color: "rgb(132, 146, 166)", fontSize: "13px" }}>Customize</span>
                </Option>
            </OptGroup>
            <OptGroup label="编程语言">
                <Option value="C">C</Option>
                <Option value="C++">C++</Option>
                <Option value="Object-C">Object-C</Option>
                <Option value="JavaScript">JavaScript</Option>
                <Option value="C#">C#</Option>
                <Option value="VB">VB</Option>
                <Option value="GO">GO</Option>
            </OptGroup>
        </Dropdown>
    );
});

export default function() {
    const [i, setI] = useState(0);
    const options = useRef<OptionConfig[]>([]);
    const optionsContextRef = useRef<OptionsContextState>({ onOptionAdd, onOptionRemove });

    function onOptionAdd(cfg: OptionConfig) {
        if (!options.current.some((x) => x.value === cfg.value)) {
            options.current.push(cfg);
        }
    }

    function onOptionRemove(value: string | number) {
        options.current = options.current.filter((cfg) => cfg.value !== value);
    }

    return (
        <div className="select-demo">
            {i}
            <button onClick={() => setI((prev) => ++prev)}>更新</button>

            <OptionsContext.Provider value={optionsContextRef.current}>
                <Trigger action={ACTION} popup={<Content2 />} popupAlign={POPUPALIGN}>
                    <button>打开下拉列表</button>
                </Trigger>
            </OptionsContext.Provider>
        </div>
    );
}
