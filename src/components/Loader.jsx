import React from "react";
import { ClipLoader } from "react-spinners";

const Loader = ({ size = 40, color = "#dc2626" }) => {
    return (
        <div className="flex justify-center items-center min-h-64">
            <ClipLoader
                color={color}
                size={size}
                aria-label="Loading Spinner"
                data-testid="loader"
            />
        </div>
    );
};

export default Loader;
