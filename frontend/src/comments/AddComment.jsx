import axios from "axios";
import { useState } from "react";

const AddComment = ({ stopId }) => {
  //   const [formData, setFormData] = useState({
  //     comment: "",
  //     rate: "",
  //   });

  const [comment, setComment] = useState("");
  const [rate, setRate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post(`/api/v1/stops/${stopId}/comments`, { comment: comment, rate })
      .then((response) => {
        // setFormData("");
        setComment("");
        setRate("");
      })
      .catch((error) => console.log("Errore nell'aggiunta del commento", error));
  };

  //   const updateInputValue = (e) => {
  //     setFormData((oldFormData) => ({
  //       ...oldFormData,
  //       [e.target.name]: e.target.value,
  //     }));
  //   };

  return (
    <div>
      <h2>Aggiungi un commento</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="comment">Commento:</label>
          <textarea name="comment" id="comment" value={comment} onChange={(e) => setComment(e.target.value)} required />
        </div>
        {/* <div className="form-group">
          <label htmlFor="rate">Rate:</label>

          <select
            className="form-select  stops-input mb-3"
            value={formData.rate}
            onChange={(e) => updateInputValue(e.target.value)}
            id="language"
          >
            <option value="">Seleziona un </option>
            <option value="ITA">Italiano</option>
            <option value="ENG">Inglese</option>
            <option value="FRA">Francese </option>
            <option value="NAP">Napoletano </option>
          </select>
        </div> */}
        <div className="form-group">
          <label htmlFor="rate">Rate (1-5):</label>
          <input
            type="number"
            id="rate"
            name="rate"
            className="form-control"
            value={rate}
            onChange={(e) => setRate(e.target.value)}
            min="1"
            max="5"
            required
          />
        </div>
        <button type="submit">Commenta</button>
      </form>
    </div>
  );
};

export default AddComment;
