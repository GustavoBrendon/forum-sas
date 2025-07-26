import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import CommentList from "./CommentList";
import './PostCard.css'; 

const PostCard = ({ post, onDelete }) => {
  const { user } = useContext(AuthContext);
  const [showComments, setShowComments] = useState(false); 

  const canDelete = user && (user.id === post.userId || user.permsId === 1);

  const handleDelete = () => {
    if (window.confirm("Tem certeza que deseja deletar este post?")) {
      onDelete(post.id);
    }
  };

  return (
    <div className="post-card">
      <div className="post-header">
        <h4>{post.User ? post.User.name : "Usuário anônimo"}</h4>
        {canDelete && (
          <button className="delete-button" onClick={handleDelete}>
            Deletar
          </button>
        )}
      </div>

      <h3>{post.title}</h3>
      <p>{post.content}</p>

      <div className="post-footer">
        <button
          className="comments-toggle-btn"
          onClick={() => setShowComments(!showComments)}
        >
          {showComments ? "Ocultar Comentários" : "Ver Comentários"}
        </button>
      </div>

      {showComments && <CommentList postId={post.id} />}
    </div>
  );
};

export default PostCard;
