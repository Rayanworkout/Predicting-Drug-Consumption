import { Button } from "@/components/ui/button"
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import BarChartDetail from "@/components/BarChart/BarChartDetail.jsx";
import React, {useState} from "react";
import {GET_CONSUMPTION_DATA} from "@/api_/api_.js";
export function GraphDrawer({icon, chartType, drug, handleApiData}) {
    let [consumptionType, setConsumptionType] = useState('');
    let [apiParam, setApiParam] = useState({});
    const handleValueApiParam = (newValue) => {setApiParam(newValue);};
    const handleValueConsumptionType = (newValue) => {setConsumptionType(newValue)};
    function getFunctionToCall() {
        switch (chartType) {
            case 'consumption':
                return () => {
                    GET_CONSUMPTION_DATA(new URLSearchParams(apiParam), consumptionType)
                        .then(data => handleApiData(data))
                        .catch(error => {
                            console.error('Failed to fetch data:', error);
                        });
                };
            case 'other':
                return () => console.log("'other' type case");
            default:
                return () => console.log("Default case");
        }
    };
    function getComponentToRender(){
        switch (chartType){
            case 'consumption':
                return <BarChartDetail apiParam={handleValueApiParam} consumptionType={handleValueConsumptionType} drug={drug}/>
            case 'other':
                return ""
        }
    }

    return (
        <Drawer>
            <DrawerTrigger asChild>
                <Button variant="outline">{icon}</Button>
            </DrawerTrigger>
            <DrawerContent>

                <div className="mx-auto w-full max-w-sm">
                    <DrawerHeader>
                        <DrawerTitle>Consumption of {drug}</DrawerTitle>
                        <DrawerDescription>Add some precision to your chart </DrawerDescription>
                    </DrawerHeader>
                    <div className={`p-4 pb-0`}>
                        <div className={`mt-3 h-fit min-h-[100px]`}>
                            {getComponentToRender()}
                        </div>
                    </div>

                    <DrawerFooter>
                        <DrawerClose asChild>
                        <Button onClick={() => getFunctionToCall()()}>Submit</Button>
                        </DrawerClose>

                        <DrawerClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DrawerClose>
                    </DrawerFooter>
                </div>
            </DrawerContent>
        </Drawer>
    )
}