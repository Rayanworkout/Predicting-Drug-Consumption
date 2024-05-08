import TutorialSwiper from "@/components/TutorialSwiper.jsx";
import useStore from "@/store/store.js";
import BubbleGlow from "@/components/BubbleGlow.jsx";
import pill from "@/assets/img/pill.png"
import mushroom from "@/assets/img/mushroom.png"
import cigarette from "@/assets/img/cigarette.png"
import Parallax from "parallax-js";
import {useEffect, useState} from "react";
function Home() {
    const t = useStore(state => state.translations);
    const {screenSize} = useStore();
    useEffect(() => {
        const scene = document.getElementById("main_pill");
            const parallax = new Parallax(scene);

            return () => parallax.destroy();

    }, []);
    return (
        <>
            <div className={`w-full flex flex-col flex-grow justify-center px-3 overflow-hidden`}>
                <div className={`grid md:grid-cols-[50%_50%]`}>
                    <div className={`pl-10 flex flex-col z-10`}>
                        <span className={`pb-3`}>
                            <BubbleGlow/>
                            <p className={`text-4xl md:text-6xl font-bold text-white pb-2`}>
                                {t.main?.title}
                            </p>
                        </span>
                        <span className={`flex flex-col gap-y-1 text-[16px} text-white`}>
                            <p>{t.main?.homeContent.contentTitle}</p>
                            <ul className={`pl-4 list-disc`}>
                                {t.main?.homeContent.contentQuestion.map((item, index) => {
                                    return <li key={index}>{item}</li>
                                })}
                            </ul>
                            <p>{t.main?.homeContent.contentEnding}</p>
                        </span>
                    </div>
                    <div className={screenSize > 850 ?`flex justify-center items-center opacity-90`
                        :`absolute bottom-80 opacity-50  z-0`
                    }>
                        <div id="main_pill" className={screenSize > 850 ?`w-[100%] h-[100%] `: `relative w-[95vw]`}>
                            <img data-depth="0.72" src={pill}
                                 className={`z-0 mt-[10%] ml-[70%] h-[100px] md:h-[150px] md: w-auto `}
                                 alt="pill"/>
                            <img data-depth="0.52" src={mushroom}
                                 className={`z-0 mt-[10%] ml-[10%] h-[100px] md:h-[150px] md: w-auto `}
                                 alt="pill"/>
                            <img data-depth="0.92" src={cigarette}
                                 className={`z-0 mt-[10%] ml-[40%] h-[100px] md:h-[200px] md: w-auto `}
                                 alt="pill"/>
                        </div>
                    </div>
                </div>
                <span className={`text-center z-10 pt-5 md:pt-10`}>
                    <TutorialSwiper titleButton={t.main?.analysisTitle}/>
                </span>
                    </div>
                </>
                )

                }

export default Home