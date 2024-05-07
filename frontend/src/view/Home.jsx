import TutorialSwiper from "@/components/TutorialSwiper.jsx";
import useStore from "@/store/store.js";
import BubbleGlow from "@/components/BubbleGlow.jsx";
import pill from "@/assets/img/pill.png"
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
                <div className={`grid md:grid-cols-[55%_45%]`}>
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
                    <div className={screenSize > 850 ?`flex justify-center items-center rotate-3`
                        :` absolute bottom-40 left-28 opacity-50 rotate-12 z-0 `
                    }>
                        <div id="main_pill">
                            <img data-depth="1.62" src={pill} className={`z-0 h-[220px] md:h-[350px] w-auto `} alt="pill"/>
                        </div>
                    </div>
                </div>
                <span className={`text-center z-10 pt-3 md:pt-0cd `}>
                    <TutorialSwiper titleButton={t.main?.analysisTitle}/>
                </span>
                    </div>
                </>
                )

                }

export default Home