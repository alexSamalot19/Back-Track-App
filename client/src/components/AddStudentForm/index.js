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

const AddStudentForm = props => (
  <Formik
    initialValues={{ firstName: "", lastName: "", email: "", topics: [] }}
    validate={values => {
      const errors = {};

      if (!values.firstName) {
        errors.firstName = "First Name Required";
      }
      if (!values.lastName) {
        errors.lastName = "Last Name Required";
      }
      if (!values.email) {
        errors.email = "Email is Required";
      }

      if (!values.email) {
        errors.email = "Required";
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
      ) {
        errors.email = "Invalid email address";
      }

      if (!values.topics) {
        errors.topics = "Topics are Required";
      }
    }}
    onSubmit={(student, { setSubmitting }) => {
      alert(JSON.stringify(student));
      API.saveStudent({
        first_name: student.firstName,
        last_name: student.lastName,
        email: student.email,
        topics: student.topics
      })
        .then(res => props.handleReload())
        .catch(err => console.log(err));
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
          name="firstName"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.firstName}
          placeholder="First Name. E.g. John"
        />
        {errors.firstName && touched.firstName && (
          <Tag style={tagStyle}>{errors.firstName}</Tag>
        )}
        <Input
          style={inputBottomMargin}
          name="lastName"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.lastName}
          placeholder="Last Name. E.g. Smith"
        />
        {errors.lastName && touched.lastName && (
          <Tag style={tagStyle}>{errors.lastName}</Tag>
        )}
        <Input
          style={inputBottomMargin}
          name="email"
          type="email"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.email}
          placeholder="email. E.g. john.smith@hotmail.com"
        />
        {errors.email && touched.email && (
          <Tag style={tagStyle}>{errors.email}</Tag>
        )}
        <Input
          style={inputBottomMargin}
          name="topics"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.topics}
          placeholder="Topics E.g. Marathon"
        />
        {errors.topics && touched.topics && (
          <Tag style={tagStyle}>{errors.topics}</Tag>
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

export default AddStudentForm;
