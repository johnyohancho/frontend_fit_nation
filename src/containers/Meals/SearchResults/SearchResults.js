import React from 'react';
import { connect } from 'react-redux';



const SearchResults = (props) => {
    return (
        <div className='ui container'>
            {props.search_results.map(food => console.log("foods",food))}
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