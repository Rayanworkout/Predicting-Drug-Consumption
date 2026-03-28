import { Button } from "@/components/ui/button"
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import BarChartDetail from "@/components/BarChart/BarChartDetail.jsx";
import React from "react";
import useStore from "@/store/store.js";
import RepartitionChartDetail from "@/components/RepartitionChart/RepartitionChartDetail.jsx";
import CorrelationChartDetail from "@/components/CorrelationChart/CorrelationChartDetail.jsx";
import {FirstLetterUpperCase, ReplaceUnderscoreSpace} from "@/lib/utils.js";
export function GraphDrawer({icon, typeOfChart, triggerTitle}) {
    const { drugType, drugData, chartType, setChartType, getFunctionToCall} = useStore();
    function getComponentToRender(){
        switch (chartType){
            case 'consumption':
                return <BarChartDetail/>
            case 'repartition':
                return <RepartitionChartDetail/>
            case 'correlation':
                return <CorrelationChartDetail/>
        }
    }

    return (
        <Drawer>
            <DrawerTrigger asChild onClick={() => setChartType(typeOfChart)}>
                <Button className="btn-pdc">{icon} {triggerTitle}</Button>
            </DrawerTrigger>
            <DrawerContent>

                <div className="mx-auto w-full max-w-sm">
                    <DrawerHeader>
                        <DrawerTitle>{FirstLetterUpperCase(chartType)}
                            {chartType == 'consumption' ?
                                ` of ${FirstLetterUpperCase(drugType)}` : ''}
                        </DrawerTitle>
                    </DrawerHeader>
                    <div className={`p-4 pb-0`}>
                        <div className={`mt-3 h-fit min-h-[100px]`}>
                            {getComponentToRender()}
                        </div>
                    </div>

                    <DrawerFooter>
                        <DrawerClose asChild>
                            { chartType === 'repartition' ?
                                <Button className ="btn-pdc" onClick={() => getFunctionToCall()()}>OK</Button> :
                                (drugData.some(item => (item.value == drugType)) ?
                                    <Button className ="btn-pdc" onClick={() => getFunctionToCall()()}>OK</Button> :
                                    <Button disabled={true} className ="btn-pdc">You must select a valid drug</Button>)
                            }
                        </DrawerClose>

                        <DrawerClose asChild>
                            <Button className ="btn-pdc">Cancel</Button>
                        </DrawerClose>
                    </DrawerFooter>
                </div>
            </DrawerContent>
        </Drawer>
    )
}