import React from "react";
import Container from "../Container";
import { Button, Avatar } from "antd";
import "./Footer.css";

const TopicFooter = props => (
  <div className="footer">
    <Container>
      {props.numberOfTopics ? (
        <Avatar
          style={{ backgroundColor: "#f56a00", marginRight: "5px" }}
          size="large"
        >
          {props.numberOfTopics}
        </Avatar>
      ) : null}
      <Button onClick={() => props.handleAddTopicClickEvent()} type="primary">
        Add new Student +
      </Button>
    </Container>
  </div>
);

export default TopicFooter;
