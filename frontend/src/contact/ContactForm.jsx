import axios from "axios";
import { useState } from "react";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    axios
      .post("/api/v1/contact", formData)
      .then((response) => {
        alert(response.data.message);
      })
      .catch((error) => {
        console.log(error);
        alert("Email non inviata, operazione FALLITA");
      });
  };

  return (
    <div className="container my-5">
      <div className="row">
        <div className="col-md-8 offset-md-2">
          <div className="card stops-form">
            <div className="card-body">
              <h3 className="card-title text-center mb-4">Contattaci</h3>
              <form onSubmit={handleSubmit}>
                <div className="input-field">
                  <label htmlFor="name">Nome</label>
                  <input
                    type="text"
                    className="form-control contact-input"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="input-field">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    className="form-control contact-input "
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="input-field">
                  <label htmlFor="message">Messaggio</label>
                  <textarea
                    name="message"
                    className="form-control contact-input textarea"
                    value={formData.message}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="d-flex justify-content-end">
                  <button type="submit" className="contact-btn">
                    Invia
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
