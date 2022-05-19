import React from "react";
import "./ResourceCategory.css";

import axios from "axios";
import { useState, useEffect } from "react";
import SingleResource from "./SingleResource";

const API = process.env.REACT_APP_API_URL;

export default function ContinueLearning() {
	const [ContinueLearning, setContinueLearning] = useState([]);

	useEffect(() => {
		axios
			.get(API + "/resources")
			.then((response) => {
				setContinueLearning(response.data.result);
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);

	let ContinueLearningPrograms = ContinueLearning.filter((high) => {
		return high.resource_category === "Program" && high.isverified === true;
	});
	let ContinueLearningClasses = ContinueLearning.filter((high) => {
		return high.resource_category === "Class" && high.isverified === true;
	});
	let ContinueLearningScholarhip = ContinueLearning.filter((high) => {
		return high.resource_category === "Scholarship" && high.isverified === true;
	});

	return (
		<div>
			<h1 className="resourceCategory">Continue Learning</h1>
			<section className="highSchoolMain">
				<div>
					<h3>Programs</h3>
					<p className="resourceP">
						The Programs are listed for high school students in need for
						programs <br /> to excel in technical skills and soft skills works
						that demand you
					</p>
				</div>
				<div className="resource-arr">
					{ContinueLearningPrograms.map((ContinueLearning) => {
						return (
							<SingleResource
								key={ContinueLearning.resource_id}
								resource={ContinueLearning}
							/>
						);
					})}
				</div>
			</section>
			<section className="highSchoolMain">
				<div>
					<h3>class</h3>
					<p className="resourceP">
						The Programs are listed for high school students in need for
						programs <br /> to excel in technical skills and soft skills works
						that demand you
					</p>
				</div>
				<div className="resource-arr">
					{ContinueLearningClasses.map((ContinueLearning) => {
						return (
							<SingleResource
								key={ContinueLearning.resource_id}
								resource={ContinueLearning}
							/>
						);
					})}
				</div>
			</section>
			<section className="highSchoolMain">
				<div>
					<h3>scholarship</h3>
					<p className="resourceP">
						The Programs are listed for high school students in need for
						programs <br /> to excel in technical skills and soft skills works
						that demand you
					</p>
				</div>
				<div className="resource-arr">
					{ContinueLearningScholarhip.map((ContinueLearning) => {
						return (
							<SingleResource
								key={ContinueLearning.resource_id}
								resource={ContinueLearning}
							/>
						);
					})}
				</div>
			</section>
		</div>
	);
}