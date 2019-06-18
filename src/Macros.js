import React from 'react';
import { Container } from 'semantic-ui-react';
import Chart from 'react-apexcharts';


class Macros extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
        options: {
            chart: {
            stacked: true,
            },
            plotOptions: {
            bar: {
                horizontal: true,
            },

            },
            stroke: {
            width: 1,
            colors: ['#fff']
            },

            title: {
            text: 'Today\'s Macros'
            },
            xaxis: {
            categories: ["calories", "protein", "carbs", "fats"],
            labels: {
                formatter: function (val) {
                return val + "K"
                }
            }
            },
            yaxis: {
            title: {
                text: undefined
            },

            },
            tooltip: {
            y: {
                formatter: function (val) {
                return val + "K"
                }
            }
            },
            fill: {
            opacity: 1

            },

            legend: {
            position: 'top',
            horizontalAlign: 'left',
            offsetX: 40
            }
        },
        series: [{
            name: 'Consumed',
            data: [44, 55, 41]
        }, {
            name: 'Left',
            data: [53, 32, 33]
        }, {
            name: 'Exceeded',
            data: [12, 17, 0]
        }],
        }
    }

    render() {
        return (
        
        <Container>
            <div id="chart">
                <Chart options={this.state.options} series={this.state.series} type="bar" height="350" />
            </div>
        </Container>    
        );
    }
}

export default Macros;