import React from "react";
import { render, fireEvent, act } from "react-testing-library";
import { Select, OptGroup, Option, SelectLocal } from "../src";
import { OptionConfig } from "../src/interface";

describe("Select", () => {
    test("Not Children", () => {
        const wrapper = render(<Select empyPlaceholder="没有数据" />);
        const placeholder = wrapper.getByText(SelectLocal.selectBoxPlaceholder);
        expect(placeholder).toBeDefined();
        const description = document.body.querySelector(".xy-empty-description");
        expect(description.textContent).toBe("没有数据");
    });

    test("Disabled ClassName", () => {
        const wrapper = render(
            <Select disabled={true}>
                <Option>a</Option>
            </Select>
        );
        const selectBox = wrapper.container.querySelector(".xy-select-box");
        expect(selectBox.classList.contains("xy-select-visible")).toBeFalsy();
        fireEvent.click(selectBox);
        expect(selectBox.classList.contains("xy-select-visible")).toBeFalsy();
    });

    test("Filter Option", () => {
        // 过滤带 1 的选项
        const filter = jest.fn((cfg: OptionConfig) => (cfg.value + "").indexOf("1") !== -1);

        const wrapper = render(
            <Select filter={filter}>
                <Option>a</Option>
                <Option>b</Option>
                <Option>c</Option>
                <Option>a1</Option>
                <Option>b1</Option>
                <Option>c1</Option>
            </Select>
        );

        const options = document.body.querySelectorAll(".xy-select-dropdown .xy-option");
        expect([].map.call(options, (x) => x.textContent)).toEqual(["a", "b", "c"]);
    });

    test("SearchMode", () => {
        const onSearch = jest.fn();
        const wrapper = render(
            <Select searchMode={true} onSearch={onSearch}>
                <Option>a</Option>
                <Option>b</Option>
                <Option>c</Option>
                <Option>a1</Option>
                <Option>b1</Option>
                <Option>c1</Option>
            </Select>
        );
        const selectBox = wrapper.container.querySelector(".xy-select-box");
        fireEvent.click(selectBox);
        const input = selectBox.querySelector(".xy-select-search__field");
        fireEvent.change(input, { target: { value: "a" } });
        const options = document.body.querySelectorAll(".xy-select-dropdown .xy-option");
        expect([].map.call(options, (x) => x.textContent)).toEqual(["a", "a1"]);
        expect(onSearch.mock.calls.length).toBe(2);
        expect(onSearch.mock.calls[1][0]).toBe("a");
        fireEvent.change(input, { target: { value: "g" } });
        const description = document.body.querySelector(".xy-select-dropdown__menu .xy-empty-description");
        expect(description.textContent).toBe("暂无数据");
        expect(onSearch.mock.calls.length).toBe(3);
        expect(onSearch.mock.calls[2][0]).toBe("g");
    });

    test("multiple", () => {
        const wrapper = render(
            <Select defaultValue={["c"]} multiple={true}>
                <Option>a</Option>
                <Option>b</Option>
                <Option>c</Option>
                <Option>a1</Option>
                <Option>b1</Option>
                <Option>c1</Option>
            </Select>
        );

        let items = wrapper.container.querySelectorAll(".xy-select-item .xy-select-item__content");
        expect([].map.call(items, (x) => x.textContent)).toEqual(["c"]);
        jest.useFakeTimers();
        const _items = wrapper.container.querySelectorAll(".xy-select-item");
        // 点击后要模拟300毫秒后才生效， 因为要等待关闭动画
        fireEvent.click(_items[0].querySelector(".xy-select-item__remove"));
        jest.advanceTimersByTime(320);
        items = wrapper.container.querySelectorAll(".xy-select-item .xy-select-item__content");
        expect(items.length).toEqual(0);

        fireEvent.click(document.body.querySelector('[data-value="b"]'));
        items = wrapper.container.querySelectorAll(".xy-select-item .xy-select-item__content");
        expect([].map.call(items, (x) => x.textContent)).toEqual(["b"]);

        fireEvent.click(document.body.querySelector('[data-value="c1"]'));
        items = wrapper.container.querySelectorAll(".xy-select-item .xy-select-item__content");
        expect([].map.call(items, (x) => x.textContent)).toEqual(["b", "c1"]);
    });
});
