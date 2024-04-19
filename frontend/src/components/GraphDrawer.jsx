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
import React from "react";
import useStore from "@/store/store.js";
import RepartitionChartDetail from "@/components/RepartitionChart/RepartitionChartDetail.jsx";
export function GraphDrawer({icon, typeOfChart}) {
    const { drugType, consumptionType} = useStore();
    const { chartType, setChartType } = useStore();
    const { getFunctionToCall } = useStore();
    function getComponentToRender(){
        switch (chartType){
            case 'consumption-x':
            case 'consumption-y':
                return <BarChartDetail/>
            case 'repartition':
                return <RepartitionChartDetail/>
            case 'other':
                return ""
        }
    }

    return (
        <Drawer>
            <DrawerTrigger asChild onClick={() => setChartType(typeOfChart)}>
                <Button variant="outline">{icon}</Button>
            </DrawerTrigger>
            <DrawerContent>

                <div className="mx-auto w-full max-w-sm">
                    <DrawerHeader>
                        <DrawerTitle>{chartType.charAt(0).toUpperCase() + chartType.slice(1)}
                            { chartType == 'consumption-x' || chartType == 'consumption-y' ? ` of ${drugType}` : ''} {consumptionType.replace('_', ' ')}</DrawerTitle>
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