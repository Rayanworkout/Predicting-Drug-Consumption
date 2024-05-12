import { Label } from "@/components/ui/label.jsx";
import { useEffect, useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group.jsx";
import { age_range_param, gender_param, ethnicity_param, education_param, country_param } from "@/components/BarChart/consumption.js";
import useStore from "@/store/store.js";

export function ConsumptionGroupCheckbox({ selectedConsumptionTypes }) {
    const { drugType, setApiParam, precisionConsumption, setPrecisionConsumption } = useStore();

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

    const getConsumptionValues = (type) => {
        return consumptionValues[type] || [];
    };

    const [radioValues, setRadioValues] = useState({});

    useEffect(() => {
        // Initialize radio values for each selected consumption type
        const initialRadioValues = {};
        selectedConsumptionTypes.forEach(type => {
            initialRadioValues[type] = getConsumptionValues(type)[0] || '';
        });
        setRadioValues(initialRadioValues);
    }, [selectedConsumptionTypes]);

    const handleRadioValueChange = (type, newValue) => {
        setRadioValues(prevState => ({
            ...prevState,
            [type]: newValue
        }));
    };
    // Update API parameters
    useEffect(() => {
        const updatedParams = {};
    
        selectedConsumptionTypes.forEach(type => {
            const radioValueForType = radioValues[type];
            if (radioValueForType) {
                switch (type) {
                    case 'by_age':
                        updatedParams.age_range = radioValueForType;
                        break;
                    case 'by_gender':
                        updatedParams.gender = radioValueForType;
                        break;
                    case 'by_ethnicity':
                        updatedParams.ethnicity = radioValueForType;
                        break;
                    case 'by_education':
                        updatedParams.education = radioValueForType;
                        break;
                    case 'by_country':
                        updatedParams.country = radioValueForType;
                        break;
                    default:
                        break;
                }
            }
        });
        updatedParams.drug = drugType;
    
        // Set the API parameters and precision consumption
        setApiParam(updatedParams);
        setPrecisionConsumption(radioValues);
    }, [radioValues, selectedConsumptionTypes, drugType]);

    const GroupRadioButtonComponent = (type) => (
        <>
            {getConsumptionValues(type).map((item, index) => (
                <div key={index} className={`box-content flex basis-1/7 space-y-2 items-center`}>
                    <RadioGroupItem className={`mr-2`} value={item} id={`${type}-r${index}`} />
                    <Label className={`pb-2 mr-2`} htmlFor={`${type}-r${index}`}>{item}</Label>
                </div>
            ))}
        </>
    );

    return (
        <div className="mt-3">
            {selectedConsumptionTypes.map((type, index) => (
                <div key={index}>
                    <RadioGroup defaultValue={radioValues[type]} onValueChange={(newValue) => handleRadioValueChange(type, newValue)}>
                        <p>{type} Precision :</p>
                        <div className={`flex flex-wrap mb-4`}>
                            {GroupRadioButtonComponent(type)}
                        </div>
                    </RadioGroup>
                </div>
            ))}
        </div>
    );
}

export default ConsumptionGroupCheckbox;