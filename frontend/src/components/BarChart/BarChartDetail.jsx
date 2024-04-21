import BarChartConsumptionType from "@/components/BarChart/BarChartConsumptionType.jsx";
import ConsumptionGroupCheckbox from "@/components/BarChart/ConsumptionGroupCheckbox.jsx";
export function BarChartDetail () {

    return (
        <div className = {`z-0`}>
            <BarChartConsumptionType />
            <ConsumptionGroupCheckbox />
        </div>
    );
};

export default BarChartDetail;
