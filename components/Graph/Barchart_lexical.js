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

// Use necessary components
echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  BarChart,
  CanvasRenderer, // or SVGRenderer if you prefer
]);

const GetBarChart = ({ data }) => {
  useEffect(() => {
    const chartDom = document.getElementById('main');
    const myChart = echarts.init(chartDom, "dark");

    const colors = ['#5470C6', '#91CC75', '#EE6666', '#73C0DE', '#3BA272'];

    const option = {
      backgroundColor: '#fff',
      xAxis: {
        type: 'category',
        data: data.map((item) => item.language.toUpperCase()),
        axisLabel: {
          interval: 0,
          rotate: 90,
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
          data: data.map((item) => item.diversity),
          type: 'bar',
          label: {
            show: true,
            position: 'top',
            formatter: function (params) {
              const dataIndex = params.dataIndex;
              const language = data[dataIndex].language.toUpperCase();
              const diversity = data[dataIndex].diversity;
              return `${language}\n${diversity}`;
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
  }, [data]);

  return <div id="main" style={{ width: '100%', height: '600px' }}></div>;
};

export default GetBarChart;
