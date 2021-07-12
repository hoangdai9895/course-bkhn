import { Card, Col, Row, Skeleton } from "antd";
import moment from "moment";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { PageHeaderLayout } from "../../../common/PageHeaderLayout";
import { getAllClass } from "../../../redux/actions/class";

const MyClass = () => {
  const dispatch = useDispatch();
  const { isAdmin, isTeacher, user } = useSelector(({ auth }) => auth);
  const { classes, loadingClass } = useSelector((state) => state.class);

  useEffect(() => {
    let payload = {};
    if (!isAdmin && !isTeacher) {
      payload.id = user.id;
    }
    dispatch(getAllClass(payload));
    // eslint-disable-next-line
  }, [isAdmin, isTeacher, user]);

  return (
    <Row className="card-list" gutter={[0, 5]}>
      <Col xl={24}>
        <PageHeaderLayout
          title="Lớp học"
          subtitle="Xin chào"
          // text="Category list, you can create, update or remove question"
          text="Dánh sách các lớp"
        />
      </Col>
      <Col xl={24}>
        {loadingClass && <Skeleton />}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
          }}
        >
          {classes?.length > 0 &&
            classes.map((e) => (
              <Card
                key={e._id}
                title={e?.name}
                // extra={<Link to="/">Chi tiet</Link>}
                style={{ width: 450, marginBottom: 20 }}
              >
                <p>Giao vien: {e.teacher.name}</p>
                <p>
                  Ngay tao: {moment(e.create_at).format("YYYY-MM-DD HH:mm")}
                </p>
                Bai thi:{" "}
                <Link to={`exam/take/${e.exam._id}`}>{e.exam.title}</Link>
              </Card>
            ))}
        </div>
      </Col>
    </Row>
  );
};

export default MyClass;
