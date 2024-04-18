import React from "react";
import ReactApexChart from "react-apexcharts";

export function BarChartGraph({ apiData, orientation }) {

    const keyData = Object.keys(apiData.data);
    const valueData = Object.values(apiData.data);

    const options = {
        chart: {
            type: 'bar',
            toolbar: {
                show: true
            }
        },
        xaxis: {
            categories: keyData,
        },
        plotOptions: {
            bar: {
                borderRadius: 4,
                horizontal: orientation,
            }
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
