import {Label} from "@/components/ui/label.jsx";
import {useEffect, useState} from "react";
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group.jsx";
import {age_range_param, gender_param, ethnicity_param, education_param, country_param
} from "@/components/BarChart/consumption.js"
import useStore from "@/store/store.js";

export function ConsumptionGroupCheckbox({precision = 'Value '}) {
    const { drugType, consumptionType, setApiParam, precisionConsumption, setPrecisionConsumption} = useStore();

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

    const [radioValue, setRadioValue] = useState(() => {return getComponentToRender(consumptionType, consumptionValues)[0] || '';});
    const handleRadioValueChange = (newValue) => {setRadioValue(newValue);}

    //Object for API
    useEffect(() => {
        const updatedParam = { ...paramsMapping[consumptionType], drug:drugType}
        setPrecisionConsumption(radioValue)
        switch (consumptionType){
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
        setApiParam(updatedParam)
    }, [radioValue, consumptionType, drugType]);
    useEffect(() => {
        setRadioValue(getComponentToRender(consumptionType, consumptionValues)[0]);
    },[consumptionType])


    const GroupRadioButtonComponent = () => (
        <>
            {getComponentToRender(consumptionType, consumptionValues).map((item, index) => (
                <div key={index} className={`box-content flex basis-1/7 space-y-2 items-center`}>
                    <RadioGroupItem className = {`mr-2`} value={item} id={`r${index}`}/>
                    <Label className = {`pb-2 mr-2`} htmlFor={`r${index}`}>{item}</Label>
                </div>
            ))}
        </>
    );

    return (
        <div className="mt-3">
            <RadioGroup defaultValue={radioValue} onValueChange={handleRadioValueChange}>
                <p>{precision} :</p>
                <div className = {`flex flex-wrap mb-4`}>
                    {GroupRadioButtonComponent()}
                </div>
            </RadioGroup>
        </div>
    );
}

export default ConsumptionGroupCheckbox;
