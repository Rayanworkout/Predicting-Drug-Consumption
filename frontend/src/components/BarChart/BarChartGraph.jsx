import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import useStore from "@/store/store.js";
import { ReplaceUnderscoreSpace } from "@/tool/tool.js";

export function BarChartGraph({ apiData, orientation, dashboard = false }) {
    const { selectedCategories, selectedValues, screenSize } = useStore();

    const [valueData, setValueData] = useState({});

    // Stream Api Object for round (2 digit after coma)
    useEffect(() => {
        const newValueData = {};
        Object.entries(apiData).forEach(([key, value]) => {
            newValueData[key] = Number(value).toFixed(4);
        });
        setValueData(newValueData);
    }, [apiData]);

    const totalRespondents = Object.values(valueData).reduce((acc, curr) => acc + Number(curr), 0);

    // Create a string for the title based on selected categories and values
    const distributionText = selectedCategories.map(category => {
        const precision = selectedValues[category] ? selectedValues[category] : '';
        return `${ReplaceUnderscoreSpace(category)}: ${precision}`;
    }).join(' & ');

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
            text: `Drug consumption of ${totalRespondents} respondents distributed ${distributionText}`,
            align: 'center',
            style: {
                fontSize: screenSize < 880 ? '10px' : '18px',
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
                width={dashboard ? '350' : '100%'}
            />
    );
}

export default BarChartGraph;
