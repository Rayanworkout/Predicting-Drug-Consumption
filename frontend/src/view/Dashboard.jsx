import SearchBar from "@/components/SearchBar.jsx";
import {Card, CardContent} from "@/components/ui/card.jsx";
import SortButton from "@/components/SortButton.jsx";
import {BarChartBig, BarChartHorizontalBig, CandlestickChart, LineChart, PieChart} from "lucide-react";
import {GraphDrawer} from "@/components/GraphDrawer.jsx";
import Graph from "@/components/Graph.jsx";
import {Button} from "@/components/ui/button.jsx";
import useStore from "@/store/store.js";
const Dashboard = () => {

    const { drugType, setDrugType } = useStore();
    const { consumptionType} = useStore()
    const { chartType} = useStore()
    const { getFunctionToCall } = useStore();

    const handleDrugType = (newValue) => {setDrugType(newValue)}

    return (
        <div className={`w-100 h-screen px-6 pb-3 overflow-hidden pt-10 overflow-y-hidden`}>

            <span className={` flex flex-col gap-0 pb-3 lg:px-7`}>
                <span className={` mb-10 `}>
                    <h1 className={`
                           text-4xl 
                           md:text-5xl
                           font-bold tracking-tight text-white antialiasing`}
                    >Drug : {drugType}
                    </h1>
                    <p className={`
                           text-2xl 
                           md:text-3xl
                           font-bold tracking-tight text-white antialiasing`}>
                        Consumption : {consumptionType} + {chartType}
                    </p>
                </span>
                <SortButton/>
            </span>

            <div className={`flex flex-col md:flex-row lg:px-7`}>
                <div className={`w-full h-fit flex flex-col gap-4 items-center`}
                     alt="container de search bar + graph + btn de graph">
                    <div className = {`w-full flex justify-center gap-x-4`}>
                        <SearchBar className = {`mb-4`} handleDrugType={handleDrugType}/>
                        <Button onClick={() => getFunctionToCall()()} variant={'outline'}>Search</Button>
                    </div>

                    <Card className = {`w-full flex-1`}>
                        <CardContent className={`w-full h-72 md:min-h-[400px] bg-neutral-400 items-center justify-center p-0 m-0 rounded`}>
                                <Graph/>
                        </CardContent>
                    </Card>

                    <div className={`h-fit w-fit bg-transparent flex flex-wrap gap-3 justify-center`}>
                        <GraphDrawer icon={<BarChartBig/>} typeOfChart={"consumption-y"} />
                        <GraphDrawer icon={<BarChartHorizontalBig/>} typeOfChart={"consumption-x"}/>
                        <GraphDrawer icon={<LineChart/>} typeOfChart={"repartition"} />
                        <GraphDrawer icon={<PieChart/>} typeOfChart={"other"}/>
                        <GraphDrawer icon={<CandlestickChart/>} typeOfChart={"other"}/>
                    </div>
                </div>

                <div className={` `}>

                </div>
            </div>
        </div>
    );
};

export default Dashboard;