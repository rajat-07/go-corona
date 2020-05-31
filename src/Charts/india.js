import { defaultOptions, xAxisDefaults, yAxisDefaults } from "./chart-defaults";
import deepmerge from "deepmerge";
import React, { useState } from "react";
import { Line } from "react-chartjs-2";

function India(props) {
  const chartReference = React.createRef();

  if (!props.data || props.data.length === 0) {
    return <div></div>;
  }

  const dates = [];
  const dat = [];
  const colors = ["#718af0", "#9bc26b", "#ff8a66"];

  let index;

  console.log(props.data);

  props.data.forEach((d) => {
    let x, y;
    Object.keys(d).forEach((key) => {
      x = d.Date;
      if(props.status == "Confirmed"){
        y = d.Confirmed;
        index = 0;
      }
      if(props.status == "Recovered"){
        y = d.Recovered;
        index = 1;
      }
      if(props.status == "Deaths"){
        y = d.Deaths;
        index = 2;
      }
    });
    x = x.substring(0, 10);
    const ndate = new Date(x).toISOString();
    dates.push(ndate);
    dat.push(y);
    console.log(`${ndate} => ${y}`);
  });


  const datasets = [];

  datasets.push({
    borderWidth: 2,
    data: dat,
    borderCapStyle: "round",
    pointBackgroundColor: colors[index],
    label: "India",
    borderColor: colors[index],
    pointHoverRadius: 0.5,
  });

  const dataset = {
    labels: dates,
    datasets: datasets,
  };

  const options = deepmerge(defaultOptions, {
    tooltips: {
      mode: "index",
    },
    elements: {
      point: {
        radius: 0,
      },
      line: {
        tension: 0,
      },
    },
    legend: {
      labels: {
        boxWidth: 20,
        fontSize: 11,
      },
    },
    scales: {
      yAxes: [
        deepmerge(yAxisDefaults, {
          type: "linear",
          ticks: {
            beginAtZero: true,
            max: undefined,
            precision: 0,
          },
          scaleLabel: {
            display: false,
            labelString: "Total Cases",
          },
        }),
      ],
      xAxes: [
        deepmerge(xAxisDefaults, {
          type: "time",
          time: {
            unit: "day",
            tooltipFormat: "MMM DD",
            stepSize: 7,
            displayFormats: {
              millisecond: "MMM DD",
              second: "MMM DD",
              minute: "MMM DD",
              hour: "MMM DD",
              day: "MMM DD",
              week: "MMM DD",
              month: "MMM DD",
              quarter: "MMM DD",
              year: "MMM DD",
            },
          },
          gridLines: {
            color: "rgba(0, 0, 0, 0)",
          },
        }),
      ],
    },
  });

  return (
    <div className="charts-header">
      <div className="chart-title">{props.title}</div>
      <div className="chart-content">
        <Line data={dataset} options={options} ref={chartReference} />
      </div>
    </div>
  );
}

export default India;
