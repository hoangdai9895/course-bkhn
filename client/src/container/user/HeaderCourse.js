import React from "react";
import { Skeleton, Typography, Button } from "antd";
import Countdown from "react-countdown";
import * as moment from "moment";
import { useSelector } from "react-redux";
const { Title, Paragraph } = Typography;

const rendererTime = ({ hours, minutes, seconds, completed }) => {
  if (completed) return "Hết giờ";
  return (
    <span>
      {hours}:{minutes}:{seconds}
    </span>
  );
};

export const HeaderCourse = React.memo(({ start, setStart, done, isDone }) => {
  const { course } = useSelector((_) => _.course);

  if (Object.keys(course).length === 0)
    return (
      <div style={{ background: "#fff", padding: "1rem" }}>
        <Skeleton />
      </div>
    );
  return (
    <div className="take-course__header">
      <Typography>
        <Title>
          {course.title.toUpperCase()}
          <i style={{ fontSize: "1rem", color: "#ccc" }}>
            {moment(course.createdAt).format("HH:MM DD-MM-YYYY")}
          </i>
        </Title>
        <Paragraph>{course.des || "lorem ipsum..."}</Paragraph>
        <Paragraph>
          Thời gian làm bài: <b> {course.time} phút </b>
        </Paragraph>
        <Paragraph>
          {!start ? (
            <Button type="primary" onClick={setStart}>
              Bắt đầu làm bài
            </Button>
          ) : (
            <Countdown
              onComplete={() => {
                !isDone &&
                  done(course, JSON.parse(localStorage.getItem("answersList")));
              }}
              date={Date.now() + course.time * 60 * 1000}
              renderer={rendererTime}
            />
          )}
        </Paragraph>
      </Typography>
    </div>
  );
});
