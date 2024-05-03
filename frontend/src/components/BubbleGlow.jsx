import React from "react";

const BubbleGlow = () => {
    return (
        <div>
            <span className={`animate-glowSpinL absolute z-[0] w-[200px] h-[100px] bg-blue-400 left-0 mt-20 ml-20 rounded-full blur-3xl`}></span>
            <span className={`animate-glowSpinR absolute z-[0] w-[200px] h-[100px] bg-[#bec1ff] left-0 ml-32 md:ml-52 rounded-full blur-3xl`}></span>
        </div>
    );
};

export default BubbleGlow;