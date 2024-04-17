import {Label} from "@/components/ui/label.jsx";
import {useEffect, useState} from "react";
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group.jsx";
import {
    age_range_param,
    gender_param,
    ethnicity_param,
    education_param,
    country_param
} from "@/components/BarChart/consumption.js"
import {Button} from "@/components/ui/button.jsx";

export function ConsumptionGroupCheckbox({ consumptionBy, drug, handleValueApiParam }) {
    const paramsMapping = {
        by_age: age_range_param,
        by_gender: gender_param,
        by_ethnicity: ethnicity_param,
        by_education: education_param,
        by_country: country_param
    };
    const consumptionValues = {
        by_age: ["18-24", "25-34", "35-44", "45-54", "55-64", "65"],
        by_gender: ["male", "female"],
        by_ethnicity: ["asian", "black", "mixed-black_asian", "mixed-white_asian", "mixed-white_black", "other", "white"],
        by_education: ["before_16", "16", "17", "18", "no_certificate", "certificate", "university_degree", "masters_degree", "doctorate_degree"],
        by_country: ["australia", "canada", "new_zealand", "other", "republic_of_ireland", "uk", "usa"],
    };

    const getComponentToRender= (consumption, values) => {
        return values[`${consumption}`] || [];
    }

    const [radioValue, setRadioValue] = useState(() => {return getComponentToRender(consumptionBy, consumptionValues)[0] || '';});
    const [consumptionObject, setConsumptionObject] = useState({});
    const handleRadioValueChange = (newValue) => {setRadioValue(newValue);}

    useEffect(() => {
        handleValueApiParam(consumptionObject)
    }, [consumptionObject]);
    //Object for API
    useEffect(() => {
        const updatedParam = { ...paramsMapping[consumptionBy], drug:drug}
        switch (consumptionBy){
            case 'by_age':
                updatedParam.age_range = radioValue;
                break;
            case 'by_gender':
                updatedParam.gender = radioValue;
                break;
            case 'by_ethnicity':
                updatedParam.ethnicity = radioValue;
                break;
            case 'by_education':
                updatedParam.education = radioValue;
                break;
            case 'by_country':
                updatedParam.country = radioValue;
                break;
        }
        setConsumptionObject(updatedParam);
    }, [radioValue, consumptionBy, drug]);
    useEffect(() => {
        setRadioValue(getComponentToRender(consumptionBy, consumptionValues)[0]);
    },[consumptionBy])


    const GroupRadioButtonComponent = () => (
        <div>
            {getComponentToRender(consumptionBy, consumptionValues).map((item, index) => (
                <div key={index} className = {`flex flex-row items-center space-x-2`}>
                    <RadioGroupItem value={item} id={`r${index}`}/>
                    <Label htmlFor={`r${index}`}>{item}</Label>
                </div>
            ))}
        </div>
    );

    return (
        <div className="mt-3 h-fit min-h-[100px]">
            <RadioGroup defaultValue={radioValue} onValueChange={handleRadioValueChange}>
                <p>Precision :</p>
                <div className = {`flex flex-wrap gap-2`}>
                    {GroupRadioButtonComponent()}
                </div>
            </RadioGroup>
        </div>
    );
}

export default ConsumptionGroupCheckbox;
