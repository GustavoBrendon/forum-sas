import jwt from "jsonwebtoken";

function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      message: "Token não fornecido ou inválido.",
    });
  }
  const token = authHeader.split(" ")[1];
  try {
    const decode = jwt.verify(token, "chave-secreta");
    req.user = decode;
    next();
  } catch (error) {
    console.error("Erro ao verificar token:", error);
    return res.status(401).json({
      message: "Token inválido.",
    });
  }
}

export default authMiddleware;
