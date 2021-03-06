import { fireEvent, render } from "@testing-library/react";
import React from "react";
import { OptGroup, Option, OptionsContext, OptionStateContext, ValueContext } from "../src";
import { OptionConfig } from "../src/interface";

describe("Option", () => {
    test("Default Render uncheck", () => {
        const addFn = jest.fn();
        const removeFn = jest.fn();

        const wrapper = render(
            <OptionsContext.Provider value={{ onOptionAdd: addFn, onOptionRemove: removeFn }}>
                <Option value="1">选项一</Option>
            </OptionsContext.Provider>,
        );
        const option = wrapper.getByText("选项一");
        expect(option.classList.contains("xy-option-checked")).toBeFalsy();
        expect(addFn).toBeCalled();

        wrapper.unmount();
        expect(removeFn).toBeCalled();
    });

    test("Focus Option", () => {
        const addFn = jest.fn();
        const removeFn = jest.fn();

        const wrapper = render(
            <OptionsContext.Provider value={{ onOptionAdd: addFn, onOptionRemove: removeFn }}>
                <OptionStateContext.Provider value={{ focusValue: "cc" }}>
                    <Option value="bb">普通选项</Option>
                    <Option value="cc">焦点选项</Option>
                </OptionStateContext.Provider>
            </OptionsContext.Provider>,
        );
        const option1 = wrapper.getByText("普通选项");
        expect(option1.classList.contains("xy-option-focus")).toBeFalsy();

        const option2 = wrapper.getByText("焦点选项");
        expect(option2.classList.contains("xy-option-focus")).toBeTruthy();
    });

    test("Find Content To Value And Label", () => {
        let cfg: OptionConfig = null;
        const addFn = jest.fn((x) => {
            cfg = x;
        });

        render(
            <OptionsContext.Provider value={{ onOptionAdd: addFn, onOptionRemove: jest.fn() }}>
                <Option>武汉</Option>
            </OptionsContext.Provider>,
        );

        expect(cfg.value).toBe("武汉");
        expect(cfg.label).toBe("武汉");
    });

    test("Click Option", () => {
        const addFn = jest.fn();
        const removeFn = jest.fn();
        const onSelect = jest.fn();

        const wrapper = render(
            <OptionsContext.Provider value={{ onOptionAdd: addFn, onOptionRemove: removeFn }}>
                <ValueContext.Provider value={{ onSelect }}>
                    <Option value="a">选项1</Option>
                    <Option value="b">选项2</Option>
                </ValueContext.Provider>
            </OptionsContext.Provider>,
        );

        fireEvent.click(wrapper.getByText("选项1"));
        expect(onSelect.mock.calls.length).toBe(1);
        expect(onSelect.mock.calls[0][0]).toBe("a");

        fireEvent.click(wrapper.getByText("选项2"));
        expect(onSelect.mock.calls.length).toBe(2);
        expect(onSelect.mock.calls[1][0]).toBe("b");
    });

    test("Filter Option", () => {
        const addFn = jest.fn();
        const removeFn = jest.fn();
        const filter = jest.fn((cfg: OptionConfig) => cfg.value === "b");

        const wrapper = render(
            <OptionsContext.Provider value={{ onOptionAdd: addFn, onOptionRemove: removeFn }}>
                <OptionStateContext.Provider value={{ filter }}>
                    <Option value="a">选项1</Option>
                    <Option value="b">选项2</Option>
                </OptionStateContext.Provider>
            </OptionsContext.Provider>,
        );

        const option2 = wrapper.container.querySelector('[data-value="b"]');

        expect(wrapper.getByText("选项1")).toBeDefined();
        expect(option2.classList.contains("filtered")).toBeTruthy();
        expect(filter).toBeCalled();
    });

    test("Search Option", () => {
        const addFn = jest.fn();
        const removeFn = jest.fn();
        const wrapper = render(
            <OptionsContext.Provider value={{ onOptionAdd: addFn, onOptionRemove: removeFn }}>
                <OptionStateContext.Provider value={{ search: "a" }}>
                    <Option value="a">选项1</Option>
                    <Option value="b">选项2</Option>
                </OptionStateContext.Provider>
            </OptionsContext.Provider>,
        );

        expect(wrapper.getByText("选项1")).toBeDefined();
        const option2 = wrapper.container.querySelector('[data-value="b"]');
        expect(option2.classList.contains("filtered")).toBeTruthy();
    });

    test("Disabled ClassName", () => {
        const wrapper = render(
            <OptionsContext.Provider value={{ onOptionAdd: jest.fn(), onOptionRemove: jest.fn() }}>
                <Option disabled={true} value="1">
                    选项一
                </Option>
            </OptionsContext.Provider>,
        );
        const option = wrapper.getByText("选项一");
        expect(option.classList.contains("xy-option-disabled")).toBeTruthy();
    });

    test("Divided ClassName", () => {
        const wrapper = render(
            <OptionsContext.Provider value={{ onOptionAdd: jest.fn(), onOptionRemove: jest.fn() }}>
                <Option divided={true} value="1">
                    选项一
                </Option>
            </OptionsContext.Provider>,
        );
        const option = wrapper.getByText("选项一");
        expect(option.classList.contains("xy-option-divided")).toBeTruthy();
    });

    test("When Not Children Don't Render OptGroup", () => {
        const wrapper = render(
            <OptionsContext.Provider value={{ onOptionAdd: jest.fn(), onOptionRemove: jest.fn() }}>
                <OptGroup label="选项组" />
            </OptionsContext.Provider>,
        );

        const optGroup = wrapper.container.querySelector(".xy-optgroup");
        expect(optGroup).toBeNull();
    });
});
