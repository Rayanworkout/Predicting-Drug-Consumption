import { Input } from "@/components/ui/input.jsx"
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
            <Input
                type="text"
                placeholder="Search drug name : alcohol, tabac... "
                value={drugType}
                disabled={chartType !== 'consumption' ? true : false}
                onFocus={handleFocus}
                onChange={(event) => setDrugType(event.target.value)}
                onBlur={handleBlur}
                className=""
            />
            {isFocused && (
                <CardContent
                    className={`absolute mt-1 bg-pdc-surface/90 backdrop-blur-xl border border-pdc-border w-full max-h-56 rounded-xl overflow-y-auto z-50 p-2 shadow-2xl custom-scrollbar`}>
                    {filteredDATA.length > 0 ? (
                        filteredDATA.map((item, index) => (
                            <p key={index} onClick={() => {
                                handleSelect(item.value), setDrugTypePrettier(item.drug)
                            }}
                               className={`px-3 py-2 rounded-lg ease-out duration-300 hover:bg-white/5 hover:text-pdc-accent cursor-pointer text-sm`}>
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