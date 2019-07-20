import React from 'react';
import ResultCard from './ResultCard';
import { connect } from 'react-redux';
import { Segment, Header } from 'semantic-ui-react';



const SearchResults = (props) => {
    return (
        <Segment>
            <div className='ui container' id='search-results'>
                {props.search_results === undefined ?
                <Header> Search Not Found </Header>
                :
                props.search_results.map(resultData => <ResultCard result={resultData}/>)
                }
            </div>
        </Segment>
    )
};

let mapStateToProps = (state) => {
    let searchResults = state.meal_reducer.search_results
    return {
        search_results: searchResults
    }
}



export default connect(mapStateToProps)(SearchResults);