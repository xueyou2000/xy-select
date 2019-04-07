import React from "react";
import { render } from "react-testing-library";
import { Select, Option } from "../src";

describe("component", () => {
    test("render", () => {
        const wrapper = render(<Select placeholder="没有数据" />);
        const div = wrapper.getByText("没有数据");
        expect(div).toBeDefined();
    });
});
