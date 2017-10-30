    import React, { Component } from 'react';
    import { Link } from 'react-router-dom';
    import { connect } from 'react-redux';
    import moment from 'moment';
    import {getPosts, deletePost} from '../actions/PostAction';
    import { upVote, downVote, } from '../actions/VoteAction';

    class Post extends Component {

        onUpVote(id) {
            this.props.upVote(id, () => {
                this.props.getPosts();
            });
        }

        onDownVote(id) {
            this.props.downVote(id, () => {
                this.props.getPosts();
            });
        }

        onDeletePost(id) {
            this.props.deletePost(id, () => {
                this.props.getPosts();
            });
        }

        render() {
            const { id, title, body, author, timestamp, category, voteScore, isDetail, comments } = this.props;
            return (
                <div className="text-left" >
                    <div className="row">
                        <h2>
                            <strong>
                                {isDetail
                                    ? title
                                    : <Link to={`/${category}/${id}`}>
                                        {title}
                                    </Link>
                                }
                            </strong>
                        </h2>
                    </div>

                    <div className="row">
                        <h4>
                            {body}
                        </h4>
                    </div>

                    <div className="row row-icon">
                        <i>
                            <i className="material-icons md-">face</i>
                            <span className="author">
                                {author}
                            </span>
                        </i>

                        <i className="fa fa-arrows-v">
                            <i className="vote-score"> voteScore: {voteScore} </i>
                        </i>

                        <i className="fa fa-calendar">
                            {moment(timestamp).format('LLLL')}
                        </i>

                        <i>Category : <span className="label label-info">{category}</span></i>
                        {comments ? (<i className="icon-comment">{comments} Comments</i>) : <span></span>}

                        <div className="all-buttons">
                            <i className="fa fa-thumbs-up fa-2x" onClick={this.onUpVote.bind(this, id)}>
                            </i>
                            <i className="fa fa-thumbs-down fa-2x" onClick={this.onDownVote.bind(this, id)}>
                            </i>
                            <i title="Delete Post" className="material-icons delete-button" onClick={this.onDeletePost.bind(this, id)}>
                                delete
                            </i>
                            <Link title="Edit Post" to={`/${category}/${id}/edit`}>
                                <i className="material-icons">
                                    mode_edit
                                </i>
                            </Link>
                        </div>
                    </div>
                </div>
            );
        }
    }
    export default connect(null, { upVote, downVote, getPosts, deletePost })(Post);