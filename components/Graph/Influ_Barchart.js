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
    const myChart = echarts.init(chartDom, 'dark');

    const option = {
      backgroundColor: '#fff',
      yAxis: {
        type: 'category', // Use 'category' type for the y-axis
        data: data.map((item) => item.username),
        axisLabel: {
          interval: 0,
          rotate: 5,
          margin: 2,
          textStyle: {
            color: '#333',
            fontSize: 12,
          },
        },
      },
      xAxis: {
        type: 'value', // Use 'value' type for the x-axis
        axisLabel: {
          textStyle: {
            color: '#333',
            fontSize: 12,
          },
          formatter: '{value}%', // Display x-axis labels as percentage
        },
      },
      series: [
        {
          data: data.map((item) => item.standardized_score.toFixed(2)), // Format score to two decimal places
          type: 'bar',
          label: {
            show: true,
            position: 'right', // Position labels to the right of the bars
            formatter: '{c}%', // Display label as percentage
            color: '#333',
          },
          itemStyle: {
            color: function (params) {
              const colorList = ['#5470C6', '#EE6666', '#91CC75', '#FFB90F', '#73C0DE', '#3BA272', '#FF6666', '#3B8ADE', '#61A0A8', '#FFD700'];
              return colorList[params.dataIndex % colorList.length];
            },
          },
        },
      ],
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
        },
        formatter: '{b}: {c}%', // Tooltip format
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
