import './assets/index.css'

import {useEffect} from "react";
import {useStore} from "@/store/store.js";
import {GET_ALL} from "@/api_/api_.js";
import Swiper from "./components/Swiper.jsx";
import SortButton from "./components/SortButton.jsx";

function App() {
    const {initializeData, datas } = useStore((state) => ({
        datas: state.data,
        initializeData: state.initializeData
    }));
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await GET_ALL();
                initializeData(data);
            } catch (error) {
                console.error("Erreur lors de la récupération des données: ", error);
            }
        };
        fetchData().then(r => r);
    }, [initializeData]);
    console.log(datas)
    return (
    <>
        <div className={`w-100 h-100 px-3 pb-3 overflow-hidden`}>

                <div className = {`flex flex-col items-center gap-y-5 text-white`} alt="Texte de présentation">
                    <p className = {` text-6xl font-bold`}>
                        Project Title
                    </p>
                    <p>
                        Description of the project, on va l'aligner a gauche je pense avec une petite anime ou blur effect a droite
                    </p>
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
                    <Swiper/>
                    <Swiper/>
                    <Swiper/>
                    <Swiper/>
                </div>
        </div>
    </>
    )

}

export default App
