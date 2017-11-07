import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { getCategoryPost } from '../actions/PostAction';
import { Link } from 'react-router-dom';
import Post from './Post';
import { getAllCategories } from '../actions/CategoryAction';
import NotFound from './NotFound'

class CategoryPosts extends Component {
    constructor(props){
        super(props);
        this.state ={
            categoryFound : false
        }
    }
    componentDidMount() {
        const {category} = this.props.match.params;
        this.props.getCategoryPost(category);
    }

    componentWillReceiveProps(nextProps){
        const {category} = this.props.match.params;
        if (this.props.match.params.category !== nextProps.match.params.category) {
            this.props.getCategoryPost(nextProps.match.params.category);
        }
        this.props.getAllCategories().then((res)=>{
            if(res.payload.data.categories.findIndex(obj => obj.name === category) !== -1){

                this.setState({categoryFound: true})
            }
        })
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
        if (!this.state.categoryFound) {
            return <NotFound />
        }
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

export default connect(mapStateToProps, { getCategoryPost, getAllCategories })(CategoryPosts);