import SearchBar from "@/components/SearchBar.jsx";
import {Card, CardContent} from "@/components/ui/card.jsx";
import SortButton from "@/components/SortButton.jsx";
import {Button} from "@/components/ui/button.jsx";
import {ArrowLeft, ArrowRight} from "lucide-react";

const Dashboard = () => {

    return (
        <div className={`w-100 h-screen px-6 pb-3 overflow-hidden pt-10 overflow-y-hidden `}>

            <span className={` flex pb-3 md:px-10 lg:px-20`}>
                <span className={` flex flex-col mb-10 `}>
                    <h1 className={`
                           text-4xl 
                           md:text-5xl
                           font-bold tracking-tight text-white antialiasing`}
                    >Company Title
                    </h1>
                </span>
                <SortButton/>
            </span>

            <div className={`flex flex-col md:flex-row lg:px-7`}>

                <div className={` mb-4 md:min-w-60 md:mr-3 lg:min-w-72`}>
                    <SearchBar/>
                </div>

                <div className = {` w-full `}>
                    <Card>
                        <CardContent
                            className={` flex w-full h-72 md:h-80
                                bg-neutral-400 aspect-square items-center justify-center p-6 `}>
                        </CardContent>
                    </Card>
                    <span className={` flex justify-between mt-1.5`}>
                        <Button variant="outline" className={` w-8 h-8 rounded-full p-0`}>
                            <ArrowLeft className={`w-4 h-4`}/>
                        </Button>
                        <Button variant="outline" className={` w-8 h-8 rounded-full p-0`}>
                            <ArrowRight className={`w-4 h-4`}/>
                        </Button>
                    </span>
                    <Card className={` mt-3 py-3 h-fit bg-transparent flex flex-wrap justify-center`}>
                        <Button>Sort A</Button>
                        <Button>Sort A</Button>
                        <Button>Sort A</Button>
                        <Button>Sort A</Button>
                        <Button>Sort A</Button>
                        <Button>Sort A</Button>

                    </Card>
                </div>

                <div className={` `}>

                </div>
            </div>
        </div>
    );
};

export default Dashboard;