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
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
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
            <AlertDialogContent className = {`h-[90%] w-[90%] bg-neutral-700 `}>

                <div className = {`bg-neutral-400 flex-col`}>
                    <div className = {`text-white min-h-[80%] bg-red-700`}>
                        {slides[currentIndex]}
                    </div>
                    <div className = {`flex justify-between`}>
                        <Button variant="outline" onClick={goToPrev}>Prev</Button>
                        <Button variant="outline" onClick={goToNext}>Next</Button>
                    </div>
                    <span>
                        <AlertDialogAction onClick={() => setIsOpen(false)}>Skip Tutorial</AlertDialogAction>
                    </span>
                </div>


            </AlertDialogContent>
        </AlertDialog>
    )
};

export default TutorialSwiper;