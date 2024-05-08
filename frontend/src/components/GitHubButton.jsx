import {Github, Star} from "lucide-react";
import useStore from "@/store/store.js";

export function GitHubButton (){
    const {screenSize} = useStore();
    const t = useStore(state => state.translations);

    return (
    <>
        <a target={"_blank"} rel="noopener noreferrer"
           href={"https://github.com/Rayanworkout/Predicting-Drug-Consumption"}
           className="group rounded bg-[#333] px-2 py-1 transition duration-150 ease-in-out hover:bg-[#444] cursor-pointer">
            {screenSize > 850 ?
                <span className={`flex items-center gap-x-1 text-sm font-medium`}>
                          <Star
                              className={`group-hover:fill-amber-300  transition ease-in-out duration-100000 h-[20px]`}/> <p>{t.main.git} </p>
                        </span>
                : <Github className={`mx-2 my-1`}/>}
        </a>
    </>
    )
}