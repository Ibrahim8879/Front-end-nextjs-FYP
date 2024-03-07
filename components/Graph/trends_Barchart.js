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

const GetBarChart = ({ data , text }) => {
  useEffect(() => {
    const chartDom = document.getElementById('main');
    const myChart = echarts.init(chartDom, "dark");

    const colors = ['#5470C6', '#91CC75', '#EE6666', '#73C0DE', '#3BA272'];

    const option = {
      backgroundColor: '#fff',
      xAxis: {
        type: 'category',
        data: data.map((item) => item.name),
        axisLabel: {
          interval: 0,
          rotate: 15,
          margin: 2,
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
          data: data.map((item) => item.top_trends.length),
          type: 'bar',
          label: {
            show: true,
            position: 'top',
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
