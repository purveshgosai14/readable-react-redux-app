import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Post from './Post';
import _ from 'lodash';
import sortBy from 'sort-by';
import Comment from './Comment';
import CommentBox from './CommentMain';
import { getComments, deleteComment } from '../actions/CommentAction';
import { getPost, deletePost } from '../actions/PostAction';
import NotFound from './NotFound'
import { getAllCategories } from '../actions/CategoryAction';

class PostDetail extends Component {

    constructor(props){
        super(props);
        this.state ={
            deleted : false
        }
    }
    componentDidMount() {
        const {id, category} = this.props.match.params;
        this.props.getAllCategories().then((res)=>{
            if(res.payload.data.categories.findIndex(obj => obj.name === category) !== -1){
                this.props.getPost(id);
                this.props.getComments(id);
            }
        })

    }

    renderComments(category) {
        let commentsSorted = _.values(this.props.comments);
        commentsSorted.sort(sortBy('-voteScore'));

        return _.map(commentsSorted, comment => {
            const {id, timestamp, author, body, voteScore, parentId } = comment;

            return (
                <div key={id}>
                    <Comment
                        id={id}
                        timestamp={timestamp}
                        author={author}
                        body={body}
                        voteScore={voteScore}
                        post_id={parentId}
                        category={category}
                    />
                </div>
            );
        });
    }

    updateStatus(status){
        this.setState({deleted : status})
    }

    render() {
        const { post } = this.props;
        const { deleted } = this.state;

        if(deleted){
            return <h2>No post found, please <Link to="/">click here </Link>to go back!</h2>
        }
        if (!post) {
            return <NotFound />
        }

        const { id, title, body, author, timestamp, category, voteScore } = post;

        return (
            <div className="container">
                <div className="row">
                    <Link to="/"><i className="fa fa-close fa-3x"></i></Link>
                </div>
                <div className="col-md-1"></div>
                <div className="col-md-10">
                    <Post
                        id={id}
                        title={title}
                        body={body}
                        author={author}
                        timestamp={timestamp}
                        category={category}
                        voteScore={voteScore}
                        isDetail={true}
                        comments={_.size(this.props.comments)}
                        updateStatus={this.updateStatus.bind(this)}
                    />
                    <div>
                        <CommentBox post_id={id} history={this.props.history}/>
                    </div>
                    <div>
                        { this.renderComments(category) }
                    </div>
                </div>
                <div className="col-md-1"></div>
            </div>
        );
    }
}

function mapStateToProps({ posts, comments }, ownProps) {
    return {
        post: posts[ownProps.match.params.id],
        comments
    };
}

export default connect(mapStateToProps, { getPost, deletePost, getComments, deleteComment,getAllCategories  })(PostDetail);