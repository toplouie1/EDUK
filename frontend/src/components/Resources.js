import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import SingleResource from "./SingleResource";

const API = process.env.REACT_APP_API_URL;

export default function Resources() {
	const [resources, setResources] = useState([]);
	const [sortKey, setSortKey] = useState("resource_id");
	const [ascending, setAscending] = useState(true);

	const handleSortKeyChange = (e) => {
		setSortKey(e.target.value);
	};
	const toggleButton = () => {
		setAscending(!ascending);
	};

	useEffect(() => {
		axios
			.get(API + "/resources")
			.then((response) => {
				const allResources = response.data.result.filter(
					(resource) => resource.is_verified
				);
				setResources(allResources);
				console.log(allResources);
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);

	const resourcesToDisplay = resources.sort((a, b) => {
		if (a[sortKey] < b[sortKey]) {
			return ascending ? -1 : 1;
		} else if (a[sortKey] > b[sortKey]) {
			return ascending ? 1 : -1;
		} else {
			return 0;
		}
	});

	const renderContent = () => {
		return resourcesToDisplay.map((resource) => (
			<SingleResource key={resource.resource_id} resource={resource} />
		));
	};

	return (
		<div>
			<section>
				<div>
					<label>Sort by: </label>
					<select value={sortKey} onChange={handleSortKeyChange}>
						<option value="resource_id">default</option>
						<option value="resource_name">Name</option>
					</select>
				</div>
				<button onClick={toggleButton}>{ascending ? "⬇️" : "⬆️"}</button>
			</section>
			<div className="resource-arr">{renderContent()}</div>
		</div>
	);
}
