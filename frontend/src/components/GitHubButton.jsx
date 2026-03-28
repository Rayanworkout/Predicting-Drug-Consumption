import { Github, Star } from "lucide-react";
import useStore from "@/store/store.js";

export function GitHubButton() {
    const { screenSize } = useStore();
    const t = useStore((state) => state.translations);

    return (
        <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/Rayanworkout/Predicting-Drug-Consumption"
            className="btn-pdc group gap-2 px-4 py-1.5 font-mono text-xs hover:shadow-[0_0_15px_rgba(167,139,250,0.1)]"
        >
            <Star
                size={14}
                className="text-pdc-muted group-hover:fill-pdc-accent group-hover:text-pdc-accent transition-all duration-300"
            />
            {screenSize > 1200 ? (
                <span>{t.main.git}</span>
            ) : (
                <Github size={14} />
            )}
        </a>
    );
}