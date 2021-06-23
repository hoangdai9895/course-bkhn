import React, { useEffect, useState } from "react";
import { Modal, Select, Input, Radio, message } from "antd";
import "../../../assets/styles/modal.scss";
import { getAllCategories } from "../../../redux/actions/category";
import { addNewQuestion } from "../../../redux/actions/question";
import { useDispatch, useSelector } from "react-redux";

const { Option } = Select;
const { TextArea } = Input;

const radioStyle = {
	display: "block",
	height: "30px",
	lineHeight: "30px",
};

const answerList = [
	{
		name: "A",
		placeholder: "Answer A",
		value: 0,
	},
	{
		name: "B",
		placeholder: "Answer B",
		value: 1,
	},
	{
		name: "C",
		placeholder: "Answer C",
		value: 2,
	},
	{
		name: "D",
		placeholder: "Answer D",
		value: 3,
	},
];

export const AddNewQuestion = ({ visible, setvisible }) => {
	const dispatch = useDispatch();
	const [questionInfo, setquestionInfo] = useState({ answers: [] });
	const { categories, loadingCategory } = useSelector(
		(state) => state.category
	);
	const { loadingQuestions } = useSelector((state) => state.question);

	const handleAddNewQuestion = () => {
		console.log(questionInfo);
		const { category, correctAnswer } = questionInfo;
		let tempQues = questionInfo;

		if (!category) {
			tempQues.category = categories[0]._id || null;
		}

		if (!correctAnswer) {
			tempQues.correctAnswer = answerList[0].value;
		}

		let x = Object.keys(tempQues).filter((e) => {
			return /\d/.test(e);
		});

		x.forEach((e, i) => {
			tempQues.answers = [...tempQues.answers, tempQues[`${i}`]];
			delete tempQues[`${i}`];
		});
		console.log(tempQues);
		if (
			tempQues.answers.length < 4 ||
			tempQues.question === "" ||
			!tempQues.question
		) {
			message.error("Field is not empty!!");
		} else {
			dispatch(addNewQuestion(tempQues));
			// setquestionInfo({ answers: [] });
		}
	};

	const handleChangeCategory = (e) => {
		setquestionInfo({ ...questionInfo, category: e });
	};

	const onChangeCheckBox = (e) => {
		setquestionInfo({ ...questionInfo, correctAnswer: e.target.value });
	};

	const onChange = (e) => {
		setquestionInfo({ ...questionInfo, [e.target.name]: e.target.value });
	};

	useEffect(() => {
		dispatch(getAllCategories());
		// eslint-disable-next-line
	}, []);

	return (
		<div>
			<Modal
				title="ADD NEW QUESTION"
				visible={visible}
				onOk={() => handleAddNewQuestion()}
				onCancel={() => setvisible(false)}
				width={600}
				loading={loadingQuestions}
			>
				<div className="modal-item">
					<div className="modal-item__label">Category</div>
					<div className="modal-item__main">
						<Select
							defaultValue={categories[0] && categories[0]._id}
							style={{ width: "100%" }}
							onChange={handleChangeCategory}
							loading={loadingCategory}
							name="category"
						>
							{categories.map((e, i) => (
								<Option value={e._id} key={i}>
									{e.name}
								</Option>
							))}
						</Select>
					</div>
				</div>

				<div className="modal-item">
					<div className="modal-item__label">Question title</div>
					<div className="modal-item__main">
						<TextArea
							placeholder="What is your question ?"
							autoSize
							name="question"
							onChange={onChange}
						/>
					</div>
				</div>

				<div className="modal-item">
					<div className="modal-item__label">Answer </div>
					<div className="modal-item__main">
						{answerList.map((e, i) => (
							<div className="modal-item__answer" key={i}>
								<Input
									size="large"
									placeholder={e.placeholder}
									prefix={`${e.name}-`}
									className="modal-item__input"
									name={i}
									onChange={onChange}
								/>
							</div>
						))}
					</div>
				</div>

				<div className="modal-item">
					<div className="modal-item__label">Correct answer </div>
					<div className="modal-item__main">
						<Radio.Group
							onChange={onChangeCheckBox}
							defaultValue={answerList[0].name}
						>
							{answerList.map((e, i) => (
								<Radio
									style={radioStyle}
									value={e.value}
									key={i}
								>
									{e.name}
								</Radio>
							))}
						</Radio.Group>
					</div>
				</div>
			</Modal>
		</div>
	);
};
