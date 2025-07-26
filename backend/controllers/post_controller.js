import Post from "../models/post.js";
import User from "../models/user.js";

const createPost = async (req, res) => {
  try {
    const { content, title } = req.body;

    if (!title || !content) {
      return res
        .status(400)
        .json({ message: "Título e conteúdo são obrigatórios." });
    }

    const post = await Post.create({
      title: title,
      content: content,
      userId: req.user.id,
    });

    res.status(201).json(post);
  } catch (error) {
    console.error("Erro ao criar post:", error);
    res
      .status(500)
      .json({ message: "Erro interno do servidor ao criar o post." });
  }
};

async function getPosts(req, res) {
  const posts = await Post.findAll({
    include: User,
    order: [["createdAt", "DESC"]],
  });
  res.json(posts);
}

async function editPost(req, res) {
  try {
    const post = await Post.findOne({
      where: {
        id: req.params.id,
        userId: req.user.id,
      },
    });

    if (post) {
      post.title = req.body.title || post.title;
      post.content = req.body.content || post.content;
      await post.save();
      res.json(post);
    } else {
      res
        .status(404)
        .json({ message: "Post não encontrado ou permissão negada." });
    }
  } catch (error) {
    console.error("Erro ao editar post:", error);
    res.status(500).json({ message: "Erro ao editar post." });
  }
}

async function deletePost(req, res) {
  try {
    const post = await Post.findOne({
      where: {
        id: req.params.id,
        userId: req.user.id,
      },
    });

    if (post) {
      await post.destroy();
      res.status(204).send();
    } else {
      res
        .status(404)
        .json({ message: "Post não encontrado ou permissão negada." });
    }
  } catch (error) {
    console.error("Erro ao deletar post:", error);
    res.status(500).json({ message: "Erro ao deletar post." });
  }
}

export { createPost, getPosts, editPost, deletePost };
