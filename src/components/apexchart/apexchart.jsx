"use client"
import React from 'react'
import ReactApexChart from 'react-apexcharts';

const Apexchart = () => {
  const options = {
    chart: {
      id: 'basic-bar',
      type: 'line', 
    },
    xaxis: {
      categories: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    },
    title: {
      text: 'Sales Revenue',
      align: 'start',
    },
  };

  const series = [
    {
      name: 'Sales',
      data: [30, 40, 35, 50, 49, 60, 70],
    },
  ];
  return <>
    <div>
      <ReactApexChart options={options} series={series} type="line" width={800} height={350} />
    </div>
  </>
}

export default Apexchart
