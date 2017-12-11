import React, { Component } from 'react';
import { fetchCampuses } from '../reducers/campusReducer'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';

class Campuses extends Component {


  componentDidMount () {
    this.props.loadCampuses();
  }

  render() {
    const campuses = this.props.campuses;
    return (
      <div>
        <h2>Welcome</h2>
        <div className="campusList">
        {campuses.map(campus => {
          return (
          <div key={campus.id}>
            <Link to={`campuses/${campus.id}`}>
              <div>
                <div>{campus.name}</div>
                <img src={campus.imageUrl}/>
              </div>
            </Link>
          </div>
          )
        })}
        </div>
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
