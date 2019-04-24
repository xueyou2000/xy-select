import React, { useState, useRef } from "react";
import { Select, Option, OptGroup } from "../src";

export default function() {
    const [label, setLabel] = useState("标签1");
    const [value, setValue] = useState("A");

    return (
        <div>
            <h1>测试</h1>
            <button onClick={() => setLabel(label === "标签1" ? "改变标签" : "标签1")}>改变label</button>
            <button onClick={() => setValue(value === "A" ? "改变A" : "A")}>改变value</button>
            <Select style={{ width: "180px" }} placeholder="请选择" onChange={(e) => console.log("选中value", e)}>
                <Option value={value}>{label}</Option>
                <Option>其他A</Option>
                <Option>其他B</Option>
            </Select>
        </div>
    );
}
