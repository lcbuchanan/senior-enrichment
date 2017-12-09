import React, { Component } from 'react';
import { fetchCampuses, deleteCampusThunk } from '../reducers/campusReducer'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';


class Campuses extends Component {


  componentDidMount () {
    this.props.loadCampuses();
  }

  render() {
    const campuses = this.props.campuses;
    console.log(campuses)
    return (
      <div>
      <h2>Campuses</h2>
      <Link to={`/addCampus`}>
        <button>Add A New Campus</button>
      </Link>
        <div className="campusList">
        {campuses.map(campus => {
          return (
          <div key={campus.id} >
            <Link to={`campuses/${campus.id}`}>
              <div>
                <div>{campus.name}</div>
                <img src={campus.imageUrl} />
              </div>
            </Link>
            <div>
              <Link to={`/campuses/editCampus/${campus.id}`}>
                <button>Update Campus Info</button>
              </Link>
              <button onClick={() => this.props.removeCampus(campus.id)}>
                Delete Campus
              </button>
            </div>
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
    },
    removeCampus: (campusId) => {
      dispatch(deleteCampusThunk(campusId))
    }
  }
}


const CampusesContainer = connect(mapStateToProps, mapDispatchToProps)(Campuses)

export default CampusesContainer;
