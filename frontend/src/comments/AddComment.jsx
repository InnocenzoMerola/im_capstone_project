import axios from "axios";
import { useState } from "react";

const AddComment = ({ stopId, onAddComment }) => {
  const [comment, setComment] = useState("");
  const [rate, setRate] = useState(1);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newComment = { comment, rate };

    axios
      .post(`/api/v1/stops/${stopId}/comments`, newComment)
      .then((response) => {
        onAddComment(response.data);
        setComment("");
        setRate(1);
      })
      .catch((error) => console.log("Errore nell'aggiunta del commento", error));
  };

  return (
    <div>
      <h2>Aggiungi un commento</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="comment">Commento:</label>
          <textarea name="comment" id="comment" value={comment} onChange={(e) => setComment(e.target.value)} required />
        </div>
        <div className="form-group">
          <label htmlFor="rate">Rate:</label>

          <select
            className="form-select  stops-input mb-3"
            value={rate}
            onChange={(e) => setRate(e.target.value)}
            id="rate"
            name="rate"
            required
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4 </option>
            <option value="5">5 </option>
          </select>
        </div>

        <button type="submit">Commenta</button>
      </form>
    </div>
  );
};

export default AddComment;
