import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Popconfirm, Table, Button, Col, Row } from "antd";
import {
	DeleteOutlined,
	EditOutlined,
	PlusCircleOutlined,
} from "@ant-design/icons";
import {
	getAllQuestions,
	removeQuestion,
} from "../../../redux/actions/question";
import { AddNewQuestion } from "./AddNewQuestion";
import { PageHeaderLayout } from "../../../common/PageHeaderLayout";
export const Question = () => {
	const columns = [
		{
			title: "ID",
			dataIndex: "Stt",
			key: "stt",
			render: (text, record) => <span>{record._id}</span>,
		},
		{
			title: "Question",
			dataIndex: "question",
			key: "question",
		},
		{
			title: "Category",
			dataIndex: "length",
			key: "length",
			render: (text, record) => <span>{record.category.name}</span>,
		},
		{
			// title: "Hành động",
			title: "Action",
			dataIndex: "action",
			key: "action",
			render: (text, record) => (
				<div style={{ display: "flex" }}>
					<div style={{ cursor: "pointer", marginRight: 10 }}>
						<EditOutlined />
					</div>
					<div>
						<Popconfirm
							placement="topLeft"
							title={"Bạn chắc chắn muốn xóa câu hỏi này không ?"}
							onConfirm={() => confirm(record._id)}
							okText="Có"
							cancelText="Không">
							<DeleteOutlined />
						</Popconfirm>
					</div>
				</div>
			),
		},
	];

	const { loadingQuestions, questions } = useSelector(
		(state) => state.question
	);
	const [visible, setvisible] = useState(false);

	const dispatch = useDispatch();

	const confirm = (id) => {
		dispatch(removeQuestion(id));
	};

	useEffect(() => {
		dispatch(getAllQuestions());
	}, []);

	return (
		<Row className="card-list" gutter={[0, 5]}>
			<Col xl={24}>
				<PageHeaderLayout
					title="Question"
					subtitle="Welcome"
					text="Questions list, you can create, update or remove question"
				/>
			</Col>
			<Col xl={24}>
				<Button
					type="dashed"
					style={{ width: "100%", margin: "10px 0 10px 0" }}
					onClick={() => setvisible(true)}>
					<PlusCircleOutlined /> Add new question
				</Button>
				<Table
					columns={columns}
					loading={loadingQuestions}
					dataSource={questions}
					rowKey={(record) => record._id}
				/>
			</Col>

			{/* add new modal */}
			<AddNewQuestion visible={visible} setvisible={setvisible} />
		</Row>
	);
};
