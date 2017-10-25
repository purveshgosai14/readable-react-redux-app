import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { getComments, createComment } from '../actions/CommentAction';
import moment from 'moment';
import uuidv1 from 'uuid/v1';

class CommentMain extends Component {

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
        values["id"] = uuidv1();
        values["timestamp"] = moment().format();
        values["parentId"] = this.props.post_id;

        this.props.createComment(values, () => {
            this.props.getComments(this.props.post_id);
        });
    }

    render() {
        const { handleSubmit } = this.props;

        return (
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                <Field
                    label="Author"
                    name="author"
                    component={this.renderField}

                />
                <Field
                    label="Comment Content"
                    name="body"
                    component={this.renderField}
                />
                <button type="submit" className="btn btn-primary">Comment</button>
            </form>
        );
    }
}

function validate(values) {
    const errors = {};

    if (!values.author) {
        errors.author = "Please enter name";
    }
    if (!values.body) {
        errors.body = 'Please enter content for comment';
    }

    return errors;
}

export default reduxForm({
    validate,
    form: 'ForNewComments'
})(
    connect(null, { getComments, createComment })(CommentMain)
);