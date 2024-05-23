"use client"
import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts/core';
import { BarChart } from 'echarts/charts';
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
} from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';
import 'echarts/theme/macarons'; // Optional: Use a theme for the chart

// Register necessary components
echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  BarChart,
  CanvasRenderer,
]);

const GetBarChart = ({ data, text }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef.current && data) {
      const chart = echarts.init(chartRef.current);

      const sortedData = data.sort((a, b) => b.count - a.count);

      const xAxisData = sortedData.map((trend) => trend.trend);
      const seriesData = sortedData.map((trend) => trend.count);

      const option = {
        title: {
          text: `Top Trends in ${text}`,
          left: 'center',
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
          },
        },
        grid: {
          top: 80,
          left: 20,
          right: 20,
          bottom: 80,
          containLabel: true,
        },
        xAxis: {
          type: 'category',
          data: xAxisData,
          axisLabel: {
            interval: 0,
            rotate: 0,
            formatter: (value) => {
              return `{value|${value}}`; // Use rich text for customization
            },
            rich: {
              value: {
                lineHeight: 10,
                align: 'center',
                color: '#000',
                fontWeight: 'bold',
                fontSize: 12,
              },
            },
          },
        },
        yAxis: {
          type: 'value',
        },
        series: [{
          name: 'Count',
          type: 'bar',
          data: seriesData,
        }],
      };

      chart.setOption(option);

      // Click and open the home page in a new tab
      chart.on('click', function (params) {
        const trend = params.name;
        const modifyurl = encodeURIComponent(trend);
        window.open(`/stance/${modifyurl}`, '_blank');
      });

      window.addEventListener('resize', () => {
        chart.resize();
      });

      // Cleanup event listener on unmount
      return () => {
        window.removeEventListener('resize', () => chart.resize());
        chart.dispose();
      };
    }
  }, [data]);

  return (
    <div>
      <div ref={chartRef} style={{ width: '100%', height: '500px', backgroundColor: 'white' }} />
      <p className="text-center text-white mt-4">To check the stance on any of the given trends in the graph above, please click on the respective bar.</p>
    </div>
  )
};

export default GetBarChart;
