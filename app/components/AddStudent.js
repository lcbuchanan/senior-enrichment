import React, { Component } from 'react';
import { connect } from 'react-redux'
import { fetchCampuses } from '../reducers/campusReducer';
import { postNewStudent } from '../reducers/studentReducer';

class AddStudent extends Component {

  constructor(props){
    super(props);
    this.state = {
      firstNameInput: '',
      lastNameInput: '',
      campusId: 0
    }
    this.inputFirstName = this.inputFirstName.bind(this);
    this.inputLastName = this.inputLastName.bind(this);
    this.inputCampus = this.inputCampus.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount () {
    if (!this.props.campuses.length){
      this.props.loadCampuses();
    }
  }


  inputFirstName(evt){
    this.setState({
      firstNameInput: evt.target.value
    })
  }

  inputLastName(evt){
    this.setState({
      lastNameInput: evt.target.value
    })
  }

  inputCampus(evt){
    this.setState({
      campusId: evt.target.value
    })
    console.log(this.state.campusId);
  }

  handleSubmit(evt){
    evt.preventDefault();
    this.props.submitStudent(this.state.firstNameInput, this.state.lastNameInput, this.state.campusId)
  }


  render(){

    const campuses = this.props.campuses;

    return (
      <div>
      <h3>Enroll A New Student</h3>
      <form onSubmit={this.handleSubmit} >
      <div className="form-group">
        <label htmlFor="name">Student Name: </label>
        <input
        value={this.state.firstNameInput}
        className="form-control"
        type="text"
        name="firstName"
        placeholder="First Name"
        onChange={this.inputFirstName}
        />
        <input
        value={this.state.lastNameInput}
        className="form-control"
        type="text"
        name="lastName"
        placeholder="Last Name"
        onChange={this.inputLastName}
        />
      </div>
      <div className="form-group">
        <div>Select Campus: </div>
        <select
        className="form-control"
        name="campus"
        onChange={this.inputCampus}>
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
        <button type="submit" className="btn btn-default">Enroll Now</button>
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

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    loadCampuses: () => {
       dispatch(fetchCampuses());
    },
    submitStudent: (firstName, lastName, campusId) => {
      dispatch(postNewStudent(firstName, lastName, campusId))
    }
  }
}

const AddStudentContainer = connect(mapStateToProps, mapDispatchToProps)(AddStudent)

export default AddStudentContainer;
