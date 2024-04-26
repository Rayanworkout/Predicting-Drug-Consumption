import React from 'react';
import useStore from "@/store/store.js";

const Footer = () => {
    const {translations} = useStore();
    return (
        <div className={`h-fit p-7`}>
            <p className={`text-white text-center`}>
                {translations.main.footerContent}
            </p>
        </div>
    );
};

export default Footer;