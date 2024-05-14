import React from "react";

const BubbleGlow = () => {
    return (
        <div>
            <span className={`animate-glowSpinL absolute z-[0] w-[180px] h-[80px] md:w-[200px] md:h-[100px] bg-[#bec1ff] left-0 mt-20 ml-20 rounded-full blur-3xl`}></span>
            <span className={`animate-glowSpinR absolute z-[0] w-[180px] h-[80px] md:w-[200px] md:h-[100px] bg-amber-300  left-0 ml-32 md:ml-52 rounded-full blur-3xl`}></span>
        </div>
    );
};

export default BubbleGlow;