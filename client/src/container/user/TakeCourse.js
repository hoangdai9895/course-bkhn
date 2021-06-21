import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCourseById } from "../../redux/actions/course";
import { useParams } from "react-router-dom";
import { Steps, Button, Divider, Radio } from "antd";
import "../../assets/styles/take-course.scss";

import { ResultModal } from "./ResultModal";
import { createResult } from "../../redux/actions/result";
import { HeaderCourse } from "./HeaderCourse";
import { CourseSkeleton } from "./CourseSkeleton";
const { Step } = Steps;

const renderContent = (answers, onChange, title, current, answersList) => {
  return (
    <div>
      <h3>{title}</h3>
      <Radio.Group onChange={onChange} value={answersList[current] || null}>
        {answers.map((e, i) => (
          <Radio value={e} key={i}>
            {e}
          </Radio>
        ))}
      </Radio.Group>
    </div>
  );
};

export const TakeCourse = () => {
  const [current, setcurrent] = useState(0);
  const [start, setStart] = useState(false);
  const [answersList, setanswersList] = useState([]);
  const [visible, setvisible] = useState(false);
  const [resultsdata, setresults] = useState([]);
  const [isDone, setDone] = useState(false);
  // const [datato, setData]
  const { id } = useParams();

  const { course } = useSelector((state) => state.course);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const next = () => {
    setcurrent(current + 1);
  };

  const prev = () => {
    setcurrent(current - 1);
  };

  const done = useCallback((course, answersList) => {
    let tempResults = [];
    let data = {};
    let trueAnswer = 0;

    course.questions.forEach((e, i) => {
      let item = { isTrue: false, questionId: e._id, answer: answersList[i] };
      if (e.answers[e.correctAnswer] === answersList[i]) {
        item.isTrue = true;
        trueAnswer++;
      }
      tempResults = [...tempResults, item];
    });

    data.course = course._id;
    data.user = user.id;
    data.result = `${trueAnswer}/${tempResults.length}`;
    setresults(data);
    dispatch(createResult(data));
    setvisible(true);
  }, [dispatch, user.id]);

  const onChange = (e) => {
    // const { answers, correctAnswer } = course.questions[current];
    const value = e.target.value;
    let tempAns = [...answersList];
    tempAns[current] = value;
    localStorage.setItem("answersList", JSON.stringify(tempAns));
    setanswersList(tempAns);
  };

  const generateStep = (course) => {
    let steps = [];
    course.questions.forEach((e, i) => {
      steps[i] = {
        content: renderContent(
          e.answers,
          onChange,
          e.question,
          current,
          answersList
        ),
      };
    });
    return steps;
  };

  useEffect(() => {
    dispatch(getCourseById(id));
     // eslint-disable-next-line
  }, []);
  return (
    <>
      <div style={{ background: "#fff" }}>
        <HeaderCourse
          start={start}
          setStart={setStart}
          done={done}
          isDone={isDone}
        />
        {start ? (
          <>
            <Divider />
            <div className="take-course">
              <Steps current={current}>
                {generateStep(course).map((item, i) => (
                  <Step key={i} />
                ))}
              </Steps>

              {/* step content ============== */}
              <div className="steps-content">
                {generateStep(course)[current].content}
              </div>

              {/* step actions ============= */}
              <div className="steps-action">
                {current < generateStep(course).length - 1 && (
                  <Button type="primary" onClick={() => next()}>
                    Next
                  </Button>
                )}
                {current === generateStep(course).length - 1 && (
                  <Button
                    type="primary"
                    onClick={() => {
                      setDone(true);
                      done(course, answersList);
                    }}
                  >
                    Done
                  </Button>
                )}
                {current > 0 && (
                  <Button style={{ margin: "0 8px" }} onClick={() => prev()}>
                    Previous
                  </Button>
                )}
              </div>
              <ResultModal
                visible={visible}
                resultsdata={resultsdata}
                course={course}
              />
            </div>
          </>
        ) : null}
      </div>

      {!start ? <CourseSkeleton /> : null}
    </>
  );
};
