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
export function GraphDrawer({icon, chartType}, drug) {
    let [consumptionType, setConsumptionType] = useState('');
    let [apiParam, setApiParam] = useState({});

    const handleValueApiParam = (newValue) => {setApiParam(newValue);};
    const handleValueConsumptionType = (newValue) => {setConsumptionType(newValue);};
    function getComponentToRender(){
        switch (chartType){
            case 'consumption':
                return <BarChartDetail apiParam={handleValueApiParam} consumptionType={handleValueConsumptionType}/>
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
                        <DrawerTitle>Consumption of Nicotine </DrawerTitle>
                        <DrawerDescription>Add some precision to your chart </DrawerDescription>
                    </DrawerHeader>

                    <div className={`p-4 pb-0`}>
                        <div className={`mt-3 h-fit min-h-[100px]`}>
                            {getComponentToRender()}
                        </div>
                    </div>

                    <DrawerFooter>
                        <Button onClick={() => GET_CONSUMPTION_DATA(new URLSearchParams(apiParam), consumptionType)}>Submit</Button>
                        <DrawerClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DrawerClose>
                    </DrawerFooter>
                </div>
            </DrawerContent>
        </Drawer>
    )
}