import React, {useEffect, useState} from "react";
import ReactApexChart from "react-apexcharts";

export function BarChartGraph({ apiData, orientation, legend = true, toolbar = true }) {

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
            show: legend
        },
        chart: {
            type: 'bar',
            toolbar: {
                show: toolbar
            },
        },
        dataLabels: {
            enabled: true,
            style: {
                colors: ['#262626']
            },
        },
        xaxis: {
            categories: Object.keys(valueData),
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
        name: 'consumption',
        data: Object.values(valueData)
    }];

    return (

        <ReactApexChart
            options={options}
            series={series}
            type="bar"
            height={'100%'}
        />
    );
};

export default BarChartGraph;
