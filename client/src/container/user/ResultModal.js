import React from "react";
import { Modal, Result, Button } from "antd";
import { Link } from "react-router-dom";
import { memo } from "react";

export const ResultModal = memo(({ visible, resultsdata, exam }) => {
	const RenderBtn = () => (
		<>
			<Button type="primary" key="console">
				<Link to="/report"> Go Report page</Link>
			</Button>
			<Button key="buy">
				<Link to="/home">Go HomePages</Link>
			</Button>
		</>
	);

	return (
		<Modal visible={visible} footer={null}>
			<Result
				status="success"
				title="Successfully Finished Exam"
				subTitle={`Exam :${exam?.title},  Result: ${resultsdata?.result}`}
				extra={<RenderBtn />}
			/>
		</Modal>
	);
});
