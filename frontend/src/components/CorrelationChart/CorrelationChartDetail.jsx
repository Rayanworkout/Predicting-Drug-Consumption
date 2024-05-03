import useStore from "@/store/store.js";
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group.jsx";
import {Label} from "@/components/ui/label.jsx";

const CorrelationChartDetail = () => {
    const {consumptionType,setConsumptionType} = useStore()

    return (
        <RadioGroup defaultValue={consumptionType} onValueChange={setConsumptionType}>
            <div className={`flex flex-wrap gap-2`}>
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value="drug_and_personality" id="r1"/>
                    <Label htmlFor="r1">Drug & personality</Label>
                </div>
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value="feature_to_drug_mean" id="r2"/>
                    <Label htmlFor="r2">Drug meaning</Label>
                </div>
            </div>
        </RadioGroup>
    );
};

export default CorrelationChartDetail;