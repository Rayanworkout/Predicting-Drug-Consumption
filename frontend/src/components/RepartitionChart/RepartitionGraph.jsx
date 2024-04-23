import React from "react";
import ReactApexChart from "react-apexcharts";
import useStore from "@/store/store.js";

const RepartitionGraph = ({apiData}) => {
    const { consumptionType} = useStore();

    const getProp = prop => obj => obj[prop];
    const getConsumption = getProp(consumptionType.substring(3));
    const getCount = getProp('count');

    const consumptionValue = apiData && apiData.data ? apiData.data.map(item => getConsumption(item) || "") : [];
    const countValue = apiData && apiData.data ? apiData.data.map(item => getCount(item) || 0) : [];

    const options = {
        chart: {
            type: 'bar',
            toolbar: {
                show: true
            }
        },
        tooltip:{
            theme:'light',
            style: {
                fontSize: '12px',
                fontFamily: 'Helvetica, Arial, sans-serif',
                colors: ['#FFF']
            },
        },
        dataLabels: {
            enabled: true,
            style: {
                colors: ['#262626']
            },
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