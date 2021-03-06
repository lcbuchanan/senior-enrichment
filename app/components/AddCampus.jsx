import React, { Component } from 'react';
import { connect } from 'react-redux'
import { postNewCampus } from '../reducers/campusReducer';
import { Redirect } from 'react-router-dom';


class AddCampus extends Component{
  constructor(props){
    super(props);
    this.state = {
      name: '',
      imageUrl: '',
      description: '',
      fireRedirect: false
    }
    this.inputName = this.inputName.bind(this);
    this.inputUrl = this.inputUrl.bind(this);
    this.inputDescription = this.inputDescription.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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

  handleSubmit(evt){
    evt.preventDefault();
    this.props.submitCampus(this.state.name, this.state.imageUrl, this.state.description);
    this.setState({
      fireRedirect: true
    })
  }

  render(){

    return (

      <div>
      <h3>Add A New Campus</h3>
      <form  onSubmit={this.handleSubmit}>
      <div className="form-group">
        <label htmlFor="name">Campus Name: </label>
        <input
        value={this.state.name}
        className="form-control"
        type="text"
        name="name"
        placeholder="Campus Name"
        onChange={this.inputName}
        />
        <input
        value={this.state.imageUrl}
        className="form-control"
        type="text"
        name="imageUrl"
        placeholder="Url For Image"
        onChange={this.inputUrl}
        />
        <input
        value={this.state.description}
        className="form-control"
        type="text"
        name="description"
        placeholder="Description"
        onChange={this.inputDescription}
        />
      </div>

      <div className="form-group">
        <button type="submit" className="btn btn-default">Create Campus</button>
      </div>
    </form>
    {this.state.fireRedirect && (
      <Redirect to={`/campuses`} />
    )}
    </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    submitCampus: (name, imageUrl, description) => {
      dispatch(postNewCampus(name, imageUrl, description))
    }
  }
}


const AddCampusContainer = connect(null, mapDispatchToProps)(AddCampus)

export default AddCampusContainer;
