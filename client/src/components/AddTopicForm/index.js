import React, { Component } from "react";
import { Formik } from "formik";
import { Input, Button, Tag } from "antd";

const inputBottomMargin = { marginBottom: "5px" };
const tagStyle = {
  backgroundColor: "#f50",
  color: "white",
  ...inputBottomMargin
};

class AddTopicForm extends Component {
  render() {
    return (
      <Formik
        initialValues={{ name: "", user: "", hours: "" }}
        validate={values => {
          const errors = {};

          if (!values.name) {
            errors.name = "Topic Name Required";
          }
          if (!values.user) {
            errors.user = "User Name Required";
          }
          if (!values.hours) {
            errors.hours = "Hours are Required";
          }
        }}
        onSubmit={(topic, { setSubmitting }) => {
          alert(JSON.stringify(topic));
          // Do dtudent then add
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          submitForm,
          isValid
          /* and other goodies */
        }) => (
          <form onSubmit={handleSubmit}>
            <Input
              style={inputBottomMargin}
              name="name"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.name}
              placeholder="Topic Name. E.g. Marathon"
            />
            {errors.name && touched.name && (
              <Tag style={tagStyle}>{errors.name}</Tag>
            )}
            <Input
              style={inputBottomMargin}
              name="user"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.user}
              placeholder="User Name. E.g. John Smith"
            />
            {errors.lastName && touched.lastName && (
              <Tag style={tagStyle}>{errors.lastName}</Tag>
            )}
            <Input
              style={inputBottomMargin}
              name="hours"
              type="hours"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.hours}
              placeholder="hours E.g. 3.5"
            />
            {errors.hours && touched.hours && (
              <Tag style={tagStyle}>{errors.email}</Tag>
            )}
            <Button
              onClick={() => submitForm()}
              type="submit"
              disabled={isSubmitting || (touched && !isValid)}
            >
              Submit
            </Button>
          </form>
        )}
      </Formik>
    );
  }
}

export default AddTopicForm;
