import { Row, Col, Button, Table, Popconfirm, Pagination, Divider } from "antd";
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
import { useHistory, useLocation } from "react-router-dom";
import { buildApiUrl } from "../../../utils/buildUrl";
import querystring from "query-string";

const Category = () => {
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
      title: "Ngày tạo",
      dataIndex: "create",
      key: "create",
      render: (text, record) => (
        <span>
          {moment(record?.created_at || null).format("DD-MM-YYYY HH:mm")}
        </span>
      ),
    },
    {
      title: "Hành động",
      // title: "Action",
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
              title={"Bạn chắc chắn muốn xóa câu danh mục này không ?"}
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
  const history = useHistory();
  const location = useLocation();
  const [visible, setvisible] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [updateId, setUpdateId] = useState(null);

  const { categories, loadingCategory, total } = useSelector(
    ({ category }) => category
  );

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
    dispatch(getAllCategories(payload));
  }, [dispatch, location]);

  return (
    <Row className="card-list" gutter={[0, 5]}>
      <Col xl={24}>
        <PageHeaderLayout
          title="Danh mục"
          subtitle="Xin chào"
          // text="Category list, you can create, update or remove question"
          text="Danh mục câu hỏi"
        />
      </Col>
      <Col xl={24}>
        <Button
          type="dashed"
          style={{ width: "100%", margin: "10px 0 10px 0" }}
          onClick={() => setvisible(true)}
        >
          <PlusCircleOutlined /> Thêm mới danh mục câu hỏi
        </Button>
        <Table
          columns={columns}
          loading={loadingCategory}
          dataSource={categories}
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
