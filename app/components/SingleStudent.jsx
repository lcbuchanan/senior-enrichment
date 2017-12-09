import React, { Component } from 'react';
import { fetchSelectedStudent, setSelectedStudent } from '../reducers/selectedStudentReducer';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import EditStudent from './EditStudent';

class SingleStudent extends Component {

  constructor(props){
    super(props);
    this.state = {
      editing: false
    }
  }


  componentDidMount () {
    const studentId = +this.props.match.params.studentId
    console.log("student id", studentId);
    console.log("type of student id", typeof studentId);
    if (!this.props.students.length){
      this.props.getSelectedStudent(studentId);
    }
    else {
      const selectedStudent = this.props.students.find((student) => {
        return student.id === studentId
      })
      console.log('selected student: ', selectedStudent)
      this.props.saveSelectedStudent(selectedStudent);
      console.log("whole student ", this.props.selectedStudent)
    }

  }

  render(){
    console.log("whole student ", this.props.selectedStudent)
    const student = this.props.selectedStudent;
    const campus = student.campus;
    return (
      <div>
        <h2>{student && student.name}</h2>
          <Link to={`/students/${student.id}/edit`}>
          <button>edit student details</button>
          </Link>
        
        <div className="studentHeader">
        <p>GPA: {student && student.gpa}</p>
        <p>email: {student && student.email}</p>
        <p>campus: {campus && campus.name}</p>
        </div>
        {
          this.state.editing && <EditStudent />
        }
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    students: state.students,
    selectedStudent: state.selectedStudent
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getSelectedStudent: (studentId) =>{
      dispatch(fetchSelectedStudent(studentId));
    },
    saveSelectedStudent: (student) => {
       dispatch(setSelectedStudent(student));
    }
  }
}

const SingleStudentContainer = connect(mapStateToProps, mapDispatchToProps)(SingleStudent)

export default SingleStudentContainer;
