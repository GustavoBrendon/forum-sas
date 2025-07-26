import User from "../models/user.js";

const adminMiddleware = async (req, res, next) => {
  try {
    const ADMIN_PERM_ID = 1;

    const user = await User.findByPk(req.user.id);

    if (user && user.permsId === ADMIN_PERM_ID) {
      next();
    } else {
      res.status(403).json({
        message: "Acesso negado. Requer privilégios de administrador.",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Erro interno ao verificar permissões de administrador.",
    });
  }
};

export default adminMiddleware;
