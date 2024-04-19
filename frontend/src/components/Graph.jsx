import React from 'react';
import BarChartGraph from "@/components/BarChart/BarChartGraph.jsx";
import useStore from "@/store/store.js";
import RepartitionGraph from "@/components/RepartitionChart/RepartitionGraph.jsx";

export function Graph () {
    const { chartType, apiData, apiRepartitionData} = useStore();
    function getChartToRender(){
        switch (chartType){
            case 'consumption-y':
                return <BarChartGraph apiData={apiData} orientation={false}/>
            case 'consumption-x':
                return <BarChartGraph apiData={apiData} orientation={true}/>
            case 'repartition':
                return <RepartitionGraph apiData={apiRepartitionData}/>
        }
    }
    return (
        <div className={`w-full bg-neutral-100 h-full md:min-h-[400px] p-4 m-0 rounded z-0`}>
            {getChartToRender()}
        </div>
    );
};

export default Graph;