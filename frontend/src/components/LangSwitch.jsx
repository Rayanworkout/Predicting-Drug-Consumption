import FR from "@/assets/img/drapeau_fr.png";
import EN from "@/assets/img/drapeau_en.png";
import useStore from "@/store/store.js";
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card"

export function LangSwitch() {
    const t = useStore(state => state.translations);
    const {language, setLanguage} = useStore();
    const newLanguage = language === "en" ? "fr" : "en";

    const lang =
        <p className={`flex items-center gap-x-1 cursor-pointer py-1 px-3 rounded hover:bg-neutral-50 hover:text-black ease-in-out duration-300`}
        onClick={() => setLanguage(newLanguage)}>
        {
            newLanguage == "fr" ?
                <img src={FR} className={`h-[20px] rounded-md`}/> :
                <img src={EN} className={`h-[20px] rounded-md`}/>
        }
        {newLanguage.toUpperCase()}
    </p>

    return (
        <>
            <HoverCard>
                <HoverCardTrigger asChild>
                    {lang}
                </HoverCardTrigger>
                <HoverCardContent className={`w-fit`}>
                    <p className={`text-sm`}>
                        {t.main.langHover}
                    </p>
                </HoverCardContent>
            </HoverCard>

        </>
    )
}