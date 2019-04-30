import React from "react";
import { Option, Select } from "xy-select";
import "xy-select/assets/index";

export default function() {
    return (
        <Select style={{ width: "180px" }}>
            <Option value="C">C</Option>
            <Option value="C++">C++</Option>
            <Option value="Object-C">Object-C</Option>
            <Option value="JavaScript">JavaScript</Option>
            <Option value="C#">C#</Option>
            <Option value="VB">VB</Option>
            <Option value="GO">GO</Option>
        </Select>
    );
}
