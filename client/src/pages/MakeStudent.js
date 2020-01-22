import React, { Component } from "react";
import "../App.css";
import Container from "../components/Container";
import StudentFooter from "../components/StudentFooter";
import { Table, Avatar, Spin, Icon, Modal } from "antd";
import AddStudentForm from "../components/AddStudentForm";
import API from "../utils/API";

class MakeStudent extends Component {
  state = {
    students: [],
    isFetching: false,
    isAddStudentModalVisible: false
  };

  componentDidMount() {
    this.fetchStudents();
  }

  openAddStudentModal = () => this.setState({ isAddStudentModalVisible: true });
  closeAddStudentModal = () =>
    this.setState({ isAddStudentModalVisible: false });

  fetchStudents = () => {
    this.setState({
      isFetching: false
    });
    API.getStudent()
      .then(res =>
        this.setState({
          students: res.data,
          isFetching: false,
          isAddStudentModalVisible: false
        })
      )
      .catch(err => console.log(err));
  };

  render() {
    const { students, isFetching, isAddStudentModalVisible } = this.state;

    if (isFetching) {
      return (
        <Container>
          <Spin />
        </Container>
      );
    }

    if (students && students.length) {
      const columns = [
        {
          title: "",
          dataIndex: "avatar",
          render: (text, students) => (
            <Avatar size="large">
              {`${students.first_name
                .charAt(0)
                .toUpperCase()}${students.last_name.charAt(0).toUpperCase()}`}
            </Avatar>
          )
        },
        {
          title: "Student Id",
          dataIndex: "studentId",
          key: "studentId"
        },
        {
          title: "First Name",
          dataIndex: "firstName",
          key: "firstName"
        },
        {
          title: "Last Name",
          dataIndex: "lastName",
          key: "lastName"
        },
        {
          title: "Email",
          dataIndex: "email",
          key: "email"
        },
        {
          title: "Topics",
          dataIndex: "topics",
          key: "topics"
        }
      ];

      return (
        <Container>
          <Table
            style={{ marginBottom: "100px" }}
            dataSource={students}
            columns={columns}
            pagination={false}
            rowKey="studentID"
          />
          <Modal
            title="Add new student"
            visible={isAddStudentModalVisible}
            onOk={this.closeAddStudentModal}
            onCancel={this.closeAddStudentModal}
            width={1000}
          >
            <AddStudentForm handleReload={this.fetchStudents.bind(this)} />
          </Modal>
          <StudentFooter
            handleAddStudentClickEvent={this.openAddStudentModal}
            numberOfStudents={students.length}
          ></StudentFooter>
        </Container>
      );
    }

    return <h1>No Student Found</h1>;
  }
}

export default MakeStudent;
