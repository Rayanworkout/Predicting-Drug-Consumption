import SearchBar from "@/components/Search/SearchBar.jsx";
import SearchButton from "@/components/Search/SearchButton.jsx";
import cigarette from "@/assets/img/cigarette.png";
import mushroom from "@/assets/img/mushroom.png";
import {Card, CardContent} from "@/components/ui/card.jsx";
import {BarChartBig, LineChart, PieChart} from "lucide-react";
import {GraphDrawer} from "@/components/GraphDrawer.jsx";
import Graph from "@/components/Graph.jsx";
import useStore from "@/store/store.js";
import {FirstLetterUpperCase, ReplaceUnderscoreSpace} from "@/tool/tool.js"
import React, {useEffect} from "react";
import BubbleGlow from "@/components/BubbleGlow.jsx";
const Dashboard = () => {
    const t = useStore(state => state.translations);

    const {setDrugType, drugTypePrettier, consumptionType, precisionConsumption, chartType,setApiData } = useStore();

    useEffect(() => {
        setApiData({
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
            <BubbleGlow/>
            <div>
                <span className={` flex flex-col gap-0 pb-3 lg:px-7 z-10`}>
                    <span className={` mb-10 `}>
                        <h1 className={`text-5xl md:text-6xl font-bold pb-3 tracking-tight text-white antialiasing`}>
                            {chartType != 'consumption' ? FirstLetterUpperCase(chartType) + ' ' + ReplaceUnderscoreSpace(consumptionType) : 'Drug : ' + drugTypePrettier}
                        </h1>
                        <p className={` text-2xl  md:text-3xl font-bold tracking-tight text-white antialiasing`}>
                            {chartType == 'consumption' ? FirstLetterUpperCase(chartType) + ' ' + ReplaceUnderscoreSpace(consumptionType) + " : " + ReplaceUnderscoreSpace(precisionConsumption) : ""}
                        </p>
                    </span>
                </span>
            </div>
            <div className={`absolute right-16 opacity-50 rotate-3`}>
                <img src={mushroom} className={`h-[130px] md:h-[300px] animate-jump`}/>
            </div>
            <div className={`absolute md:right-[40%] md:top-0 opacity-50 rotate-3 z-0`}>
                <img src={cigarette} className={`h-[130px] md:h-[300px] animate-jump`}/>
            </div>

            <div className={`flex flex-col md:flex-row lg:px-7`}>
                <div className={`w-full h-fit flex flex-col gap-4 items-center`}
                     alt="container de search bar + graph + btn de graph">
                    <div className={`w-full flex justify-center items-end gap-x-4`}>
                        <SearchBar className={`mb-4`} handleDrugType={handleDrugType}/>
                        <SearchButton/>
                    </div>

                    <Card className={`min-w-full md:min-w-[90%] h-fit flex-1 z-10`}>
                        <CardContent
                            className={`w-full h-auto items-center justify-center p-0 m-0 rounded`}>
                            <Graph/>
                        </CardContent>
                    </Card>

                    <div className={`h-fit w-fit bg-transparent flex flex-wrap gap-3 justify-center`}>
                        <GraphDrawer icon={<BarChartBig/>} typeOfChart={"consumption"}
                                     triggerTitle={t.dashboard.comparison}/>
                        <GraphDrawer icon={<LineChart/>} typeOfChart={"repartition"}
                                     triggerTitle={t.dashboard.repartition}/>
                        <GraphDrawer icon={<PieChart/>} typeOfChart={"correlation"}
                                     triggerTitle={t.dashboard.correlation}/>
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