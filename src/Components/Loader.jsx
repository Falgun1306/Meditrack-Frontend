import React from "react";

const Loader = ({ fullScreen = true }) => {
    return (
        <div
            className={`
                flex items-center justify-center w-full
                ${fullScreen ? "min-h-screen" : "py-20"}
            `}
        >
            <div className="relative flex items-center justify-center">

                {/* Outer Ring */}
                <div
                    className="
                        w-14 h-14 
                        sm:w-16 sm:h-16 
                        md:w-20 md:h-20 
                        border-4 border-transparent 
                        border-t-blue-500 
                        rounded-full 
                        animate-spin
                    "
                ></div>

                {/* Inner Ring */}
                <div
                    className="
                        absolute
                        w-8 h-8
                        sm:w-10 sm:h-10
                        md:w-12 md:h-12
                        border-4 border-transparent
                        border-t-red-500
                        rounded-full
                        animate-spin
                    "
                ></div>
            </div>
        </div>
    );
};

export default Loader;
