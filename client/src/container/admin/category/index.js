import { Row, Col, Button, Table, Popconfirm } from "antd";
import React, { useEffect, useState } from "react";
import {
	DeleteOutlined,
	EditOutlined,
	PlusCircleOutlined,
} from "@ant-design/icons";
import { PageHeaderLayout } from "../../../common/PageHeaderLayout";
import { useDispatch, useSelector } from "react-redux";

import {
	deleteCategory,
	getAllCategories,
} from "../../../redux/actions/category";
import * as moment from "moment";
import { UpdateCategory } from "./UpdateCategory";
import AddNewCategoryModal from "./AddNewCategoryModal";

const Category = () => {
	const columns = [
		{
			title: "ID",
			dataIndex: "Stt",
			key: "stt",
			render: (text, record, index) => <span>{index + 1}</span>,
		},
		{
			title: "Name",
			dataIndex: "name",
			key: "name",
		},
		{
			title: "Create at",
			dataIndex: "create",
			key: "create",
			render: (text, record) => (
				<span>
					{moment(record?.created_at || null).format(
						"DD-MM-YYYY HH:mm"
					)}
				</span>
			),
		},
		{
			// title: "Hành động",
			title: "Action",
			dataIndex: "action",
			key: "action",
			render: (text, record) => (
				<div style={{ display: "flex" }}>
					<div style={{ cursor: "pointer", marginRight: 10 }}>
						<EditOutlined
							onClick={() => {
								console.log(record);
								setUpdateId(record._id);
								setOpenUpdate(true);
							}}
						/>
					</div>
					<div>
						<Popconfirm
							placement="topLeft"
							title={
								"Bạn chắc chắn muốn xóa câu danh muc này không ?"
							}
							onConfirm={() => confirm(record._id)}
							okText="Có"
							cancelText="Không"
						>
							<DeleteOutlined />
						</Popconfirm>
					</div>
				</div>
			),
		},
	];

	const confirm = (id) => {
		id && dispatch(deleteCategory(id));
	};

	const dispatch = useDispatch();
	const [visible, setvisible] = useState(false);
	const [openUpdate, setOpenUpdate] = useState(false);
	const [updateId, setUpdateId] = useState(null);

	const { categories, loadingCategory } = useSelector(
		({ category }) => category
	);

	useEffect(() => {
		dispatch(getAllCategories());
	}, [dispatch]);

	return (
		<Row className="card-list" gutter={[0, 5]}>
			<Col xl={24}>
				<PageHeaderLayout
					title="Category"
					subtitle="Welcome"
					text="Category list, you can create, update or remove question"
				/>
			</Col>
			<Col xl={24}>
				<Button
					type="dashed"
					style={{ width: "100%", margin: "10px 0 10px 0" }}
					onClick={() => setvisible(true)}
				>
					<PlusCircleOutlined /> Add new question
				</Button>
				<Table
					columns={columns}
					loading={loadingCategory}
					dataSource={categories}
					rowKey={(record) => record._id}
					pagination={false}
				/>
			</Col>

			{/* add new modal */}
			<AddNewCategoryModal visible={visible} setvisible={setvisible} />
			<UpdateCategory
				visible={openUpdate}
				setvisible={setOpenUpdate}
				id={updateId}
			/>
		</Row>
	);
};

export default Category;
