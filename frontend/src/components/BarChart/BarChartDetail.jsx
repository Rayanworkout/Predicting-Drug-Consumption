import BarChartConsumptionType from "@/components/BarChart/BarChartConsumptionType.jsx";
import ConsumptionGroupCheckbox from "@/components/BarChart/ConsumptionGroupCheckbox.jsx";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group.jsx";
import { Label } from "@/components/ui/label.jsx";
import useStore from "@/store/store.js";
import { BarChartBig, BarChartHorizontalBig } from "lucide-react";
import { useState } from "react";

export function BarChartDetail() {
    const { consumptionOrientationChart, setConsumptionOrientationChart } = useStore();
    const [selectedConsumptionTypes, setSelectedConsumptionTypes] = useState([]);

    return (
        <div className={`z-0`}>
            <BarChartConsumptionType setSelectedConsumptionTypes={setSelectedConsumptionTypes} />
            <ConsumptionGroupCheckbox selectedConsumptionTypes={selectedConsumptionTypes} />
            <RadioGroup defaultValue={consumptionOrientationChart} onValueChange={setConsumptionOrientationChart}>
                <p>Orientation :</p>
                <div className={`flex flex-wrap gap-2`}>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value={true} id="r1" />
                        <Label htmlFor="r1"><BarChartHorizontalBig /></Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value={false} id="r2" />
                        <Label htmlFor="r2"><BarChartBig /></Label>
                    </div>
                </div>
            </RadioGroup>
        </div>
    );
};

export default BarChartDetail;