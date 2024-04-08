import SearchBar from "@/components/SearchBar.jsx";
import {Card, CardContent} from "@/components/ui/card.jsx";
import SortButton from "@/components/SortButton.jsx";
import {Button} from "@/components/ui/button.jsx";
import {BarChartBig, BarChartHorizontalBig, CandlestickChart, LineChart, PieChart} from "lucide-react";
import GraphPrecision from "@/components/GraphPrecision.jsx";
const Dashboard = () => {
    return (
        <div className={`w-100 h-screen px-6 pb-3 overflow-hidden pt-10 overflow-y-hidden `}>

            <span className={` flex flex-col gap-0 pb-3 lg:px-7`}>
                <span className={` mb-10 `}>
                    <h1 className={`
                           text-4xl 
                           md:text-5xl
                           font-bold tracking-tight text-white antialiasing`}
                    >Drug Name by + sort
                    </h1>
                </span>
                <SortButton/>
            </span>

            <div className={`flex flex-col md:flex-row lg:px-7`}>
                <div className={` mb-4 md:min-w-60 md:mr-3 lg:min-w-72`}>
                    <Card className = {`w-full h-full min-h-fit bg-neutral-400`}>
                        <GraphPrecision/>
                    </Card>
                </div>
                <div className = {` w-full h-fit flex flex-col gap-4 items-center`}>
                    <SearchBar className = {` mb-4 `}/>

                    <Card className = {` w-full `}>
                        <CardContent className={`w-full h-72 md:h-80 bg-neutral-400 aspect-square items-center justify-center p-6 `}>
                        </CardContent>
                    </Card>

                    <div className={`  h-fit w-fit bg-transparent flex flex-wrap gap-3 justify-center`}>
                        <Button variant={"secondary_outline"} className = {`focus:bg-blue-700`}><BarChartBig/></Button>
                        <Button variant={"secondary_outline"} className = {`focus:bg-amber-700`}><BarChartHorizontalBig/></Button>
                        <Button variant={"secondary_outline"} className = {`focus:bg-emerald-700`}><LineChart/></Button>
                        <Button variant={"secondary_outline"} className = {`focus:bg-purple-700`}><PieChart/></Button>
                        <Button variant={"secondary_outline"} className = {`focus:bg-red-700`}><CandlestickChart/></Button>
                    </div>
                </div>

                <div className={` `}>

                </div>
            </div>
        </div>
    );
};

export default Dashboard;