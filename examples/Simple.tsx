import React, { useState } from "react";
import { Option, Select } from "../src";

export default function() {
    const [show, setShow] = useState(false);

    return (
        <div>
            <button onClick={() => setShow(true)}>显示</button>

            <Select defaultValue="C#" style={{ width: "180px" }}>
                {show && (
                    <React.Fragment>
                        <Option value="C">C</Option>
                        <Option value="C++">C++</Option>
                        <Option value="Object-C">Object-C</Option>
                        <Option value="JavaScript">JavaScript</Option>
                        <Option value="C#">C#</Option>
                        <Option value="VB">VB</Option>
                        <Option value="GO">GO</Option>
                    </React.Fragment>
                )}
            </Select>
        </div>
    );
}
