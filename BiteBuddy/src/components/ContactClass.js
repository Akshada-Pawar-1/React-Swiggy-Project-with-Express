import React from "react";

class Contact extends React.Component {
  constructor(props) {
    super(props);
    console.log("Inner Constructor");
  }

  componentDidMount() {
    console.log("Inner Child Component Did Mount!");
  }

  render() {
    console.log("Inner Render");
    return (
      <div>
        <h1>Contact us here</h1>
        <li>Insta</li>
        <li>Facebook</li>
        <li>X</li>
      </div>
    );
  }
}

export default Contact;
