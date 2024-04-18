import React from "react";
import ReactApexChart from "react-apexcharts";
import useStore from "@/store/store.js";

const RepartitionGraph = ({apiData}) => {
    const { consumptionType} = useStore();

    const getProp = prop => obj => obj[prop];
    const getConsumption = getProp(consumptionType.substring(3));
    const getCount = getProp('count');

    const consumptionValue = apiData && apiData.data ? apiData.data.map(getConsumption) : [];
    const countValue = apiData && apiData.data ? apiData.data.map(getCount) : [];

    const options = {
        chart: {
            type: 'bar',
            toolbar: {
                show: true
            }
        },
        xaxis: {
            categories: consumptionValue,

        },
        plotOptions: {
            bar: {
                borderRadius: 4,
                horizontal: false,
            }
        }
    };

    const series = [{
        name: 'consumption',
        data: countValue
    }];

    return (
        apiData.length = 0 || apiData.data || apiData ? (
            <ReactApexChart
                options={options}
                series={series}
                type="bar"
                height="100%"
            />
        ) : (
            <div>Data Loading...</div>
        )
    );
};

export default RepartitionGraph;