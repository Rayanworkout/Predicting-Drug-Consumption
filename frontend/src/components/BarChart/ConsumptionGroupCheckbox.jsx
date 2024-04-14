import {Checkbox} from "@/components/ui/checkbox.jsx";
import {Label} from "@/components/ui/label.jsx";
import {useEffect, useState} from "react";
import {Button} from "@/components/ui/button.jsx";

export function ConsumptionGroupCheckbox({ consumptionBy }) {
    const initialValues = {
        by_ageValues: ["18-24", "25-34", "35-44", "45-54", "55-64", "65"],
        by_genderValues: ["male", "female"],
        by_ethnicityValues: ["asian", "black", "mixed-black_asian", "mixed-white_asian", "mixed-white_black", "other", "white"],
        by_educationValues: ["before_16", "16", "17", "18", "no_certificate", "certificate", "university_degree", "masters_degree", "doctorate_degree"],
        by_countryValues: ["australia", "canada", "new_zealand", "other", "republic_of_ireland", "uk", "usa"],
    };
    const ageValues=  ["18-24", "25-34", "35-44", "45-54", "55-64", "65"];



    const GroupCheckBoxComponent = () => (
        <div>
            {ageValues.map((item, index) => (
                <div key={index}>
                    <Checkbox
                        checked={checkedState[item]}
                        onChange={item => console.log(item)}
                        id={`term${index}`}
                        className="bg-white text-white"
                    />
                    <Label htmlFor={`term${index}`}>{item}</Label>
                </div>
            ))}
        </div>
    );

    return (
        <div className="mt-3 h-fit min-h-[100px]">
            {consumptionBy}
            {GroupCheckBoxComponent()}
            <Button onClick={() => console.log(checkedState)}>LOG</Button>
        </div>
    );
}

export default ConsumptionGroupCheckbox;
