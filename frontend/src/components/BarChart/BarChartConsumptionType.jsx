import { Label } from "@/components/ui/label.jsx";
import { CheckboxGroup, Checkbox } from "@/components/ui/checkbox-group.jsx"; // Import de CheckboxGroup
import useStore from "@/store/store.js";

export function BarChartConsumptionType() {
    const { consumptionType, setConsumptionType } = useStore();

    const handleCheckboxChange = (selectedCategories) => {
        // La fonction de rappel pour la sélection des catégories
        setConsumptionType(selectedCategories);
    };

    return (
        <CheckboxGroup defaultValue={[consumptionType]} onValueChange={handleCheckboxChange}>
            <p>{consumptionType == 'consumption' ? 'Consumption ' : 'Repartition '} by :</p>
            <div className={`flex flex-wrap gap-2`}>
                <div className="flex items-center space-x-2">
                    <Checkbox value="by_age" id="r1"/>
                    <Label htmlFor="r1">Age</Label>
                </div>
                <div className="flex items-center space-x-2">
                    <Checkbox value="by_gender" id="r2"/>
                    <Label htmlFor="r2">Gender</Label>
                </div>
                <div className="flex items-center space-x-2">
                    <Checkbox value="by_ethnicity" id="r3"/>
                    <Label htmlFor="r3">Ethnicity</Label>
                </div>
                <div className="flex items-center space-x-2">
                    <Checkbox value="by_education" id="r4"/>
                    <Label htmlFor="r4">Education</Label>
                </div>
                <div className="flex items-center space-x-2">
                    <Checkbox value="by_country" id="r5"/>
                    <Label htmlFor="r5">Country</Label>
                </div>
            </div>
        </CheckboxGroup>
    );
};

export default BarChartConsumptionType;
