"use client";
import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";

const Apexchart = () => {
  const [chartWidth, setChartWidth] = useState(800);

  // Update chart width based on window size
  useEffect(() => {
    const updateChartWidth = () => {
      if (window.innerWidth < 768) {
        setChartWidth(window.innerWidth - 40); // Small screens, add some padding
      } else if (window.innerWidth < 1024) {
        setChartWidth(600); // Medium screens
      } else {
        setChartWidth(800); // Large screens
      }
    };

    updateChartWidth();
    window.addEventListener("resize", updateChartWidth);

    return () => {
      window.removeEventListener("resize", updateChartWidth);
    };
  }, []);

  const options = {
    chart: {
      id: "basic-bar",
      type: "line",
      responsive: [
        {
          breakpoint: 768,
          options: {
            chart: {
              width: "100%",
            },
          },
        },
      ],
    },
    xaxis: {
      categories: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
      ],
    },
    title: {
      text: "Sales Revenue",
      align: "start",
    },
  };

  const series = [
    {
      name: "Sales",
      data: [30, 40, 35, 50, 49, 60, 70],
    },
  ];

  return (
    <div style={{ maxWidth: "100%", overflow: "hidden" }}>
      <ReactApexChart
        options={options}
        series={series}
        type="line"
        width={chartWidth}
        height={350}
      />
    </div>
  );
};

export default Apexchart;
