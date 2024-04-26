import './assets/index.css'

import React, {useEffect, useState} from "react";
import Swiper from "./components/Swiper.jsx";
import TutorialSwiper from "@/components/TutorialSwiper.jsx";
import {Separator} from "@/components/ui/separator.jsx";
import useStore from "@/store/store.js";

function App() {
    const t = useStore(state => state.translations);

    const [dataArray, setDataArray] = useState([]);
    const fetchData = async () => {
        setDataArray([]);

        setTimeout(async () => {
            const fetchData = {}; //Appel de l'api
            setDataArray(fetchData)
        }, 2000)
    }
    useEffect(() => {
        //Appel de l'API pour set dans dataArray pour l'affichage des graph dans les swiper
    }, []);
    return (
        <>
            <div className={`w-full h-full px-3 pb-3 overflow-hidden`}>
                <div className={`pt-20 flex flex-col items-center gap-y-5 overflow-hidden`} alt="Texte de présentation">

                    <span className={`animate-glowSpinL absolute z-[0] w-[200px] h-[100px] bg-blue-400 left-0 mt-20 ml-20 rounded-full blur-3xl`}></span>
                    <span className={`animate-glowSpinR absolute z-[0] w-[200px] h-[100px] bg-[#bec1ff] left-0 ml-32 md:ml-52 rounded-full blur-3xl`}></span>

                    <span className={`pb-10 px-10 flex flex-col md:flex-row items-center`}>
                        <p className={`text-6xl md:text-[5rem] font-bold text-white `}>
                            {t.main?.title}
                        </p>
                        <p className={`text-xlbase md:text-xl text-center text-white font-semibold pt-9 md:p-6`}>
                            {t.main?.homeContent}
                        </p>
                    </span>
                    <TutorialSwiper/>
                </div>
                <Separator className="mt-16"/>
                <span className={`flex pb-3 lg:px-20`}>
                <span className={` flex flex-col gap-y-2 mt-20 mb-10 `}>
                    <h1 className={`
                           text-4xl 
                           md:text-5xl
                           font-bold tracking-tight text-white antialiasing`}
                    >Drugs Consumption Stats
                    </h1>
                    <h2 className={` 
                           text-ml/relaxed
                           md:text-xl/relaxed
                           font-semibold tracking-tight text-gray-500 antialiasing`}>
                        Many stats for you
                    </h2>
                </span>
            </span>
                <div className={` w-full h-0 bg-white text-white`}></div>
                <div className={` flex flex-col w-100 gap-y-8 text-white `}>
                    <Swiper swiperTitle={'Comparaison Chart'}/>
                    <Swiper swiperTitle={'Repartition Chart'}/>
                    <Swiper swiperTitle={'Correlation Chart'}/>
                </div>
            </div>
        </>
    )

}

export default App
