import React from "react";
import { ClipLoader } from "react-spinners";

const ButtonLoader = ({ size = 16, color = "#ffffff" }) => {
    return (
        <ClipLoader
            color={color}
            size={size}
            aria-label="Loading Spinner"
            data-testid="button-loader"
        />
    );
};

export default ButtonLoader;
