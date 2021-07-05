import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Landing } from "./landing/Landing";
import { LayoutWrapper } from "../common/LayoutWrapper";
import { Dashboard } from "./landing/Dashboard";
import { PrivateRoute } from "../common/PrivateRoute";
import { Question } from "./admin/question/Question";
import { Report } from "./admin/report/Report";
// import { Course } from "./admin/course/Course";
// import { AddCourse } from "./admin/course/AddCourse";
// import { TakeCourse } from "./user/TakeCourse";
import ClassManagement from "./admin/class/index";
import { AdminRoute } from "../common/AdminRoute";
import { Home } from "./home/Home";
import { AddExam } from "./admin/exam/AddExam";
import { Exam } from "./admin/exam";
import Category from "./admin/category";
import UpdateExam from "./admin/exam/UpdateExam";
import { TakeExam } from "./user/TakeExam";
import User from "./admin/user";
import AddClass from "./admin/class/AddClass";
import UpdateClass from "./admin/class/UpdateClass";
import MyClass from "./admin/my-class";
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
						{/* <PrivateRoute exact path="/course" component={Course} /> */}
						{/* <PrivateRoute
							path="/course/add-new"
							component={AddCourse}
						/> */}
						{/* <PrivateRoute
							path="/course/:id"
							component={TakeCourse}
						/> */}
						<AdminRoute exact path="/exam" component={Exam} />
						<AdminRoute path="/exam/add-new" component={AddExam} />
						<PrivateRoute
							path="/exam/take/:id"
							component={TakeExam}
						/>
						<AdminRoute
							exact
							path="/question"
							component={Question}
						/>
						<AdminRoute
							exact
							path="/class/add-new"
							component={AddClass}
						/>

						<AdminRoute
							exact
							path="/class/update/:id"
							component={UpdateClass}
						/>

						<AdminRoute
							exact
							path="/category"
							component={Category}
						/>

						<AdminRoute
							exact
							path="/class"
							component={ClassManagement}
						/>
						<AdminRoute exact path="/users" component={User} />

						<AdminRoute
							exact
							path="/exam/edit/:id"
							component={UpdateExam}
						/>
						<PrivateRoute exact path="/report" component={Report} />
						<PrivateRoute
							exact
							path="/my-class"
							component={MyClass}
						/>
					</Switch>
				</LayoutWrapper>
			</Switch>
		</Router>
	);
};
