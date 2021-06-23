import Modal from "antd/lib/modal/Modal";
import React from "react";
import { Form, Input, Button } from "antd";
import "../../../assets/styles/add-category.scss";
import { updateCategory } from "../../../redux/actions/category";
import { useDispatch, useSelector } from "react-redux";

export const UpdateCategory = ({ setvisible, visible, id }) => {
	const dispatch = useDispatch();
	const currentCategory = useSelector(({ category }) =>
		category.categories.find((e) => e._id === id)
	);

	const onFinish = (values) => {
		dispatch(
			updateCategory({
				_id: id,
				...values,
			})
		);
	};

	return (
		<Modal
			title="UPDATE  CATEGORY"
			visible={visible}
			onCancel={() => setvisible(false)}
			width={600}
			footer={null}
		>
			{" "}
			{currentCategory && (
				<Form
					key={id}
					name="basic"
					onFinish={onFinish}
					initialValues={{ name: currentCategory?.name }}
				>
					<Form.Item
						name="name"
						rules={[
							{
								required: true,
								message: "Please input category name!",
							},
						]}
					>
						<Input />
					</Form.Item>
					<div className="btn-group">
						<Button
							onClick={() => setvisible(false)}
							style={{ marginRight: 10 }}
						>
							Cancel
						</Button>
						<Button type="primary" htmlType="submit">
							Submit
						</Button>
					</div>
				</Form>
			)}
		</Modal>
	);
};
