import React, { useState, useContext } from "react";
import { createPost } from "../data_acess/post_api";
import { AuthContext } from "../context/AuthContext";
import "./PostForm.css";

const PostForm = ({ onPostCreated }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const { user } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !content) {
      setError("Título e conteúdo são obrigatórios.");
      return;
    }

    const postData = {
      title,
      content,
    };

    try {
      const newPostFromServer = await createPost(postData);

      onPostCreated(newPostFromServer);

      setTitle("");
      setContent("");
      setError("");
    } catch (apiError) {
      console.error("Erro ao criar post:", apiError);
      setError("Não foi possível criar o post. Tente novamente.");
    }
  };

  return (
    <div className="post-form-container">
      <h3>Criar um Novo Post</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            className="form-input"
            placeholder="Título do seu post"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="form-group">
          <textarea
            className="form-textarea"
            placeholder="Sobre o que você está pensando?"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        {error && <p className="error-message">{error}</p>}
        <button type="submit" className="submit-button">
          Publicar
        </button>
      </form>
    </div>
  );
};

export default PostForm;
