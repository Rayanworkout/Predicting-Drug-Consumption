import useStore from "@/store/store.js";
import { Link } from "react-router-dom";
import {Separator} from "@/components/ui/separator.jsx";
import drapeauFR from '@/assets/img/drapeau_fr.png'
import drapeauEN from '@/assets/img/drapeau_en.png'

const NavBar = () => {
    let {language, setLanguage} = useStore();
    const newLanguage = language === "en" ? "fr" : "en";

    return (
        <div
            className={`flex w-full h-full text-white font-bold gap-3 pt-10 py-3 px-6 bg-transparent backdrop-blur justify-between align-baseline  z-50`}>

            <span className={` flex gap-3 items-center font-bold`}>

                <Link to="/"
                      className={`hover:bg-neutral-50 hover:text-black ease-in-out duration-300 h-fit py-1 px-3 rounded`}>
                    HOME
                </Link>
                <Separator orientation="vertical" className={``}/>
                <Link to="/statistics"
                      className={`hover:bg-neutral-50 hover:text-black ease-in-out duration-300 h-fit py-1 px-3 rounded`}>
                    DASHBOARD
                </Link>
            </span>
            <div>

            </div>
            <span className = {`flex gap-3 items-center font-bold`}>
                                <p className={`flex items-center gap-x-1 cursor-pointer py-1 px-3 rounded hover:bg-neutral-50 hover:text-black ease-in-out duration-300`}
                                   onClick={() => setLanguage(newLanguage)}>
                    {newLanguage == 'fr' ? <img src={drapeauFR} className={`h-[20px] rounded-md`}/> :
                        <img src={drapeauEN} className={`h-[20px] rounded-md`}/>}
                                    {newLanguage.toUpperCase()}
                </p>
                <a
                                target={'_blank'}
                                rel="noopener noreferrer"
                                href={'https://github.com/Rayanworkout/Predicting-Drug-Consumption'}
                                className=" my-auto text-sm font-medium rounded bg-[#333] px-2 py-1 shadow-md transition duration-150 ease-in-out hover:shadow-2xl hover:bg-[#444] focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg cursor-pointer">
                <span className="[&>svg]:h-4 [&>svg]:w-4">
                Star us on GitHub !
                </span>
            </a>
            </span>

        </div>
    );
};

export default NavBar;