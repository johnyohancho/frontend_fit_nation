import React from 'react';
import ResultCard from './ResultCard';
import { connect } from 'react-redux';
import { Segment, Header, Dimmer, Loader } from 'semantic-ui-react';



const SearchResults = (props) => {
    if (props.searching === true) {
        return (
            <div>
                <Dimmer active inverted>
                    <Loader>Loading</Loader>
                </Dimmer>
            </div>
        )
    } else {
        return (
            <Segment>
                <div className='ui container' id='search-results'>
                    {props.search_results === undefined || props.search_results.length < 1 ?
                    <Header> Search Not Found </Header>
                    :
                    props.search_results.map(resultData => <ResultCard result={resultData}/>)
                    }
                </div>
            </Segment>
        )
    };
};

let mapStateToProps = (state) => {
    let searchResults = state.meal_reducer.search_results
    let searching = state.meal_reducer.searching

    return {
        search_results: searchResults,
        searching: searching
    }
}



export default connect(mapStateToProps)(SearchResults);