import React from "react";
import ReactApexChart from "react-apexcharts";

export function BarChartGraph({ apiData, orientation, legend = true, toolbar = true }) {

    const keyData = Object.keys(apiData);
    const valueData = Object.values(apiData);

    const options = {
        legend: {
            show: legend
        },
        chart: {
            type: 'bar',
            toolbar: {
                show: toolbar
            }
        },
        xaxis: {
            categories: keyData,
        },
        plotOptions: {
            bar: {
                distributed: true,
                borderRadius: 4,
                horizontal: orientation,
            },
            dataLabels: {
                enabled: true
            },
        }
    };

    const series = [{
        name: 'consumption',
        data: valueData
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
