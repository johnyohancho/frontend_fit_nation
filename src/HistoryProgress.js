import React from 'react';
import Chart from 'react-apexcharts';

class HistoryProgress extends React.Component {
    
    constructor(props) {
      super(props);

      this.state = {
        options: {
          chart: {
            shadow: {
              enabled: true,
              color: '#000',
              top: 18,
              left: 7,
              blur: 10,
              opacity: 1
            },
            toolbar: {
              show: false
            },
            events: {
                dataPointSelection: function(dataPointSelection, chartContext, config) {
                    // ...
                  }
            }
          },
          colors: ['#77B6EA', '#545454', '#B7FFB7'],
          dataLabels: {
            enabled: true,
          },
          stroke: {
            curve: 'smooth'
          },
          title: {
            text: 'John\'s Progress',
            align: 'left'
          },
          grid: {
            borderColor: '#e7e7e7',
            row: {
              colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
              opacity: 0.5
            },
          },
          markers: {
            
            size: 6
          },
          xaxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
            title: {
              text: 'Month'
            }
          },
          yaxis: {
            title: {
              text: 'Weight (lbs)'
            },
            min: 5,
            max: 40
          },
          legend: {
            position: 'top',
            horizontalAlign: 'right',
            floating: true,
            offsetY: -25,
            offsetX: -5
          }
        },
        series: [
          {
            name: "Weight",
            data: [28, 29, 33, 36, 32, 32, 33]
          },
          {
            name: "Partial Body Fat (PBF)",
            data: [12, 11, 14, 18, 17, 13, 13]
          },
          {
            name: "Body Mass Index (BMI)",
            data: [15, 17, 18, 13, 10, 8, 7]
          }
        ],
      }
    }

    handleSelection = () => {
        console.log("selected!")
    }

    render() {

      return (
        
        <div className='ui segment'>
          <div id="chart">
            <Chart options={this.state.options} series={this.state.series} type="line" height="350" />
          </div>
        </div>
      );
    }
  }

export default HistoryProgress;