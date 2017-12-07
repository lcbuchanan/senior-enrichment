import React, { Component } from 'react';
import { fetchStudents } from '../reducers/studentReducer'
import { connect } from 'react-redux'

class Students extends Component {

  constructor(props){
    super(props)
  }

  componentDidMount () {
    this.props.loadStudents();
 }

  render() {
    const students = this.props.students;
    return(
      <div>
      <div>Students!</div>
      {students.map(student => {
        return (
        <li key={student.id}>{student.name}</li>
        )
      })}
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
    loadStudents (evt) {
       dispatch(fetchStudents());
    }
  }
}


const StudentsContainer = connect(mapStateToProps, mapDispatchToProps)(Students)

export default StudentsContainer;
