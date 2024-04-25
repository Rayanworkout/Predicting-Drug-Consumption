import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog.jsx"
import { Button } from "@/components/ui/button.jsx"
import {useEffect, useState, useRef} from "react";
import {SlideIntroduction, SlideHowToReadChart,ExplanationConsumption, SlideSummary, SlideCorrelationIntroduction, SlideCorrelationExplanation, SlideEnding} from "@/components/TutorialPage/SlidesIntroduction.jsx"
const TutorialSwiper = () => {
    const [isOpen, setIsOpen] = useState(false);

    const slides = [
        <SlideIntroduction/>,
        <SlideHowToReadChart/>,
        <ExplanationConsumption/>,
        <SlideSummary/>,
        <SlideCorrelationIntroduction/>,
        <SlideCorrelationExplanation/>,
        <SlideEnding/>
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
    const hasShown = sessionStorage.getItem('alertShown');

    useEffect(() => {
        setCurrentIndex(0)
        if (!hasShown) {
            setIsOpen(true);
            sessionStorage.setItem('alertShown', 'true');
        }
    }, [hasShown]);

    return (
        <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
            <AlertDialogTrigger asChild>
                <Button variant="default_blue" className = {``} onClick={() => setIsOpen(true)}>Start Tutorial</Button>
            </AlertDialogTrigger>
            <AlertDialogContent className = {`w-[90vw] h-[90vh] bg-transparent backdrop-blur rounded-2xl`}>

                <div className = {`flex flex-col gap-y-1 h-full`}>
                    <div className = {`text-white h-[73vh] overflow-y-hidden`}>
                        <div className = {`overflow-y-auto md:px-5 h-full`}>
                            {slides[currentIndex]}
                        </div>
                    </div>
                    <div className = {`flex justify-between items-center min-h-[5vh] `}>
                        {currentIndex != 0 ? 
                            <Button variant="outline" onClick={goToPrev}>Previous</Button> : <p></p>
                        }
                        {
                            currentIndex !== slides.length - 1 ?
                            <Button variant="outline" onClick={goToNext}>Next</Button>: <p></p>
                        }
                    </div>
                    <span className = {`flex justify-end items-center min-h-[5vh]`}>
                        <Button variant="default_blue" onClick={() => setIsOpen(false)}>Close Analysis</Button>
                    </span>
                </div>


            </AlertDialogContent>
        </AlertDialog>
    )
};

export default TutorialSwiper;