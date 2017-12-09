import React, { Component } from 'react';
import { connect } from 'react-redux'
import { updateCampusThunk } from '../reducers/campusReducer';

class EditCampus extends Component{

  constructor(props){
    super(props)
    this.state = {
      name: '',
      imageUrl: '',
      description: ''
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
      description: ''
    })
  }


  render() {
    const campusId = this.props.match.params.campusId;

    return (
      <div>
      <h3>Edit Campus #{campusId}</h3>
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
      <div className="form-group">
        <button type="submit" className="btn btn-default">Update</button>
      </div>
    </form>
    </div>
    )
  }
}


const mapDispatchToProps = dispatch => {
  return {
    updateCampus: campus => {
      dispatch(updateCampusThunk(campus))
    }
  }
}

const EditCampusContainer = connect(null, mapDispatchToProps)(EditCampus)

export default EditCampusContainer;
