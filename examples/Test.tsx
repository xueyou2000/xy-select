import React, { useState } from "react";
import { Select, Option, OptGroup } from "../src";

export default function() {
    return (
        <div>
            <h1>测试</h1>
            <Select style={{ width: "180px" }} placeholder="没有数据" multiple={true} />
        </div>
    );
}
