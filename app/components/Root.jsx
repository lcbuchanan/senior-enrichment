import React, { Component } from 'react';
import { Route, Switch, NavLink, Link } from 'react-router-dom';
import Students from './Students';
import Campuses from './Campuses';
import SingleCampus from './SingleCampus';
import AddStudent from './AddStudent';
import EditStudent from './EditStudent';
import Home from './Home';
import AddCampus from './AddCampus';

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
        <Route exact path="/addStudent" component={AddStudent} />
        <Route exact path="/addCampus" component={AddCampus} />
        <Route exact path="/students/editStudent/:studentId" component={EditStudent} />
        <Route exact path="/" component={Home} />
      </Switch>
    </div>
  )
  }
}
