import React from 'react';
import { Container } from 'semantic-ui-react';
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
                text: 'Calories'
                },
            labels: ['Consumed', 'Exceeded']
          },
          series: [100, 50]
        }
      }

    render() {
      return (
        

        <Container>
          <div id="chart">
            <Chart options={this.state.options} series={this.state.series} type="radialBar" height="350" />
          </div>
        </Container>


      );
    }
}

export default Calories;