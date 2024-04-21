import { Label } from "@/components/ui/label.jsx";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group.jsx";
import useStore from "@/store/store.js";

export function BarChartConsumptionType() {
    const {consumptionType,setConsumptionType} = useStore()

    return (
        <RadioGroup defaultValue={consumptionType} onValueChange={setConsumptionType}>
            <p>Consumption by :</p>
            <div className={`flex flex-wrap gap-2`}>
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value="by_age" id="r1"/>
                    <Label htmlFor="r1">Age</Label>
                </div>
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value="by_gender" id="r2"/>
                    <Label htmlFor="r2">Gender</Label>
                </div>
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value="by_ethnicity" id="r3"/>
                    <Label htmlFor="r3">Ethnicity</Label>
                </div>
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value="by_education" id="r4"/>
                    <Label htmlFor="r4">Education</Label>
                </div>
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value="by_country" id="r5"/>
                    <Label htmlFor="r5">Country</Label>
                </div>
            </div>
        </RadioGroup>
    );
};

export default BarChartConsumptionType;
