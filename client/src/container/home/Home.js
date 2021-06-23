import React, { useEffect } from "react";
import "../../assets/styles/home.scss";
import pig_1 from "../../assets/imgs/if-home1.svg";
import pig_2 from "../../assets/imgs/if-home2.svg";
import pig_3 from "../../assets/imgs/if-home3.svg";
import pig_4 from "../../assets/imgs/if-home4.svg";
import Slider from "react-slick";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import course_1 from "../../assets/imgs/course-1.png";
import course_2 from "../../assets/imgs/course-2.png";
import course_3 from "../../assets/imgs/course-3.png";
import course_4 from "../../assets/imgs/course-4.png";
import heart from "../../assets/imgs/heart.png";
import users from "../../assets/imgs/users.svg";
import { Spin, Button } from "antd";
import { getAllExam } from "../../redux/actions/exam";

const course_imgs = [course_1, course_2, course_3, course_4];

const items = [
	{
		title: "Course",
		src: pig_1,
		number: "100+",
	},
	{
		title: "Students",
		src: pig_2,
		number: "10.000+",
	},
	{
		title: "Session",
		src: pig_3,
		number: "100+",
	},

	{
		title: "examinations",
		src: pig_4,
		number: "456+",
	},
];

var settings = {
	infinite: true,
	speed: 250,
	slidesToShow: 4,
	slidesToScroll: 2,
	autoplay: true,
	arrows: false,
	draggable: true,
};

export const Home = () => {
	const dispatch = useDispatch();
	const { loading, exams } = useSelector(({ exam }) => exam);

	useEffect(() => {
		// dispatch(getAllCourse())
		dispatch(getAllExam());
		// eslint-disable-next-line
	}, []);

	return (
		<div>
			<div className="about-home">
				<div className="row">
					{items.map((e, i) => (
						<div className="item" key={i}>
							<img src={e.src} alt="" />
							<p>{e.title}</p>
							<span>
								<b>{e.number}</b>
							</span>
						</div>
					))}
				</div>
			</div>

			<div className="home-recomendation">
				<h3>Exam recomendation</h3>
				<div className="slide-wrap">
					{loading ? (
						<div className="example">
							<Spin size="large" />
						</div>
					) : (
						<Slider {...settings}>
							{exams.map((e, i) => (
								<div key={i} className="slide-item">
									<img
										src={
											course_imgs[
												Math.floor(
													Math.random() * (3 - 0 + 1)
												) + 0
											]
										}
										alt=""
									/>
									<div className="info-course">
										<div className="title">
											<p>{e.title}</p>
											<img src={heart} alt="" />
										</div>
										<div className="des">{e.des || ""}</div>
										<div className="route">
											<div className="react">
												<img src={heart} alt="" />
												<span>325</span>
												<img src={users} alt="" />
												<span>10</span>
											</div>
											<div className="link">
												<Button type="primary">
													<Link
														to={`exam/take/${e._id}`}
													>
														Join now
													</Link>
												</Button>
											</div>
										</div>
									</div>
								</div>
							))}
						</Slider>
					)}
				</div>
			</div>
		</div>
	);
};
