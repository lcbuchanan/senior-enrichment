import React, { Component } from 'react';
import { fetchCampuses } from '../reducers/campusReducer'
import { connect } from 'react-redux'

class Campuses extends Component {


  componentDidMount () {
    this.props.loadCampuses();
  }

  render() {
    const campuses = this.props.campuses;
    console.log(campuses)
    return (
      <div>
      <div>Campuses!!!</div>
      {campuses.map(campus => {
        return (
        <li key={campus.id}>{campus.name}</li>
        )
      })}
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
    }
  }
}


const CampusesContainer = connect(mapStateToProps, mapDispatchToProps)(Campuses)

export default CampusesContainer;
