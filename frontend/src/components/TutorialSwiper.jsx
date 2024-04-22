import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog.jsx"
import { Button } from "@/components/ui/button.jsx"
import {useEffect, useState} from "react";
const TutorialSwiper = () => {
    const [isOpen, setIsOpen] = useState(false);
    const SlideOne = () => <div>Slide 1: Bienvenue!</div>;
    const SlideTwo = () => <div>Slide 2: Découvrez plus!</div>;
    const SlideThree = () => <div>Slide 3: Merci de nous visiter!</div>;

    const slides = [
        <SlideOne />,
        <SlideTwo />,
        <SlideThree />
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

    useEffect(() => {
        const hasShown = sessionStorage.getItem('alertShown');

        if (!hasShown) {
            setIsOpen(true);
            sessionStorage.setItem('alertShown', 'true');
        }
    }, []);

    return (
        <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
            <AlertDialogTrigger asChild>
                <Button variant="outline" onClick={() => setIsOpen(true)}>Start Tutorial</Button>
            </AlertDialogTrigger>
            <AlertDialogContent className = {`h-[90%] w-[90%] bg-transparent backdrop-blur`}>

                <div className = {`flex flex-col`}>
                    <div className = {`text-white min-h-[80%]`}>
                        {slides[currentIndex]} {slides.length}
                    </div>
                    <div className = {`flex justify-between items-center flex-grow `}>
                        <Button disabled={currentIndex == 0 ? true : false} variant="outline" onClick={goToPrev}>Prev</Button>
                        <Button disabled={currentIndex == slides.length - 1 ? true : false} variant="outline" onClick={goToNext}>Next</Button>
                    </div>
                    <span className = {`flex justify-end items-center flex-grow `}>
                        <Button variant="outline" onClick={() => setIsOpen(false)}>Skip Tutorial</Button>
                    </span>
                </div>


            </AlertDialogContent>
        </AlertDialog>
    )
};

export default TutorialSwiper;