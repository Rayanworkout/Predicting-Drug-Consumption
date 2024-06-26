import React, {useEffect, useState} from "react";
import ReactApexChart from "react-apexcharts";
import useStore from "@/store/store.js";
import {ReplaceUnderscoreSpace} from "@/tool/tool.js";

export function BarChartGraph({ apiData, orientation, dashboard = false }) {
    const { consumptionType, precisionConsumption, screenSize} = useStore();

    const [valueData, setValueData] = useState({});

    //Stream Api Object for round (2 digit after coma)
    useEffect(() => {
        const newValueData = {};
        Object.entries(Object.values(apiData)).forEach(([key, value]) => {
            newValueData[key] = Number(value).toFixed(4);
        });
        setValueData(newValueData);
    }, [apiData]);

    const options = {
        legend: {
            show: !dashboard
        },
        chart: {
            type: 'bar',
            toolbar: {
                show: !dashboard
            },
        },
        title: {
            text: `Drug consumption of ${Object.values(valueData).reduce((acc, curr) => acc + Number(curr), 0)} 
            respondents distributed ${ReplaceUnderscoreSpace(consumptionType)} ${precisionConsumption ? precisionConsumption : ''}` ,
            align: 'center',
            style: {
                fontSize: screenSize < 880 ? '10px' : '18px' ,
                color: '#263238'
            },
        },
        dataLabels: {
            enabled: true,
            style: {
                colors: ['#262626']
            },
        },
        xaxis: {
            categories: Object.keys(apiData),
        },
        plotOptions: {
            bar: {
                distributed: true,
                borderRadius: 4,
                horizontal: orientation,
            },
        }
    };

    const series = [{
        name: 'respondents',
        data: Object.values(valueData)
    }];

    return (
            <ReactApexChart
                options={options}
                series={series}
                type="bar"
                height={'100%'}
                width={dashboard == true ? '350' : '100%'}
            />

    );
};

export default BarChartGraph;
