import { data } from './data.js';

const myChart = echarts.init(document.getElementById('grid'));

const xAxisData = [];
const data1 = [];
const data2 = [];
const data3 = [];
const data4 = [];
const dataLength = [];
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

      if (value1 === 0 && value2 === 0) {
        return;
      }

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
        show: true,
        fontWeight: 'bold',
        position: 'top',
        formatter: (params) => {
          valueLebelOne1.push(params.value);
          return '';
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
          valueLebelOne2.push(params.value);
          return '';
        },
      },
    },
    {
      type: 'bar',
      stack: 'one',
      barMaxWidth: '30%',
      data: dataLength,
      label: {
        show: true,
        fontWeight: 'bold',
        position: 'top',
        formatter: (params) => {
          let answer = showValueLebelOne();
          return answer;
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
        show: true,
        fontWeight: 'bold',
        position: 'top',
        formatter: (params) => {
          valueLebelTwo1.push(params.value);
          return '';
        },
      },
    },
    {
      name: 'Вне программ ЦП П.',
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
          valueLebelTwo2.push(params.value);
          return '';
        },
      },
    },
    {
      type: 'bar',
      stack: 'two',
      barMaxWidth: '30%',
      data: dataLength,
      label: {
        show: true,
        fontWeight: 'bold',
        position: 'top',
        formatter: (params) => {
          let answer = showValueLebelTwo();
          return answer;
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
      dataLength.push(0);
    } else if (el.name === dataName[1]) {
      data2.push(el.value);
    } else if (el.name === dataName[2]) {
      data3.push(el.value);
    } else if (el.name === dataName[3]) {
      data4.push(el.value);
    }
  });
}

let valueLebelOne1 = [];
let valueLebelOne2 = [];
let valueLebelOneInc = 0;

function showValueLebelOne() {
  let num1 = valueLebelOne1[valueLebelOneInc] ?? 0;
  let num2 = valueLebelOne2[valueLebelOneInc] ?? 0;
  let valueLebelOne = num1 + num2;

  valueLebelOneInc += 1;

  if (valueLebelOneInc === 7) {
    valueLebelOneInc = 0;
    valueLebelOne1 = [];
    valueLebelOne2 = [];
  }

  if (valueLebelOne === 0) {
    return '';
  } else {
    return valueLebelOne;
  }
}

let valueLebelTwo1 = [];
let valueLebelTwo2 = [];
let valueLebelTwoInc = 0;

function showValueLebelTwo() {
  let num1 = valueLebelTwo1[valueLebelTwoInc] ?? 0;
  let num2 = valueLebelTwo2[valueLebelTwoInc] ?? 0;
  let valueLebelTwo = num1 + num2;

  valueLebelTwoInc += 1;

  if (valueLebelTwoInc === 7) {
    valueLebelTwoInc = 0;
    valueLebelTwo1 = [];
    valueLebelTwo2 = [];
  }

  if (valueLebelTwo === 0) {
    return '';
  } else {
    return valueLebelTwo;
  }
}

preparationData(data);

myChart.setOption(option);
