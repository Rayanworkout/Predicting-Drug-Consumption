import useStore from "@/store/store.js";
import { Link } from "react-router-dom";
import { Separator } from "@/components/ui/separator.jsx";
import {useEffect} from "react";
import {GitHubButton} from "@/components/GitHubButton.jsx";
import {LangSwitch} from "@/components/LangSwitch.jsx";

const NavBar = () => {
    let {  screenSize, setScreenSize } = useStore();

    //méthode de vérification de la taille de l'écran
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
                <Separator orientation="vertical"/>
                <Link to="/statistics" className={`hover:bg-neutral-50 hover:text-black ease-in-out duration-300 h-fit py-1 px-3 rounded`}>DASHBOARD</Link>
            </span>

            <span className={`flex gap-5 items-center font-bold`}>
                <LangSwitch/>
                <GitHubButton/>
            </span>
        </div>
    );
};

export default NavBar;
