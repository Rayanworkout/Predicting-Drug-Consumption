import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel.jsx"
import {Card, CardContent} from "@/components/ui/card.jsx";
import BarChartGraph from "@/components/BarChart/BarChartGraph.jsx";
import React from "react";
import {Button} from "@/components/ui/button.jsx";
const Swiper = ({swiperTitle, chartArrayToMap}) => {
    const data = {
        age_range: "18-24",
        gender: null,
        ethnicity: null,
        education: null,
        country: null,
        drug: "alcohol",
        data: {
            "used in last week": 271,
            "used in last day": 149,
            "used in last month": 121,
            "used in last year": 75,
            "never used": 14,
            "used in last decade": 13
        }
    }
    return (
        <div className = {`flex justify-center`}>
            <Carousel className="w-full lg:w-11/12">
                <div className = {`flex justify-between`}>
                    <span>
                        <p className={` text-2xl `}>{swiperTitle}</p>
                        <p className={` text-xl `}>Description Du Chart</p>
                    </span>
                    <Button variant="outline" className = {`text-black`}>Go to Dashboard</Button>
                </div>

                <CarouselContent className=" ">
                    {Array.from({length: 5}).map((_, index) => (
                        <CarouselItem key={index} className=" md:basis-1/2 lg:basis-1/3 ">
                            <div className="p-1">
                                <Card>
                                    <CardContent className=" h-60 flex aspect-w-16 aspect-h-9 items-center justify-center p-6">
                                        <BarChartGraph apiData={data.data} orientation={true} toolbar={false} legend={false}/>
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