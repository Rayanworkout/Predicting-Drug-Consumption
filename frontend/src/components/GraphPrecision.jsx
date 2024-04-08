import {RadioGroup,RadioGroupItem} from "@radix-ui/react-radio-group";

const GraphPrecision = () => {
    return (
        <RadioGroup defaultValue="comfortable">
            <div className="flex items-center space-x-2">
                <label>ABC</label>
                <RadioGroupItem value="default" id="r1" />
            </div>
            <div className="flex items-center space-x-2">
                <RadioGroupItem value="comfortable" id="r2" />
            </div>
            <div className="flex items-center space-x-2">
                <RadioGroupItem value="compact" id="r3" />
            </div>
        </RadioGroup>
    )
};

export default GraphPrecision;