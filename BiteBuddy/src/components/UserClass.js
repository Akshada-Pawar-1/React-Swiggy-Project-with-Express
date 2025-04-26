import React from "react";

class UserClass extends React.Component {
  constructor(props) {
    super(props);
    // console.log(this.props.name + " Constructor");
    // console.log(props);
    console.log("userClass");

    this.state = {
      userData: {
        avatar_url: "Dummy",
        name: "Dummy",
        location: "Default",
        login: "123456789",
      },
    };
  }

  async componentDidMount() {
    // console.log(this.props.name + " Child Component Did Mount!");
    const data = await fetch("https://api.github.com/users/Akshaymarch7");
    const json = await data.json();
    console.log(json);

    this.setState({ userData: json });

    this.timer = setInterval(() => {
      console.log("Interval Started!!");
    }, 1000);
  }

  componentDidUpdate() {
    console.log("Component did update!! ");
  }

  componentWillUnmount() {
    console.log("Component will unmount!!");
    clearInterval(this.timer);
  }

  render() {
    // console.log(this.props.name + " Render");

    const { name, location, login, avatar_url } = this.state.userData;
    // debugger;
    return (
      <div className="user-card">
        <img className="res-img" src={avatar_url} alt="Dummy_IMG" />
        <h2>Name: {name}</h2>
        <h3>Location: {location}</h3>
        <h4>Contact: {login}</h4>
      </div>
    );
  }
}

export default UserClass;
