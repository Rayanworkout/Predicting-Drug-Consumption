import ReactApexChart from "react-apexcharts";
import {useEffect, useState} from "react";
import useStore from "@/store/store.js";
const CorrelationChart = () => {

    const {apiCorrelationData} = useStore();
    const [series, setSeries] = useState([{ name: '', data: [] }]);

    useEffect(() => {
            const newSeries = Object.entries(apiCorrelationData).map(([key, values]) => {
                return {
                    name: key,
                    data: Object.entries(values).map(([drug, value]) => ({
                        x: drug,
                        y: Number(value).toFixed(4)
                    }))
                };
            });
            setSeries(newSeries);

    }, [apiCorrelationData]);

    const options = {
        chart: {
            height: 200,
            type: 'heatmap',
        },
        plotOptions: {
            heatmap: {
                shadeIntensity: 0.5,
                radius: 0,
                useFillColorAsStroke: true,
                colorScale: {
                    ranges: [
                        {
                            from: 0.32665967531898334,
                            to: 0.45613655450406515,
                            name: 'very high',
                            color: '#C0392B'
                        },
                        {
                            from: 0.2797550510742291,
                            to: 0.32665967531898334,
                            name: 'high',
                            color: '#E74C3C'
                        },
                        {
                            from: 0.23285042682947485,
                            to: 0.2797550510742291,
                            name: 'medium high',
                            color: '#F1948A'
                        },
                        {
                            from: 0.1859458025847206,
                            to: 0.23285042682947485,
                            name: 'neutral high',
                            color: '#FADBD8'
                        },
                        {
                            from: 0.13904117833996635,
                            to: 0.1859458025847206,
                            name: 'neutral low',
                            color: '#D6EAF8'
                        },
                        {
                            from: -0.0921365540952121,
                            to: 0.13904117833996635,
                            name: 'medium low',
                            color: '#5DADE2'
                        },
                        {
                            from: -0.04523192985045784,
                            to: 0.0921365540952121,
                            name: 'low',
                            color: '#2874A6'
                        },
                        {
                            from: -0.0016726948021501824,
                            to: -0.04523192985045784,
                            name: 'very low',
                            color: '#1B4F72'
                        }
                    ]
                }
            }
        },
        dataLabels: {
            enabled: false
        },
        title: {
            text: 'HeatMap Chart Drug and Personality'
        },
    };

    return (
        <div className = {`h-full`}>
            <ReactApexChart options={options} series={series} type="heatmap" height={'100%'}/>
        </div>
    );
};

export default CorrelationChart;