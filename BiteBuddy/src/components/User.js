import { useState, useEffect } from "react";

const User = () => {
  const [userData, setUserData] = useState({
    avatar_url: "Dummy",
    name: "Dummy",
    location: "Default",
    contact: "123456789",
  });

  console.log("User - Functional component");

  useEffect(() => {
    fetchUserData();
    const userTimer = setInterval(() => {
      console.log("UserInterval Started !!");
    }, 1000);
    console.log("UseEffect");

    return () => {
      clearInterval(userTimer);
      console.log("UseEffect Return");
    };
  }, []);
  console.log("Render !!");

  const fetchUserData = async () => {
    const data = await fetch("https://api.github.com/users/Akshada-Pawar-1");
    const json = await data.json();

    setUserData(json);
  };

  const { avatar_url, name, location, login } = userData;

  return (
    <div className="user-card">
      <img className="res-img" alt="Avatar" src={avatar_url} />
      <h3>Name: {name}</h3>
      <h4>Location: {location}</h4>
      <h4>Contact: {login}</h4>
    </div>
  );
};

export default User;
