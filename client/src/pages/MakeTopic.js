import React, { Component } from "react";
import "../App.css";
import Container from "../components/Container";
import TopicFooter from "../components/TopicFooter";
import { Table, Avatar, Spin, Icon, Modal } from "antd";
import AddTopicForm from "../components/AddTopicForm";
import API from "../utils/API";

class MakeTopic extends Component {
  state = {
    topics: [],
    isFetching: false,
    isAddTopicModalVisible: false
  };

  componentDidMount() {
    this.fetchTopics();
  }

  openAddTopicModal = () => this.setState({ isAddTopicModalVisible: true });
  closeAddTopicModal = () => this.setState({ isAddTopicModalVisible: false });

  fetchTopics = () => {
    this.setState({
      isFetching: false
    });
    API.getTopic()
      .then(res =>
        this.setState({
          topics: res.data,
          isFetching: false,
          isAddTopicModalVisible: false
        })
      )
      .catch(err => console.log(err));
  };

  render() {
    const { topics, isFetching, isAddTopicModalVisible } = this.state;

    if (isFetching) {
      return (
        <Container>
          <Spin />
        </Container>
      );
    }

    if (topics && topics.length) {
      const columns = [
        {
          title: "",
          dataIndex: "avatar",
          render: (text, topics) => (
            <Avatar size="large">
              {`${topics.name.charAt(0).toUpperCase()}`}
            </Avatar>
          )
        },
        {
          name: "Topic ID",
          dataIndex: "topicId",
          key: "topicId"
        },
        {
          title: "Topic Name",
          dataIndex: "name",
          key: "name"
        },
        {
          title: "User",
          dataIndex: "user",
          key: "user"
        },
        {
          title: "Hours Scheduled",
          dataIndex: "hours",
          key: "hours"
        }
      ];

      return (
        <Container>
          <Table
            style={{ marginBottom: "100px" }}
            dataSource={topics}
            columns={columns}
            pagination={false}
            rowKey="topicID"
          />
          <Modal
            title="Add new topic"
            visible={isAddTopicModalVisible}
            onOk={this.closeAddTopicModal}
            onCancel={this.closeAddTopicModal}
            width={1000}
          >
            <AddTopicForm handleReload={this.fetchTopics.bind(this)} />
          </Modal>
          <TopicFooter
            handleAddTopicClickEvent={this.openAddTopicModal}
            numberOfTopics={topics.length}
          ></TopicFooter>
        </Container>
      );
    }

    return <h1>No Topic Found</h1>;
  }
}

export default MakeTopic;
