import React, { useState } from "react";
import { Select, Option, OptGroup } from "../src";

export default function() {
    return (
        <div>
            <h1>搜索过滤</h1>
            <Select defaultValue="customer" style={{ width: "180px" }} filter={true}>
                <Option value={0}>是零</Option>
                <Option value="pg">苹果</Option>
                <Option disabled={true} value="xg">
                    西瓜
                </Option>
                <Option divided={true} value="xj">
                    香蕉
                </Option>
                <Option value="lz">荔枝</Option>
                <Option value="kl">可乐</Option>
                <Option value="ylm">优乐美</Option>
                <Option label="自定义" value="customer">
                    <span style={{ float: "left" }}>自定义项</span>
                    <span style={{ float: "right", color: "rgb(132, 146, 166)", fontSize: "13px" }}>Customize</span>
                </Option>
                <Option value="C">C</Option>
                <Option value="C++">C++</Option>
                <Option value="Object-C">Object-C</Option>
                <Option value="JavaScript">JavaScript</Option>
                <Option value="C#">C#</Option>
                <Option value="VB">VB</Option>
                <Option value="GO">GO</Option>
            </Select>
        </div>
    );
}
