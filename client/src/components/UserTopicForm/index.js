import React from "react";
import { Formik } from "formik";
import { Input, Button, Tag } from "antd";
import API from "../../utils/API";

const inputBottomMargin = { marginBottom: "5px" };
const tagStyle = {
  backgroundColor: "#f50",
  color: "white",
  ...inputBottomMargin
};

const UserTopicForm = props => (
  <Formik
    initialValues={{ name: "", hours: "" }}
    validate={values => {
      const errors = {};

      if (!values.name) {
        errors.name = "Topic Name Required";
      } else if (props.userTopics.indexOf(values.name) === -1) {
        errors.name = "Use an existing topic";
      }
      if (!values.hours) {
        errors.hours = "Hours are Required";
      } else if (
        !/^\d+$/.test(values.hours) &&
        !/^\d+\.\d+$/.test(values.hours)
      ) {
        errors.hours = "Please enter a number";
      }
      return errors;
    }}
    onSubmit={(topic, { setSubmitting }) => {
      API.saveTopic({
        name: topic.name,
        user: props.userName,
        hours: topic.hours
      }).catch(err => console.log(err));
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
          name="hours"
          type="hours"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.hours}
          placeholder="hours E.g. 3.5"
        />
        {errors.hours && touched.hours && (
          <Tag style={tagStyle}>{errors.hours}</Tag>
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

export default UserTopicForm;
