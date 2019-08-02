import React from 'react';
import { Container } from 'semantic-ui-react';
import Chart from 'react-apexcharts';
import { connect } from 'react-redux';


class Macros extends React.Component {

    constructor() {
        super()

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
            text: 'Macros'
            },
            xaxis: {
            categories: ["protein", "carbs", "fats"],
            labels: {
                formatter: function (val) {
                return val + "g"
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
                return val + " (g)"
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
        }
    }
}


    render() {
        return (
        <Container>
            <div id="chart">
                <Chart options={this.state.options} series={this.props.series} type="bar" height="350" />
            </div>
        </Container>    
        );
    }
}

let mapStateToProps = (state) => {
    return {
      series: state.session_reducer.macroSeries
    }
}

export default connect(mapStateToProps)(Macros);