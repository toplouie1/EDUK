import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./userdetails.css";
import SingleResource from "./SingleResource";

//API

const API = process.env.REACT_APP_API_URL;
const userId = localStorage.getItem("userId");

function UserDetails() {
  const [user, setUser] = useState({});
  const [userResources, setUserResources] = useState([]);
  //show Message
  const [showMessage, setShowMessage] = useState(false);
  // const [showUserDetails, setShowUserDetails] = useState(false);
  let { uid } = useParams();
  //let navigate = useNavigate();

  //mentor info
  const mentor = JSON.parse(localStorage.getItem("userMentor"));

  //handle remove a resource from user profile
  const removeResource = (rid) => {
    axios
      .delete(`${API}/users/${userId}/resources/${rid}`)
      .then((res) => {
        setShowMessage(true);
        const newResources = userResources.filter(
          (el) => el.resource_id !== rid
        );
        setUserResources(newResources);
      })
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    axios
      .get(API + "/users/" + uid)
      .then((response) => {
        setUser(response.data.result);
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get(API + "/users/" + uid + "/resources")
      .then((response) => {
        setUserResources(response.data.result);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [uid]);

  return (
    <section className="user_details">
      <div className="welcome">
        <aside className="profile-card">
          <header>
            <a href="#!">
              <img
                src="https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg"
                alt="profile-img"
              />
            </a>
            <h1>
              Welcome {user.first_name} {user.last_name}!
            </h1>

            <h2>"A step closer to your dreams"</h2>
          </header>

          <div className="profile-bio">
            <p>
              Username : {user.user_name} <br />
              Age : {user.age} <br />
              Mentor Name: {mentor ? mentor.mentor_fname : ""}{" "}
              {mentor ? mentor.mentor_lname : ""} <br />
              Email : {user.email}
            </p>
          </div>
          <section>
            <strong>User Resources:</strong>
            {userResources.map((resource) => (
              <SingleResource
                key={resource.resource_id}
                resource={resource}
                showDelete={true}
                removeResource={removeResource}
                showMessage={showMessage}
              />
            ))}
          </section>
        </aside>
      </div>
    </section>
  );
}

export default UserDetails;
