import React from 'react';
import { connect } from 'react-redux';
import ResultCard from './ResultCard/ResultCard';



const SearchResults = (props) => {
    return (
        <div className='ui container'>
            {props.search_results.length > 0 ?
            props.search_results[0].map(resultData => <ResultCard result={resultData}/>)
            :
            null
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