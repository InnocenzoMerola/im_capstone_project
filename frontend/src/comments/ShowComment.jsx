import axios from "axios";
import { useEffect, useState } from "react";

const ShowComment = ({ stopId }) => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetchComments();
  }, [stopId]);

  const fetchComments = () => {
    axios
      .get(`/api/v1/stops/${stopId}/comments`)
      .then((response) => {
        setComments(response.data);
      })
      .catch((error) => console.log("Errore nella chiamata API", error));
  };

  console.log("Commenti", comments);
  return (
    <div>
      <h2>Commenti</h2>
      <ul>
        {comments.map((comment) => (
          <li key={comment.id}>
            <strong>User:</strong>
            {comment.username}
            <br />
            <strong>Comment:</strong>
            {comment.comment}
            <br />
            <strong>Rate:</strong>
            {comment.rate}
            <br />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ShowComment;
