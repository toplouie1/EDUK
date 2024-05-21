import React from "react";
import { useState, useEffect } from "react";
import User from "./User";
import "./allusers.css";

const API = process.env.REACT_APP_API_URL;

function AllUsers() {
	const [users, setUsers] = useState([]); //Set state to empty array

	useEffect(() => {
		const fetchUsers = async () => {
			try {
				const response = await fetch(`${API}/users`);
				if (!response.ok) {
					throw new Error("response failed");
				}
				const data = await response.json();
				setUsers(data.result);
			} catch (error) {
				console.error("had error fetching the users", error);
			}
		};
		fetchUsers();
	}, []);

	return (
		<section className="users">
			{users.map((user) => {
				return <User key={user.uid} user={user} />;
			})}
		</section>
	);
}

export default AllUsers;
