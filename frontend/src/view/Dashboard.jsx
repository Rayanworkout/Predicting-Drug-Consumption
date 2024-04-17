import SearchBar from "@/components/SearchBar.jsx";
import {Card, CardContent} from "@/components/ui/card.jsx";
import SortButton from "@/components/SortButton.jsx";
import {BarChartBig, BarChartHorizontalBig, CandlestickChart, LineChart, PieChart} from "lucide-react";
import {GraphDrawer} from "@/components/GraphDrawer.jsx";
import {useEffect, useState} from "react";
import Graph from "@/components/Graph.jsx";
const Dashboard = () => {
    let [drugType, setDrugType] = useState('alcohol');
    const handleDrugType = (newValue) => {
        setDrugType(newValue)
    }
    let [apiData, setApiData] = useState({
        age_range: "",
        gender: null,
        ethnicity: null,
        education: null,
        country: null,
        drug: "",
        data: {}
    });

    useEffect(() => {
        console.log(apiData.data)
    }, [apiData]);
    const handleApiData = (newValue) => {
        setApiData(newValue)
    }

    return (
        <div className={`w-100 h-screen px-6 pb-3 overflow-hidden pt-10 overflow-y-hidden`}>

            <span className={` flex flex-col gap-0 pb-3 lg:px-7`}>
                <span className={` mb-10 `}>
                    <h1 className={`
                           text-4xl 
                           md:text-5xl
                           font-bold tracking-tight text-white antialiasing`}
                    >Drug : {drugType} by + sort
                    </h1>
                </span>
                <SortButton/>
            </span>

            <div className={`flex flex-col md:flex-row lg:px-7`}>
                <div className = {`w-full h-fit flex flex-col gap-4 items-center`} alt="container de search bar + graph + btn de graph">
                    <SearchBar className = {`mb-4`} handleDrugType={handleDrugType}/>

                    <Card className = {`w-full flex-1`}>
                        <CardContent className={`w-full h-72 md:min-h-[400px] bg-neutral-400 items-center justify-center p-0 m-0 rounded`}>
                            <Graph keyData={Object.keys(apiData.data)} valueData={Object.values(apiData.data)}/>
                        </CardContent>
                    </Card>

                    <div className={`h-fit w-fit bg-transparent flex flex-wrap gap-3 justify-center`}>
                        <GraphDrawer icon={<BarChartBig/>} drug={drugType} chartType={"consumption"} handleApiData={handleApiData} horizontal={false}/>
                        <GraphDrawer icon={<BarChartHorizontalBig/>} drug={drugType} chartType={"consumption"} horizontal={true}/>
                        <GraphDrawer icon={<LineChart/>} chartType={"other"} />
                        <GraphDrawer icon={<PieChart/>} chartType={"other"}/>
                        <GraphDrawer icon={<CandlestickChart/>} chartType={"other"}/>
                    </div>
                </div>

                <div className={` `}>

                </div>
            </div>
        </div>
    );
};

export default Dashboard;