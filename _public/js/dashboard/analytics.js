import getVisitorData from './api';
import Chart from 'chart.js'

function createChart(visitorData) {
    const chart = document.getElementById("myChart");

    if (!chart) { return; }
    const ctx = chart.getContext('2d');

    let gradient = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(1, 'rgba(229, 244, 250, 1)');   
    gradient.addColorStop(0, 'rgba(118, 164, 255, 1)');

    let hoverGradient = ctx.createLinearGradient(0, 0, 0, 400);
    hoverGradient.addColorStop(1, 'rgba(148, 200, 252, 1)');   
    hoverGradient.addColorStop(0, 'rgba(75, 136, 253, 1)');

    Chart.defaults.global.defaultFontFamily = 'Avenir Next, "Helvetica Neue", Helvetica, sans-serif';

    let numVisitors = [];
    let dates = [];

    visitorData.forEach((obj) => {
        numVisitors.push(obj.numVisitors)
        dates.push(obj.date)
    });

    if (ctx) {

    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: dates,
            datasets: [{
                label: 'views',
                data: numVisitors,
                backgroundColor: gradient,
                hoverBackgroundColor: hoverGradient
            }]
        },
        options: {
            responsive: false,
            maintainAspectRatio: false,
            legend: { display: false},
            layout: { 
                padding: {
                    top: 10
                }
            },
            scales: {
                yAxes: [{
                    ticks: {
                        autoSkip: true,
                        maxTicksLimit: 8,
                        beginAtZero: true,
                    } 
                }],
                xAxes: [{
                    categoryPercentage: 0.60,
                    gridLines: {
                        display: false
                    },
                    ticks: {
                        autoSkip: true,
                        autoSkipPadding: 20
                    }
                }]
            },
            tooltips: {
                backgroundColor: '#4D6179',
                displayColors: false,
                titleFontStyle: 'normal'
            }
        }
    });
    }
}

getVisitorData().then((visitorData) => {
    createChart(visitorData || []);
})