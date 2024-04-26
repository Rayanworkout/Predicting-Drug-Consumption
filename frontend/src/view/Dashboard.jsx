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
                            onClick={() => getFunctionToCall()()} variant={'outline'}>Search</Button>
                    </div>

                    <Card className={`w-full h-fit flex-1`}>
                        <CardContent
                            className={`w-full h-auto min-h-[400px] bg-neutral-400 items-center justify-center p-0 m-0 rounded`}>
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
                    <p className={`text-2xl font-semibold`}>On this dashboard,you can see 3 types of charts:</p>
                    <ul className={`list-disc font-semibold pl-11 pt-4`}>
                        <li>Comparison</li>
                        <li>Correlation</li>
                        <li>Repartition</li>
                    </ul>
                </span>

                <p>
                    As seen in the analysis, the comparison charts help us see how drug consumption is distributed among
                    the different features for each drug. You can see how many people in the survey answered about their
                    frequency of consumption, and you can filter the respondents by their age, country and more. The
                    comparison charts can be displayed both horizontally and vertically.
                </p>

                <p>The correlation heatmaps help us see how the drug consumption is correlated with the different
                    features.
                    As a reminder, features are personality traits or personal information like age, country, ethnicity
                    ...
                    The darker the color between the drug and the feature, the higher the correlation.</p>
                <p>The repartition charts help us see how the dataset is balanced among the different features. It is
                    very
                    important because if a feature is not balanced, the results of the analysis may be biased. This
                    information must be taken into account when analyzing the data because our dataset only has 1885
                    respondents.</p>
                <p>Contenu Footer:</p>
                <p>This project was made with (COEUR) for educational purposes using this dataset. It is under the MIT
                    license. The whole code is open source and available on GitHub. Any guidance, suggestions, or
                    collaboration is warmly welcomed and greatly appreciated, feel free to get in touch.</p>
                <p>Contenu home</p>
                <p>Welcome to this small statistical analysis project. The goal is to investigate the main factors that
                    influence drug consumption in individuals. Are certain ethnicities more likely to consume drugs? Do
                    people with specific personality traits have a higher likelihood of drug consumption? We will
                    attempt to
                    answer these questions and more in this analysis.</p>
                <p>Feel free to run the analysis as many time as necessary and then explore the charts by yourself to
                    find
                    some insights !</p>
            </div>
        </div>
    );
};

export default Dashboard;