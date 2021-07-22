import React from "react";
import { Skeleton, Typography, Button } from "antd";
import Countdown from "react-countdown";
import * as moment from "moment";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
const { Title, Paragraph } = Typography;

export const HeaderCourse = React.memo(({ start, setStart, done, isDone }) => {
  const params = useParams();

  const {
    user: { id },
  } = useSelector(({ auth }) => auth);

  const rendererTime = ({ hours, minutes, seconds, completed }) => {
    window.onbeforeunload = function () {
      localStorage.setItem(
        "time",
        JSON.stringify({
          id,
          examId: params?.id,
          hours,
          minutes,
          seconds,
          completed,
        })
      );
      return false;
    };

    if (completed) return "Hết giờ";
    return (
      <span>
        {hours}:{minutes}:{seconds}
      </span>
    );
  };

  const { exam } = useSelector(({ exam }) => exam);

  const renderDate = (time) => {
    console.log(time);
    let localTime = JSON.parse(localStorage.getItem("time"));
    console.log(localTime);
    if (localTime && localTime?.id === id && localTime?.examId === params?.id) {
      return Date.now() + (localTime.minutes * 60 + localTime.seconds) * 1000;
    }
    return Date.now() + exam.time * 60 * 1000;
  };

  if (Object.keys(exam).length === 0)
    return (
      <div style={{ background: "#fff", padding: "1rem" }}>
        <Skeleton />
      </div>
    );
  return (
    <div className="take-exam__header">
      <Typography>
        <Title>
          {exam.title.toUpperCase()}
          <i style={{ fontSize: "1rem", color: "#ccc" }}>
            {moment(exam.createdAt).format("HH:MM DD-MM-YYYY")}
          </i>
        </Title>
        <Paragraph>{exam.des || "lorem ipsum..."}</Paragraph>
        <Paragraph>
          Thời gian làm bài: <b> {exam.time} phút </b>
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
                  done(exam, JSON.parse(localStorage.getItem("answersList")));
              }}
              date={renderDate(exam.time)}
              renderer={rendererTime}
            />
          )}
        </Paragraph>
      </Typography>
    </div>
  );
});
