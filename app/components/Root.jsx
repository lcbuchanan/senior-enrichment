import React, { Component } from 'react';
import { Route, Switch, NavLink, Link } from 'react-router-dom';
import Students from './Students';
import Campuses from './Campuses';
import SingleCampus from './SingleCampus';
import AddStudent from './AddStudent';
import EditStudent from './EditStudent';
import Home from './Home';
import EditCampus from './EditCampus';
import AddCampus from './AddCampus';
import SingleStudent from './SingleStudent';


/* The code below does NOT relate to your project.
   This code is just a nice BIG example of how you can make a component.
   Also it is HILARIOUS :D Have fun!
 */

export default class Root extends Component {
  render() {
    return(
    <div>
      <div className="mainHeading">
        <h2>Margaret Hamilton Interplanetary Academy of JavaScript</h2>
        <div className="navBar">
          <div>
            <Link to={'/'}>Home</Link>
          </div>
          <div>
            <NavLink to={'/campuses'}>Campuses</NavLink>
          </div>
          <div>
            <NavLink to={'/students'}>Students</NavLink>
          </div>
      </div>
    </div>
      <Switch>
        <Route exact path="/students" component={Students} />
        <Route exact path="/campuses" component={Campuses} />
        <Route exact path="/campuses/:campusId" component={SingleCampus} />
        <Route exact path="/students/:studentId" component={SingleStudent} />
        <Route exact path="/addStudent" component={AddStudent} />
        <Route exact path="/addCampus" component={AddCampus} />
        <Route exact path="/students/:studentId/edit" component={EditStudent} />
        <Route exact path="/campuses/editCampus/:campusId" component={EditCampus} />
        <Route exact path="/" component={Home} />
      </Switch>
    </div>
  )
  }
}
