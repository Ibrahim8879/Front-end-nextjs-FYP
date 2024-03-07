"use client"
import React, { useEffect } from 'react';
import * as echarts from 'echarts/core';
import {
  TitleComponent,
  TooltipComponent,
  VisualMapComponent
} from 'echarts/components';
import { PieChart } from 'echarts/charts';
import { LabelLayout } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';

echarts.use([
  TitleComponent,
  TooltipComponent,
  VisualMapComponent,
  PieChart,
  CanvasRenderer,
  LabelLayout
]);

const GetPieChart = ({ name, value1, value2 }) => {
    const chartId = `chart-${name}`;
  
    useEffect(() => {
      var chartDom = document.getElementById(chartId);
      var myChart = echarts.init(chartDom);
      var option = {
        backgroundColor: '#2c343c',
        title: {
          text: name.toUpperCase(),
          left: 'center',
          top: 20,
          textStyle: {
            color: '#ccc'
          }
        },
        tooltip: {
          trigger: 'item'
        },
        visualMap: {
          show: false,
          min: 80,
          max: 600,
          inRange: {
            colorLightness: [0, 1]
          }
        },
        series: [
          {
            name: 'Access From',
            type: 'pie',
            radius: '55%',
            center: ['50%', '50%'],
            data: [
              { value: value1, name: 'Positive' },
              { value: value2, name: 'Negative' },
            ].sort(function (a, b) {
              return a.value - b.value;
            }),
            roseType: 'radius',
            label: {
              color: 'rgba(255, 255, 255)'
            },
            labelLine: {
              lineStyle: {
                color: 'rgba(255, 255, 255, 0.3)'
              },
              smooth: 0.2,
              length: 10,
              length2: 20
            },
            itemStyle: {
              color: '#c23531',
              shadowBlur: 200,
              shadowColor: 'rgba(5, 5, 5, 0.5)'
            },
            animationType: 'scale',
            animationEasing: 'elasticOut',
            animationDelay: function (idx) {
              return Math.random() * 200;
            }
          }
        ]
      };
  
      option && myChart.setOption(option);
  
      return () => {
        myChart.dispose(); // Clean up chart instance when component unmounts
      };
    }, [chartId, name, value1, value2]); // Re-run effect when chartId, name, value1, or value2 change
  
    return <div id={chartId} style={{ width: '100%', height: '400px', margin: 4}}></div>;
};

export default GetPieChart;
