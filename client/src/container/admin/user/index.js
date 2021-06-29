import React, { useState, useEffect } from "react";
import { Row, Col, Table, Popconfirm, Pagination, Divider } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { PageHeaderLayout } from "../../../common/PageHeaderLayout";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { buildApiUrl } from "../../../utils/buildUrl";
import querystring from "query-string";
import { deleteUser, getAllUsers } from "../../../redux/actions/auth";
import UpdateUser from "./UpdateUser";

const User = () => {
  const columns = [
    {
      title: "ID",
      dataIndex: "Stt",
      key: "stt",
      render: (text, record, index) => <span>{index + 1}</span>,
    },
    {
      title: "Tên",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Tên",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Phân quyền",
      dataIndex: "role",
      key: "role",
      render: (role) => {
        let roleString = "Học sinh";
        if (role === 0) roleString = "Admin";
        if (role === 1) roleString = "Giáo viên";
        return <span>{roleString}</span>;
      },
    },

    {
      // title: "Hành động",
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (text, record) => {
        return (
          record.role !== 0 && (
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
                  title={"Bạn chắc chắn muốn xóa người d này không ?"}
                  onConfirm={() => confirm(record._id)}
                  okText="Có"
                  cancelText="Không"
                >
                  <DeleteOutlined />
                </Popconfirm>
              </div>
            </div>
          )
        );
      },
    },
  ];

  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const { users, loadingUser, total, deleteStatus } = useSelector(
    ({ auth }) => auth
  );
  const [openUpdate, setOpenUpdate] = useState(false);
  const [updateId, setUpdateId] = useState(null);

  const confirm = (id) => {
    id && dispatch(deleteUser(id));
  };

  const handleSizeChange = (page) => {
    const params = {
      page,
    };
    history.push(`${location.pathname}${buildApiUrl(params)}`);
  };

  useEffect(() => {
    const tmpPage = querystring.parse(location.search).page || 1;
    const payload = {
      page: tmpPage,
    };
    dispatch(getAllUsers(payload));
    if (deleteStatus) dispatch(getAllUsers(payload));
  }, [location, deleteStatus, dispatch]);

  return (
    <Row className="card-list" gutter={[0, 5]}>
      <Col xl={24}>
        <PageHeaderLayout
          title="Danh sách thành viên"
          subtitle="Xin chào"
          // text="Category list, you can create, update or remove question"
          text="Danh sách thành viên trong hệ thống"
        />
      </Col>
      <Col xl={24}>
        {/* <Button
					type="dashed"
					style={{ width: "100%", margin: "10px 0 10px 0" }}
					onClick={() => setvisible(true)}
				>
					<PlusCircleOutlined /> Thêm mới danh mục câu hỏi
				</Button> */}
        <Table
          columns={columns}
          loading={loadingUser}
          dataSource={users}
          rowKey={(record) => record._id}
          pagination={false}
        />
        <Divider />
        <Pagination
          // current={+page || 1}
          current={+querystring.parse(location.search).page || 1}
          key={querystring.parse(location.search).page}
          total={total}
          onChange={handleSizeChange}
          onShowSizeChange={handleSizeChange}
        />
      </Col>

      <UpdateUser
        visible={openUpdate}
        setvisible={setOpenUpdate}
        id={updateId}
      />
    </Row>
  );
};

export default User;
