import React, {useEffect, useState} from "react";
import BarChartConsumptionType from "@/components/BarChart/BarChartConsumptionType.jsx";
import ConsumptionGroupCheckbox from "@/components/BarChart/ConsumptionGroupCheckbox.jsx";
export function BarChartDetail ({drug, apiParam, consumptionType}) {
    let [barChartTypeValue, setBarChartTypeValue] = useState('by_age');
    const handleValueChangeBarChart = (newValue) => {
        setBarChartTypeValue(newValue);
    };
    useEffect(() => {
        consumptionType(barChartTypeValue)
    }, [barChartTypeValue, consumptionType]);
    return (
        <div className = {`z-0`}>
            <BarChartConsumptionType handleValueChange={handleValueChangeBarChart}/>
            <ConsumptionGroupCheckbox consumptionBy={barChartTypeValue} drug={drug}
                                      handleValueApiParam={apiParam}/>
        </div>
    );
};

export default BarChartDetail;
