import React, { Component } from 'react';
import { fetchSelectedStudent, setSelectedStudent } from '../reducers/selectedStudentReducer';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import EditStudent from './EditStudent';
import { deleteStudentFromDb } from '../reducers/studentReducer';

class SingleStudent extends Component {

  constructor(props){
    super(props);
    this.state = {
      editing: false,
      fireRedirect: false
    }
  }


  componentDidMount () {
    const studentId = +this.props.match.params.studentId
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

  deleteAndReroute(studentId){
    this.props.deleteStudent(studentId);
    this.setState({ fireRedirect: true});
  }

  render(){
    const student = this.props.selectedStudent;
    const campus = student.campus;
    return (
      <div>
        <h2>{student && student.name}</h2>
        <Link to={`/students/${student.id}/edit`}>
          <button>edit student details</button>
        </Link>
        <button onClick={() => this.deleteAndReroute(student.id)}>delete student record</button>
        <div className="studentHeader">
          <p>GPA: {student && student.gpa}</p>
          <p>email: {student && student.email}</p>
          {campus &&
            <Link to={`/campuses/${campus.id}`}>
              <p>campus: {campus.name}</p>
          </Link>
          }
        </div>
        {
          this.state.editing && <EditStudent />
        }
        {
          this.state.fireRedirect && (
            <Redirect to={`/students`} />
          )
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
    },
    deleteStudent: (studentId) => {
      dispatch(deleteStudentFromDb(studentId))
    }
  }
}

const SingleStudentContainer = connect(mapStateToProps, mapDispatchToProps)(SingleStudent)

export default SingleStudentContainer;
