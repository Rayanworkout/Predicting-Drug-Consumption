
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
import BarChartDetails from "@/components/BarChartDetails.jsx";
import {GET_DATA_BY_DRUG_ORDER_BY_AGE} from "@/api_/api_.js"
import {useState} from "react";
export function DrawerDemo({icon}, drug) {

    const [childValue, setChildValue] = useState('by_age');
    const age_range_param = {age_range : 0, drug : ""}
    const handleValueChange = (newValue) => {
        setChildValue(newValue);
        console.log(newValue)
    };

    return (
        <Drawer>
            <DrawerTrigger asChild>
                <Button variant="outline">{icon}</Button>
            </DrawerTrigger>
            <DrawerContent>
                <div className="mx-auto w-full max-w-sm">
                    <DrawerHeader>
                        <DrawerTitle>Consumption of Nicotine </DrawerTitle>
                        <DrawerDescription>Set your daily activity goal.</DrawerDescription>
                    </DrawerHeader>
                    <div className = {`p-4 pb-0`}>

                        <div className = {`mt-3 h-fit min-h-[120px]`} >
                            <BarChartDetails onValueChange={handleValueChange}/>
                        </div>
                    </div>
                    <DrawerFooter>
                        <Button onClick={GET_DATA_BY_DRUG_ORDER_BY_AGE(18-24,"meth")}>Submit</Button>
                        <DrawerClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DrawerClose>
                    </DrawerFooter>
                </div>
            </DrawerContent>
        </Drawer>
    )
}