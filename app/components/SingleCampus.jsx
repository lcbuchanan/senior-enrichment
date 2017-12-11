import React, { Component } from 'react';
import { fetchSelectedCampus } from '../reducers/selectedCampusReducer'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';
import Students from './Students';


class SingleCampus extends Component {

  constructor(props){
    super(props);
    this.state = {
      editing: false
    }
  }


  componentDidMount () {
    console.log("campus id?", this.props.match.params.campusId)
    this.props.loadSelectedCampus(this.props.match.params.campusId);
  }

  render(){
    console.log("selected campus: ", this.props.selectedCampus)
    const campus = this.props.selectedCampus;

    return(
      <div>
        <h2>{campus.name}</h2>
        <div className="campusHeader">
        <img src={campus.imageUrl}/>
        <p>{campus.description}</p>
        </div>
        <Link to={`/campuses/editCampus/${campus.id}`}>
        <button>Edit Campus Info</button>
        </Link>

      <Students campusId={campus.id}/>
      </div>
    )
  }

}



const mapStateToProps = state => {
  return {
    selectedCampus: state.selectedCampus
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    loadSelectedCampus: (campusId) => {
       dispatch(fetchSelectedCampus(campusId));
    }
  }
}

const SingleCampusContainer = connect(mapStateToProps, mapDispatchToProps)(SingleCampus)

export default SingleCampusContainer;
