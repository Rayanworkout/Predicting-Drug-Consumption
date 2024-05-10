import { Input } from "@/components/ui/input"
import React, {useState} from "react";
import {CardContent} from "@/components/ui/card.jsx";
import useStore from "@/store/store.js";
export function SearchBar () {
    const { drugType, setDrugType, drugData, setDrugTypePrettier, chartType } = useStore();
    const t = useStore(state => state.translations);

    const [isFocused, setIsFocused] = useState(false);
    const handleFocus = () => {
        setIsFocused(true);
    };
    const handleBlur = () => {
        setTimeout(() => setIsFocused(false), 250);
    };
    const handleSelect = (value) => {
        setDrugType(value);
        setIsFocused(false);
    };
    const filteredDATA = drugData.filter(item => item.drug.toLowerCase().includes(drugType.toLowerCase()));

    return (
        <div className={`w-full md:w-[42%] relative z-20`}>
            <p className={`text-gray-400 pb-1`}>{t.dashboard.drugExplanationSearch}</p>
            <Input
                type="text"
                placeholder="Search drug name : alcohol, tabac... "
                value={drugType}
                disabled={chartType !== 'consumption' ? true : false}
                onFocus={handleFocus}
                onChange={(event) => setDrugType(event.target.value)}
                onBlur={handleBlur}
                className={`ring-offset-blue-500 `}
            />
            {isFocused && (
                <CardContent
                    className={`absolute mt-1 bg-white w-full max-h-56 rounded overflow-y-auto`}>
                    {filteredDATA.length > 0 ? (
                        filteredDATA.map((item, index) => (
                            <p key={index} onClick={() => {
                                handleSelect(item.value), setDrugTypePrettier(item.drug)
                            }}
                               className={`px-2 pt-2 ease-out duration-300 hover:bg-neutral-200 cursor-pointer`}>
                                {item.drug}
                            </p>
                        ))
                    ) : (
                        <p className="p-2 text-gray-500">
                            Data not found
                        </p>
                    )}
                </CardContent>
            )}
        </div>

    )
};

export default SearchBar;