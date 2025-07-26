import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { getPosts } from "../data_acess/post_api";
import PostForm from "../components/PostForm";
import PostCard from "../components/PostCard";
import { deletePost as deletePostAPI } from "../data_acess/post_api";
import "./HomePageCss.css";

const HomePage = () => {
  const { user, isLoading: isAuthLoading } = useContext(AuthContext);

  const [posts, setPosts] = useState([]);
  const [isLoadingPosts, setIsLoadingPosts] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setIsLoadingPosts(true);
        const fetchedPosts = await getPosts();
        setPosts(
          fetchedPosts.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          )
        );
      } catch (err) {
        setError("Não foi possível carregar os posts.");
      } finally {
        setIsLoadingPosts(false);
      }
    };
    fetchPosts();
  }, []);

  const handlePostCreated = (newPost) => {
    setPosts((prevPosts) => [newPost, ...prevPosts]);
  };

  const handleDeletePost = async (postId) => {
    const confirm = window.confirm("Tem certeza que deseja deletar este post?");
    if (!confirm) return;

    try {
      await deletePostAPI(postId);
      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
    } catch (error) {
      alert("Erro ao deletar o post. Tente novamente.");
    }
  };

  if (isAuthLoading) {
    return <p className="loading-message">Verificando autenticação...</p>;
  }

  if (isLoadingPosts)
    return <p className="loading-message">Carregando posts...</p>;
  if (error) return <p className="error-message">{error}</p>;

  return (
    <div className="home-container">
      <h1>Página Inicial</h1>

      {user ? (
        <PostForm onPostCreated={handlePostCreated} />
      ) : (
        <p className="info-message">Faça o login para criar um novo post.</p>
      )}

      <hr />

      <h2>Posts Recentes</h2>
      <div>
        {posts.length > 0 ? (
          posts.map((post) => {
            return (
              <PostCard key={post.id} post={post} onDelete={handleDeletePost} />
            );
          })
        ) : (
          <p className="info-message">Ainda não há posts para exibir.</p>
        )}
      </div>
    </div>
  );
};

export default HomePage;
