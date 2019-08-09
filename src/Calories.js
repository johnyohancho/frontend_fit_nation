import React from 'react';
import { Container, Header } from 'semantic-ui-react';
import { connect } from 'react-redux';
import Chart from 'react-apexcharts';

class Calories extends React.Component {
      
    constructor(props) {
        super(props);

        this.state = {
          options: {
            plotOptions: {
              radialBar: {
                hollow: {
                  size: '30%',
                }
              },
            },
            title: {
                text: 'Calories',
                align: 'left',
                margin: 0,
                style: {
                  fontSize:  '22px',
                  color:  'black'
                }
                },
            labels: ['Consumed', 'Exceeded']
          }
        }
      }

    render() {
      return (
        <Container>
          <div id="chart">
            <Chart options={this.state.options} series={this.props.series} type="radialBar" height="350" />
          </div>
          {/* <Header sub>{this.props.userData.user_setting ? `${this.props.caloriesConsumed}/${this.props.userData.user_setting.set_calories}` : null}</Header> */}
        </Container>


      );
    }
}

let mapStateToProps = (state) => {

  return {
    series: state.session_reducer.caloriesSeries,
    userData: state.session_reducer.userData,

  }
}

export default connect(mapStateToProps)(Calories);