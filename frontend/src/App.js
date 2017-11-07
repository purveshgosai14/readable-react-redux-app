import React, { Component } from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import PostIndex from './components/PostIndex';
import PostNew from './components/PostNew';
import PostDetail from './components/PostDetail'
import PostEdit from './components/PostEdit';
import CategoryIndex from './components/CategoryIndex';
import CategoryPost from './components/CategoryPosts';
import CommentEdit from './components/CommentEdit';
import NotFound from './components/NotFound'

class App extends Component {
    render() {
        return (
            <div className="container-fluid main">
                <div className="row">
                    <CategoryIndex />
                </div>
                <hr />
                <Switch>
                    <Route exact path="/:category/:id/comments/:commentid/edit" component={CommentEdit}></Route>
                    <Route exact path="/:category/:id/edit" component={PostEdit}></Route>
                    <Route exact path="/:category/:id" component={PostDetail}></Route>
                    <Route exact path="/posts" component={PostNew} ></Route>
                    <Route exact path="/:category" component={CategoryPost} ></Route>
                    <Route path="/" component={PostIndex}></Route>
                    <Route component= {NotFound}/>
                </Switch>
            </div>
        );
    }
}

export default App;
