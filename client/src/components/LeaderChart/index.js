import React, { Component } from "react";
import { Bar, Line, Pie } from "react-chartjs-2";

class LeaderChart extends Component {
  state = {
    chartData: {
      labels: ["Boston", "Worcester", "Amherst"],
      datasets: [{ label: "Population", data: [100, 200, 300] }]
    }
  };

  render() {
    console.log(this.state.chartData);
    return (
      <div className="chart">
        <Bar
          data={this.state.chartData}
          options={{ maintainAspectRatio: false }}
        />
      </div>
    );
  }
}

export default LeaderChart;
