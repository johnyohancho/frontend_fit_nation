import React from 'react';
import Chart from 'react-apexcharts';
import { Grid } from 'semantic-ui-react';
import jwt_decode from 'jwt-decode';
import { calcMacroData, calcCaloriesData, formatDate } from './Calculations';
import { getUserData } from './ApiCalls';
import { connect } from 'react-redux';
import { generateHistorySeries } from './Calculations';

class HistoryProgress extends React.Component {

  
  constructor(props) {
    super(props);

    this.state = {
      series1: [{
        data: [2100,2500,2300,2600,2000,2400,2800]
      }],
      series2: [{
        data: [100,120,140,135,80,150,140]
      }],
      series3: [{
        data: [200,180,240,235,280,150,240]
      }],
      series4: [{
        data: [110,80,60,85,105,150,70]
      }],
      chartOptionsLine1: {
        title: {
          text: 'Calories (kcal)',
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
        xaxis: {
          categories: ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'],
          title: {
            text: 'Day'
          }
        },
        yaxis: {
          title: {
            text: 'kcal'
          }
        },
        chart: {
          id: 'fb',
          group: 'social',
        },
        colors: ['#008FFB'],
      },
      chartOptionsLine2: {
        title: {
          text: 'Protein (g)',
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
        xaxis: {
          categories: ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'],
          title: {
            text: 'Day'
          }
        },
        yaxis: {
          title: {
            text: 'grams'
          }
        },
        chart: {
          id: 'tw',
          group: 'social',
        },
        colors: ['#546E7A'],
      },

      chartOptionsLine3: {
        title: {
          text: 'Carbohydrates (g)',
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
        xaxis: {
          categories: ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'],
          title: {
            text: 'Day'
          }
        },
        yaxis: {
          title: {
            text: 'grams'
          }
        },
        chart: {
          id: 'yt',
          group: 'social',
        },
        colors: ['#00E396'],
      },

        chartOptionsLine4: {
          title: {
            text: 'Fats (g)',
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
          xaxis: {
            categories: ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'],
            title: {
              text: 'Day'
            }
          },
          yaxis: {
            title: {
              text: 'grams'
            }
          },
          chart: {
            id: 'txy',
            group: 'social',
          },
          colors: ['#546E7A'],

      }
    }
  }

  componentDidMount() {
    const userId = jwt_decode(localStorage.getItem('token')).user_id
    getUserData(userId).then((data) => {
        this.props.dispatch({ type: "CLEAR_USER_DATA", data: null })
        this.props.dispatch({ type: "GET_USER_DATA", data: data })
        this.props.dispatch({ type: "GET_HISTORY_DATA", data: generateHistorySeries(data)})
        // this.props.dispatch({ type: "GET_MACRO_DATA", data: calcMacroData(data) })
        // this.props.dispatch({ type: "GET_CALORIES_DATA", data: calcCaloriesData(data) })
        }
    )
  }

  render() {

    return (
      
      <Grid columns={2}>
        <Grid.Column width={8}>
          <div id="wrapper">
            <div id="chart-line">
              <Chart type="line" height="280"  options={this.state.chartOptionsLine1} series={this.state.series1}/>
            </div>

            <div id="chart-line2">
              <Chart type="line" height="280"  options={this.state.chartOptionsLine2} series={this.state.series2}/>
            </div>
          </div>
        </Grid.Column>
        <Grid.Column width={8}>
          <div id="wrapper">
            <div id="chart-area">
              <Chart type="line" height="280"  options={this.state.chartOptionsLine3} series={this.state.series3}/>
            </div>

            <div id="chart-line3">
              <Chart type="line" height="280"  options={this.state.chartOptionsLine4} series={this.state.series4}/>
            </div>
          </div>
        </Grid.Column>
      </Grid>
    );
  }
}

let mapStateToProps = (state) => {
  let historySeries = state.session_reducer.historySeries
  let keys = Object.keys(historySeries).map(date => new Date(date)).sort((a,b)=> a-b).map(date => `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`)
  console.log(keys.map(key => historySeries[key]))
  //dates are sorted and I just need to look up each macro and push them into each arrays!!
  
  
  return {
    series1: historySeries,
  }
}


export default connect(mapStateToProps)(HistoryProgress);