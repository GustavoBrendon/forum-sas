import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Comment = ({ comment, onDelete }) => {
  const { user } = useContext(AuthContext);
  const canDelete = user && (user.id === comment.userId || user.permsId === 1);

  return (
    <div className="comment">
      <div className="comment-header">
        <strong>{comment.User ? comment.User.name : "Usuário"}</strong>
        {canDelete && (
          <button
            onClick={() => onDelete(comment.id)}
            className="delete-comment-btn"
          >
            &times;
          </button>
        )}
      </div>
      <p className="comment-content">{comment.content}</p>
    </div>
  );
};

export default Comment;
