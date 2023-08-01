import "./Contact.css";
import { useState } from "react";
import { postMessage } from "../../redux/actions/actions.js";
import validateContact from "../../utils/validateContact.js";
import { useDispatch, useSelector } from 'react-redux';

const Contact = () => {

  const dispatch = useDispatch();

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setMessage({
      ...message,
      [name]: value
    });

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: validateContact({ ...message, [name]: value })[name]
    }));
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!isFormValid) {
      dispatch(postMessage(message));
    };

    setMessage({
      name: '',
      email: '',
      subject: '',
      message: ''
    })
  };

  const isFormValid =
  !message.name ||
  !message.email ||
  !message.subject ||
  !message.message;

  return (
    <div className="container p-5 d-flex justify-content-center text-black" 
      style={{ 
        width: "100%",
        maxWidth: "1200px",
        backgroundColor: "#1a1a1a" 
      }}
    >
      <form
        onSubmit={handleSubmit}
        className="needs-validation "
        style={{
          border: "1px solid black",
          borderRadius: "13px",
          width: "50%",
          backgroundColor: "#a2a2a2" 
        }}
      >
        <div className="mb-3 px-md-3 pt-3">
          <div className="row">
            <label htmlFor="name" className="col-md-3 form-label">
              Name
            </label>
            <div className="col-md-9 d-flex flex-column">
              <input
                value={message.name}
                onChange={handleChange}
                name="name"
                id="name"
                type="text"
                className={`form-control custom-input ${errors?.name ? 'is-invalid' : ''}`}
                placeholder="Enter your name"
              />
              {errors?.name && <div className="invalid-feedback d-flex justify-content-center style-error">{errors?.name}</div>}
            </div>
          </div>
        </div>

        <div className="mb-3 px-md-3">
          <div className="row">
            <label htmlFor="email" className="col-md-3 form-label">
              Email
            </label>
            <div className="col-md-9 d-flex flex-column">
              <input
                value={message.email}
                onChange={handleChange}
                name="email"
                type="email"
                id="email"
                className={`form-control custom-input ${errors?.email ? 'is-invalid' : ''}`}
                placeholder="Enter your email"
              />
              {errors?.email && <div className="invalid-feedback d-flex justify-content-center style-error">{errors?.email}</div>}
            </div>
          </div>
        </div>

        <div className="mb-3 px-md-3">
          <div className="row">
            <label htmlFor="subject" className="col-md-3 form-label">
              Subject
            </label>
            <div className="col-md-9 d-flex flex-column">
              <input
                value={message.subject}
                onChange={handleChange}
                name="subject"
                type="text"
                id="subject"
                className={`form-control custom-input ${errors?.subject ? 'is-invalid' : ''}`}
                placeholder="Enter a subject"
              />
              {errors?.subject && <div className="invalid-feedback d-flex justify-content-center style-error">{errors?.subject}</div>}
            </div>
          </div>
        </div>

        <div className="mb-3">
          <div className="d-flex justify-content-center">
            <label htmlFor="message" className="form-label">
              Your message
            </label>
          </div>
          <div className="d-flex justify-content-center">
            <textarea 
              value={message.message}
              onChange={handleChange}
              name="message"
              id="message" 
              className={`form-control ${errors?.message ? 'is-invalid' : ''}`}
              placeholder="Enter your message"
              style={{ fontSize: "15px", width: "80%" }}
              rows="3"
            ></textarea>
          </div>
          <div className="d.flex justify-content-center">
            {errors?.message && <div className="invalid-feedback d-flex justify-content-center style-error">{errors?.message}</div>}
          </div>
        </div>

        <div className="d-flex justify-content-center pb-3">
          <button 
            type="submit" 
            className="btn btn-dark"
            disabled={isFormValid}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Contact;
