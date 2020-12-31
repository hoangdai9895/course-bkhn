import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Landing } from "./landing/Landing";
import { LayoutWrapper } from "../common/LayoutWrapper";
import { Dashboard } from "./landing/Dashboard";
import { PrivateRoute } from "../common/PrivateRoute";
import { Question } from "./admin/question/Question";
import { Report } from "./admin/report/Report";
import { Course } from "./admin/course/Course";
import { AddCourse } from "./admin/course/AddCourse";
import { TakeCourse } from "./user/TakeCourse";
import { AdminRoute } from "../common/AdminRoute";
import { Home } from "./home/Home";
export const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Landing} />
        <LayoutWrapper>
          <Switch>
            <PrivateRoute exact path="/Home" component={Home} />
            <PrivateRoute exact path="/dashboard" component={Dashboard} />
            <PrivateRoute exact path="/course" component={Course} />
            <PrivateRoute path="/course/add-new" component={AddCourse} />
            <PrivateRoute path="/course/:id" component={TakeCourse} />
            <AdminRoute exact path="/question" component={Question} />
            <PrivateRoute exact path="/report" component={Report} />
          </Switch>
        </LayoutWrapper>
      </Switch>
    </Router>
  );
};
