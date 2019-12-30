import { render } from "@testing-library/react";
import React from "react";
import { Dropdown, Option } from "../src";

describe("Dropdown", () => {
    test("Show Empty Placeholder By Props", () => {
        render(
            <Dropdown prefixCls="xy-select" empty={true} placeholder="暂无内容">
                <Option value="1">选项一</Option>
            </Dropdown>,
        );

        const description = document.body.querySelector(".xy-empty-description");
        expect(description.textContent).toBe("暂无内容");
    });

    test("Show Empty Placeholder Children", () => {
        render(<Dropdown prefixCls="xy-select" placeholder="暂无内容2" />);

        const description = document.body.querySelector(".xy-empty-description");
        expect(description.textContent).toBe("暂无内容2");
    });
});
