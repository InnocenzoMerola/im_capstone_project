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
    <form onSubmit={handleSubmit}>
      <div>
        <label>Nome</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} required />
      </div>
      <div>
        <label>Email</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} required />
      </div>
      <div>
        <label>Messaggio</label>
        <textarea name="message" value={formData.message} onChange={handleChange} required />
      </div>
      <button type="submit">Invia</button>
    </form>
  );
};

export default ContactForm;
