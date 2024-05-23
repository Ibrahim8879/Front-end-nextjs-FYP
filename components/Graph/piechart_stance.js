import React, { useEffect } from 'react';
import * as echarts from 'echarts/core';
import { PieChart } from 'echarts/charts';
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
} from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';

echarts.use([TitleComponent, TooltipComponent, LegendComponent, PieChart, CanvasRenderer]);

const GetPieChart = ({ name, value1, value2}) => {
  const chartId = `chart-${name}`;
  const data = {"Agreed": value1, "DisAgreed": value2};
  useEffect(() => {
    const chartDom = document.getElementById(chartId);
    const myChart = echarts.init(chartDom);

    const option = {
      title: {
        text: name,
        left: 'center',
      },
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b}: {c} ({d}%)',
      },
      legend: {
        orient: 'vertical',
        left: 10,
        data: Object.keys(data),
      },
      series: [
        {
          name: name,
          type: 'pie',
          radius: '50%',
          center: ['50%', '60%'],
          avoidLabelOverlap: true,
          label: {
            show: true,
            position: 'outside',
          },
          emphasis: {
            
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)',
            },
          },
          labelLine: {
            show: true,
          },
          data: Object.entries(data).map(([name, value]) => ({
            name,
            value,
          })),
        },
      ],
    };

    myChart.setOption(option);

    return () => {
      myChart.dispose();
    };
  }, []);

  return <div id={chartId} style={{ width: '100%', height: '400px' }} />;
};

export default GetPieChart;