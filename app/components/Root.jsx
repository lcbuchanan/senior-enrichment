import React, { Component } from 'react';
import { Route, Switch, NavLink, Link } from 'react-router-dom';
import Students from './Students';
import Campuses from './Campuses';
import SingleCampus from './SingleCampus';
import AddStudent from './AddStudent';

/* The code below does NOT relate to your project.
   This code is just a nice BIG example of how you can make a component.
   Also it is HILARIOUS :D Have fun!
 */

export default class Home extends Component {
  render() {
    return(
    <div>
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
      <Switch>
        <Route exact path="/students" component={Students} />
        <Route exact path="/campuses" component={Campuses} />
        <Route exact path="/campuses/:campusId" component={SingleCampus} />
        <Route exact path="/students/addStudent" component={AddStudent} />
        <Route exact path="/" component={Campuses} />
      </Switch>
    </div>
  )
  }
}
