const Contact = () => {
  return (
    <div className="contact-card">
      <div>
        <h2>Contact us here:</h2>
      </div>
      <div>
        <form className="form-card">
          <label>Name:</label>
          <input
            type="text"
            title="Name:"
            placeholder="Enter your name"
            className="input-box"
          ></input>
          <label>Message:</label>
          <input
            type="text"
            title="Message:"
            placeholder="Enter your message"
            className="input-box"
          ></input>
          <button className="common-btn">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
