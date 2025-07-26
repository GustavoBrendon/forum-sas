import Comment from "../models/comment.js";
import User from "../models/user.js";
import Post from "../models/post.js";

async function createComment(req, res) {
  try {
    const { content, postId } = req.body;
    const userId = req.user.id;

    if (!content || !postId) {
      return res
        .status(400)
        .json({ message: "Conteúdo e ID do post são obrigatórios." });
    }

    const post = await Post.findByPk(postId);
    if (!post) {
      return res.status(404).json({ message: "Post não encontrado." });
    }

    const comment = await Comment.create({
      content,
      postId,
      userId,
    });

    const newCommentWithUser = await Comment.findByPk(comment.id, {
      include: { model: User, attributes: ["id", "name", "username"] },
    });

    res.status(201).json(newCommentWithUser);
  } catch (error) {
    console.error("Erro ao criar comentário:", error);
    res.status(500).json({ message: "Erro interno ao criar comentário." });
  }
}

async function getCommentsByPostId(req, res) {
  try {
    const { postId } = req.params;

    const comments = await Comment.findAll({
      where: { postId: postId },
      include: [{ model: User, attributes: ["id", "name", "username"] }],
      order: [["createdAt", "ASC"]],
    });

    res.json(comments);
  } catch (error) {
    console.error("Erro ao obter comentários:", error);
    res.status(500).json({ message: "Erro interno ao obter comentários." });
  }
}

async function deleteComment(req, res) {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const comment = await Comment.findByPk(id);

    if (!comment) {
      return res.status(404).json({ message: "Comentário não encontrado." });
    }

    const currentUser = await User.findByPk(userId);
    const isAdmin = currentUser.permsId === 1;

    if (comment.userId !== userId && !isAdmin) {
      return res.status(403).json({
        message: "Você não tem permissão para deletar este comentário.",
      });
    }

    await comment.destroy();
    res.status(204).send();
  } catch (error) {
    console.error("Erro ao deletar comentário:", error);
    res.status(500).json({ message: "Erro interno ao deletar comentário." });
  }
}

export { createComment, getCommentsByPostId, deleteComment };
