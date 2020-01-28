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

  deleteStudent = id => {
    API.deleteStudent(id)
      .then(res => this.fetchStudents())
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
            <div>
              <Avatar size="large">
                {`${students.first_name
                  .charAt(0)
                  .toUpperCase()}${students.last_name.charAt(0).toUpperCase()}`}
              </Avatar>
              <button
                id={students.id}
                onClick={() => this.deleteStudent(students._id)}
              >
                Remove
              </button>
            </div>
          )
        },
        {
          title: "First Name",
          dataIndex: "first_name",
          key: "firstName"
        },
        {
          title: "Last Name",
          dataIndex: "last_name",
          key: "lastName"
        },
        {
          title: "Email",
          dataIndex: "email",
          key: "email"
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

    return (
      <Container>
        <h1>No Student Found</h1>{" "}
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
}

export default MakeStudent;
