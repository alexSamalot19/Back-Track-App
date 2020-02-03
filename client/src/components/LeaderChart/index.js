import React, { Component } from "react";
import { Bar } from "react-chartjs-2";
import API from "../../utils/API";

class LeaderChart extends Component {
  state = {
    hasData: false
  };

  componentDidMount() {
    this.fetchTopics();
  }

  fetchTopics = () => {
    API.getTopic()
      .then(res =>
        this.setState({
          topics: res.data,
          hasData: true
        })
      )
      .catch(err => console.log(err));
  };

  render() {
    const { hasData, topics } = this.state;
    if (hasData && this.props.showState) {
      let barLabels = [];
      let barLabel = this.props.topicFilter;
      let barData = [];
      let i = 0;

      let barChart = {
        labels: barLabels,
        datasets: [
          {
            label: barLabel,
            data: barData,
            backgroundColor: [
              "#0074D9",
              "#FF4136",
              "#2ECC40",
              "#FF851B",
              "#7FDBFF",
              "#B10DC9",
              "#FFDC00",
              "#001f3f",
              "#39CCCC",
              "#01FF70",
              "#85144b",
              "#F012BE",
              "#3D9970",
              "#111111",
              "#AAAAAA"
            ]
          }
        ]
      };

      topics.forEach(chartTheData);

      function chartTheData(item, index) {
        if (item.name === barLabel) {
          if (barLabels.indexOf(item.user) === -1) {
            barLabels[i] = item.user;
            barData[i] = item.hours;
            i++;
          } else {
            barData[barLabels.indexOf(item.user)] =
              barData[barLabels.indexOf(item.user)] + item.hours;
          }
        }
      }

      return (
        <div className="chart">
          <h3>{barChart.datasets[0].label}</h3>
          <Bar data={barChart} options={{ legend: { display: false } }} />
        </div>
      );
    } else {
      return <div></div>;
    }
  }
}

export default LeaderChart;
