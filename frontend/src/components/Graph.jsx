import React from 'react';
import BarChartGraph from "@/components/BarChart/BarChartGraph.jsx";
import useStore from "@/store/store.js";
import RepartitionGraph from "@/components/RepartitionChart/RepartitionGraph.jsx";
import CorrelationChart from "@/components/CorrelationChart/CorrelationChart.jsx";
import CorrelationChartDetail from "@/components/CorrelationChart/CorrelationChartDetail.jsx";

export function Graph () {
    const { chartType, consumptionType, apiData, apiRepartitionData, apiCorrelationData} = useStore();
    function getChartToRender(){
        switch (chartType){
            case 'consumption-y':
                return <BarChartGraph apiData={apiData.data} orientation={false}/>
            case 'consumption-x':
                return <BarChartGraph apiData={apiData.data} orientation={true}/>
            case 'repartition':
                return <RepartitionGraph apiData={apiRepartitionData}/>
            case 'correlation':
                switch (consumptionType){
                    case 'drug_and_personality' :
                        return <CorrelationChart/>
                    case 'feature_to_drug_mean' :
                        return <BarChartGraph apiData={apiCorrelationData} orientation={true}/>
                };
            case 'regression':
                return ''

        }
    }
    return (
        <div className={`w-full bg-neutral-100 h-full md:min-h-[400px] p-4 m-0 rounded z-0`}>
            {getChartToRender()}
        </div>
    );
};

export default Graph;