import SearchBar from "@/components/SearchBar.jsx";
import {Card, CardContent} from "@/components/ui/card.jsx";
import SortButton from "@/components/SortButton.jsx";
import {BarChartBig, BarChartHorizontalBig, CandlestickChart, LineChart, PieChart} from "lucide-react";
import { DrawerDemo} from "@/components/GraphDrawer.jsx";
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
                <div className={` mb-4 md:min-w-20 md:mr-3`} alt="container de bouton a changer potentiellement">
                    <Card className = {` fl h-full bg-neutral-400`}>
                    </Card>
                </div>
                <div className = {`w-full h-fit flex flex-col gap-4 items-center`} alt="container de search bar + graph + btn de graph">
                    <SearchBar className = {`mb-4`}/>

                    <Card className = {`w-full flex-1`}>
                        <CardContent className={`w-full h-72 md:min-h-[400px] bg-neutral-400 aspect-square items-center justify-center p-6 `}>
                        </CardContent>
                    </Card>

                    <div className={`h-fit w-fit bg-transparent flex flex-wrap gap-3 justify-center`}>

                        <DrawerDemo icon={<BarChartBig/>}/>
                        <DrawerDemo icon={<BarChartHorizontalBig/>}/>
                        <DrawerDemo icon={<LineChart/>}/>
                        <DrawerDemo icon={<PieChart/>}/>
                        <DrawerDemo icon={<CandlestickChart/>}/>

                    </div>
                </div>

                <div className={` `}>

                </div>
            </div>
        </div>
    );
};

export default Dashboard;