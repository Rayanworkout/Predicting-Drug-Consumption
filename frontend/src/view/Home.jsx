import React from "react";
import TutorialSwiper from "@/components/TutorialSwiper.jsx";
import useStore from "@/store/store.js";
import BubbleGlow from "@/components/BubbleGlow.jsx";
function Home() {
    const t = useStore(state => state.translations);
    return (
        <>
            <div className={`w-full flex flex-grow items-center px-3 pb-3 overflow-hidden`}>
                <div className={`pt-20 h-full flex flex-col items-center gap-y-5 overflow-hidden`}>

                    <BubbleGlow/>
                    <span className={`pb-10 px-10 flex flex-col md:flex-row items-center`}>
                        <p className={`text-6xl md:text-[5rem] font-bold text-white`}>
                            {t.main?.title}
                        </p>
                        <span className={`w-auto h-auto text-base md:text-xl md:text-center text-white font-semibold pt-9 md:p-6`}>
                            {t.main?.homeContent.contentTitle}
                            <ul>
                                {t.main?.homeContent.contentQuestion.map((item,index) => {
                                    return <li key={index}>- {item}</li>
                                    }
                                )}
                            </ul>
                            {t.main?.homeContent.contentEnding}
                        </span>
                    </span>
                    <TutorialSwiper/>
                </div>
            </div>
        </>
    )

}

export default Home
