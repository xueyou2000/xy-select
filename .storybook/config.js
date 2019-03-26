import React from "react";
import { addParameters, configure, storiesOf } from "@storybook/react";
import { withInfo } from "@storybook/addon-info";
import readme from "../README.md";
import Markdown from "./component/MyMarkdown";
import "./index.css";
import "../src/assets/index";

function createExamplesStories() {
    const exampleStories = storiesOf("Examples", module);
    const req = require.context("../examples", true, /.tsx$/);
    req.keys().forEach((filename) => {
        const Example = req(filename).default;
        const name = filename.replace(".tsx", "").replace("./", "");
        exampleStories.add(name, () => <Example />);
    });
}

function loadStories() {
    storiesOf("Introduction", module).add("ReadMe", () => <Markdown source={readme} />);

    createExamplesStories();
}

addParameters({
    options: {
        showPanel: false
    }
});
configure(loadStories, module);
