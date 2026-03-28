import React from "react";

const BubbleGlow = () => {
    return (
        <div className="relative">
            <span className={`animate-glowSpinL absolute z-[0] w-[180px] h-[80px] md:w-[200px] md:h-[100px] bg-pdc-accent left-0 mt-20 ml-20 rounded-full blur-3xl opacity-30`}></span>
            <span className={`animate-glowSpinR absolute z-[0] w-[180px] h-[80px] md:w-[200px] md:h-[100px] bg-violet-300 left-0 ml-32 md:ml-52 rounded-full blur-3xl opacity-20`}></span>
        </div>
    );
};

export default BubbleGlow;