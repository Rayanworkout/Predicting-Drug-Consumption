import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel.jsx"
import { Link } from "react-router-dom";
import {Card, CardContent} from "@/components/ui/card.jsx";
import BarChartGraph from "@/components/BarChart/BarChartGraph.jsx";
import React from "react";
import {Button} from "@/components/ui/button.jsx";
import RepartitionGraph from "@/components/RepartitionChart/RepartitionGraph.jsx";
import CorrelationChart from "@/components/CorrelationChart/CorrelationChart.jsx";
import {dataArray} from "@/tool/tool.js";
const Swiper = ({swiperTitle}) => {

    const data = dataArray();
    return (
        <div className = {`flex justify-center`}>
            <Carousel className="w-full lg:w-11/12">
                <div className = {`flex justify-between`}>
                    <span>
                        <p className={`text-2xl`}>{swiperTitle}</p>
                        <p className={`text-xl`}>Description Du Chart</p>
                    </span>
                    <Link to="/statistics">
                    <Button variant="outline" className = {`text-black`}>Go to Dashboard</Button>
                    </Link>
                </div>

                <CarouselContent className=" ">
                    {
                        data ?
                            data.consumption.map((item, index) => (
                                <CarouselItem key={index} className=" md:basis-1/2 lg:basis-1/3 ">
                                    <div className="p-1">
                                        <Card>
                                            <CardContent className="h-60 flex bg-neutral-50  rounded">
                                                <BarChartGraph apiData={item} orientation={true} dashboard={true}/>
                                            </CardContent>
                                        </Card>
                                    </div>
                                </CarouselItem>
                        ))
                             :
                            Array.from({length: 3}).map((_, index) => (
                                <CarouselItem key={index} className=" md:basis-1/2 lg:basis-1/3 ">
                                    <div className="p-1 animate-pulse">
                                        <Card>
                                            <CardContent className="h-60 flex bg-neutral-50  rounded">
                                            </CardContent>
                                        </Card>
                                    </div>
                                </CarouselItem>
                ))
                    }
                </CarouselContent>
                <CarouselNext/>
                <CarouselPrevious/>
            </Carousel>
        </div>
    )
};
export default Swiper;