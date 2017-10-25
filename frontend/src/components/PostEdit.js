import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { editPost, getPost } from '../actions/PostAction';

class PostEdit extends Component {
    componentDidMount() {
        const {id} = this.props.match.params;
        this.props.getPost(id);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.post !== this.props.post) {
            let { title, body } = nextProps.post;
            this.props.initialize({
                title,
                body
            });
        }
    }

    renderField(field) {
        const { meta: { touched, error } } = field;
        const className = `form-group ${touched && error ? 'has-danger':'' }`;

        return (
            <div className={className} >
                <label>{field.label}</label>
                <input
                    className="form-control"
                    type="text"
                    {...field.input}
                />
                <div className="text-error">
                    {touched ? error : ''}
                </div>
            </div>
        );
    }

    onSubmit(values) {
        const {id, category} = this.props.match.params;

        this.props.editPost(id, values, () => {
            this.props.history.push(`/${category}/${id}`);
        });
    }

    render() {
        if (!this.props.post) {
            return <div>Loading...</div>
        }

        const { handleSubmit } = this.props;

        return (

            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                <Field
                    label="Title"
                    name="title"
                    component={this.renderField}
                />

                <Field
                    label="Post Content"
                    name="body"
                    component={this.renderField}
                />
                <button type="submit" className="btn btn-primary">Submit</button>
                <Link to="/" className="btn btn-danger">
                    Cancel
                </Link>
            </form>
        );
    }
}

function validate(values) {
    const errors = {};

    if (!values.title) {
        errors.title = "Enter title if you can! Lol You have too!";
    }
    if (!values.author) {
        errors.author = "Please enter name";
    }
    if (!values.category) {
        errors.category = "Enter categories, react or redux or udacity";
    }
    if (!values.body) {
        errors.body = "Do not leave blank please, enter something!";
    }

    return errors;
}

function mapStateToProps({ posts }, ownProps) {
    return {
        post: posts[ownProps.match.params.id],
    };
}

export default reduxForm({
    validate,
    form: 'ForPostEdit'
})(
    connect(mapStateToProps, { editPost, getPost })(PostEdit)
);