import { Label } from "@/components/ui/label.jsx";
import { CheckboxGroup, Checkbox } from "@/components/ui/checkbox-group.jsx";
import useStore from "@/store/store.js";

export function BarChartConsumptionType({ setSelectedConsumptionTypes }) {
    const { setSelectedCategories } = useStore();

    const handleCheckboxChange = (selectedCategories) => {
        // Update the selected consumption types state
        setSelectedConsumptionTypes(selectedCategories);
        setSelectedCategories(selectedCategories);
        // setSelectedValues(selectedValues);
    };

    return (
        <CheckboxGroup defaultValue={[]} onValueChange={handleCheckboxChange}>
            <p>Consumption by:</p>
            <div className={`flex flex-wrap gap-2`}>
                <div className="flex items-center space-x-2">
                    <Checkbox value="by_age" id="r1" />
                    <Label htmlFor="r1">Age</Label>
                </div>
                <div className="flex items-center space-x-2">
                    <Checkbox value="by_gender" id="r2" />
                    <Label htmlFor="r2">Gender</Label>
                </div>
                <div className="flex items-center space-x-2">
                    <Checkbox value="by_ethnicity" id="r3" />
                    <Label htmlFor="r3">Ethnicity</Label>
                </div>
                <div className="flex items-center space-x-2">
                    <Checkbox value="by_education" id="r4" />
                    <Label htmlFor="r4">Education</Label>
                </div>
                <div className="flex items-center space-x-2">
                    <Checkbox value="by_country" id="r5" />
                    <Label htmlFor="r5">Country</Label>
                </div>
            </div>
        </CheckboxGroup>
    );
};

export default BarChartConsumptionType;
