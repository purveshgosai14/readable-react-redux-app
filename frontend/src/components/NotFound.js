import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div>
            <h3>404 page not found</h3>
            <h4>We are sorry but the page you are looking for does not exist, please <Link to='/'>click here </Link> to go back</h4>
        </div>
    )
};

export default NotFound;