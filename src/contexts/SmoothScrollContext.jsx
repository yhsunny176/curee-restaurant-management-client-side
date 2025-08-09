import React from "react";
import ScrollContainer from "../components/ScrollContainer";
import { SmoothScrollContext } from "./SmoothScrollContextDef";

export const SmoothScrollProvider = ({ children }) => {
    const contextValue = {};

    return (
        <SmoothScrollContext.Provider value={contextValue}>
            <ScrollContainer>{children}</ScrollContainer>
        </SmoothScrollContext.Provider>
    );
};
