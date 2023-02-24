import { data } from './data.js';

const myChart = echarts.init(document.getElementById('grid'));

const xAxisData = [];
const data1 = [];
const data2 = [];
const data3 = [];
const data4 = [];
const dataName = [];

const emphasisStyle = {
  itemStyle: {
    shadowBlur: 10,
    shadowColor: 'rgba(0,0,0,0.3)',
  },
};

const option = {
  legend: {
    bottom: '2%',
    icon: 'circle',
    textStyle: {
      color: 'rgba(0, 32, 51, 0.6)',
    },
  },
  toolbox: {},
  tooltip: {
    trigger: 'axis',
    valueFormatter: (value) => value + ' шт.',
    formatter: (params) => {
      let value1 = 0;
      let value2 = 0;
      let percent1 = 0;
      let percent2 = 0;
      let tooltipMsg1 = '';
      let tooltipMsg2 = '';

      let tooltipMsg =
        `<p class="tooltip-title tooltip-text-bold ">` +
        params[0].name +
        `</p>` +
        '<br/>';

      for (let i = 0; i < params.length; i++) {
        if (params[i].seriesName.startsWith('В ')) {
          value1 += params[i].value;
        } else if (params[i].seriesName.startsWith('Вне')) {
          value2 += params[i].value;
        }
      }
      percent1 = Math.round((value1 / (value1 + value2)) * 100);
      percent2 = Math.round((value2 / (value1 + value2)) * 100);

      if (percent1 !== 0) {
        tooltipMsg1 =
          `<div class="tooltip-flex tooltip-text-bold tooltip-fontsize" ` +
          `<b >В программе </b>` +
          `<b class="tooltip-text-bold tooltip-fontsize">` +
          '&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp' +
          percent1 +
          `  % | ` +
          value1 +
          ' шт.' +
          `</b>` +
          `</div>` +
          '<br/>';
      }

      if (percent2 !== 0) {
        tooltipMsg2 =
          `<div class="tooltip-flex tooltip-text-bold tooltip-fontsize" ` +
          `<b >В программе </b>` +
          `<b class="tooltip-text-bold tooltip-fontsize">` +
          '&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp' +
          percent2 +
          `  % | ` +
          value2 +
          ' шт.' +
          `</b>` +
          `</div>` +
          '<br/>';
      }

      for (let i = 0; i < params.length; i++) {
        if (params[i].seriesName.startsWith('В ')) {
          tooltipMsg1 +=
            `<p class="tooltip-fontsize">` +
            params[i].marker +
            params[i].seriesName +
            '&nbsp&nbsp&nbsp&nbsp&nbsp' +
            `<b class="tooltip-text-bold tooltip-fontsize">` +
            params[i].value +
            ' шт. ' +
            `</b>` +
            '</p>' +
            '<br/>';
        } else if (params[i].seriesName.startsWith('Вне')) {
          tooltipMsg2 +=
            `<p class="tooltip-fontsize">` +
            params[i].marker +
            params[i].seriesName +
            '&nbsp&nbsp&nbsp&nbsp' +
            `<b class="tooltip-text-bold tooltip-fontsize">` +
            params[i].value +
            ' шт. ' +
            `</b>` +
            '</p>' +
            '<br/>';
        }
      }

      return tooltipMsg + tooltipMsg1 + tooltipMsg2;
    },
  },
  xAxis: {
    data: xAxisData,
    axisLine: {
      show: false,
    },
    axisTick: {
      show: false,
    },
    splitLine: {
      show: true,
      lineStyle: { type: 'dashed' },
      color: 'rgba(0, 65, 102, 0.2)',
    },
  },
  yAxis: {
    axisLine: {
      show: true,
      lineStyle: { color: ' rgba(0, 65, 102, 0.3)' },
    },
    axisTick: {
      show: true,
      lineStyle: { color: ' rgba(0, 65, 102, 0.3)' },
    },
    axisLabel: {
      formatter: function (value) {
        return value / 100;
      },
      color: 'rgba(0, 32, 51, 0.7)',
    },
    splitLine: {
      show: false,
    },
  },
  grid: {},
  dataset: {
    dimensions: [],
    source: [],
  },
  series: [
    {
      name: 'В программе ИТ П.',
      type: 'bar',
      stack: 'one',
      emphasis: emphasisStyle,
      data: data1,
      color: ['#0078D2'],
      barMaxWidth: '30%',
      label: {
        show: false,
        fontWeight: 'bold',
        position: 'top',
        formatter: (params) => {
          return params.value + data2[params.dataIndex];
        },
      },
    },
    {
      name: 'В программе ЦП П.',
      type: 'bar',
      stack: 'one',
      emphasis: emphasisStyle,
      data: data2,
      color: ['#56B9F2'],
      barMaxWidth: '30%',
      label: {
        show: true,
        fontWeight: 'bold',
        position: 'top',
        formatter: (params) => {
          return params.value + data1[params.dataIndex];
        },
      },
    },
    {
      name: 'Вне программ ИТ П.',
      type: 'bar',
      stack: 'two',
      emphasis: emphasisStyle,
      data: data3,
      color: ['#00724C'],
      barMaxWidth: '30%',
      label: {
        show: false,
        fontWeight: 'bold',
        position: 'top',
        formatter: (params) => {
          return params.value + data4[params.dataIndex];
        },
      },
    },
    {
      name: 'Вне программ ЦП П.',
      id: 'bar-4',
      type: 'bar',
      stack: 'two',
      emphasis: emphasisStyle,
      data: data4,
      color: ['#22C38E'],
      barMaxWidth: '30%',
      label: {
        show: true,
        fontWeight: 'bold',
        position: 'top',
        formatter: (params) => {
          return params.value + data3[params.dataIndex];
        },
      },
    },
  ],
};

function preparationData(data) {
  const sortDataName = [...data].sort((a, b) => a.name.localeCompare(b.name));

  sortDataName.forEach((el) => {
    let flag = dataName.find((item) => el.name === item);
    if (!flag) {
      dataName.push(el.name);
    }
  });

  data.forEach((el) => {
    let flag = xAxisData.find((item) => item === el.period);
    if (!flag) {
      xAxisData.push(el.period);
    }
  });

  data.forEach((el) => {
    if (el.name === dataName[0]) {
      data1.push(el.value);
    } else if (el.name === dataName[1]) {
      data2.push(el.value);
    } else if (el.name === dataName[2]) {
      data3.push(el.value);
    } else if (el.name === dataName[3]) {
      data4.push(el.value);
    }
  });
}

preparationData(data);

myChart.setOption(option);
