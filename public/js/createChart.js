import Chart from 'chart.js';


export default (createChart) => {
  const canvas = document.getElementById('canvas');
  if (!canvas) { return false; }
  const ctx = canvas.getContext('2d');
  const scatterChart = new Chart(ctx, {
    type: 'line',
    data: {
      datasets: [{
        lineTension: 0,
        backgroundColor: 'rgba(1,1,1,0)',
        borderColor: '#A2F4FF',
        borderWidth: 5,
        pointBackgroundColor: '#4E8CFF',
        pointBorderWidth: 2,
        pointBorderColor: 'white',
        pointRadius: 5,
        data: createChart,
      }],
    },
    options: {
      legend: {
        display: false,
      },
      scales: {
        yAxes: [{
          gridLines: {
            drawBorder: false,
            color: '#F0F4FA',
            zeroLineColor: '#F0F4FA',
            lineWidth: 2,
            zeroLineWidth: 2,
          },
          ticks: {
            beginAtZero: true,
            fixedStepSize: 10,
          },
        }],
        xAxes: [{
          type: 'time',
          time: {
            tooltipFormat: 'MMM DD',
            displayFormats: {
              day: 'MMM DD',
            },
            unit: 'day',
          },
          position: 'bottom',
          gridLines: {
            display: false,
          },
          ticks: {
            fixedStepSize: 10,
            autoSkip: true,
            maxTicksLimit: 3,
          },
        }],
      },
    },
  });

  return scatterChart;
};
