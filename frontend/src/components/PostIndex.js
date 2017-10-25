import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { getPosts } from '../actions/PostAction';
import { Link } from 'react-router-dom';
import Post from './Post';
import sortBy from 'sort-by';

class PostIndex extends Component {
    state={
        sort: "voteScore"
    };

    componentDidMount() {
        this.props.getPosts();
    }

    onSortByVote() {
        this.setState({sort: "voteScore"});
    }

    onSortByTime() {
        this.setState({sort: "timestamp"});
    }

    renderPosts() {
        let postSort = _.values(this.props.posts);
        postSort.sort(sortBy(`-${this.state.sort}`));

        return _.map(postSort, post => {
            const { id, title, body, author, timestamp, category, voteScore } = post;

            return (
                <div key={id} className="post-section">
                    <Post
                        key={id}
                        id={id}
                        title={title}
                        body={body}
                        author={author}
                        timestamp={timestamp}
                        category={category}
                        voteScore={voteScore}
                        isDetail={false}
                    />
                </div>
            );
        });
    }

    render() {

        return (
            <div>
                <div className="row">
                    <div className="float-xs-right">
                        <span className="sort-by">
                            Sort By:
                        </span>
                        <button
                            className="btn btn-mdb"
                            onClick={this.onSortByTime.bind(this)}
                        >
                            Date
                        </button>
                        <button className="btn btn-mdb"
                                onClick={this.onSortByVote.bind(this)}
                        >
                            Votes
                        </button>
                    </div>
                </div>
                <div className="float-xs-left">
                    <Link to="/posts">
                        <i className="material-icons circle-button">add_circle_outline</i>
                    </Link>
                    <div className="new-post">Add New Post</div>
                </div>
                <div className="row">
                    <div className="col-md-2"></div>
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

export default connect(mapStateToProps, { getPosts })(PostIndex);