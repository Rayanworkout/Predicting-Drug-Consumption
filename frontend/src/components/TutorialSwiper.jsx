import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog.jsx"
import { Button } from "@/components/ui/button.jsx"
import { useState } from "react";
import { SlideIntroduction, SlideHowToReadChart, ExplanationConsumption, SlideSummary, SlideCorrelationIntroduction, SlideCorrelationExplanation, SlideEnding } from "@/components/TutorialPage/SlidesIntroduction.jsx"
import { X, ChevronLeft, ChevronRight } from "lucide-react";

const TutorialSwiper = ({ titleButton }) => {
    const [isOpen, setIsOpen] = useState(false);

    const slides = [
        <SlideIntroduction />,
        <SlideHowToReadChart />,
        <ExplanationConsumption />,
        <SlideSummary />,
        <SlideCorrelationIntroduction />,
        <SlideCorrelationExplanation />,
        <SlideEnding />
    ];

    const [currentIndex, setCurrentIndex] = useState(0);

    const goToNext = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === slides.length - 1 ? 0 : prevIndex + 1
        );
    };

    const goToPrev = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? slides.length - 1 : prevIndex - 1
        );
    };

    return (
        <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
            <AlertDialogTrigger asChild>
                <Button variant="accent" size="lg" className="rounded-full px-8 py-6 text-base group" onClick={() => setIsOpen(true)}>
                    {titleButton}
                    <ChevronRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="max-w-[95vw] md:max-w-4xl h-[85vh] bg-pdc-bg/90 backdrop-blur-2xl border border-pdc-border rounded-3xl p-6 md:p-10 shadow-2xl flex flex-col gap-0 outline-none">
                <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-pdc-accent animate-pulse" />
                        <h2 className="font-display font-bold text-xl tracking-tight text-pdc-text uppercase">
                            Analysis <span className="text-pdc-muted font-mono font-medium ml-2">{currentIndex + 1} / {slides.length}</span>
                        </h2>
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="rounded-full hover:bg-white/10 text-pdc-text">
                        <X className="h-5 w-5" />
                    </Button>
                </div>

                <div className="flex-grow overflow-hidden relative">
                    <div className="h-full overflow-y-auto pr-2 custom-scrollbar">
                        <div className="text-pdc-text leading-relaxed">
                            {slides[currentIndex]}
                        </div>
                    </div>
                </div>

                <div className="mt-6 md:mt-8 flex flex-col-reverse md:flex-row justify-between items-center gap-4 pt-4 md:pt-6 border-t border-pdc-border">
                    <div className="flex w-full md:w-auto justify-between md:justify-start gap-3">
                        <Button
                            onClick={goToPrev}
                            disabled={currentIndex === 0}
                            className="btn-pdc flex-1 md:flex-none"
                        >
                            <ChevronLeft className="mr-1 md:mr-2 h-4 w-4" /> <span className="hidden sm:inline">Previous</span>
                        </Button>
                        {currentIndex !== slides.length - 1 && (
                            <Button
                                onClick={goToNext}
                                className="btn-pdc flex-1 md:flex-none"
                            >
                                <span className="hidden sm:inline">Next</span> <ChevronRight className="ml-1 md:ml-2 h-4 w-4" />
                            </Button>
                        )}
                    </div>

                    {currentIndex === slides.length - 1 && (
                        <Button variant="accent" onClick={() => setIsOpen(false)} className="rounded-full w-full md:w-auto px-4 md:px-8">
                            Finish Exploration
                        </Button>
                    )}
                </div>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default TutorialSwiper;