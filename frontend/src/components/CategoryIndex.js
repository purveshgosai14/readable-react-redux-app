import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class CategoryIndex extends Component {


    render() {
        return (
            <div className="Header">
                <div className='Left'>
                    <h1 className='Logo'>
                        <Link to='/'>Readable</Link>
                    </h1>
                </div>
            </div>
        );
    }

}
export default CategoryIndex