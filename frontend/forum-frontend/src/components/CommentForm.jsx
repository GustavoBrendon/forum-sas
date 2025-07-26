import React, { useState } from "react";
import { createComment } from "../data_acess/comment_api";

const CommentForm = ({ postId, onCommentCreated }) => {
  const [content, setContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;

    try {
      const newComment = await createComment({ postId, content });
      onCommentCreated(newComment);
      setContent(""); 
    } catch (error) {
      alert("Você precisa estar logado para comentar.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="comment-form">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Adicione um comentário..."
        rows="2"
      />
      <button type="submit">Enviar</button>
    </form>
  );
};

export default CommentForm;
