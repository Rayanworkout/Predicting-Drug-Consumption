import TutorialSwiper from "@/components/TutorialSwiper.jsx";
import useStore from "@/store/store.js";
import BubbleGlow from "@/components/BubbleGlow.jsx";
import pill from "@/assets/img/pill.png"
import mushroom from "@/assets/img/mushroom.png"
import cigarette from "@/assets/img/cigarette.png"
import Parallax from "parallax-js";
import { useEffect } from "react";
import { motion } from "framer-motion";

function Home() {
    const t = useStore(state => state.translations);
    const screenSize = useStore(state => state.screenSize);

    useEffect(() => {
        const inputArea = document.getElementById("main");
        const scene = document.getElementById("parallax-scene");
        if (inputArea && scene) {
            const parallax = new Parallax(scene, {
                relativeInput: true,
                hoverOnly: true,
                inputElement: inputArea,
                selector: '[data-depth]'
            });
            return () => parallax.destroy();
        }
    }, []);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.3
            }
        }
    };

    const itemVariants = {
        hidden: { y: 30, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1]
            }
        }
    };

    return (
        <main id="main" className="w-full flex-grow flex flex-col justify-center overflow-hidden">
            <section className="relative w-full max-w-7xl mx-auto px-6 md:px-10 pt-32 pb-20">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Left Content */}
                    <motion.div 
                        className="flex flex-col z-10"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        <motion.div variants={itemVariants} className="relative mb-6">
                            <BubbleGlow />
                            <p className="font-mono text-xs tracking-[0.3em] uppercase text-pdc-accent mb-4 block">
                                01 — {t.main?.analysisTitle || "Statistical Analysis"}
                            </p>
                            <h1 className="text-5xl md:text-7xl font-bold font-display tracking-tight text-pdc-text leading-tight">
                                {t.main?.title?.split('individuals')[0] || "Predicting Drug Consumption of "}
                                <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-pdc-accent">
                                    individuals
                                </span>
                            </h1>
                        </motion.div>

                        <motion.div variants={itemVariants} className="space-y-6">
                            <p className="text-lg md:text-xl text-pdc-text/80 leading-relaxed font-sans max-w-xl">
                                {t.main?.homeContent.contentTitle}
                            </p>
                            
                            <ul className="space-y-3">
                                {t.main?.homeContent.contentQuestion.map((item, index) => (
                                    <li key={index} className="flex items-start gap-4 text-pdc-text/70 hover:text-pdc-text transition-colors duration-300">
                                        <span className="mt-2.5 h-1.5 w-1.5 rounded-full bg-pdc-accent flex-shrink-0 shadow-[0_0_8px_rgba(167,139,250,0.6)]" />
                                        <span className="text-base font-sans">{item}</span>
                                    </li>
                                ))}
                            </ul>

                            <p className="text-pdc-muted font-sans italic border-l-2 border-pdc-accent/30 pl-4 py-1">
                                {t.main?.homeContent.contentEnding}
                            </p>

                            <motion.div variants={itemVariants} className="pt-8">
                                <TutorialSwiper titleButton={t.main?.analysisTitle} />
                            </motion.div>
                        </motion.div>
                    </motion.div>

                    {/* Right Visual Section */}
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
                        className={`${
                            screenSize > 1200 
                                ? "flex justify-center items-center relative h-[600px]" 
                                : "absolute bottom-[-10%] right-[-10%] opacity-20 pointer-events-none grayscale"
                        }`}
                    >
                        <div id="parallax-scene" className="w-full h-full relative pointer-events-none">
                            {/* Glow effects behind items */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-[radial-gradient(circle,_rgba(167,139,250,0.15)_0%,_transparent_70%)] rounded-full pointer-events-none animate-pulse" />
                            
                            <div data-depth="0.4" className="absolute inset-0 pointer-events-none will-change-transform">
                                <img 
                                    src={pill}
                                    className="absolute top-[15%] right-[10%] h-[180px] md:h-[220px] w-auto drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-20"
                                    alt="pill"
                                />
                            </div>

                            <div data-depth="0.2" className="absolute inset-0 pointer-events-none will-change-transform">
                                <img 
                                    src={mushroom}
                                    className="absolute top-[30%] left-[5%] h-[160px] md:h-[200px] w-auto drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-10"
                                    alt="mushroom"
                                />
                            </div>

                            <div data-depth="0.6" className="absolute inset-0 pointer-events-none will-change-transform">
                                <img 
                                    src={cigarette}
                                    className="absolute bottom-[10%] left-[25%] h-[220px] md:h-[280px] w-auto drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-30"
                                    alt="cigarette"
                                />
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>
        </main>
    );
}

export default Home;