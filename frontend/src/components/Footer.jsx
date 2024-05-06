import React from 'react';
import useStore from "@/store/store.js";

const Footer = () => {
    const {translations} = useStore();
    return (
        <div className={`min-h-fit pb-4 flex justify-center`}>
            <p className={`text-white text-center text-xs md:text-sm max-w-[80%] md:max-w-[90%]`}>
                {translations.main.footerContent}
            </p>
        </div>
    );
};

export default Footer;