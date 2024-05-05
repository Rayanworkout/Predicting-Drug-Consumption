import React from "react";
import TutorialSwiper from "@/components/TutorialSwiper.jsx";
import useStore from "@/store/store.js";
import BubbleGlow from "@/components/BubbleGlow.jsx";
function Home() {
    const t = useStore(state => state.translations);
    return (
        <>
            <div className={`w-full flex flex-col flex-grow items-center justify-center align-middle px-3 overflow-hidden`}>
                <div>
                    <div className={`pt-20 h-full flex flex-col items-center overflow-hidden`}>
                        <BubbleGlow/>
                        <span className={`pb-10 px-10 flex flex-col md:flex-row items-center`}>
                        <span className={`text-white flex flex-col gap-y-2`}>
                            <p className={`text-6xl font-bold text-white`}>
                                {t.main?.title}
                            </p>
                            <p className={`text-gray-500`}>
                                text à mettre text à mettre text à mettre text à mettre text à mettre text
                            </p>
                        </span>

                        <span className={`flex flex-col gap-y-1 font-medium text-white pt-9 md:p-6`}>
                            <p>{t.main?.homeContent.contentTitle}</p>
                            <ul className={`pl-4 list-disc`}>
                                {t.main?.homeContent.contentQuestion.map((item, index) => {
                                        return <li key={index}>{item}</li>
                                    }
                                )}
                            </ul>
                            <p>{t.main?.homeContent.contentEnding}</p>
                        </span>
                    </span>
                        <span className={`bg-blue-400`}></span>
                    </div>
                </div>
                <TutorialSwiper titleButton={t.main?.analysisTitle}/>
            </div>
        </>
    )

}

export default Home
