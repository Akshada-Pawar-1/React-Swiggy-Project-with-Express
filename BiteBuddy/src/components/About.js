import { Component } from "react";
// import UserClass from "./UserClass";
import User from "./User";
import UserContext from "../utils/UserContext";

class About extends Component {
  constructor(props) {
    // console.log("Parent Constructor");
    super(props);
  }

  componentDidMount() {
    // console.log("Parent Component Did Mount!");
  }

  render() {
    // console.log("Parent Render");
    return (
      <div className="about-card">
        <h2>About us</h2>
        <h4>About Class Component</h4>
        <UserContext.Consumer>
          {({ loggedInUser }) => <h4>Current User: {loggedInUser}</h4>}
        </UserContext.Consumer>
        <h4>
          Here's out first venture to deliver food on your doorstep! serving hot
          food on your platter in minutes
        </h4>
        <User name={"First"} location={"Pune"} />
      </div>
    );
  }
}

export default About;
