import React, { Component } from 'react';
import { fetchStudents, deleteStudentFromDb } from '../reducers/studentReducer'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';

class Students extends Component {

  constructor(props){
    super(props);
  }

  componentDidMount () {
    this.props.loadStudents();
  }

  render() {
    let students;
    if (this.props.campusId){
      const campusId = Number(this.props.campusId);
      const unfilteredStudents = this.props.students;
      students = unfilteredStudents.filter(student => student.campusId === campusId);
    } else {
      students = this.props.students;
    }

    return (
      <div>
      <h2>Students</h2>
      <ul className="studentList">
      {students.map(student => {
        return (
        <li key={student.id} className="studentElement">
          <div>{student.name}</div>
          <div>GPA: {student.gpa}</div>
            <div className="twoButtons">
              <Link to={`/students/editStudent/${student.id}`}>
              <button>edit</button>
              </Link>
              <button onClick={() => this.props.removeStudent(student.id)}>
                remove
              </button>
            </div>
        </li>
        )
      })}
      </ul>
      <Link to={`/addStudent`}>
        <button className="addStudent">Enroll New Student</button>
      </Link>
      </div>
    )
  }
}


const mapStateToProps = state => {
  return {
    students: state.students
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    loadStudents: () => {
       dispatch(fetchStudents());
    },
    removeStudent: (studentId) => {
      dispatch(deleteStudentFromDb(studentId));
    }
  }
}


const StudentsContainer = connect(mapStateToProps, mapDispatchToProps)(Students)

export default StudentsContainer;
