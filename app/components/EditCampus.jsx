import React, { Component } from 'react';
import { connect } from 'react-redux'
import { updateCampusThunk } from '../reducers/campusReducer';
import { fetchStudents } from '../reducers/studentReducer';
import { fetchSelectedCampus } from '../reducers/selectedCampusReducer'
import { Redirect } from 'react-router-dom';

class EditCampus extends Component{

  constructor(props){
    super(props)
    this.state = {
      name: '',
      imageUrl: '',
      description: '',
      studentId: 0,
      selectedCampus: {},
      fireRedirect: false
    }
    this.inputName = this.inputName.bind(this);
    this.inputUrl = this.inputUrl.bind(this);
    this.inputDescription = this.inputDescription.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.inputStudent = this.inputStudent.bind(this);
  }

  componentDidMount(){
    if (!this.props.students.length){
      this.props.loadStudents();
    }
    this.props.loadSelectedCampus(+this.props.match.params.campusId)
  }

  inputName(evt){
    this.setState({
      name: evt.target.value
    })
  }

  inputUrl(evt){
    this.setState({
      imageUrl: evt.target.value
    })
  }

  inputDescription(evt){
    this.setState({
      description: evt.target.value
    })
  }

  inputStudent(evt){
    this.setState({
      studentId: +evt.target.value
    })
  }

  handleSubmit(evt){
    evt.preventDefault();
    const updatedCampus = {};
    const state = Object.assign({}, this.state);
    Object.keys(state).forEach(key => {
      if (state[key]){
        updatedCampus[key] = state[key];
      }
    })
    updatedCampus.id = +this.props.match.params.campusId;
    this.props.updateCampus(updatedCampus);
    this.setState({
      name: '',
      imageUrl: '',
      description: '',
      studentId: 0,
      fireRedirect: true
    })
  }


  render() {
    const campus = this.props.selectedCampus;
    const students = this.props.students;

    return (
      <div className="columnWrapper">
      <h3>Edit Campus #{campus.id}</h3>
      <div className="editWrapper">
      <div>
        <h4>Current Info:</h4>
        <div>Name: {campus.name}</div>
        <div>image:</div>
        <img src={campus.imageUrl} />
        <div>Description: {campus.description}</div>
      </div>
      <form  onSubmit={this.handleSubmit} >
      <div className="form-group">
        <label htmlFor="name">Update Info: </label>
        <input
          value={this.state.name}
          className="form-control"
          type="text"
          name="name"
          placeholder="updated name"
          onChange={this.inputName}
          />
        <input
          value={this.state.imageUrl}
          className="form-control"
          type="text"
          name="imageUrl"
          placeholder="updated image Url"
          onChange={this.inputUrl}
          />
        <textarea
          value={this.state.description}
          className="form-control"
          type="text"
          name="description"
          placeholder="updated description"
          onChange={this.inputDescription}
          />
        </div>
        <div>Add A Student:</div>
        <select
        className="form-control"
        name="campus"
        onChange={this.inputCampus}
        >
        {
          students && students.map(student => {
            return (
              <option key={student.id} value={student.id}>{student.name}</option>
            )
          })
        }
        </select>
      <div className="form-group">
        <button type="submit" className="btn btn-default">Update</button>
      </div>
    </form>
    {this.state.fireRedirect && (
      <Redirect to={`/campuses/${campus.id}`} />
    )
  }
    </div>
    </div>
    )
  }
}


const mapDispatchToProps = dispatch => {
  return {
    updateCampus: campus => {
      dispatch(updateCampusThunk(campus))
    },
    loadStudents: () => {
      dispatch(fetchStudents());
    },
    loadSelectedCampus: (campusId) => {
      dispatch(fetchSelectedCampus(campusId))
    }
  }
}

const mapStateToProps = state => {
  return {
    students: state.students,
    selectedCampus: state.selectedCampus
  }
}

const EditCampusContainer = connect(mapStateToProps, mapDispatchToProps)(EditCampus)

export default EditCampusContainer;
