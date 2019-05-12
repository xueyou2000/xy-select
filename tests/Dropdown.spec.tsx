import React from "react";
import { render, fireEvent } from "react-testing-library";
import { Select, OptGroup, Option, Dropdown, SelectLocal, OptionsContext, OptionStateContext, ValueContext } from "../src";
import { OptionConfig } from "../src/interface";
import { EXITED, ENTERING, ENTERED } from "utils-hooks";

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
