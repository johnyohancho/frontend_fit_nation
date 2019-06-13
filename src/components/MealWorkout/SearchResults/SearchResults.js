import React from 'react';
import ResultCard from './ResultCard/ResultCard';



const SearchResults = (props) => {
    return (
        <div className='ui container'>
            {console.log(props)}
            {/* {props.search_results[0] === undefined ?
            null
            :
            props.search_results[0].map(resultData => <ResultCard result={resultData}/>)
            } */}
        </div>
    )
};



export default SearchResults;