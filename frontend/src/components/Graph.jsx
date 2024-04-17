import React from 'react';
import BarChartGraph from "@/components/BarChart/BarChartGraph.jsx";
import useStore from "@/store/store.js";

export function Graph ({keyData, valueData}) {
    const { chartType} = useStore();
    function getChartToRender(){
        switch (chartType){
            case 'consumption-y':
                return <BarChartGraph keyData={keyData} valueData={valueData} orientation={false}/>
            case 'consumption-x':
                return <BarChartGraph keyData={keyData} valueData={valueData} orientation={true}/>
            case 'repartition':
                return 'repartition'


        }
    }
    return (
        <div className={`w-full bg-neutral-100 h-full md:min-h-[400px] p-0 m-0 rounded z-0`}>
            {getChartToRender()}
        </div>
    );
};

export default Graph;