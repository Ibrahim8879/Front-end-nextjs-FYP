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

const GetBarChart = ({ data }) => {
  const chartRef = useRef(null);
  console.log(data)
  useEffect(() => {
    if (chartRef.current) {
      const chart = echarts.init(chartRef.current);

      const sortedData = data.map((country) => ({
        name: country.name,
        topTrends: country.top_trends
          .sort((a, b) => b.count - a.count)
          .slice(0, 5),
      }));
      
      const xAxisData = sortedData.map((country) => country.name);
      const seriesData = sortedData.map((country) =>
        country.topTrends.map((trend) => trend.count)
      );
      const legendData = sortedData[0]?.topTrends.map((trend) => trend.trend);

      chart.setOption({
        title: {
          text: 'Top Trends by Country',
          left: 'center',
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
          },
        },
        legend: {
          data: legendData,
          top: 30,
        },
        grid: {
          top: 80,
          left: 20,
          right: 20,
          bottom: 20,
          containLabel: true,
        },
        xAxis: {
          type: 'category',
          data: xAxisData,
        },
        yAxis: {
          type: 'value',
        },
        series: seriesData.map((data, index) => ({
          name: legendData[index],
          type: 'bar',
          data,
        })),
      });
    }
  }, [data]);

  return <div ref={chartRef} style={{ width: '100%', height: '500px' }} />;
};

export default GetBarChart;
