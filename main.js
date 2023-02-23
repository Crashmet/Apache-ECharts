import { data } from './data.js';

const myChart = echarts.init(document.getElementById('grid'));

let xAxisData = [];
let data1 = [];
let data2 = [];
let data3 = [];
let data4 = [];

var emphasisStyle = {
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

      // console.log(params);

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
      color: 'rgba(0, 32, 51, 0.7)',
    },
    splitLine: {
      show: false,
    },
  },
  grid: {
    bottom: 100,
  },
  series: [
    {
      name: 'В программе ИТ П.',
      type: 'bar',
      stack: 'one',
      emphasis: emphasisStyle,
      data: data1,
      color: ['#0078D2'],
      barGap: '5%',
      barMaxWidth: '30%',
      label: {
        show: true,
        position: 'top',
        formatter: (params) => {
          console.log(params);
          // let percent = Math.round((value1 / (value1 + value2)) * 100);
          return;
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
    },
    {
      name: 'Вне программ ИТ П.',
      type: 'bar',
      stack: 'two',
      emphasis: emphasisStyle,
      data: data3,
      color: ['#00724C'],
      label: {
        show: true,
        position: 'top',
        formatter: (params) => {
          console.log(params.value[params.encode.y[1]]);
          // let percent = Math.round((value1 / (value1 + value2)) * 100);
          return;
        },
      },
      barMaxWidth: '30%',
    },
    {
      name: 'Вне программ ЦП П.',
      type: 'bar',
      stack: 'two',
      emphasis: emphasisStyle,
      data: data4,
      color: ['#22C38E'],
      label: {
        show: true,
        position: 'top',
        formatter: (params) => {
          // console.log(params);
          // let percent = Math.round((value1 / (value1 + value2)) * 100);
          return;
        },
      },
    },
  ],
};

function preparationData(data) {
  data.forEach((el) => {
    let flag = xAxisData.find((item) => item === el.period);
    if (!flag) {
      xAxisData.push(el.period);
    }
  });

  data.forEach((el) => {
    let flag = xAxisData.find((item) => item === el.period);
    if (!flag) {
      xAxisData.push(el.period);
    }
  });

  data.forEach((el) => {
    if (el.name === 'В программе ИТ') {
      data1.push(el.value);
    } else if (el.name === 'В программе ЦП') {
      data2.push(el.value);
    } else if (el.name === 'Вне программ ЦП') {
      data3.push(el.value);
    } else if (el.name === 'Вне программ ИТ') {
      data4.push(el.value);
    }
  });
}

preparationData(data);
myChart.setOption(option);
