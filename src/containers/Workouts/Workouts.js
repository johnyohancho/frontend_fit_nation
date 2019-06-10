import React from 'react';

const Workouts = () => {
    return (
        <div id='meals-page' className='ui grid'>
            <div className='eight wide column'>
                <div id='meals-container' className='ui container'>
                    <h2 className='ui header'>Workouts</h2>
                        <table id='breakfast-table' class="ui striped table">
                            <thead class="">
                                <tr class="">
                                <th class="">Name</th>
                                <th class="">Date Joined</th>
                                <th class="">E-mail</th>
                                <th class="">Called</th>
                                </tr>
                            </thead>
                            <tbody class="">
                                <tr class="">
                                <td class="">John Lilki</td>
                                <td class="">September 14, 2013</td>
                                <td class="">jhlilk22@yahoo.com</td>
                                <td class="">No</td>
                                </tr>
                                <tr class="">
                                <td class="">Jamie Harington</td>
                                <td class="">January 11, 2014</td>
                                <td class="">jamieharingonton@yahoo.com</td>
                                <td class="">Yes</td>
                                </tr>
                                <tr class="">
                                <td class="">Jill Lewis</td>
                                <td class="">May 11, 2014</td>
                                <td class="">jilsewris22@yahoo.com</td>
                                <td class="">Yes</td>
                                </tr>
                                <tr class="">
                                <td class="">John Lilki</td>
                                <td class="">September 14, 2013</td>
                                <td class="">jhlilk22@yahoo.com</td>
                                <td class="">No</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            <div className='eight wide column'>
                <h2 className='ui header'>Look Up Workouts</h2>
                    <div className="item">
                        <div className="ui icon input">
                            <input type="text" placeholder="Search..." /><i aria-hidden="true" className="search icon"></i>
                        </div>
                    </div>
            </div>
        </div>
    )
}


export default Workouts;