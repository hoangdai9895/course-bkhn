import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getExamById } from "../../redux/actions/exam";
import { HeaderCourse } from "./HeaderCourse";
import { CourseSkeleton } from "./CourseSkeleton";
import { Tabs, Radio, Divider, Button } from "antd";
import { ResultModal } from "./ResultModal";
import { createResult } from "../../redux/actions/result";

const { TabPane } = Tabs;

export const TakeExam = () => {
	const [start, setStart] = useState(false);
	const [isDone, setDone] = useState(false);
	const dispatch = useDispatch();
	const [visible, setvisible] = useState(false);
	const [resultsdata, setresults] = useState([]);
	const [answersList, setanswersList] = useState([]);
	const [currentQuestion, setCurrentQuestion] = useState(0);
	const { user } = useSelector((state) => state.auth);
	const { exam } = useSelector(({ exam }) => exam);
	const { id } = useParams();

	const done = useCallback(
		(exam, answersList) => {
			let tempResults = [];
			let data = {};
			let trueAnswer = 0;

			exam.questions.forEach((e, i) => {
				let item = {
					isTrue: false,
					questionId: e._id,
					answer: answersList[i],
				};
				if (e.answers[e.correctAnswer] === answersList[i]) {
					item.isTrue = true;
					trueAnswer++;
				}
				tempResults = [...tempResults, item];
			});

			data.exam = exam._id;
			data.user = user.id;
			data.result = `${trueAnswer}/${tempResults.length}`;
			setresults(data);
			console.log(data);
			dispatch(createResult(data));
			setvisible(true);
		},
		[dispatch, user.id]
	);

	const onChange = (e) => {
		const value = e.target.value;
		let tempAns = [...answersList];
		tempAns[currentQuestion] = value;
		localStorage.setItem("answersList", JSON.stringify(tempAns));
		setanswersList(tempAns);
	};

	const changeQuestion = (e) => {
		let index = 0;
		index = exam.questions.findIndex((k) => k._id === e);
		setCurrentQuestion(index);
	};

	useEffect(() => {
		dispatch(getExamById(id));
		// eslint-disable-next-line
	}, []);

	useEffect(() => {
		let answer = JSON.parse(localStorage.getItem("answersList"));
		answer && setanswersList(answer);
	}, []);

	return (
		<div style={{ background: "#fff", margin: "1rem 0", padding: "1rem" }}>
			<HeaderCourse
				start={start}
				setStart={setStart}
				done={done}
				isDone={isDone}
			/>

			{!start ? (
				<CourseSkeleton />
			) : (
				<div style={{ background: "#fff" }}>
					<Divider dashed />
					<Tabs
						defaultActiveKey="1"
						tabPosition={"left"}
						style={{ height: "calc(100vh - 400px)" }}
						onChange={changeQuestion}
					>
						{exam?.questions?.map((e, i) => (
							<TabPane tab={`Cau hoi ${i + 1}`} key={e._id}>
								<div>
									<h3>{e.question}</h3>
									<Radio.Group
										onChange={onChange}
										value={
											JSON.parse(
												localStorage.getItem(
													"answersList"
												)
											) &&
											JSON.parse(
												localStorage.getItem(
													"answersList"
												)
											)[i]
										}
									>
										{e.answers.map((e, k) => (
											<Radio value={e} key={k}>
												{e}
											</Radio>
										))}
									</Radio.Group>
								</div>
							</TabPane>
						))}
					</Tabs>
					<Button
						type="primary"
						onClick={() => {
							setDone(true);
							done(exam, answersList);
							localStorage.removeItem("answersList");
							localStorage.removeItem("time");
						}}
					>
						Hoan thanh
					</Button>
					<ResultModal
						visible={visible}
						resultsdata={resultsdata}
						exam={exam}
					/>
				</div>
			)}
		</div>
	);
};

// import React, { useEffect, useState, useCallback } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useParams } from "react-router-dom";
// import { Steps, Button, Divider, Radio } from "antd";
// import "../../assets/styles/take-exam.scss";

// import { ResultModal } from "./ResultModal";
// import { createResult } from "../../redux/actions/result";
// import { HeaderCourse } from "./HeaderCourse";
// import { CourseSkeleton } from "./CourseSkeleton";
// import { getExamById } from "../../redux/actions/exam";
// const { Step } = Steps;

// const renderContent = (answers, onChange, title, current, answersList) => {
// 	return (
// 		<div>
// 			<h3>{title}</h3>
// 			<Radio.Group
// 				onChange={onChange}
// 				value={answersList[current] || null}
// 			>
// 				{answers.map((e, i) => (
// 					<Radio value={e} key={i}>
// 						{e}
// 					</Radio>
// 				))}
// 			</Radio.Group>
// 		</div>
// 	);
// };

// export const TakeExam = () => {
// 	const [current, setcurrent] = useState(0);
// 	const [start, setStart] = useState(false);
// 	const [answersList, setanswersList] = useState([]);
// 	const [visible, setvisible] = useState(false);
// 	const [resultsdata, setresults] = useState([]);
// 	const { user } = useSelector((state) => state.auth);
// 	const [isDone, setDone] = useState(false);
// 	// const [datato, setData]
// 	const { id } = useParams();

// 	const { exam } = useSelector(({ exam }) => exam);
// 	const dispatch = useDispatch();

// 	const next = () => {
// 		setcurrent(current + 1);
// 	};

// 	const prev = () => {
// 		setcurrent(current - 1);
// 	};

// 	const done = useCallback(
// 		(exam, answersList) => {
// 			let tempResults = [];
// 			let data = {};
// 			let trueAnswer = 0;

// 			exam.questions.forEach((e, i) => {
// 				let item = {
// 					isTrue: false,
// 					questionId: e._id,
// 					answer: answersList[i],
// 				};
// 				if (e.answers[e.correctAnswer] === answersList[i]) {
// 					item.isTrue = true;
// 					trueAnswer++;
// 				}
// 				tempResults = [...tempResults, item];
// 			});

// 			data.exam = exam._id;
// 			data.user = user.id;
// 			data.result = `${trueAnswer}/${tempResults.length}`;
// 			setresults(data);
// 			console.log(data);
// 			// dispatch(createResult(data));
// 			setvisible(true);
// 		},
// 		[dispatch, user.id]
// 	);

// 	const onChange = (e) => {
// 		// const { answers, correctAnswer } = exam.questions[current];
// 		const value = e.target.value;
// 		let tempAns = [...answersList];
// 		tempAns[current] = value;
// 		localStorage.setItem("answersList", JSON.stringify(tempAns));
// 		setanswersList(tempAns);
// 	};

// 	const generateStep = (exam) => {
// 		let steps = [];
// 		exam.questions.forEach((e, i) => {
// 			steps[i] = {
// 				content: renderContent(
// 					e.answers,
// 					onChange,
// 					e.question,
// 					current,
// 					answersList
// 				),
// 			};
// 		});
// 		return steps;
// 	};

// 	useEffect(() => {
// 		dispatch(getExamById(id));
// 		// eslint-disable-next-line
// 	}, []);
// 	return (
// 		<>
// 			<div style={{ background: "#fff" }}>
// 				<HeaderCourse
// 					start={start}
// 					setStart={setStart}
// 					done={done}
// 					isDone={isDone}
// 				/>
// 				{start ? (
// 					<>
// 						<Divider />
// 						<div className="take-exam">
// 							<Steps current={current}>
// 								{generateStep(exam).map((item, i) => (
// 									<Step key={i} />
// 								))}
// 							</Steps>

// 							{/* step content ============== */}
// 							<div className="steps-content">
// 								{generateStep(exam)[current].content}
// 							</div>

// 							{/* step actions ============= */}
// 							<div className="steps-action">
// 								{current < generateStep(exam).length - 1 && (
// 									<Button
// 										type="primary"
// 										onClick={() => next()}
// 									>
// 										Next
// 									</Button>
// 								)}
// 								{current === generateStep(exam).length - 1 && (
// 									<Button
// 										type="primary"
// 										onClick={() => {
// 											setDone(true);
// 											done(exam, answersList);
// 										}}
// 									>
// 										Done
// 									</Button>
// 								)}
// 								{current > 0 && (
// 									<Button
// 										style={{ margin: "0 8px" }}
// 										onClick={() => prev()}
// 									>
// 										Previous
// 									</Button>
// 								)}
// 							</div>
// 							<ResultModal
// 								visible={visible}
// 								resultsdata={resultsdata}
// 								exam={exam}
// 							/>
// 						</div>
// 					</>
// 				) : null}
// 			</div>

// 			{!start ? <CourseSkeleton /> : null}
// 		</>
// 	);
// };
