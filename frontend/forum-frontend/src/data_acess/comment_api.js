import api from "./api";

export const getCommentsForPost = async (postId) => {
  try {
    const response = await api.get(`/comments/${postId}`);
    return response.data;
  } catch (error) {
    console.error(`Erro ao buscar comentários para o post ${postId}:`, error);
    throw error;
  }
};

export const createComment = async (commentData) => {
  try {
    const response = await api.post("/comments", commentData);
    return response.data;
  } catch (error) {
    console.error("Erro ao criar comentário:", error);
    throw error;
  }
};

export const deleteComment = async (commentId) => {
  try {
    await api.delete(`/comments/${commentId}`);
  } catch (error) {
    console.error(`Erro ao deletar o comentário ${commentId}:`, error);
    throw error;
  }
};
