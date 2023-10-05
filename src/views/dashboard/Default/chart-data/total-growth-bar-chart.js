// ===========================|| DASHBOARD - TOTAL GROWTH BAR CHART ||=========================== //

const chartData = {
    height: 480,
    type: 'bar',
    options: {
        chart: {
            id: 'bar-chart',
            stacked: true,
            toolbar: {
                show: true
            },
            zoom: {
                enabled: true
            }
        },
        responsive: [
            {
                breakpoint: 480,
                options: {
                    legend: {
                        position: 'bottom',
                        offsetX: -10,
                        offsetY: 0
                    }
                }
            }
        ],
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: '50%'
            }
        },
        xaxis: {
            type: 'category',
            categories: [
                'Equipe 1',
                'Equipe 2',
                'Equipe 3',
                'Equipe 4',
                'Equipe 5',
                'Equipe 6',
                'Equipe 7',
                'Equipe 8',
                'Equipe 9',
                'Equipe 10',
                'Equipe 11',
                'Equipe 12'
            ]
        },
        legend: {
            show: true,
            fontSize: '14px',
            fontFamily: `'Roboto', sans-serif`,
            position: 'bottom',
            offsetX: 20,
            labels: {
                useSeriesColors: false
            },
            markers: {
                width: 16,
                height: 16,
                radius: 5
            },
            itemMargin: {
                horizontal: 15,
                vertical: 8
            }
        },
        fill: {
            type: 'solid'
        },
        dataLabels: {
            enabled: false
        },
        grid: {
            show: true
        }
    },
    series: [
        {
            name: '> 12h',
            data: [5, 4, 7, 10, 8, 9, 5, 7, 9, 0, 6, 3]
        },
        {
            name: '10h - 12h',
            data: [5, 4, 7, 10, 8, 9, 5, 7, 9, 0, 6, 3]
        },
        {
            name: '6h - 10h',
            data: [5, 4, 7, 10, 8, 9, 5, 7, 9, 0, 6, 3]
        },
        {
            name: '4h - 6h',
            data: [5, 4, 6, 6, 4, 5, 5, 4, 5, 6, 6, 4]
        },

        {
            name: '2h - 4h',
            data: [2, 3, 2, 2, 3, 4, 2, 4, 2, 4, 3, 4]
        },
        {
            name: '1h - 2h',
            data: [2, 1, 2, 2, 1, 1, 2, 1, 2, 1, 1, 1]
        },
        {
            name: '< 1h',
            data: [0, 1, 0, 0, 1, 1, 0, 1, 0, 1, 1, 1]
        }
    ]
};
export default chartData;
