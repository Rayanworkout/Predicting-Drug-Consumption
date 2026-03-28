import useStore from "@/store/store.js";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { GitHubButton } from "@/components/GitHubButton.jsx";
import { LangSwitch } from "@/components/LangSwitch.jsx";

const NavBar = () => {
    const { screenSize, setScreenSize } = useStore();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        let timeoutId;
        const updateScreenSize = () => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                setScreenSize(Math.round(window.innerWidth * window.devicePixelRatio));
            }, 100);
        };
        updateScreenSize();
        window.addEventListener("resize", updateScreenSize);
        return () => {
            clearTimeout(timeoutId);
            window.removeEventListener("resize", updateScreenSize);
        };
    }, []);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Close mobile menu on route change
    useEffect(() => {
        setIsMenuOpen(false);
    }, [location]);

    const navItems = [
        { name: "HOME", to: "/" },
        { name: "DASHBOARD", to: "/statistics" },
    ];

    return (
        <>
            <motion.header
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-smooth border-b ${
                    isScrolled
                        ? "py-3 bg-pdc-bg/80 backdrop-blur-xl border-pdc-border shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
                        : "py-5 bg-transparent border-transparent"
                }`}
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
                <div className="max-w-7xl mx-auto flex items-center justify-between px-6 md:px-10">
                    {/* Logo */}
                    <Link to="/" className="group relative z-50">
                        <div className="flex items-baseline gap-0.5">
                            <span className="text-2xl font-bold tracking-tighter font-display text-pdc-text">
                                PDC
                            </span>
                            <span className="text-xs font-mono text-pdc-muted group-hover:text-pdc-accent transition-colors duration-300">
                                .data
                            </span>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-8">
                        {navItems.map((item, i) => (
                            <Link
                                key={item.name}
                                to={item.to}
                                className="relative text-xs font-mono tracking-[0.2em] uppercase text-pdc-text hover:text-pdc-accent transition-colors duration-300 group py-1"
                            >
                                <span className="text-pdc-muted mr-1.5 text-[10px]">
                                    0{i + 1}.
                                </span>
                                {item.name}
                                <span className="absolute -bottom-0.5 left-0 w-0 h-[1px] bg-pdc-accent transition-all duration-500 ease-smooth group-hover:w-full" />
                            </Link>
                        ))}

                        <div className="w-px h-4 bg-pdc-border mx-1" />

                        <LangSwitch />
                        <GitHubButton />
                    </nav>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden relative z-50 text-pdc-text hover:text-pdc-accent transition-colors duration-300 p-1"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                    >
                        {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
                    </button>
                </div>
            </motion.header>

            {/* Mobile Nav Overlay */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, clipPath: "circle(0% at calc(100% - 2rem) 2rem)" }}
                        animate={{ opacity: 1, clipPath: "circle(150% at calc(100% - 2rem) 2rem)" }}
                        exit={{ opacity: 0, clipPath: "circle(0% at calc(100% - 2rem) 2rem)" }}
                        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                        className="fixed inset-0 z-40 bg-pdc-bg flex flex-col items-center justify-center gap-2"
                    >
                        <nav className="flex flex-col items-center gap-6">
                            {navItems.map((item, i) => (
                                <motion.div
                                    key={item.name}
                                    initial={{ y: 30, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{
                                        delay: 0.15 + i * 0.1,
                                        duration: 0.5,
                                        ease: [0.16, 1, 0.3, 1],
                                    }}
                                >
                                    <Link
                                        to={item.to}
                                        onClick={() => setIsMenuOpen(false)}
                                        className="text-3xl font-display font-bold text-pdc-text hover:text-pdc-accent transition-colors duration-300"
                                    >
                                        <span className="text-sm font-mono text-pdc-muted mr-2">
                                            0{i + 1}
                                        </span>
                                        {item.name}
                                    </Link>
                                </motion.div>
                            ))}

                            <motion.div
                                initial={{ y: 30, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.45, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                                className="flex items-center gap-6 mt-8 pt-8 border-t border-pdc-border"
                            >
                                <LangSwitch />
                                <GitHubButton />
                            </motion.div>
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default NavBar;
