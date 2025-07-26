import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { getCommentsForPost, deleteComment } from "../data_acess/comment_api";
import Comment from "./Comment";
import CommentForm from "./CommentForm";
import "./CommentList.css";

const CommentList = ({ postId }) => {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        setIsLoading(true);
        const fetchedComments = await getCommentsForPost(postId);
        setComments(fetchedComments);
      } catch (error) {
        console.error("Falha ao carregar comentários.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchComments();
  }, [postId]);

  const handleCommentCreated = (newComment) => {
    setComments((prevComments) => [...prevComments, newComment]);
  };

  const handleCommentDeleted = async (commentId) => {
    try {
      await deleteComment(commentId);
      setComments((prevComments) =>
        prevComments.filter((c) => c.id !== commentId)
      );
    } catch (error) {
      alert("Erro ao deletar comentário. Verifique suas permissões.");
    }
  };

  if (isLoading) return <p>Carregando comentários...</p>;

  return (
    <div className="comment-section">
      <h4>Comentários</h4>
      <div className="comment-list">
        {comments.length > 0 ? (
          comments.map((comment) => (
            <Comment
              key={comment.id}
              comment={comment}
              onDelete={handleCommentDeleted}
            />
          ))
        ) : (
          <p>Seja o primeiro a comentar!</p>
        )}
      </div>

      {user ? (
        <CommentForm postId={postId} onCommentCreated={handleCommentCreated} />
      ) : (
        <p>
          Você precisa <a href="/login">fazer login</a> para comentar.
        </p>
      )}
    </div>
  );
};

export default CommentList;
