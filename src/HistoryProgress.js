import React from 'react';
import Chart from 'react-apexcharts';
import { Segment, Grid } from 'semantic-ui-react';

function generateDayWiseTimeSeries(baseval, count, yrange) {
  let i = 0;
  let series = [];
  while (i < count) {
    let x = baseval;
    let y = Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;

    series.push([x, y]);
    baseval += 86400000;
    i++;
  }
  return series;
}

class HistoryProgress extends React.Component {

  
  constructor(props) {
    super(props);

    this.state = {
      series1: [{
        data: generateDayWiseTimeSeries(new Date('11 Feb 2017').getTime(), 20, {
          min: 10,
          max: 60
        })
      }],
      series2: [{
        data: generateDayWiseTimeSeries(new Date('11 Feb 2017').getTime(), 20, {
          min: 10,
          max: 30
        })
      }],
      series3: [{
        data: generateDayWiseTimeSeries(new Date('11 Feb 2017').getTime(), 20, {
          min: 10,
          max: 90
        })
      }],
      chartOptionsLine1: {
        title: {
          text: 'Weight (lbs)',
          align: 'left',
          margin: 10,
          offsetX: 0,
          offsetY: 0,
          floating: false,
          style: {
            fontSize:  '22px',
            color:  'black'
          },
        },
        chart: {
          id: 'fb',
          group: 'social',
        },
        colors: ['#008FFB'],
      },
      chartOptionsLine2: {
        title: {
          text: 'Body Mass Index',
          align: 'left',
          margin: 10,
          offsetX: 0,
          offsetY: 0,
          floating: false,
          style: {
            fontSize:  '22px',
            color:  'black'
          },
        },
        chart: {
          id: 'tw',
          group: 'social',
        },
        colors: ['#546E7A'],

      },
      chartOptionsArea: {
        title: {
          text: 'Partial Body Fat (%)',
          align: 'left',
          margin: 10,
          offsetX: 0,
          offsetY: 0,
          floating: false,
          style: {
            fontSize:  '22px',
            color:  'black'
          },
        },
        chart: {
          id: 'yt',
          group: 'social',
        },
        colors: ['#00E396'],

      }
    }
  }

  render() {

    return (
      

      <div id="wrapper">
        <div id="chart-line">
          <Chart type="line" height="160"  options={this.state.chartOptionsLine1} series={this.state.series1}/>
        </div>

        <div id="chart-line2">
          <Chart type="line" height="160"  options={this.state.chartOptionsLine2} series={this.state.series2}/>
        </div>

        <div id="chart-area">
          <Chart type="area" height="160"  options={this.state.chartOptionsArea} series={this.state.series3}/>
        </div>
      </div>

    );
  }
}


export default HistoryProgress;