"use client"
import React, { useEffect } from 'react';
import * as echarts from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
} from 'echarts/components';
// Import necessary charts
import { BarChart } from 'echarts/charts';

const languageNames = {
  ar: 'Arabic',
  en: 'English',
  iw: 'Hebrew',
  hi: 'Hindi',
  ms: 'Malay',
  fa: 'Persian',
  ur: 'Urdu'
};

// Use necessary components
echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  BarChart,
  CanvasRenderer, // or SVGRenderer if you prefer
]);

const GetBarChart = ({ data, data2 }) => {
  useEffect(() => {
    const chartDom = document.getElementById('main');
    const myChart = echarts.init(chartDom, "dark");

    const colors = ['#5470C6', '#91CC75', '#EE6666', '#73C0DE', '#3BA272'];

    // Combine language and dictionary count for x-axis data
    const xAxisData = data.map((item, index) => {
      const language = languageNames[item.language] || item.language.toUpperCase();
      const dictionaryCount = data2[language.toLowerCase()] || 0;
      return `${language}\nDictionary Words : (${dictionaryCount})`;
    });

    const option = {
      backgroundColor: '#fff',
      xAxis: {
        type: 'category',
        data: xAxisData,
        axisLabel: {
          interval: 0,
          rotate: 0,
          margin: 4,
          textStyle: {
            color: '#333',
            fontSize: 12,
          },
        },
      },
      yAxis: {
        type: 'value',
        axisLabel: {
          textStyle: {
            color: '#333',
            fontSize: 12,
          },
        },
      },
      series: [
        {
          data: data.map((item) => item.total_count),
          type: 'bar',
          label: {
            show: true,
            position: 'top',
            formatter: function (params) {
              const totalCount = params.value;
              return `${totalCount}%`;
            },
            color: '#333',
          },
          itemStyle: {
            color: function (params) {
              return colors[params.dataIndex % colors.length];
            },
          },
        },
      ],
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
        },
      },
    };

    myChart.setOption(option);

    return () => {
      myChart.dispose(); // Clean up chart instance when component unmounts
    };
  }, [data, data2]);

  return <div id="main" style={{ width: '100%', height: '600px' }}></div>;
};

export default GetBarChart;
