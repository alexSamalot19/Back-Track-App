import React from "react";
import Container from "../Container";
import { Button, Avatar } from "antd";
import "./Footer.css";
import { Link } from "react-router-dom";

const StudentFooter = props => (
  <div className="footer">
    <Container>
      {props.numberOfStudents ? (
        <Avatar
          style={{ backgroundColor: "#f56a00", marginRight: "5px" }}
          size="large"
        >
          {props.numberOfStudents}
        </Avatar>
      ) : null}
      <Button onClick={() => props.handleAddStudentClickEvent()} type="dark">
        Add new Student +
      </Button>
      <Link to={"../"}>
        <Button type="dark">Home</Button>
      </Link>
    </Container>
  </div>
);

export default StudentFooter;
