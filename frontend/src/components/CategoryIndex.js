import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAllCategories } from '../actions/CategoryAction';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import './header.css';

class CategoryIndex extends Component {
    componentDidMount() {
        this.props.getAllCategories();
    }

    renderCategories() {
        return _.map(this.props.categories, category => {
            return (
                <li key={category.name} className="nav-item">
                    <Link to={`/${category.path}`} className="nav-link">
                        {category.name}
                    </Link>
                </li>
            );
        });
    }

    render() {
        return (
            <div className="Header">
                <div className="all-categories">
                    <h1 className="left-readable">
                        <Link to='/'>Readable</Link>
                    </h1>
                </div>
                <ul className="nav nav-pills ">
                    <li className="nav-item">
                        <Link className="nav-link" to="/" >
                            All
                        </Link>
                    </li>
                    {this.renderCategories()}
                </ul>
            </div>
        );
    }
}

function mapStateToProps({ categories }) {
    return {
        categories
    }
}

export default connect(mapStateToProps, { getAllCategories })(CategoryIndex);