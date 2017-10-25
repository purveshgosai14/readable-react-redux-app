import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import moment from 'moment';
import uuidv1 from 'uuid/v1';
import { createPost } from '../actions/PostAction';

class PostNew extends Component {
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

        this.props.createPost(values, () => {
            this.props.history.push('/');
        });
    }

    render() {
        const { handleSubmit } = this.props;

        return (
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                <div className='Form-group'>
                    <div>
                        <Field
                            label="Body:"
                            name="title"
                            component={this.renderField}
                        />
                    </div>
                </div>

                <Field
                    label="Author:"
                    name="author"
                    component={this.renderField}
                />
                <div>
                    <label>Category:<h4>Please select one category from dropdown</h4></label>
                </div>
                <Field
                    label="Category"
                    name="category"
                    component="select"
                    className="select-menu"
                >
                    <option value="">Select</option>
                    <option value="react">react</option>
                    <option value="redux">redux</option>
                    <option value="udacity">udacity</option>

                </Field>
                <hr/>
                <Field
                    label="Post Content:"
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

export default reduxForm({
    validate,
    form: 'ForNewPost'
})(
    connect(null, { createPost })(PostNew)
);