import React, { useState } from "react";
import Dropdown from "./Dropdown";
import { Link } from "react-router-dom";
import "./NavBar.css";
import Button from "@mui/material/Button";
import styled from "styled-components";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

const Ul = styled.ul`
	@media (max-width: 768px) {
		flex-flow: column nowrap;
		background-color: rgb(247 247 247);
		position: fixed;
		transform: ${({ open }) => (open ? "translateX(0)" : "translateX(100%)")};
		top: 30px;
		right: 0;
		height: 100vh;
		width: 240px;
		padding-top: 3.5rem;
		transition: 0.3s ease-in-out;
		z-index: 20;
	}
`;

export default function RightNav({ open }) {
	const [dropdown, setDropdown] = useState(false);

	const onMouseEnter = () => {
		setDropdown(true);
	};
	const onMouseleave = () => {
		setDropdown(false);
	};

	return (
		<Ul open={open} className="navLinks">
			<li
				className="eachLi mainLi "
				onClick={dropdown ? onMouseleave : onMouseEnter}
			>
				<Link to="/resources">
					Resources <ArrowDropDownIcon fontSize="small"></ArrowDropDownIcon>
				</Link>
				{dropdown && <Dropdown />}
			</li>
			<li className="eachLi mainLi">
				<Link to="/about">About</Link>
			</li>
			<li className="eachLi mainLi">
				<Link to="/users/login">Users</Link>
			</li>
			<li className="eachLi mainLi">
				<Link to="/mentors/create">Mentors</Link>
			</li>
			<Link to="/users">
				<Button className="loginIcon" variant="outlined" size="medium">
					Log in
				</Button>
			</Link>
		</Ul>
	);
}