import React from 'react';
import ResultCard from './ResultCard';
import { connect } from 'react-redux';



const SearchResults = (props) => {
    return (
        <div className='ui container'>
            {props.search_results === undefined ?
            null
            :
            props.search_results.map(resultData => <ResultCard result={resultData}/>)
            }
        </div>
    )
};

let mapStateToProps = (state) => {
    let searchResults = state.meal_reducer.search_results
    return {
        search_results: searchResults
    }
}



export default connect(mapStateToProps)(SearchResults);