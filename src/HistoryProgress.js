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
          categories: [],
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
          categories: [],
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
          categories: [],
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
            categories: [],
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
        //need to update the state with new xaxis labels
        }
    )
  }

  render() {

    return (
      
      <Grid columns={2}>
        <Grid.Column width={8}>
          <div id="wrapper">
            <div id="chart-line">
              <Chart type="line" height="280"  options={this.state.chartOptionsLine1} series={this.props.series1}/>
            </div>

            <div id="chart-line2">
              <Chart type="line" height="280"  options={this.state.chartOptionsLine2} series={this.props.series2}/>
            </div>
          </div>
        </Grid.Column>
        <Grid.Column width={8}>
          <div id="wrapper">
            <div id="chart-area">
              <Chart type="line" height="280"  options={this.state.chartOptionsLine3} series={this.props.series3}/>
            </div>

            <div id="chart-line3">
              <Chart type="line" height="280"  options={this.state.chartOptionsLine4} series={this.props.series4}/>
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
  let historyCal = []
  let historyPro = []
  let historyCarbs = []
  let historyFat = []

  keys.forEach(key => (historyCal.push(historySeries[key].calories),
  historyPro.push(historySeries[key].protein),
  historyCarbs.push(historySeries[key].carbs),
  historyFat.push(historySeries[key].fat)
  ))
  
  return {
    series1: [{
      data: historyCal
    }],
    series2: [{
      data: historyPro
    }],
    series3: [{
      data: historyCarbs
    }],
    series4: [{
      data: historyFat
    }],
    xAxis: keys
  }
}


export default connect(mapStateToProps)(HistoryProgress);