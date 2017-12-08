import React, { Component } from 'react';
import { connect } from 'react-redux'

export default class AddStudent extends Component {

  render(){
    return(
      <form >
      <div className="form-group">
        <label htmlFor="name">Enroll a Student</label>
        <input className="form-control" type="text" name="studentNa,e" placeholder="Name" />
      </div>
      <div className="form-group">
        <button type="submit" className="btn btn-default">Enroll Now</button>
      </div>
    </form>
    )
  }
}

//TODO:
/*
  add a dropdown selext for campus
  local state to hold name and campus? maybe?
  import postNewStudent and use it in setdispatchtoprops
  onChange - update local state (maybe all state..)
  onSubmit - enter the values into state and db

*/
