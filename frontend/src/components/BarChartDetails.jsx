import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

/**
 * Different RadioButton for selecting the "order" for the bar chart
 * @param onValueChange
 * @returns {JSX.Element}
 * @constructor
 */
export function BarChartDetails({onValueChange}) {
    const update = (value) => {
        onValueChange(value)
    }

    return (
        <RadioGroup defaultValue="by_age" onValueChange={value => update(value)}>
            <p>Consumption by :</p>
            <div className = {`flex flex-wrap gap-2`}>
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
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value="by_population" id="r6"/>
                    <Label htmlFor="r6">Population</Label>
                </div>
            </div>
        </RadioGroup>
    )
};

export default BarChartDetails;