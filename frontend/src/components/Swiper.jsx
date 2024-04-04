import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel.jsx"
import {Card, CardContent} from "@/components/ui/card.jsx";
const Swiper = () => {
    return (
        <div className = {`flex justify-center`}>
            <Carousel className="w-full lg:w-11/12">
                <p className = {` text-2xl `}>TITLE SORT</p>
                <CarouselContent className=" ">
                    {Array.from({ length: 5 }).map((_, index) => (
                        <CarouselItem key={index} className=" md:basis-1/2 lg:basis-1/3 ">
                            <div className="p-1">
                                <Card>
                                    <CardContent className=" h-60
                                        flex aspect-w-16 aspect-h-9 items-center justify-center p-6 bg-neutral-500 ">
                                        <span className="text-2xl font-semibold bg-neutral-500">{index + 1}</span>
                                    </CardContent>
                                </Card>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselNext/>
                <CarouselPrevious/>
            </Carousel>
        </div>
    )
};
export default Swiper;