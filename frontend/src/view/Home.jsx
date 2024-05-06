import React from "react";
import TutorialSwiper from "@/components/TutorialSwiper.jsx";
import useStore from "@/store/store.js";
import BubbleGlow from "@/components/BubbleGlow.jsx";
import pill from "@/assets/img/pill.png"
function Home() {
    const t = useStore(state => state.translations);
    return (
        <>
            <div className={`w-full flex flex-col flex-grow justify-center px-3 overflow-hidden`}>
                <div className = {`grid md:grid-cols-[55%_45%]`}>
                    <div className={`pl-10 flex flex-col`}>
                        <span className={`pb-3`}>
                            <BubbleGlow/>
                            <p className={`text-4xl md:text-6xl font-bold text-white pb-2`}>
                                {t.main?.title}
                            </p>
                            <p className={`text-gray-500`}>
                                text à mettre text à mettre text à mettre text à mettre text à mettre text
                            </p>
                        </span>
                        <span className={`flex flex-col gap-y-1 text-[16px} text-white`}>
                            <p>{t.main?.homeContent.contentTitle}</p>
                            <ul className={`pl-4 list-disc`}>
                                {t.main?.homeContent.contentQuestion.map((item, index) => {return <li key={index}>{item}</li>})}
                            </ul>
                            <p>{t.main?.homeContent.contentEnding}</p>
                        </span>
                    </div>
                    <div className = {`flex justify-center align-middle`}>
                        <img src={pill}  className = {`h-[400px] animate-spin duration-1000 ease-in-out`}  alt="pill"/>
                    </div>
                </div>
                <span className = {`text-center`}>
                    <TutorialSwiper titleButton={t.main?.analysisTitle}/>
                </span>
            </div>
        </>
    )

}

export default Home
