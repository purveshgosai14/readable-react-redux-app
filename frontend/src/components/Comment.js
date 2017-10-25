import React, { Component } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { upVoteComment, downVoteComment, getComments, deleteComment } from '../actions/CommentAction';
import { Link } from 'react-router-dom';

class Comment extends Component {
    onUpVoteComment(id) {
        this.props.upVoteComment(id, () => {
            this.props.getComments(this.props.post_id);
        });
    }

    onDownVoteComment(id) {
        this.props.downVoteComment(id, () => {
            this.props.getComments(this.props.post_id);
        });
    }

    onDeleteCommentClick(id) {
        this.props.deleteComment(id, () => {

        });
    }

    render() {
        const { id, author, body, timestamp, voteScore, post_id, category } = this.props;

        return (

            <div className="row comment">
                <div className="col-md-1"></div>
                <div className="col-md-9">
                    <div>
                        <div className="body-message">
                            <strong>{body}</strong>
                        </div>
                        <div className="row-icon">
                            <i className="material-icons md-">face</i>
                            <span className="vote-score">{author}</span> &nbsp;<strong>{moment(timestamp).format('LLLL')}</strong>
                            <i className="vote-score"><strong>voteScore: {voteScore}</strong></i>
                            <i className="fa fa-thumbs-up fa-2x" onClick={this.onUpVoteComment.bind(this, id)} >
                            </i>
                            <i className="fa fa-thumbs-down fa-2x" onClick={this.onDownVoteComment.bind(this, id)} >
                            </i>

                        </div>

                        <div className="comment-link">
                            <Link to={`/${category}/${post_id}/comments/${id}/edit`} className="comment-link">
                                <i className="fa fa-comment "> &nbsp; Edit Comment</i>
                            </Link>
                            <button onClick={this.onDeleteCommentClick.bind(this, id)} className="comment-link">
                                <i className="fa fa-trash">&nbsp; Delete Comment</i>
                            </button>
                        </div>
                    </div>
                </div>
                <div className="col-md-2"></div>
            </div>
        );
    }
}

export default connect(null, {upVoteComment, downVoteComment, getComments, deleteComment})(Comment);