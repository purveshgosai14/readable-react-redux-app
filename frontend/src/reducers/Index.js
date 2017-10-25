import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import PostsReducer from './PostReducer';
import CategoriesReducer from './CategoriesReducer';
import CommentReducer from './CommentReducer';

const rootReducer = combineReducers({
    posts: PostsReducer,
    categories: CategoriesReducer,
    comments: CommentReducer,
    form: formReducer
});

export default rootReducer;