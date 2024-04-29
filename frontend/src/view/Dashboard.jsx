import SearchBar from "@/components/SearchBar.jsx";
import {Card, CardContent} from "@/components/ui/card.jsx";
import {BarChartBig, LineChart, PieChart} from "lucide-react";
import {GraphDrawer} from "@/components/GraphDrawer.jsx";
import Graph from "@/components/Graph.jsx";
import {Button} from "@/components/ui/button.jsx";
import useStore from "@/store/store.js";
import {FirstLetterUpperCase, ReplaceUnderscoreSpace} from "@/tool/tool.js"
import React, {useEffect} from "react";
const Dashboard = ({title}) => {
    const t = useStore(state => state.translations);

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
        <div className={`w-100 h-full flex flex-col pt-10 px-6 pb-3 bg-transparent z-1`}>
            <span className={`animate-glowSpinL absolute z-[0] w-[200px] h-[100px] bg-blue-400 left-0 mt-20 ml-20 rounded-full blur-3xl`}></span>
            <span className={`animate-glowSpinR absolute z-[0] w-[200px] h-[100px] bg-[#bec1ff] left-0 ml-32 md:ml-52 rounded-full blur-3xl`}></span>

            <span className={` flex flex-col gap-0 pb-3 lg:px-7 z-10`}>
                <span className={` mb-10 `}>
                    <h1 className={`text-5xl md:text-6xl font-bold pb-3 tracking-tight text-white antialiasing`}>
                        {chartType != 'consumption' ? FirstLetterUpperCase(chartType) + ' ' + ReplaceUnderscoreSpace(consumptionType) : 'Drug : ' + FirstLetterUpperCase(drugType)}
                    </h1>
                    <p className={` text-2xl  md:text-3xl font-bold tracking-tight text-white antialiasing`}>
                        {chartType == 'consumption' ? FirstLetterUpperCase(chartType) + ' ' + ReplaceUnderscoreSpace(consumptionType) + " : " + ReplaceUnderscoreSpace(precisionConsumption) : ""}
                    </p>
                </span>
            </span>

            <div className={`flex flex-col md:flex-row lg:px-7`}>
                <div className={`w-full h-fit flex flex-col gap-4 items-center`}
                     alt="container de search bar + graph + btn de graph">
                    <div className={`w-full flex justify-center gap-x-4`}>
                        <SearchBar className={`mb-4`} handleDrugType={handleDrugType}/>
                        <Button
                            disabled={chartType == 'consumption' ? (drugValues.includes(drugType) ? false : true) : true}
                            onClick={() => getFunctionToCall()()} variant={'outline'}
                            className = {`z-10`}
                        >Search</Button>
                    </div>

                    <Card className={`min-w-full md:min-w-[90%] h-fit flex-1 z-10`}>
                        <CardContent
                            className={`w-full h-auto items-center justify-center p-0 m-0 rounded`}>
                            <Graph/>
                        </CardContent>
                    </Card>

                    <div className={`h-fit w-fit bg-transparent flex flex-wrap gap-3 justify-center`}>
                        <GraphDrawer icon={<BarChartBig/>} typeOfChart={"consumption"} triggerTitle={'Comparison'}/>
                        <GraphDrawer icon={<LineChart/>} typeOfChart={"repartition"} triggerTitle={'Repartition'}/>
                        <GraphDrawer icon={<PieChart/>} typeOfChart={"correlation"} triggerTitle={'Correlation'}/>
                    </div>
                </div>
            </div>

            <div className={`flex flex-col gap-y-5 pt-10 md:p-10 text-white text-balance text-base md:text-xl`}>
                <span>
                    <p className={`text-2xl font-semibold`}>{t.dashboard.chartTypesTitle}</p>
                    <ul className={`list-disc font-semibold pl-11 pt-4`}>
                        {t.dashboard.chartTypesList.map((item, index) => {
                            return <li key={index}>{item}</li>
                        })}
                    </ul>
                </span>

                <p>{t.dashboard.comparisonChartDescription}</p>

                <p>{t.dashboard.correlationHeatmapDescription}</p>
                <p>{t.dashboard.repartitionChartDescription}</p>
            </div>
        </div>
    );
};

export default Dashboard;