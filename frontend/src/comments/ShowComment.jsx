const ShowComment = ({ comments }) => {
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
