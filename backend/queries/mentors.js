const db = require("../db/dbConfig.js");

// Get all mentors
const getAllMentors = async () => {
	const mentors = await db.many("SELECT * FROM mentors");
	return mentors;
};

// Get one mentor
const getOneMentor = async (mid) => {
	const mentor = await db.oneOrNone(
		"SELECT * FROM mentors WHERE mentor_id=$1",
		mid
	);
	return mentor;
};

// Create a mentor
const createMentor = async (mentor) => {
	const createdMentor = await db.oneOrNone(
		"INSERT INTO mentors(mentor_fname, mentor_lname, bio, email, speciality) VALUES($1, $2, $3, $4, $5) RETURNING *",
		[
			mentor.mentor_fname,
			mentor.mentor_lname,
			mentor.bio,
			mentor.email,
			mentor.speciality,
		]
	);
	return createdMentor;
};

// Update a mentor
const updateMentor = async (mid, mentor) => {
	const updatedMentor = await db.one(
		"UPDATE mentors SET mentor_fname=$1, mentor_lname=$2, bio=$3, email=$4, speciality=$5, is_verified=$6, mentor_image=$7 WHERE mentor_id=$8 RETURNING *",
		[
			mentor.mentor_fname,
			mentor.mentor_lname,
			mentor.bio,
			mentor.email,
			mentor.speciality,
			mentor.is_verified,
			mentor.mentor_image ? mentor.mentor_image : null,
			mid,
		]
	);
	return updatedMentor;
};

//Delete a mentor
const deleteMentor = async (mid) => {
	const deletedMentor = await db.oneOrNone(
		"DELETE FROM mentors WHERE mentor_id=$1 RETURNING *",
		mid
	);
	return deletedMentor;
};

module.exports = {
	getAllMentors,
	getOneMentor,
	createMentor,
	updateMentor,
	deleteMentor,
};
