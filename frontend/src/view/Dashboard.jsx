import SearchBar from "@/components/SearchBar.jsx";
import {Card, CardContent} from "@/components/ui/card.jsx";
import SortButton from "@/components/SortButton.jsx";
import {BarChartBig, LineChart, PieChart} from "lucide-react";
import {GraphDrawer} from "@/components/GraphDrawer.jsx";
import Graph from "@/components/Graph.jsx";
import {Button} from "@/components/ui/button.jsx";
import useStore from "@/store/store.js";
import {FirstLetterUpperCase, ReplaceUnderscoreSpace} from "@/tool/tool.js"
import React, {useEffect} from "react";
const Dashboard = ({title}) => {

    const { drugType, drugValues, setDrugType, consumptionType, precisionConsumption,
        chartType, getFunctionToCall,setApiData, apiCorrelationData } = useStore();

    useEffect(() => {
        setApiData({
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
        })
    }, []);
    const handleDrugType = (newValue) => {setDrugType(newValue)}

    return (
        <div className={`w-100 h-full flex flex-col pt-10 px-6 pb-3 bg-transparent`}>
            <span className={` flex flex-col gap-0 pb-3 lg:px-7`}>
                <span className={` mb-10 `}>
                    <h1 className={`text-5xl md:text-6xl font-bold pb-3 tracking-tight text-white antialiasing`}>
                        {chartType != 'consumption' ? FirstLetterUpperCase(chartType) +' '+ ReplaceUnderscoreSpace(consumptionType) : 'Drug : '+ FirstLetterUpperCase(drugType)}
                    </h1>
                    <p className={`
                           text-2xl 
                           md:text-3xl
                           font-bold tracking-tight text-white antialiasing`}>
                        { chartType == 'consumption' ? FirstLetterUpperCase(chartType) + ' ' + ReplaceUnderscoreSpace(consumptionType) + " : " +  ReplaceUnderscoreSpace(precisionConsumption) : ""}
                    </p>
                </span>
                <SortButton/>
            </span>

            <div className={`flex flex-col md:flex-row lg:px-7`}>
                <div className={`w-full h-fit flex flex-col gap-4 items-center`} alt="container de search bar + graph + btn de graph">
                    <div className={`w-full flex justify-center gap-x-4`}>
                        <SearchBar className={`mb-4`} handleDrugType={handleDrugType}/>
                        <Button disabled={drugValues.includes(drugType) ? false : true} onClick={() => getFunctionToCall()()} variant={'outline'}>Search</Button>
                    </div>

                    <Card className={`w-full flex-1`}>
                        <CardContent className={`w-full h-72 md:min-h-[400px] bg-neutral-400 items-center justify-center p-0 m-0 rounded`}>
                            <Graph/>
                        </CardContent>
                    </Card>

                    <div className={`h-fit w-fit bg-transparent flex flex-wrap gap-3 justify-center`}>
                        <GraphDrawer icon={<BarChartBig/>} typeOfChart={"consumption"} triggerTitle={'Comparaison'}/>
                        <GraphDrawer icon={<LineChart/>} typeOfChart={"repartition"} triggerTitle={'Repartition'}/>
                        <GraphDrawer icon={<PieChart/>} typeOfChart={"correlation"} triggerTitle={'Correlation'}/>
                    </div>
                </div>
            </div>

            <div className={`pt-6 text-white text-center`}>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci debitis eius eos eveniet id
                    labore
                    maxime mollitia nihil pariatur perferendis quae quis rerum sunt tempora tempore unde ut
                    voluptas,
                    voluptatibus!</p>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci debitis eius eos eveniet id
                    labore
                    maxime mollitia nihil pariatur perferendis quae quis rerum sunt tempora tempore unde ut
                    voluptas,
                    voluptatibus!</p>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci debitis eius eos eveniet id
                    labore
                    maxime mollitia nihil pariatur perferendis quae quis rerum sunt tempora tempore unde ut
                    voluptas,
                    voluptatibus!</p>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci debitis eius eos eveniet id
                    labore
                    maxime mollitia nihil pariatur perferendis quae quis rerum sunt tempora tempore unde ut
                    voluptas,
                    voluptatibus!</p>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci debitis eius eos eveniet id
                    labore
                    maxime mollitia nihil pariatur perferendis quae quis rerum sunt tempora tempore unde ut
                    voluptas,
                    voluptatibus!</p>
            </div>
        </div>
    );
};

export default Dashboard;