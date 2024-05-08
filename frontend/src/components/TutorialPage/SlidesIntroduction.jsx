import {styles} from "@/assets/style.js"
import ShowCodeAlert from "@/components/TutorialPage/ShowCodeAlert.jsx";
import {Button} from "@/components/ui/button.jsx";
import {useEffect, useState} from "react";
import correlationImg from "@/assets/img/correlation_features_meaning.png"
import RepartitionGraph from "@/components/RepartitionChart/RepartitionGraph.jsx";
import BarChartGraph from "@/components/BarChart/BarChartGraph.jsx";
import useStore from "@/store/store.js";
import BarChartConsumptionType from "@/components/BarChart/BarChartConsumptionType.jsx";
import ConsumptionGroupCheckbox from "@/components/BarChart/ConsumptionGroupCheckbox.jsx"
import CorrelationChart from "@/components/CorrelationChart/CorrelationChart.jsx";
import {CircleAlert} from "lucide-react";
import {GET_CONSUMPTION_DATA} from "@/api_/api_"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group.jsx";
import { Label } from "@/components/ui/label.jsx";
import {ReplaceUnderscoreSpace} from "@/tool/tool.js";
import codeCorrelation from "@/assets/img/codeCorrelation.png"
import codePython from "@/assets/img/codePython.png"
export const SlideIntroduction = () => {
    const {translations} = useStore();
    const t = translations.analysis.slideIntroduction;
    return (
        <div className={styles.textMainStyle}>
            <p className={styles.mainTitle}>{t.mainTitle}</p>

            <p>{t.databaseIntroduction}</p>

            <div className = {`flex px-7 gap-x-10`}>
                <ul className={styles.listDisc}>
                    {t.personalityTraits.map((item, index) => {
                        return <li key={index}>{item}</li>
                    })}
                </ul>
            </div>
            <p>{t.additionalScores}</p>

            <p>{t.traitScores}</p>
            <p>{t.additionalAttributes}</p>

            <p className={"flex gap-x-2 text-black bg-slate-50 w-fit rounded-sm px-3 py-0.5"}><CircleAlert className={"text-red-500"}/>{t.ethnicityNote}</p>
            <p>{t.drugUseInquiry}</p>

            <div className="box-content flex flex-wrap w-full gap-x-5">
                <ul className={`gap-x-6 `}>
                    {t.drugList1.map((item, index) => {
                        return <li key={index} className = {`mr-2`}>{item}</li>
                    })}
                </ul>
                <ul className={`gap-x-6`}>
                    {t.drugList2.map((item, index) => {
                        return <li key={index} className = {`mr-2`}>{item}</li>
                    })}
                </ul>
                <ul className={`gap-x-6 `}>
                    {t.drugList3.map((item, index) => {
                        return <li key={index} className = {`mr-2`}>{item}</li>
                    })}
                </ul>
            </div>
            <p>{t.drugUseFrequency}</p>
            <div className="box-content flex flex-wrap w-full">
                <ul className={` gap-x-6 `}>
                    {t.frequencyOptions.map((item, index) => {
                        return <li key={index} className = {`mr-2`}>{item}</li>
                    })}
                </ul>
            </div>

            <p className={styles.secondTitle}>{t.analysisRemindersTitle}</p>
            <ul className={styles.listDisc}>
                {t.analysisReminders.map((item, index) => {
                    return <li key={index}>{item}</li>
                })}
            </ul>
        </div>
    );
};
export const SlideHowToReadChart = () => {
    const {apiRepartitionData, getFunctionToCall, setChartType, setConsumptionType, consumptionType} = useStore();
    const {translations} = useStore();
    const t = translations.analysis.slideReadChart;
    useEffect(() => {
        setChartType('repartition');
        setConsumptionType('by_gender')
        getFunctionToCall()()
    }, []);
    return (
        <div className={styles.textMainStyle}>
            <p className={styles.mainTitle}>{t.analysisStartingPointTitle}</p>
            <p>{t.populationObservation}</p>
            <p>{t.balanceImportance}</p>
            <div className = {`flex flex-col px-5 w-full items-center`}>
                <p className = {styles.secondTitle}>{t.datasetRepartitionTitle} {ReplaceUnderscoreSpace(consumptionType)}</p>
                <div className={`w-full box-content mb-2 text-black h-[30vh] bg-neutral-50 rounded-md`}>
                    <RepartitionGraph apiData={apiRepartitionData}/>
                </div>
                <div
                    className={`flex flex-col w-fit p-2 rounded-md text-black bg-neutral-50 items-center space-y-3`}>
                    <BarChartConsumptionType/>
                    <Button variant="default_blue" onClick={() => getFunctionToCall()()}>Submit</Button>
                </div>
            </div>

            <p>{t.repartitionAnalysisNote}</p>
            <p className={styles.secondTitle}>{t.initialAnalysisInterestTitle}</p>
            <p>{t.analysisPurpose}</p>
            <ul className={styles.listDisc}>
                {t.analysisQuestions.map((item, index) => {
                    return <li key={index}>{item}</li>
                })}
            </ul>
            <p>{t.preconceivedNotions}</p>
        </div>
    );
};
export const ExplanationConsumption = () => {
    const {apiData, setApiData,setDrugType,precisionConsumption,setPrecisionConsumption, setConsumptionType} = useStore();
    const {translations} = useStore();
    const t = translations.analysis.slideExplanationConsumption;
    useEffect(() => {
        setDrugType('meth')
        setPrecisionConsumption('16')
        setConsumptionType('by_education')
        GET_CONSUMPTION_DATA(new URLSearchParams({education:'16', drug:'meth'}), 'by_education').then(data => setApiData(data))

    }, []);
    return (
        <div className={styles.textMainStyle}>
            <p className={styles.mainTitle}>
                {t.correlationTitle}
            </p>
            <div className = {`flex flex-col px-5 w-full h-auto items-center`}>
                <div className={`w-full box-content mb-2 text-black h-[60vh] md:h-[50vh] bg-neutral-50 rounded-md`}>
                    <BarChartGraph apiData={apiData.data} orientation={false}/>
                </div>
                <div
                    className={`flex flex-col w-fit p-2 rounded-md text-black bg-neutral-50 items-center space-y-3`}>
                    <ConsumptionGroupCheckbox precision={'Education level '}/>
                    <Button variant="default_blue" onClick={() => {GET_CONSUMPTION_DATA(new URLSearchParams({education:precisionConsumption, drug: 'meth'}), 'by_education').then(data => setApiData(data))}}>Submit</Button>
                </div>
            </div>
            <p>{t.observation}</p>

            <p>{t.nextSteps}</p>
        </div>
    );
}
export const SlideSummary = () => {
    const {getFunctionToCall, setChartType,setConsumptionType} = useStore();
    const {translations} = useStore();
    const t = translations.analysis.slideExplanationCorrelation;
    useEffect(() => {
        setChartType('correlation')
        setConsumptionType('drug_and_personality')
        getFunctionToCall()()
    }, []);
    return (
        <div className={styles.textMainStyle}>
            <p className = {styles.mainTitle}>{t.personalityDrugConsumptionTitle}</p>
            <p>{t.correlationIntro}</p>
            <div className={`flex flex-col px-5 w-full items-center`}>
                <div className={`w-full box-content mb-2 text-black bg-neutral-50 rounded-md`}>
                    <CorrelationChart/>
                </div>
            </div>
            <p>{t.matrixExplanation}</p>

            <p>{t.exampleCorrelation}</p>

            <p>{t.traitDrugUseCorrelation}</p>
            <p>{t.proceedingInstructions}</p>
        </div>
    );
};
export const SlideCorrelationIntroduction = () => {
    const [answer, setAnswer] = useState('')
    const [selectedValue, setSelectedValue] = useState('');
    const {translations} = useStore();
    const t = translations.analysis.slideAnalysisGoal;
    return (
        <div className={styles.textMainStyle}>
            <p className={styles.secondTitle}>{t.analysisGoalTitle}</p>
            <p>{t.predictiveQuestionsIntro}</p>

            <ul className={styles.listDisc}>
                {t.predictiveQuestions.map((item, index) => {
                    return <li key={index}>{item}</li>
                })}
            </ul>

            <p>{t.correlationFocus}</p>

            <p className={styles.secondTitle}>{t.highestCorrelationObservationTitle}</p>
            <div className="flex gap-x-5">
                <ul className="list-disc pl-5">
                    <li>('Cannabis', 'SS', 0.456)</li>
                    <li>('Cannabis', 'Oscore', 0.414)</li>
                    <li>('Legalh', 'SS', 0.405)</li>
                    <li>('Ecstasy', 'SS', 0.388)</li>
                    <li>('Mushrooms', 'SS', 0.378)</li>
                    <li>('LSD', 'Oscore', 0.369)</li>
                    <li>('Mushrooms', 'Oscore', 0.369)</li>
                    <li>('LSD', 'SS', 0.365)</li>
                    <li>('Coke', 'SS', 0.343)</li>
                    <li>('Amphet', 'SS', 0.331)</li>
                </ul>
                <ul className="list-disc pl-5">
                    <li>('Legalh', 'Oscore', 0.317)</li>
                    <li>('Cannabis', 'Impulsive', 0.310)</li>
                    <li>('Nicotine', 'SS', 0.305)</li>
                    <li>('Ecstasy', 'Oscore', 0.296)</li>
                    <li>('Amphet', 'Impulsive', 0.289)</li>
                    <li>('Benzos', 'Nscore', 0.272)</li>
                    <li>('Legalh', 'Impulsive', 0.267)</li>
                    <li>('Mushrooms', 'Impulsive', 0.263)</li>
                    <li>('Ecstasy', 'Impulsive', 0.260)</li>
                    <li>('Coke', 'Impulsive', 0.260)</li>
                </ul>
            </div>
            <ShowCodeAlert imageSource={codeCorrelation} textButtonTrigger={'Show me the code!'}/>
            <p>{t.correlationComputationDescription}</p>

            <p className={'text-base md:text-xl'}>{t.notableCorrelationFindings}</p>

            <p>{t.standOutFeature}</p>

            <p>{t.keyFeatureInsight}</p>

            <p>{t.featureCorrelationClarity}</p>

            <p className={'text-base md:text-xl underline underline-offset-2'}>{t.featureCorrelationDetermination}</p>
            <div className="flex gap-x-4">
            <div className="rounded-md w-fit bg-slate-50 text-black">
                <RadioGroup onValueChange={setSelectedValue}>
                    <div className={`flex flex-col gap-2 p-6`}>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value='bad_answer_1' id="r1"/>
                            <Label htmlFor="r1">Sum all the values of the same drug</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value='good_answer' id="r2"/>
                            <Label htmlFor="r2">Compute the mean for each personality trait</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value='bad_answer_2' id="r3"/>
                            <Label htmlFor="r3">Look at the highest value for each</Label>
                        </div>
                    </div>
                </RadioGroup>
                <div className="w-full flex justify-end mb-5 pr-5">
                    <Button onClick={() => setAnswer(selectedValue)} className="bg-blue-500" >{t.check}</Button>
                </div>
            </div>
            <div className="bg-slate-50 p-6 h-auto rounded-md text-black">
                {answer !== '' ? (answer === 'good_answer' ? <p>{t.rightAnswer}</p> : <p>{t.badAnswer}</p>) : <p>{t.select}</p> }
            </div>
            </div>
            
        </div>
    );
};
export const SlideCorrelationExplanation = () => {
    const [isOpen, setIsOpen] = useState(false);
    const {translations} = useStore();
    const t = translations.analysis.slideExplanationAnalysis;
    return (
        <div className={styles.textMainStyle}>
            <p>{t.correlationComputationMethod}</p>
            <div className="flex gap-x-5">
                <ul className="">
                    <li>SS --{">"} 0.25</li>
                    <li>Impulsive --{">"} 0.183</li>
                    <li>Oscore --{">"} 0.182</li>
                    <li>Nscore --{">"} 0.091</li>
                    <li>Ethnicity --{">"} 0.0727</li>
                    <li>Escore --{">"} -0.005</li>
                </ul>
                <ul className="">
                    <li>Ascore --{">"} -0.103</li>
                    <li>Education --{">"} -0.110</li>
                    <li>Cscore --{">"} -0.152</li>
                    <li>Gender --{">"} -0.158</li>
                    <li>Age --{">"} -0.192</li>
                    <li>Country --{">"} -0.250</li>
                </ul>
            </div>
            <ShowCodeAlert imageSource={codePython} textButtonTrigger={'Show me the code!'}/>

            <p>{t.meanCorrelationHighlight}</p>
            <Button onClick={() => setIsOpen(!isOpen)} variant="outline" className = {`text-black w-fit`}>?</Button>
            {
                isOpen == false ? '' :
                    <div className={`bg-neutral-50 mx-[10%] p-4 w-fit rounded-md text-black`}>
                    <p>{t.outputExplanation.intro}</p>
                    <p>{t.outputExplanation.detail}</p>
                    <p>{t.outputExplanation.repeatHighlight}</p>
                </div>
            }
            <p>{t.featureComparison}</p>
        </div>
    );
};
export const SlideEnding = () => {
    const {translations} = useStore();
    const t = translations.analysis.slideConclusion;
    return (
        <div className={styles.textMainStyle}>
            <p className={styles.mainTitle}>{t.dataVisualizationTitle}</p>
            <img src={correlationImg} className={`  lg:max-w-3xl mx-auto`}/>
            <p className = {styles.secondTitle}>{t.analysisConclusion}</p>
            <p>{t.explorationEncouragement}</p>
        </div>
    );
};