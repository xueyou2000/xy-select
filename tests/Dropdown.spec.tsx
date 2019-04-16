import React from "react";
import { render, fireEvent } from "react-testing-library";
import { Select, OptGroup, Option, Dropdown, SelectLocal, SelectContext } from "../src";
import { OptionConfig } from "../src/interface";
import { EXITED, ENTERING, ENTERED } from "utils-hooks";

describe("Dropdown", () => {
    test("Visible Dropdown", () => {
        const onOptionAdd = jest.fn();
        const onOptionRemove = jest.fn();

        const wrapper = render(
            <SelectContext.Provider value={{ onOptionAdd, onOptionRemove }}>
                <Dropdown prefixCls="xy-select" visible={false}>
                    <Option value="1">选项一</Option>
                </Dropdown>
            </SelectContext.Provider>
        );

        let dropdown = document.body.querySelector(".xy-select-dropdown");

        expect(dropdown.classList.contains(`xy-select-dropdown-state-${EXITED}`)).toBeTruthy();

        wrapper.rerender(
            <SelectContext.Provider value={{ onOptionAdd, onOptionRemove }}>
                <Dropdown prefixCls="xy-select" visible={true}>
                    <Option value="1">选项一</Option>
                </Dropdown>
            </SelectContext.Provider>
        );
        expect(dropdown.classList.contains(`xy-select-dropdown-state-${ENTERING}`)).toBeTruthy();
        fireEvent.transitionEnd(dropdown);
        expect(dropdown.classList.contains(`xy-select-dropdown-state-${ENTERED}`)).toBeTruthy();
    });

    test("Show Empty Placeholder By Props", () => {
        const onOptionAdd = jest.fn();
        const onOptionRemove = jest.fn();

        render(
            <SelectContext.Provider value={{ onOptionAdd, onOptionRemove }}>
                <Dropdown prefixCls="xy-select" empty={true} placeholder="暂无内容">
                    <Option value="1">选项一</Option>
                </Dropdown>
            </SelectContext.Provider>
        );

        const description = document.body.querySelector(".xy-empty-description");
        expect(description.textContent).toBe("暂无内容");
    });

    test("Show Empty Placeholder Children", () => {
        const onOptionAdd = jest.fn();
        const onOptionRemove = jest.fn();

        render(
            <SelectContext.Provider value={{ onOptionAdd, onOptionRemove }}>
                <Dropdown prefixCls="xy-select" placeholder="暂无内容2" />
            </SelectContext.Provider>
        );

        const description = document.body.querySelector(".xy-empty-description");
        expect(description.textContent).toBe("暂无内容2");
    });
});
