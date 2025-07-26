import api from "./api";

export const getPosts = async () => {
  try {
    const response = await api.get("/posts");
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar posts:", error);
    throw error;
  }
};

export const createPost = async (postData) => {
  try {
    const response = await api.post("/posts", postData);
    return response.data;
  } catch (error) {
    console.error("Erro ao criar post:", error);
    throw error;
  }
};

export const deletePost = async (postId) => {
  try {
    await api.delete(`/posts/${postId}`);
  } catch (error) {
    console.error("Erro ao deletar o post:", error);
    throw error;
  }
};
