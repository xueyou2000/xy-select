import React, { useCallback, useRef, useState } from "react";
import { Select } from "../src";
import "./index.scss";

export default function() {
    return (
        <div className="select-demo">
            <Select empyPlaceholder="没有数据" />
        </div>
    );
}
