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
                    <div className={`pl-10 flex flex-col`}>
                        <span className={`pb-3`}>
                            <BubbleGlow/>
                            <p className={`text-4xl md:text-6xl font-bold text-white pb-2`}>
                                {t.main?.title}
                            </p>
                            {/* <p className={`text-gray-500`}>
                                text à mettre text à mettre text à mettre text à mettre text à mettre text
                            </p> */}
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
                    <div className={`flex justify-center items-center`}>
                        <div id="main_pill">
                            <img data-depth="1.62" src={screenSize > 850 ? pill : ""} className={`h-[380px] w-auto`} alt="pill"/>

                        </div>
                    </div>
                </div>
                        <span className={`text-center`}>
                    <TutorialSwiper titleButton={t.main?.analysisTitle}/>
                </span>
                    </div>
                </>
                )

                }

export default Home