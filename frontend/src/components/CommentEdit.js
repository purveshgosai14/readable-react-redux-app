import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { editComment, getComments } from '../actions/CommentAction';

class CommentEdit extends Component {
    componentDidMount() {
        const {id} = this.props.match.params;
        this.props.getComments(id);
    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps.comment)
        if (nextProps.comment !== this.props.comment) {
            let {  body } = nextProps.comment;
            this.props.initialize({
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
        const {id, commentid, category} = this.props.match.params;

        this.props.editComment(commentid, values, () => {
            this.props.history.push(`/${category}/${id}`);
        });
    }

    render() {
        if (!this.props.comment) {
            return <div>Loading...</div>
        }

        const { handleSubmit } = this.props;

        return (

            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                <Field
                    label="Comment Content"
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

    if (!values.body) {
        errors.body = 'Please enter something!';
    }

    return errors;
}

function mapStateToProps({ comments }, ownProps) {
    return {
        comment: comments[ownProps.match.params.commentid],
    };
}

export default reduxForm({
    validate,
    form: 'ForCommentEdit'
})(
    connect(mapStateToProps, { editComment, getComments })(CommentEdit)
);