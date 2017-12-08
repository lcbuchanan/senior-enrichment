import React, { Component } from 'react';
import { connect } from 'react-redux'
import { fetchCampuses } from '../reducers/campusReducer';
import { updateStudentThunk } from '../reducers/studentReducer';

class EditStudent extends Component{

  constructor(props){
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      campusId: 0,
      email: '',
      gpa: 0
    }
    this.inputFirstName = this.inputFirstName.bind(this);
    this.inputLastName = this.inputLastName.bind(this);
    this.inputCampus = this.inputCampus.bind(this);
    this.inputEmail = this.inputEmail.bind(this);
    this.inputGpa = this.inputGpa.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount () {
    console.log("campus id?", this.props.match.params.studentId)
    if (!this.props.campuses.length){
      this.props.loadCampuses();
    }
  }

  inputFirstName(evt){
    this.setState({
      firstName: evt.target.value
    })
    console.log("firstName: ", this.state.firstName)
  }

  inputLastName(evt){
    this.setState({
      lastName: evt.target.value
    })
  }

  inputEmail(evt){
    this.setState({
      email: evt.target.value
    })
  }

  inputGpa(evt){
    this.setState({
      gpa: +evt.target.value
    })
    console.log("gpa: ", this.state.gpa)
  }

  inputCampus(evt){
    this.setState({
      campusId: +evt.target.value
    })
    console.log(this.state.campusId);
  }

  handleSubmit(evt){
    evt.preventDefault();
    const updatedStudent = {};
    const state = Object.assign({}, this.state);
    Object.keys(state).forEach((key) => {
      if (state[key]){
        updatedStudent[key] = state[key];
      }
    })
    updatedStudent.id = +this.props.match.params.studentId;
    console.log('updatedStudent: ', updatedStudent);
    this.props.updateStudent(updatedStudent);
    this.setState({
      firstName: '',
      lastName: '',
      campusId: 0,
      email: '',
      gpa: 0
    });
  }

  render(){
    const studentId = this.props.match.params.studentId;
    const campuses = this.props.campuses;

    return(
      <div>
      <h3>Edit Student #{studentId}</h3>
      <form onSubmit={this.handleSubmit}>
      <div className="form-group">
        <label htmlFor="name">Update Info: </label>
        <input
        value={this.state.firstNameInput}
        className="form-control"
        type="text"
        name="firstName"
        placeholder="updated first name"
        onChange={this.inputFirstName}
        />
        <input
        value={this.state.lastNameInput}
        className="form-control"
        type="text"
        name="lastName"
        placeholder="updated last name"
        onChange={this.inputLastName}
        />
        <input
        value={this.emailInput}
        className="form-control"
        type="text"
        name="email"
        placeholder="updated email"
        onChange={this.inputEmail}
        />
        <input
        value={this.gpaInput}
        className="form-control"
        type="text"
        name="gpa"
        placeholder="updated GPA"
        onChange={this.inputGpa}
        />
      </div>
      <div className="form-group">
        <div>Change Campus To: </div>
        <select
        className="form-control"
        name="campus"
        onChange={this.inputCampus}
        >
        {
          campuses && campuses.map(campus => {
            return (
              <option key={campus.id} value={campus.id}>{campus.name}</option>
            )
          })
        }
        </select>
        </div>
      <div className="form-group">
        <button type="submit" className="btn btn-default">Update</button>
      </div>
    </form>
    </div>
    )
  }

}

const mapStateToProps = state => {
  return {
    campuses: state.campuses
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadCampuses: () => {
       dispatch(fetchCampuses());
    },
    updateStudent: (student) => {
      dispatch(updateStudentThunk(student))
    }
  }
}

const EditStudentContainer = connect(mapStateToProps, mapDispatchToProps)(EditStudent);

export default EditStudentContainer;
