import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import moment from 'moment';
import {getPost, getPosts, deletePost} from '../actions/PostAction';
import { upVote, downVote, } from '../actions/VoteAction';
import { getComments } from '../actions/CommentAction';
import _ from 'lodash';

class Post extends Component {

    constructor(props){
        super(props);
        this.state ={
            totalComments : 0
        }
    }

    onUpVote(id) {
        this.props.upVote(id, () => {
            this.props.getPost(id);
        });
    }

    onDownVote(id) {
        this.props.downVote(id, () => {
            this.props.getPost(id);
        });
    }

    onDeletePost(id) {
        this.props.deletePost(id, () => {
            if(this.props.updateStatus !== undefined ) {
                this.props.updateStatus(true)
            }
        })
    }

    componentWillMount(){
        this.props.getComments(this.props.id).then((res)=>{
            this.setState({totalComments: _.size(res.payload.data)})
        })
    }


    render() {
        const {totalComments} = this.state;
        const { id, title, body, author, timestamp, category, voteScore, isDetail } = this.props;
        let comments = this.props.comments !== undefined ? this.props.comments : totalComments;

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
                    {comments ? (<i className="icon-comment"><strong>{comments} Comments </strong></i>) : <span></span>}

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

export default connect(null, { getPost, upVote, downVote, getPosts, deletePost, getComments })(Post);