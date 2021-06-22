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
import { AddExam } from "./admin/exam/AddExam";
import { Exam } from "./admin/exam";
import Category from "./admin/category";
import UpdateExam from "./admin/exam/UpdateExam";
export const Routes = () => {
	return (
		<Router>
			<Switch>
				<Route exact path="/" component={Landing} />
				<LayoutWrapper>
					<Switch>
						<PrivateRoute exact path="/Home" component={Home} />
						<PrivateRoute
							exact
							path="/dashboard"
							component={Dashboard}
						/>
						{/* <PrivateRoute exact path="/course" component={Course} />
						<PrivateRoute
							path="/course/add-new"
							component={AddCourse}
						/> */}
						<PrivateRoute
							path="/course/:id"
							component={TakeCourse}
						/>
						<PrivateRoute exact path="/exam" component={Exam} />
						<PrivateRoute
							path="/exam/add-new"
							component={AddExam}
						/>
						<PrivateRoute
							path="/exam/take/:id"
							component={TakeCourse}
						/>
						<AdminRoute
							exact
							path="/question"
							component={Question}
						/>
						<AdminRoute
							exact
							path="/category"
							component={Category}
						/>

						<AdminRoute
							exact
							path="/exam/edit/:id"
							component={UpdateExam}
						/>
						<PrivateRoute exact path="/report" component={Report} />
					</Switch>
				</LayoutWrapper>
			</Switch>
		</Router>
	);
};
