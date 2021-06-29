import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";

const ClassManagement = () => {
	const dispatch = useDispatch();
	const history = useHistory();
	const location = useLocation();
	return <div>Class</div>;
};

export default ClassManagement;
