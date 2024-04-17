import { Input } from "@/components/ui/input"
import {useEffect, useState} from "react";
import {CardContent} from "@/components/ui/card.jsx";
export function SearchBar ({handleDrugType}) {
    const [inputValue, setInputValue] = useState('alcohol');
    const [isFocused, setIsFocused] = useState(false);
    const data = ["alcohol", "amphet", "amyl", "benzos", "caff", "cannabis", "choc", "coke", "crack", "ecstasy", "heroin", "ketamine", "legalh", "lsd", "meth", "mushrooms", "nicotine", "semer", "vsa"];

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleFocus = () => {
        setIsFocused(true);
    };
    const handleBlur = () => {
        setTimeout(() => setIsFocused(false), 100);
    };
    useEffect(() => {
        handleDrugType(inputValue)
    }, [inputValue]);
    const handleSelect = (value) => {
        setInputValue(value);
        setIsFocused(false);
    };

    const filteredData = data.filter(item => item.toLowerCase().includes(inputValue.toLowerCase()));

    return (
        <div className = {`w-full md:w-[50%] relative z-50`}>
            <Input
                type="text"
                placeholder="Search drug name : alcohol, tabac... "
                value={inputValue}
                onFocus={handleFocus}
                onChange={handleInputChange}
                onBlur={handleBlur}
                className = {`text-white bg-neutral-700 hover:bg-neutral-500 placeholder:text-neutral-200 placeholder:italic placeholder:hover:text-white ease-out duration-100`}
            />
            {isFocused && (
                <CardContent
                    className = {`absolute  bg-white  w-full max-h-56 rounded overflow-y-auto`}>
                    {filteredData.length > 0 ? (
                        filteredData.map((item, index) => (
                            <p key={index} onClick={() => handleSelect(item)}
                               className = {`px-2 pt-2 ease-out duration-300 hover:bg-neutral-200 cursor-pointer`}>
                                {item}
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