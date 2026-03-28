import React from 'react';
import useStore from "@/store/store.js";

const Footer = () => {
    const { translations } = useStore();
    return (
        <footer className={`mt-auto border-t border-pdc-border bg-pdc-bg/50 backdrop-blur-sm py-8 flex justify-center`}>
            <p className={`text-pdc-muted text-center text-xs font-mono max-w-[80%] md:max-w-[90%] leading-relaxed`}>
                {translations.main.footerContent}
            </p>
        </footer>
    );
};

export default Footer;