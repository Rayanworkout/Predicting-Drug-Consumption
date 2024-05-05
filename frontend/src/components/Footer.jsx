import React from 'react';
import useStore from "@/store/store.js";

const Footer = () => {
    const {translations} = useStore();
    return (
        <div className={`min-h-fit pb-3`}>
            <p className={`text-white text-center text-xs`}>
                {translations.main.footerContent}
            </p>
        </div>
    );
};

export default Footer;