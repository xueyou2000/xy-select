import React from "react";
import { OptionStateContextState, ValueContextState, OptionsContextState } from "./interface";

export const OptionStateContext = React.createContext<OptionStateContextState>(null);

export const ValueContext = React.createContext<ValueContextState>(null);

export const OptionsContext = React.createContext<OptionsContextState>(null);
