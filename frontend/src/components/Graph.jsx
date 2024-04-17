import React from 'react';
import ReactApexChart from 'react-apexcharts';  // Assurez-vous d'importer le composant correctement

export function Graph ({keyData, valueData}) {
    const options = {
        chart: {
            type: 'bar'
        },
        xaxis: {
            categories: keyData
        },
        plotOptions: {
            bar: {
                borderRadius: 4,
                horizontal: true,
            }
        }
    };

    const series = [{
        name: 'consumption',
        data: valueData
    }];

    return (
        <div className={`w-full bg-neutral-100 h-full md:min-h-[400px] p-0 m-0 rounded z-0`}>
            <ReactApexChart
                options={options}
                series={series}
                type="bar"
                height={'100%'}
            />
        </div>
    );
};

export default Graph;