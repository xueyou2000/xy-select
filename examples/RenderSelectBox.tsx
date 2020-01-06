import React, { useState } from "react";
import { Option, Select } from "../src";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAddressBook, faEdit } from "@fortawesome/free-solid-svg-icons";
import { OptionConfig } from "../src/interface";
import "./index.scss";

export default function() {
    function renderSelectItem(cfg: OptionConfig) {
        if (cfg.value === "address") {
            return (
                <div>
                    <span style={{ float: "left" }}>
                        <FontAwesomeIcon icon={faAddressBook} />
                        地址
                    </span>
                    <span style={{ float: "right", color: "rgb(132, 146, 166)", fontSize: "13px" }}>Address</span>
                </div>
            );
        } else {
            return (
                <div>
                    <span style={{ float: "left" }}>
                        <FontAwesomeIcon icon={faEdit} />
                        邮箱
                    </span>
                    <span style={{ float: "right", color: "rgb(132, 146, 166)", fontSize: "13px" }}>Email</span>
                </div>
            );
        }
    }

    return (
        <div>
            <Select style={{ width: "180px" }} renderSelectItem={renderSelectItem}>
                <Option label="地址" value="address">
                    <span style={{ float: "left" }}>
                        <FontAwesomeIcon icon={faAddressBook} />
                        地址
                    </span>
                    <span style={{ float: "right", color: "rgb(132, 146, 166)", fontSize: "13px" }}>Address</span>
                </Option>
                <Option label="邮箱" value="email">
                    <span style={{ float: "left" }}>
                        <FontAwesomeIcon icon={faEdit} />
                        邮箱
                    </span>
                    <span style={{ float: "right", color: "rgb(132, 146, 166)", fontSize: "13px" }}>Email</span>
                </Option>
            </Select>
        </div>
    );
}
