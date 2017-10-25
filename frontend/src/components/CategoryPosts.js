import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { getCategoryPost } from '../actions/PostAction';
import { Link } from 'react-router-dom';
import Post from './Post';

class CategoryPosts extends Component {
    componentDidMount() {
        const {category} = this.props.match.params;
        this.props.getCategoryPost(category);
    }

    componentWillReceiveProps(nextProps){

        if (this.props.match.params.category !== nextProps.match.params.category) {
            this.props.getCategoryPost(nextProps.match.params.category);
        }
    }

    renderPosts() {
        return _.map(this.props.posts, post => {
            const { id, title, body, author, timestamp, category, voteScore } = post;

            return (
                <Post key={id} id={id} title={title} body={body} author={author}
                      timestamp={timestamp} category={category} voteScore={voteScore} isDetail={false}/>
            );
        });
    }

    render() {
        return (
            <div>
                <div>
                    <Link className="btn btn-primary" to="/posts">
                        Add New Post
                    </Link>
                </div>
                <div className="row">
                    <div className="col-md-4"></div>
                    <div className="col-md-8">
                        {this.renderPosts()}
                    </div>
                    <div className="col-md-2"></div>
                </div>
            </div>
        );
    }
}

function mapStateToProps({ posts }) {
    return {
        posts
    }
}

export default connect(mapStateToProps, { getCategoryPost })(CategoryPosts);