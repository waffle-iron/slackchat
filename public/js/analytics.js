import createChart from './createChart';


let chartData;
let analyticsChart;
let currentTab;
const chart = document.querySelector('#canvas');

function setChart(data) {
  analyticsChart.destroy();
  analyticsChart = createChart(data);
}

function selectTab(tab) {
  if (currentTab) {
    currentTab.classList.remove('active');
  }
  tab.classList.add('active');
  currentTab = tab;
  const nextChartData = chartData[tab.getAttribute('data-name')];
  setChart(nextChartData);
}

function setTabInfo(data) {
  const allChatsCounter = document.querySelector('#sc-all-chats-counter');
  const missedChatsCounter = document.querySelector('#sc-missed-chats-counter');
  const allVisitorsCounter = document.querySelector('#sc-all-visitors-counter');
  allChatsCounter.innerHTML = data.allChats.reduce((total, visitor) => total + visitor.y, 0);
  missedChatsCounter.innerHTML = data.missedChats.reduce((total, visitor) => total + visitor.y, 0);
  allVisitorsCounter.innerHTML = data.allVisitors.reduce((total, visitor) => total + visitor.y, 0);
}

function initChart() {
  analyticsChart = createChart([]);
  const chartDataUrl = chart.getAttribute('sc-chart-data-src');

  const tabs = document.querySelectorAll('.sc-analytics--chart-header .sc-analytics--chart-section');
  [].forEach.call(tabs, (tab) => {
    tab.addEventListener('click', () => { selectTab(tab); });
  });

  fetch(chartDataUrl)
    .then(result => result.json())
    .then((data) => {
      if (!chartData) {
        chartData = data;
      }
      selectTab(tabs[0]);
      setTabInfo(chartData);
    });
}

if (chart) {
  initChart();
}
