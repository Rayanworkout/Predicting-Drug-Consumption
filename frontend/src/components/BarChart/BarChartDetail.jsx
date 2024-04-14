import React, { useState } from "react";
import BarChartConsumptionType from "@/components/BarChart/BarChartConsumptionType.jsx";
import ConsumptionGroupCheckbox from "@/components/BarChart/ConsumptionGroupCheckbox.jsx";
export function BarChartDetail () {
    let [childValue, setChildValue] = useState('by_age');

    const handleValueChangeBarChart = (newValue) => {
        setChildValue(newValue);
    };

    return (
        <div className = {``}>
            <BarChartConsumptionType handleValueChange={handleValueChangeBarChart}/>
            <ConsumptionGroupCheckbox consumptionBy={childValue}/>
        </div>
    );
};

export default BarChartDetail;
