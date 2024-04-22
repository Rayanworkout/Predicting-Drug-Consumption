import './assets/index.css'

import React from "react";
import Swiper from "./components/Swiper.jsx";
import SortButton from "./components/SortButton.jsx";
import TutorialSwiper from "@/components/TutorialSwiper.jsx";

function App() {
    return (
    <>
        <div className={`w-100 h-100 px-3 pb-3 overflow-hidden`}>
                <div className = {`flex flex-col items-center gap-y-5`} alt="Texte de présentation">
                    <p className = {` text-6xl font-bold  text-white`}>
                        Project Title
                    </p>
                    <p className = {`text-center  text-white`}>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam dolor doloribus eligendi inventore iste libero minus molestiae non numquam possimus, quisquam quod rerum sit vel veniam veritatis voluptas voluptate voluptatum?
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam dolor doloribus eligendi inventore iste libero minus molestiae non numquam possimus, quisquam quod rerum sit vel veniam veritatis voluptas voluptate voluptatum?
                    </p>
                    <TutorialSwiper/>

                </div>

                <span className={` flex pb-3 lg:px-20`}>
                    <span className = {` flex flex-col gap-y-2 mt-20 mb-10 `}>
                        <h1 className={`
                            text-4xl 
                            md:text-5xl
                            font-bold tracking-tight text-white antialiasing`}
                        >
                        Drugs Consumption Stats
                        </h1>
                        <h2 className = {` 
                            text-ml/relaxed
                            md:text-xl/relaxed
                            font-semibold tracking-tight text-gray-500 antialiasing`}>
                            Many stats for you
                        </h2>
                    </span>

                    <SortButton/>
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
