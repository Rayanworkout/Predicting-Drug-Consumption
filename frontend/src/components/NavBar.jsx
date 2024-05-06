import useStore from "@/store/store.js";
import { Link } from "react-router-dom";
import { Separator } from "@/components/ui/separator.jsx";
import drapeauFR from "@/assets/img/drapeau_fr.png";
import drapeauEN from "@/assets/img/drapeau_en.png";
import { Star, Github  } from 'lucide-react';
import {useEffect, useState} from "react";

const NavBar = () => {
    let { language, setLanguage, screenSize, setScreenSize } = useStore();
    const newLanguage = language === "en" ? "fr" : "en";
    const t = useStore(state => state.translations);
    useEffect(() => {
        const updateScreenSize = () => {
            setScreenSize(Math.round(window.innerWidth  * window.devicePixelRatio));
        };
        updateScreenSize();
        window.addEventListener('resize', updateScreenSize);
        return () => window.removeEventListener('resize', updateScreenSize);
    }, []);
    return (
        <div className={`flex w-full min-h-fit text-white font-bold gap-3 pt-10 py-3 px-6 md:px-10 bg-transparent backdrop-blur justify-between align-baseline  z-50`}>
            <span className={`flex gap-x-1 md:gap-x-3 items-center text-sm font-bold`}>
                <Link to="/" className={`hover:bg-neutral-50 hover:text-black ease-in-out duration-300 h-fit py-1 px-3 rounded`}>HOME</Link>
                <Separator orientation="vertical" className={``} />
                <Link to="/statistics" className={`hover:bg-neutral-50 hover:text-black ease-in-out duration-300 h-fit py-1 px-3 rounded`}>DASHBOARD</Link>
            </span>
            <span className={`flex gap-5 items-center font-bold`}>
                <p className={`flex items-center gap-x-1 cursor-pointer py-1 px-3 rounded hover:bg-neutral-50 hover:text-black ease-in-out duration-300`}
                   onClick={() => setLanguage(newLanguage)}>
                      {newLanguage == "fr" ? <img src={drapeauFR} className={`h-[20px] rounded-md`}/> :
                          <img src={drapeauEN} className={`h-[20px] rounded-md`}/>}
                    {newLanguage.toUpperCase()}
                </p>
                <a target={"_blank"} rel="noopener noreferrer"
                   href={"https://github.com/Rayanworkout/Predicting-Drug-Consumption"}
                   className="group rounded bg-[#333] px-2 py-1 transition duration-150 ease-in-out hover:bg-[#444] cursor-pointer">
                    {screenSize > 850 ?
                        <span className={`flex items-center gap-x-1 text-sm font-medium`}>
                          <Star className={`group-hover:fill-amber-300  transition ease-in-out duration-100000 h-[20px]`}/> <p>{t.main.git} </p>
                        </span>
                     : <Github className = {`mx-2 my-1`}/>}
                </a>
            </span>
        </div>
    );
};

export default NavBar;
